# -*- coding: utf-8 -*-

import KBEngine
from KBEDebug import *
import time
from datetime import datetime
from interfaces.GameObject import GameObject
from entitymembers.iRoomRules import iRoomRules
from entitymembers.PlayerProxy import PlayerProxy
from BaseEntity import BaseEntity
import json
import const
import switch
import utility
import copy
from Functor import Functor


class GameRoom(BaseEntity, GameObject, iRoomRules):
	"""
	这是一个游戏房间/桌子类
	该类处理维护一个房间中的实际游戏， 例如：斗地主、麻将等
	该房间中记录了房间里所有玩家的mailbox，通过mailbox我们可以将信息推送到他们的客户端。
	"""

	def __init__(self):
		BaseEntity.__init__(self)
		GameObject.__init__(self)
		iRoomRules.__init__(self)

		self.agent = None
		self.roomID = utility.gen_room_id()

		# 状态0：未开始游戏， 1：某一局游戏中
		self.state = const.ROOM_WAITING

		# 存放该房间内的玩家mailbox
		self.players_dict = {}
		self.players_list = [None] * self.player_num
		self.origin_players_list = [None] * self.player_num

		# 打出财神的index
		self.discard_king_idx = -1

		# 庄家index
		self.dealer_idx = 0
		# 当前控牌的玩家index
		self.current_idx = 0
		# 对当前打出的牌可以进行操作的玩家的index, 服务端会限时等待他的操作
		# 房间基础轮询timer
		self._poll_timer = None
		# 玩家操作限时timer
		self._op_timer = None
		# 玩家操作限时timer 启动时间
		self._op_timer_timestamp = 0
		# 一局游戏结束后, 玩家准备界面等待玩家确认timer
		self._next_game_timer = None

		# 财神(多个)
		self.kingTiles = []
		# 圈风
		self.prevailing_wind = const.WIND_EAST
		# 一圈中玩家坐庄次数
		self.dealerNumList = [0] * self.player_num

		self.current_round = 0
		self.all_discard_tiles = []
		# 最后一位出牌的玩家
		self.last_player_idx = -1
		# 房间开局所有操作的记录(aid, src, des, tile)
		self.op_record = []
		# # 房间开局所有的特殊操作记录(op_id, src, des, recordIndex)
		# self.op_special_record = []
		# 房间开局操作的记录对应的记录id
		self.record_id = -1
		# 确认继续的玩家
		self.confirm_next_idx = []
		# 解散房间操作的发起者
		self.dismiss_room_from = -1
		# 解散房间操作开始的时间戳
		self.dismiss_room_ts = 0
		# 解散房间操作投票状态
		self.dismiss_room_state_list = [0] * self.player_num
		self.dismiss_timer = None
		# 房间创建时间
		self.roomOpenTime = time.time()

		self.wait_op_info_list = []

		# 放炮胡等延时操作时的标志位，例如主要在延时中出现解散房间操作时需要拒绝操作
		self.wait_force_delay_win = False

		# 牌局记录
		self.game_result = {}
		# 房间所属的茶楼桌子, 仅茶楼中存在
		self.club_table = None
		# 增加房间销毁定时器
		self.timeout_timer = self.add_timer(const.ROOM_TTL, self.timeoutDestroy)

	def _reset(self):
		self.state = const.ROOM_WAITING
		DEBUG_MSG("reset state:{}".format(self.state))
		self.agent = None
		self.players_list = [None] * self.player_num
		self.dealer_idx = 0
		self.current_idx = 0
		self._poll_timer = None
		self._op_timer = None
		self._op_timer_timestamp = 0
		self._next_game_timer = None
		self.all_discard_tiles = []
		self.kingTiles = []
		self.current_round = 0
		self.confirm_next_idx = []
		self.prevailing_wind = const.WIND_EAST
		self.dismiss_timer = None
		self.dismiss_room_ts = 0
		self.dismiss_room_state_list = [0, 0, 0, 0]
		self.wait_op_info_list = []
		KBEngine.globalData["GameWorld"].delRoom(self)
		# 茶楼座位信息变更
		if self.room_type == const.CLUB_ROOM and self.club_table:
			self.club_table.seatInfoChanged()
			self.club_table.room = None
		self.destroySelf()

	@property
	def isFull(self):
		count = sum([1 for i in self.players_list if i is not None])
		return count == self.player_num

	@property
	def isEmpty(self):
		count = sum([1 for i in self.players_list if i is not None])
		return count == 0 and self.room_type != const.AGENT_ROOM

	@property
	def nextIdx(self):
		# tryNext = (self.current_idx + 1) % self.player_num
		# for j in range(2):
		# 	for i in range(self.player_num):
		# 		if self.player_num > tryNext:
		# 			return tryNext
		# 		tryNext = (tryNext + 1) % self.player_num
		return (self.current_idx + 1) % self.player_num

	@property
	def wreathsList(self):
		return [p.wreaths for i, p in enumerate(self.players_list)]

	@property
	def windsList(self):
		return [p.wind for i, p in enumerate(self.players_list)]

	@property
	def club(self):
		try:
			if self.club_table:
				return self.club_table.club
		except:
			# 引用代理的对象可能已经被destroy, 比如解散茶楼时
			pass
		return None

	def getSit(self):
		for i, j in enumerate(self.players_list):
			if j is None:
				return i
		return None

	def sendEmotion(self, avt_mb, eid):
		""" 发表情 """
		# DEBUG_MSG("Room.Player[%s] sendEmotion: %s" % (self.roomID, eid))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb == p.mb:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and i != idx:
				p.mb.recvEmotion(idx, eid)

	def sendMsg(self, avt_mb, mid, msg):
		""" 发消息 """
		# DEBUG_MSG("Room.Player[%s] sendMsg: %s" % (self.roomID, mid))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb == p.mb:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and i != idx:
				p.mb.recvMsg(idx, mid, msg)

	def sendExpression(self, avt_mb, fromIdx, toIdx, eid):
		""" 发魔法表情 """
		# DEBUG_MSG("Room.Player[%s] sendEmotion: %s" % (self.roomID, eid))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb == p.mb:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and i != idx:
				p.mb.recvExpression(fromIdx, toIdx, eid)

	def sendVoice(self, avt_mb, url):
		# DEBUG_MSG("Room.Player[%s] sendVoice" % (self.roomID))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb.userId == p.userId:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and p.mb:
				p.mb.recvVoice(idx, url)

	def sendAppVoice(self, avt_mb, url, time):
		# DEBUG_MSG("Room.Player[%s] sendVoice" % (self.roomID))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb.userId == p.userId:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and p.mb and i != idx:
				p.mb.recvAppVoice(idx, url, time)

	def apply_dismiss_room(self, avt_mb):
		""" 游戏开始后玩家申请解散房间 """
		if self.dismiss_timer is not None:
			self.vote_dismiss_room(avt_mb, 1)
			return
		self.dismiss_room_ts = time.time()
		src = None
		for i, p in enumerate(self.players_list):
			if p.userId == avt_mb.userId:
				src = p
				break

		# 申请解散房间的人默认同意
		self.dismiss_room_from = src.idx
		self.dismiss_room_state_list[src.idx] = 1

		def dismiss_callback():
			self.saveRoomResult()
			self.give_up_record_game()
			# self.dropRoom()
			self.do_drop_room()

		self.dismiss_timer = self.add_timer(const.DISMISS_ROOM_WAIT_TIME, dismiss_callback)

		for p in self.players_list:
			if p and p.mb and p.userId != avt_mb.userId:
				p.mb.req_dismiss_room(src.idx)

	def vote_dismiss_room(self, avt_mb, vote):
		""" 某位玩家对申请解散房间的投票 """
		if self.wait_force_delay_win:
			return
		src = None
		for p in self.players_list:
			if p and p.userId == avt_mb.userId:
				src = p
				break

		self.dismiss_room_state_list[src.idx] = vote
		for p in self.players_list:
			if p and p.mb:
				p.mb.vote_dismiss_result(src.idx, vote)

		yes = self.dismiss_room_state_list.count(1)
		no = self.dismiss_room_state_list.count(2)
		if yes >= 3:
			if self.dismiss_timer:
				self.cancel_timer(self.dismiss_timer)
				self.dismiss_timer = None
			self.dismiss_timer = None

			self.saveRoomResult()
			self.give_up_record_game()
			# self.dropRoom()
			self.do_drop_room()

		if no >= 2:
			if self.dismiss_timer:
				self.cancel_timer(self.dismiss_timer)
				self.dismiss_timer = None
			self.dismiss_timer = None
			self.dismiss_room_from = -1
			self.dismiss_room_ts = 0
			self.dismiss_room_state_list = [0, 0, 0, 0]

	def notify_player_online_status(self, userId, status):
		src = -1
		for idx, p in enumerate(self.players_list):
			if p and p.userId == userId:
				p.online = status
				src = idx
				break

		if src == -1:
			return

		for idx, p in enumerate(self.players_list):
			if p and p.mb and p.userId != userId:
				p.mb.notifyPlayerOnlineStatus(src, status)

	def reqEnterRoom(self, avt_mb, first=False):
		"""
		defined.
		客户端调用该接口请求进入房间/桌子
		"""
		if self.isFull:
			avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_FULL)
			return
		if self.room_type == const.CLUB_ROOM:
			if self.club and not self.club.isMember(avt_mb.userId):
				avt_mb.enterRoomFailed(const.ENTER_FAILED_NOT_CLUB_MEMBER)
				return

		def _check_user_info(content):
			if content is None:
				DEBUG_MSG("room:{0},curround:{1} userId:{2} enterRoomFailed callback error: content is None".format(self.roomID, self.current_round, avt_mb.userId))
				if not first:
					avt_mb.enterRoomFailed(const.CREATE_FAILED_NET_SERVER_ERROR)
				return False
			try:
				data = json.loads(content)
				card_cost, diamond_cost = switch.calc_cost(self.game_round, self.pay_mode)
				if card_cost > data["card"]:
					avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_DIAMOND_NOT_ENOUGH)
					return False
			except:
				err, msg, stack = sys.exc_info()
				DEBUG_MSG("room:{0},curround:{1} _check_user_info callback error:{2} , exc_info: {3} ,{4}".format(self.roomID, self.current_round, content, err, msg))
				avt_mb.enterRoomFailed(const.CREATE_FAILED_OTHER)
				return False
			return True

		def callback():
			if self.isDestroyed:
				avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_DESTROYED)
				return
			# AA支付的情况下, 可能多个玩家同时走到这里
			if self.isFull:
				avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_FULL)
				return
			for i, p in enumerate(self.players_list):
				if p and p.mb and p.mb.userId == avt_mb.userId:
					p.mb = avt_mb
					avt_mb.enterRoomSucceed(self, i)
					return

			DEBUG_MSG("room:{0},curround:{1} userId:{2} reqEnterRoom".format(self.roomID, self.current_round, avt_mb.userId))
			idx = self.getSit()
			# if idx is None:
			# 	avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_FULL)
			# 	return
			n_player = PlayerProxy(avt_mb, self, idx)
			self.players_dict[avt_mb.userId] = n_player
			self.players_list[idx] = n_player

			# 茶楼座位信息变更
			if self.club_table:
				self.club_table.seatInfoChanged()

			# 确认准备,不需要手动准备
			if self.hand_prepare == const.AUTO_PREPARE:
				self.prepare(avt_mb)

			if not first:
				self.broadcastEnterRoom(idx)
			else:
				avt_mb.createRoomSucceed(self)
			self.ready_after_prepare()

		if switch.DEBUG_BASE:
			callback()
		else:
			if first or self.pay_mode != const.AA_PAY_MODE:
				callback()
			else:
				def _user_info_callback(content):
					if _check_user_info(content):
						callback()

				utility.get_user_info(avt_mb.accountName, _user_info_callback)

	def client_prepare(self, avt_mb):
		DEBUG_MSG("room:{0},curround:{1} client_prepare userId:{2}".format(self.roomID, self.current_round, avt_mb.userId))
		self.prepare(avt_mb)
		self.ready_after_prepare()

	def prepare(self, avt_mb):
		""" 第一局/一局结束后 玩家准备 """
		if self.state == const.ROOM_PLAYING or self.state == const.ROOM_TRANSITION:
			return

		idx = -1
		for i, p in enumerate(self.players_list):
			if p and p.userId == avt_mb.userId:
				idx = i
				break

		if idx not in self.confirm_next_idx:
			self.confirm_next_idx.append(idx)
			for p in self.players_list:
				if p and p.idx != idx:
					p.mb.readyForNextRound(idx)

	def ready_after_prepare(self):
		if len(self.confirm_next_idx) == self.player_num and self.isFull and self.state == const.ROOM_WAITING:
			self.origin_players_list = self.players_list[:]
			self.pay2StartGame()

	def reqReconnect(self, avt_mb):
		DEBUG_MSG("room:{0},curround:{1} avt_mb reqReconnect userid:{2}".format(self.roomID, self.current_round, avt_mb.userId))
		if avt_mb.userId not in self.players_dict.keys():
			return

		DEBUG_MSG("room:{0},curround:{1} avt_mb reqReconnect player:{2} is in room".format(self.roomID, self.current_round, avt_mb.userId))
		# 如果进来房间后牌局已经开始, 就要传所有信息
		# 如果还没开始, 跟加入房间没有区别
		player = self.players_dict[avt_mb.userId]
		player.mb = avt_mb
		player.online = 1
		if self.state == const.ROOM_PLAYING or 0 < self.current_round <= self.game_round:
			if self.state == const.ROOM_WAITING:
				# 重连回来直接准备
				self.client_prepare(avt_mb)
			rec_room_info = self.get_reconnect_room_dict(player.mb.userId)
			player.mb.handle_reconnect(rec_room_info)
		else:
			sit = 0
			for idx, p in enumerate(self.players_list):
				if p and p.mb:
					if p.mb.userId == avt_mb.userId:
						sit = idx
						break
			avt_mb.enterRoomSucceed(self, sit)

	def reqLeaveRoom(self, player):
		"""
		defined.
		客户端调用该接口请求离开房间/桌子
		"""
		DEBUG_MSG("room:{0},curround:{1} reqLeaveRoom userId:{2}, room_type:{3}, state:{4}".format(self.roomID, self.current_round, player.userId, self.room_type, self.state))
		if self.state != const.ROOM_WAITING:
			DEBUG_MSG("room:{0},curround:{1} reqLeaveRoom: not allow ".format(self.roomID, self.current_round))
			# player.quitRoomFailed(-1)
			return
		if player.userId in self.players_dict.keys():
			n_player = self.players_dict[player.userId]
			idx = n_player.idx

			if idx == 0 and self.room_type == const.NORMAL_ROOM:
				# 房主离开房间, 则解散房间
				self.give_up_record_game()
				# self.dropRoom()
				self.do_drop_room()
			else:
				n_player.mb.quitRoomSucceed()
				self.players_list[idx] = None
				del self.players_dict[player.userId]
				if idx in self.confirm_next_idx:
					self.confirm_next_idx.remove(idx)
				# 通知其它玩家该玩家退出房间
				for i, p in enumerate(self.players_list):
					if i != idx and p and p.mb:
						p.mb.othersQuitRoom(idx)

		# 茶楼座位信息变更
		if self.room_type == const.CLUB_ROOM and self.club_table:
			self.club_table.seatInfoChanged()

		if self.isEmpty:
			self.give_up_record_game()
			# self.dropRoom()
			self.do_drop_room()

	def dropRoom(self):
		self.dismiss_timer = None
		for p in self.players_list:
			if p and p.mb:
				try:
					p.mb.quitRoomSucceed()
				except:
					pass

		if self.room_type == const.AGENT_ROOM and self.agent:
			# 将房间从代理房间中删除
			if not self.agent.isDestroyed:
				self.agent.agentRoomDropped(self.roomID)

			try:
				# 如果是代开房, 没打完一局返还房卡
				if switch.DEBUG_BASE == 0 and self.current_round < 1 and self.agent and self.pay_mode == const.AGENT_PAY_MODE:
					card_cost, diamond_cost = switch.calc_cost(self.game_round, self.pay_mode)

					def callback(room_id, user_id, content):
						try:
							content = content.decode()
							if content[0] != '{':
								DEBUG_MSG(content)
								return
						except:
							DEBUG_MSG("dropRoom{} AgentRoom return Failed, userID = {}. return {} back".format(room_id, user_id, (card_cost, diamond_cost)))

					utility.update_card_diamond(self.agent.accountName, card_cost, diamond_cost,
												Functor(callback, self.roomID, self.agent.userId), "GuiXi drop AgentRoomID:{}".format(self.roomID))  # reason 必须为英文
			except:
				pass

		self._reset()

	def do_drop_room(self):
		if self.game_result:
			if len(self.game_result['round_result']) == 0:
				self.dropRoom()
			else:
				self.subtotal_result()
		else:
			self.dropRoom()

	def broadcastOperation2(self, idx, aid, tile_list=None):
		""" 将操作广播除了自己之外的其他人 """
		for i, p in enumerate(self.players_list):
			if p and i != idx:
				p.mb.postOperation(idx, aid, tile_list)

	def broadcastMultiOperation(self, idx_list, aid_list, tile_list=None):
		for i, p in enumerate(self.players_list):
			if p is not None:
				p.mb.postMultiOperation(idx_list, aid_list, tile_list)

	def broadcastRoundEnd(self, info):
		# 广播胡牌或者流局导致的每轮结束信息, 包括算的扎码和当前轮的统计数据

		# 先记录玩家当局战绩, 会累计总得分
		self.record_round_result()

		self.state = const.ROOM_WAITING
		DEBUG_MSG("room:{0},curround:{1} broadcastRoundEnd state:{2}".format(self.roomID, self.current_round, self.state))
		info['left_tiles'] = self.tiles
		info['player_info_list'] = [p.get_round_client_dict() for p in self.players_list if p is not None]

		DEBUG_MSG("room:{0},curround:{1}=={2}".format(self.roomID, self.current_round, "&" * 30))
		DEBUG_MSG("room:{0},curround:{1} RoundEnd info:{2}".format(self.roomID, self.current_round, info))

		self.confirm_next_idx = []
		for p in self.players_list:
			if p:
				p.mb.roundResult(info)

		self.end_record_game(info)

	def pay2StartGame(self):
		""" 开始游戏 """
		if self.timeout_timer:
			self.cancel_timer(self.timeout_timer)
			self.timeout_timer = None

		self.state = const.ROOM_TRANSITION

		# 在第2局开始扣房卡
		if self.current_round == 1:
			if switch.DEBUG_BASE:
				self.paySuccessCbk()
				return
			card_cost, diamond_cost = switch.calc_cost(self.game_round, self.pay_mode)
			if self.pay_mode == const.NORMAL_PAY_MODE:
				pay_account = self.origin_players_list[0].mb.accountName
				reason = "GuiXi RoomID:{}".format(self.roomID)

				def pay_callback(content):
					if self._check_pay_callback(content):
						self.paySuccessCbk()

				utility.update_card_diamond(pay_account, -card_cost, -diamond_cost, pay_callback, reason)
			elif self.pay_mode == const.AGENT_PAY_MODE:
				# 开房的时候已经扣了房卡
				self.paySuccessCbk()
			elif self.pay_mode == const.CLUB_PAY_MODE:
				pay_account = self.club.owner['accountName']
				reason = "GuiXi Club:{} RoomID:{}".format(self.club.clubId, self.roomID)

				def pay_callback(content):
					if self._check_pay_callback(content):
						self.paySuccessCbk()

				utility.update_card_diamond(pay_account, -card_cost, -diamond_cost, pay_callback, reason)
			elif self.pay_mode == const.AA_PAY_MODE:
				pay_accounts = [p.mb.accountName for p in self.players_list]
				if self.club:
					reason = "GuiXi Club:{} AA RoomID:{}".format(self.club.clubId, self.roomID)
				else:
					reason = "GuiXi AA RoomID:{}".format(self.roomID)

				def pay_callback(content):
					if self._check_aa_pay_callback(content):
						self.paySuccessCbk()

				utility.update_card_diamond_aa(pay_accounts, -card_cost, -diamond_cost, pay_callback, reason)
			else:
				ERROR_MSG("pay2StartGame Error: No this PayMode:{}".format(self.pay_mode))
				return
		else:
			self.paySuccessCbk()

	def _check_pay_callback(self, content):
		if content is None or content[0] != '{':
			DEBUG_MSG('room:{},curround:{} pay callback {}'.format(self.roomID, self.current_round, content))
			self.give_up_record_game()
			# self.dropRoom()
			self.do_drop_room()
			return False
		return True

	def _check_aa_pay_callback(self, content):
		res = True
		try:
			ret = json.loads(content)
			if ret['errcode'] != 0:
				res = False
				DEBUG_MSG('room:{},cur_round:{} aa pay callback error code={}, msg={}'.format(self.roomID, self.current_round, ret['errcode'], ret['errmsg']))
		except:
			res = False
			import traceback
			ERROR_MSG(traceback.format_exc())

		if not res:
			self.give_up_record_game()
			self.do_drop_room()
			return False
		return True

	# 扣房卡/钻石成功后开始游戏(不改动部分)
	def paySuccessCbk(self):
		DEBUG_MSG("room:{},curround:{} paySuccessCbk state:{}".format(self.roomID, self.current_round, self.state))
		try:
			# 第一局时房间默认房主庄家, 之后谁上盘赢了谁是, 如果臭庄, 上一把玩家继续坐庄
			# swap_list = [p.idx for p in self.players_list]
			if self.current_round == 0:
				self.origin_players_list = self.players_list[:]
				self.dealer_idx = 0
			# self.swapSeat(swap_list)

			self.op_record = []
			# self.op_special_record = []
			self.state = const.ROOM_PLAYING
			self.current_round += 1
			self.all_discard_tiles = []
			for p in self.players_list:
				p.reset()

			self.current_idx = self.dealer_idx

			def begin(prefabKingTiles=None, prefabHandTiles=None, prefabTopList=None):
				self.setPrevailingWind()  # 圈风
				self.setPlayerWind()  # 位风
				self.initTiles()  # 牌堆
				self.deal(prefabHandTiles, prefabTopList)  # 发牌
				self.kongWreath()  # 杠花
				self.addWreath()  # 补花
				self.rollKingTile()  # 财神
				beginTilesList = [copy.deepcopy(p.tiles) for i, p in enumerate(self.players_list)]
				self.tidy()  # 整理
				self.beginRound(True)  # 第一张牌优先抓，后开始游戏
				beginTilesList[self.current_idx].append(self.players_list[self.current_idx].last_draw)
				self.startGame(beginTilesList)

			if switch.DEBUG_BASE == 0:
				begin([], [[] for i in range(self.player_num)], [])
			elif switch.DEBUG_BASE == 1:  # 开发模式 除去不必要的通信时间 更接近 真实环境
				prefabKingTiles = []
				prefabHandTiles = [
					# [75,75,75,75,1,1,1,31,32,33,51,51,53],
					[75,75,75,75,1,5,9,31,35,39,51,55,59],
					[],
					[],
					[]
				]
				prefabTopList = [59,55,2,3,55]
				begin(prefabKingTiles, prefabHandTiles, prefabTopList)
			else:
				def callback(content):
					DEBUG_MSG("room:{},curround:{} debugmode,content:{}".format(self.roomID, self.current_round, content))
					if content is None or content == "10000" or content[0:2] != "ok":  # 10000代表找不到该文件
						begin()
					else:
						try:
							content = content[2:]
							data = json.loads(content)
							DEBUG_MSG("room:{},curround:{} data:{}".format(self.roomID, self.current_round, data))
							kingTiles = []
							handTiles = [[] for i in range(self.player_num)]
							topList = []
							# 检查数据
							for t in data["kingTiles"]:
								if t not in kingTiles and utility.validTile(t):
									kingTiles.append(t)

							for k, v in enumerate(data["handTiles"]):
								if k < self.player_num:
									for t in v:
										if utility.validTile(t):
											handTiles[k].append(t)

							for t in data["topList"]:
								if utility.validTile(t):
									topList.append(t)
							begin(kingTiles, handTiles, topList)
						except:
							err, msg, stack = sys.exc_info()
							DEBUG_MSG("room:{},curround:{} try begin error; exc_info: {} ,{}".format(self.roomID, self.current_round, err, msg))

				utility.getDebugPrefab(self.origin_players_list[0].mb.accountName, callback)
		except:
			err, msg, stack = sys.exc_info()
			DEBUG_MSG("room:{},curround:{} paySuccessCbk error; exc_info: {} ,{}".format(self.roomID, self.current_round, err, msg))
			DEBUG_MSG("room:{},curround:{} consume failed! users: {}".format(self.roomID, self.current_round, [p.userId for p in self.origin_players_list if p]))

	# 玩家开始游戏
	def startGame(self, beginTilesList):
		self.wait_force_delay_win = False
		DEBUG_MSG("start game,roomId:{0},{1}/{2}".format(self.roomId, self.current_round, self.game_round))
		diceList = self.throwTheDice([self.dealer_idx])
		idx, num = self.getMaxDiceIdx(diceList)
		DEBUG_MSG("room:{},curround:{} start game info:{},{},{},{},{},{}".format(self.roomID, self.current_round, self.dealer_idx, self.wreathsList, self.kingTiles, self.prevailing_wind, self.windsList, diceList))
		for i, p in enumerate(self.players_list):
			if p and p.mb:
				DEBUG_MSG("room:{},curround:{} start tiles:{}".format(self.roomID, self.current_round, p.tiles))
		for i, p in enumerate(self.players_list):
			if p and p.mb:
				DEBUG_MSG("room:{},curround:{} start begin tiles:{}".format(self.roomID, self.current_round, beginTilesList[i]))
				p.mb.startGame(self.dealer_idx, beginTilesList[i], self.wreathsList, self.kingTiles, self.prevailing_wind, self.windsList, diceList)
		self.begin_record_game(diceList)

	def cutAfterKong(self):
		if not self.can_cut_after_kong():
			return
		if len(self.tiles) <= 0:
			self.drawEnd()
		else:
			player = self.players_list[self.current_idx]
			ti = self.tiles[0]
			self.tiles = self.tiles[1:]
			player.cutTile(ti)

	def beginRound(self, is_first=False):
		if len(self.tiles) <= 0:
			self.drawEnd()
			return
		ti = self.tiles[0]
		self.tiles = self.tiles[1:]
		DEBUG_MSG("beginRound tile:{0} leftNum:{1}".format(ti, len(self.tiles)))
		p = self.players_list[self.current_idx]
		p.drawTile(ti, is_first)

	def cal_score(self, idx, aid, lucky_num = 0):
		if aid == const.OP_CONTINUE_KONG:
			for i, p in enumerate(self.players_list):
				if i == idx:
					p.score += 3
				else:
					p.score -= 1
		elif aid == const.OP_CONCEALED_KONG:
			for i, p in enumerate(self.players_list):
				if i == idx:
					p.score += 6
				else:
					p.score -= 2
		elif aid == const.OP_POST_KONG:
			p = self.players_list[idx]
			p.score -= 3
		elif aid == const.OP_GET_KONG:
			p = self.players_list[idx]
			p.score += 3
		elif aid == const.OP_DRAW_WIN:
			for i, p in enumerate(self.players_list):
				#一码全中的计分规则是牌面是几，就计几分
				if i == idx:
					if self.lucky_num == 1:
						p.score += (lucky_num + 2) * 3
						DEBUG_MSG("winner OP_WIN add score_1:{}".format((lucky_num + 2) * 3))
					else:
						p.score += 2 * (lucky_num + 1) * 3
						DEBUG_MSG("winner OP_WIN add score_2:{}".format(2 * (lucky_num + 1) * 3))
				else:
					if self.lucky_num == 1:
						p.score -= (lucky_num + 2)
						DEBUG_MSG("failure OP_WIN add score_1:{}".format((lucky_num + 2)))
					else:
						p.score -= 2 * (lucky_num + 1)
						DEBUG_MSG("failure OP_WIN add score_2:{}".format(2 * (lucky_num + 1)))
		elif aid == const.OP_KONG_WIN:
			last_aid, src, des, tile = self.op_record[-1]
			des_p = self.players_list[des]
			p = self.players_list[idx]
			if self.lucky_num == 1:
				p.score += (lucky_num + 2) * 3
				des_p.score -= (lucky_num + 2) * 3
				DEBUG_MSG("winner OP_KONG_WIN add score_1:{}".format((lucky_num + 2) * 3))
				DEBUG_MSG("failure OP_KONG_WIN add score_1:{}".format((lucky_num + 2) * 3))
			else:
				p.score += 2 * (lucky_num + 1) * 3
				des_p.score -= 2 * (lucky_num + 1) * 3
				DEBUG_MSG("winner OP_KONG_WIN add score_2:{}".format(2 * (lucky_num + 1) * 3))
				DEBUG_MSG("failure OP_KONG_WIN add score_2:{}".format(2 * (lucky_num + 1) * 3))


	def drawEnd(self):
		DEBUG_MSG("room:{0},curround:{1} drawEnd.".format(self.roomID, self.current_round))
		""" 臭庄 """

		self.settlement()
		info = dict()
		info['win_op'] = -1
		info['win_idx'] = []
		info['lucky_tiles'] = []
		info['result_list'] = []
		info['finalTile'] = 0
		info['from_idx'] = -1
		info['dealer_idx'] = self.dealer_idx
		DEBUG_MSG("room:{0},curround:{1} drawEnd INFO:{2}".format(self.roomID, self.current_round, info))
		if self.current_round < self.game_round:
			self.broadcastRoundEnd(info)
		else:
			self.endAll(info)

	def winGame(self, idx, op, finalTile, from_idx, quantity, result):
		""" 座位号为idx的玩家胡牌 """
		lucky_tiles, hit = self.cal_lucky_tile(self.players_list[idx].tiles, self.lucky_num)
		self.cal_score(idx, op, hit)

		self.settlement()
		info = dict()
		info['win_op'] = op
		info['win_idx'] = [idx]
		info['lucky_tiles'] = lucky_tiles
		info['result_list'] = result
		info['finalTile'] = finalTile
		info['from_idx'] = from_idx
		info['dealer_idx'] = self.dealer_idx
		self.dealer_idx = idx
		if self.current_round < self.game_round:
			self.broadcastRoundEnd(info)
		else:
			self.endAll(info)

	def begin_record_game(self, diceList):
		DEBUG_MSG("room:{0},curround:{1} begin record game".format(self.roomID, self.current_round))
		self.begin_record_room()
		KBEngine.globalData['GameWorld'].begin_record_room(self, self.roomID, self, diceList)

	def begin_record_callback(self, record_id):
		self.record_id = record_id

	def end_record_game(self, result_info):
		DEBUG_MSG("room:{0},curround:{1} end record game".format(self.roomID, self.current_round))
		KBEngine.globalData['GameWorld'].end_record_room(self.roomID, self, result_info)
		self.record_id = -1

	def give_up_record_game(self):
		DEBUG_MSG("room:{0},curround:{1} give up record game".format(self.roomID, self.current_round))
		KBEngine.globalData['GameWorld'].give_up_record_room(self.roomID)

	def settlement(self):
		for i, p in enumerate(self.players_list):
			if p is not None:
				p.settlement()

	def endAll(self, info):
		""" 游戏局数结束, 给所有玩家显示最终分数记录 """

		# 先记录玩家当局战绩, 会累计总得分
		self.record_round_result()

		info['left_tiles'] = self.tiles
		info['player_info_list'] = [p.get_round_client_dict() for p in self.players_list if p is not None]
		player_info_list = [p.get_final_client_dict() for p in self.players_list if p is not None]
		DEBUG_MSG("room:{0},curround:{1} endAll player_info_list = {2}  info = {3}".format(self.roomID, self.current_round, player_info_list, info))

		for p in self.players_list:
			if p and p.mb:
				p.mb.finalResult(player_info_list, info)
				# 有效圈数加一
				p.mb.addGameCount()

		self.end_record_game(info)
		self.saveRoomResult()
		self._reset()

	def subtotal_result(self):
		self.dismiss_timer = None
		player_info_list = [p.get_final_client_dict() for p in self.players_list if p is not None]
		DEBUG_MSG("room:{0},curround:{1} subtotal_result,player_info_list:{2}".format(self.roomID, self.current_round, player_info_list))

		for p in self.players_list:
			if p and p.mb:
				try:
					p.mb.subtotalResult(player_info_list)
				except:
					pass
		self._reset()

	def doOperation(self, avt_mb, aid, tile_list):
		idx = -1
		for i, p in enumerate(self.players_list):
			if p and p.mb == avt_mb:
				idx = i
		tile = tile_list[0]
		DEBUG_MSG("room:{0},curround:{1} idx:{2} doOperation current_idx:{3} aid:{4} tile_list:{5}".format(self.roomID, self.current_round, idx, self.current_idx, aid, tile_list))
		"""
		当前控牌玩家摸牌后向服务端确认的操作
		"""
		if self.dismiss_room_ts != 0 and int(time.time() - self.dismiss_room_ts) < const.DISMISS_ROOM_WAIT_TIME:
			# 说明在准备解散投票中,不能进行其他操作
			DEBUG_MSG("room:{0},curround:{1} idx:{2} doOperationFailed dismiss_room_ts:{3}".format(self.roomID, self.current_round, idx, self.dismiss_room_ts))
			avt_mb.doOperationFailed(const.OP_ERROR_VOTE)
			return
		if self.state != const.ROOM_PLAYING:
			DEBUG_MSG("room:{0},curround:{1} idx:{2} doOperationFailed state:{3}".format(self.roomID, self.current_round, idx, self.state))
			avt_mb.doOperationFailed(const.OP_ERROR_STATE)
			return

		# DEBUG_MSG("doOperation idx:{0},self.current_idx:{1},self.wait_op_info_list:{2}".format(idx, self.current_idx, self.wait_op_info_list))
		if idx != self.current_idx:
			avt_mb.doOperationFailed(const.OP_ERROR_NOT_CURRENT)
			return
		p = self.players_list[idx]
		if aid == const.OP_DISCARD and self.can_discard(p.tiles, tile):
			self.all_discard_tiles.append(tile)
			p.discardTile(tile)
		elif aid == const.OP_CONCEALED_KONG and self.can_concealed_kong(p.tiles, tile):
			p.concealedKong(tile)
		elif aid == const.OP_KONG_WREATH and self.can_kong_wreath(p.tiles, tile):
			p.kongWreath(tile)
		elif aid == const.OP_CONTINUE_KONG and self.can_continue_kong(p, tile):
			DEBUG_MSG("feng xian gang")
			p.continueKong(tile)
		elif aid == const.OP_PASS:
			# 自己摸牌的时候可以杠或者胡时选择过, 则什么都不做. 继续轮到该玩家打牌.
			pass
		elif aid == const.OP_DRAW_WIN:  # 普通自摸胡
			is_win, score, result = self.can_win(list(p.tiles), p.last_draw, const.OP_DRAW_WIN, idx)
			DEBUG_MSG("room:{0},curround:{1} idx:{2} do OP_DRAW_WIN==>{3}, {4}, {5}".format(self.roomID, self.current_round, idx, is_win, score, result))
			if is_win:
				p.draw_win(tile, score, result)
			else:
				avt_mb.doOperationFailed(const.OP_ERROR_ILLEGAL)
				self.current_idx = self.nextIdx
				self.beginRound()
		elif aid == const.OP_WREATH_WIN:  # 自摸8张花胡
			is_win, score, result = self.can_win(list(p.tiles), p.last_draw, const.OP_WREATH_WIN, idx)
			DEBUG_MSG("room:{0},curround:{1} idx:{2} do OP_WREATH_WIN==>{3}, {4}, {5}".format(self.roomID, self.current_round, idx, is_win, score, result))
			if is_win:
				p.draw_win(tile, score, result)
			else:
				avt_mb.doOperationFailed(const.OP_ERROR_ILLEGAL)
				self.current_idx = self.nextIdx
				self.beginRound()
		else:
			avt_mb.doOperationFailed(const.OP_ERROR_ILLEGAL)
			self.current_idx = self.nextIdx
			self.beginRound()

	def broadcastOperation(self, idx, aid, tile_list=None):
		"""
		将操作广播给所有人, 包括当前操作的玩家
		:param idx: 当前操作玩家的座位号
		:param aid: 操作id
		:param tile_list: 出牌的list
		"""
		for i, p in enumerate(self.players_list):
			if p is not None:
				p.mb.postOperation(idx, aid, tile_list)

	def broadcastWinOperation(self, idx, aid, result):
		"""
		将操作广播给所有人, 包括当前操作的玩家
		:param idx: 胡牌玩家座位号
		:param aid: 操作id
		:param result: 胡牌结果
		"""
		for i, p in enumerate(self.players_list):
			if p is not None:
				p.mb.postWinOperation(idx, aid, result)

	def broadcastMultiOperation(self, idx_list, aid_list, tile_list=None):
		for i, p in enumerate(self.players_list):
			if p is not None:
				p.mb.postMultiOperation(idx_list, aid_list, tile_list)

	def confirmOperation(self, avt_mb, aid, tile_list):
		idx = -1
		for i, p in enumerate(self.players_list):
			if p and p.mb == avt_mb:
				idx = i
		DEBUG_MSG("room:{0},curround:{1} idx:{2} confirmOperation aid:{3} tile_list:{4}".format(self.roomID, self.current_round, idx, aid, tile_list))
		wait_idx_list = []
		for op_dict in self.wait_op_info_list:
			if op_dict["idx"] not in wait_idx_list and op_dict["state"] == const.OP_STATE_WAIT:
				wait_idx_list.append(op_dict["idx"])
		self.selfConfirmOperation(avt_mb, aid, tile_list, True)

	def selfConfirmOperation(self, avt_mb, aid, tile_list, isFromClient):
		""" 被轮询的玩家确认了某个操作 """
		if self.dismiss_room_ts != 0 and int(time.time() - self.dismiss_room_ts) < const.DISMISS_ROOM_WAIT_TIME:
			# 说明在准备解散投票中,不能进行其他操作
			return

		tile = tile_list[0]
		idx = -1
		for i, p in enumerate(self.players_list):
			if p and p.mb == avt_mb:
				idx = i
		# 玩家是否可以操作
		DEBUG_MSG("room:{0},curround:{1} idx:{2} wait_op_info_list:{3}".format(self.roomID, self.current_round, idx, self.wait_op_info_list))
		if len(self.wait_op_info_list) <= 0 or sum([1 for waitOpDict in self.wait_op_info_list if (waitOpDict["idx"] == idx and waitOpDict["state"] == const.OP_STATE_WAIT)]) <= 0:
			avt_mb.doOperationFailed(const.OP_ERROR_NOT_CURRENT)
			return
		# 提交 玩家结果
		for waitOpDict in self.wait_op_info_list:
			if waitOpDict["idx"] == idx:
				if waitOpDict["aid"] == const.OP_CHOW and aid == const.OP_CHOW and waitOpDict["tileList"][0] == tile_list[0] and self.can_chow_list(self.players_list[waitOpDict["idx"]].tiles, tile_list):
					waitOpDict["state"] = const.OP_STATE_SURE
					waitOpDict["tileList"] = tile_list
				elif waitOpDict["aid"] == aid and aid != const.OP_CHOW:
					waitOpDict["state"] = const.OP_STATE_SURE
				else:
					waitOpDict["state"] = const.OP_STATE_PASS
		# 一炮多响
		hasKongWin, overKongWin, op_list = self.getMutiplyKongWinOverInfo()
		if const.MULTIPLY_WIN:
			if hasKongWin and overKongWin and len(op_list) > 0: # 有玩家抢杠胡
				self.multiply_kong_win(op_list, tile)
				return
			elif hasKongWin and not overKongWin:
				return

		# 有玩家可以操作
		isOver, confirmOpDict = self.getConfirmOverInfo()
		if isOver:
			DEBUG_MSG("room:{0},curround:{1} commit over {2}.".format(self.roomID, self.current_round, confirmOpDict))
			temp_wait_op_info_list = copy.deepcopy(self.wait_op_info_list)
			self.wait_op_info_list = []
			if len(confirmOpDict) > 0:
				sureIdx = confirmOpDict["idx"]
				p = self.players_list[sureIdx]
				if confirmOpDict["aid"] == const.OP_CHOW:
					self.current_idx = sureIdx
					p.chow(confirmOpDict["tileList"])
				elif confirmOpDict["aid"] == const.OP_PONG:
					self.current_idx = sureIdx
					p.pong(confirmOpDict["tileList"][0])
				elif confirmOpDict["aid"] == const.OP_EXPOSED_KONG:
					self.current_idx = sureIdx
					p.exposedKong(confirmOpDict["tileList"][0])
				elif confirmOpDict["aid"] == const.OP_KONG_WIN:
					p.kong_win(confirmOpDict["tileList"][0], confirmOpDict["score"], confirmOpDict["result"])
				elif confirmOpDict["aid"] == const.OP_GIVE_WIN:
					p.give_win(confirmOpDict["tileList"][0], confirmOpDict["score"], confirmOpDict["result"])
				else:
					DEBUG_MSG("len(confirmOpDict) > 0 temp_wait_op_info_list: {0}.".format(temp_wait_op_info_list))
					lastAid = temp_wait_op_info_list[0]["aid"]
					if lastAid == const.OP_WREATH_WIN:
						self.current_idx = self.last_player_idx
					elif lastAid == const.OP_KONG_WIN:
						# *********没人抢杠胡 杠要算分？***********
						self.current_idx = self.last_player_idx
						self.cal_score(self.last_player_idx, const.OP_CONTINUE_KONG)
					else:
						self.current_idx = self.nextIdx
					self.beginRound()
			else:
				DEBUG_MSG("len(confirmOpDict) <= 0 temp_wait_op_info_list: {0}.".format(temp_wait_op_info_list))
				lastAid = temp_wait_op_info_list[0]["aid"]
				if lastAid == const.OP_WREATH_WIN:
					self.current_idx = self.last_player_idx
				elif lastAid == const.OP_KONG_WIN:
					# *********没人抢杠胡 杠要算分？***********
					self.current_idx = self.last_player_idx
					self.cal_score(self.last_player_idx, const.OP_CONTINUE_KONG)
				else:
					self.current_idx = self.nextIdx
				self.beginRound()

	def getMutiplyKongWinOverInfo(self):
		deny, wait, sure = 0, 0, 0
		win_list = []
		for i in range(len(self.wait_op_info_list)):
			op_info = self.wait_op_info_list[i]
			if op_info["aid"] == const.OP_KONG_WIN:
				if op_info["state"] == const.OP_STATE_WAIT:
					wait += 1
				elif op_info["state"] == const.OP_STATE_SURE:
					sure += 1
					win_list.append(op_info)
				else:
					deny += 1
		return deny+wait+sure>0, wait<=0, win_list

	def getConfirmOverInfo(self):
		for i in range(len(self.wait_op_info_list)):
			waitState = self.wait_op_info_list[i]["state"]
			if waitState == const.OP_STATE_PASS:
				continue
			elif waitState == const.OP_STATE_WAIT:  # 需等待其他玩家操作
				return False, {}
			elif waitState == const.OP_STATE_SURE:  # 有玩家可以操作
				return True, self.wait_op_info_list[i]
		return True, {}  # 所有玩家选择放弃

	def waitForOperation(self, idx, aid, tile, nextIdx=-1):  # aid抢杠 杠花没人可胡 nextIdx还是自己
		notifyOpList = self.getNotifyOpList(idx, aid, tile)
		if sum([len(x) for x in notifyOpList]) > 0:
			DEBUG_MSG("room:{0},curround:{1} waitForOperation from:{2},aid:{3},tile:{4}==>notifyOpList:{5}".format(self.roomID, self.current_round, idx, aid, tile, notifyOpList))
			for i, p in enumerate(self.players_list):
				if p is not None and len(notifyOpList[i]) > 0:
					waitAidList = [notifyOp["aid"] for notifyOp in notifyOpList[i]]
					p.mb.waitForOperation(waitAidList, [tile, ])
		else:
			DEBUG_MSG("nobody waitForOperation.idx:{0},aid:{1},tile:{2}".format(idx, aid, tile))
			self.current_idx = self.nextIdx if nextIdx < 0 else nextIdx
			self.beginRound()

	def get_init_client_dict(self):
		# @formatter:off
		return {
			'roomID'			: self.roomID,
			'ownerId'			: self.owner_uid,
			'roomType'			: self.room_type,
			'dealerIdx'			: self.dealer_idx,
			'curRound'			: self.current_round,
			'maxRound'			: self.game_round,
			'player_num'		: self.player_num,
			'king_num'			: self.king_num,
			'pay_mode'			: self.pay_mode,
			'lucky_num'			: self.lucky_num,
			'hand_prepare'		: self.hand_prepare,
			'club_id'			: self.club.clubId if self.club is not None else 0,
			'player_base_info_list': [p.get_init_client_dict() for p in self.players_list if p is not None],
			'player_state_list'	: [1 if i in self.confirm_next_idx else 0 for i in range(const.ROOM_PLAYER_NUMBER)],
		}
		# @formatter:on
	def get_agent_client_dict(self):
		# @formatter:off
		return {
			'roomID'		: self.roomID,
			'curRound'		: self.current_round,
			'maxRound'		: self.game_round,
			'king_num'		: self.king_num,
			'pay_mode'		: self.pay_mode,
			'player_num'	: self.player_num,
			'lucky_num'		: self.lucky_num,
			'hand_prepare'	: self.hand_prepare,
			'player_simple_info_list': [p.get_simple_client_dict() for p in self.players_list if p is not None],
		}
		# @formatter:on

	def get_agent_complete_dict(self):
		# @formatter:off
		return {
			'roomID'	: self.roomID,
			'maxRound'	: self.game_round,
			'king_num'	: self.king_num,
			'pay_mode'	: self.pay_mode,
			'player_num': self.player_num,
			'lucky_num'	: self.lucky_num,
			'time'		: utility.get_cur_timestamp(),
			'hand_prepare': self.hand_prepare,
			'player_simple_info_list': [p.get_simple_client_dict() for p in self.origin_players_list if p is not None],
		}
		# @formatter:on

	def get_club_complete_dict(self):
		return {
			'roomID'		: self.roomID,
			'time'			: utility.get_cur_timestamp(),
			'player_info_list': [p.get_club_client_dict() for p in self.origin_players_list if p is not None],
		}

	def get_reconnect_room_dict(self, userId):
		dismiss_left_time = const.DISMISS_ROOM_WAIT_TIME - (int(time.time() - self.dismiss_room_ts))
		if self.dismiss_room_ts == 0 or dismiss_left_time >= const.DISMISS_ROOM_WAIT_TIME:
			dismiss_left_time = 0

		idx = 0
		for p in self.players_list:
			if p and p.userId == userId:
				idx = p.idx

		waitAidList = []
		for i in range(len(self.wait_op_info_list)):
			if self.wait_op_info_list[i]["idx"] == idx and self.wait_op_info_list[i]["state"] == const.OP_STATE_WAIT:
				waitAidList.append(self.wait_op_info_list[i]["aid"])
		DEBUG_MSG('room:{},curround:{} reconnect_room waitAidList:{}'.format(self.roomID, self.current_round, waitAidList))
		return {
			'init_info': self.get_init_client_dict(),
			'curPlayerSitNum': self.current_idx,
			'room_state': const.ROOM_PLAYING if self.state == const.ROOM_PLAYING else const.ROOM_WAITING,
			'player_state_list': [1 if i in self.confirm_next_idx else 0 for i in range(self.player_num)],
			'lastDiscardTile': -1 if not self.all_discard_tiles else self.all_discard_tiles[-1],
			'lastDrawTile': self.players_list[idx].last_draw,
			'last_op': self.players_list[idx].last_op,
			'lastDiscardTileFrom': self.last_player_idx,
			'kingTiles': self.kingTiles,
			'waitAidList': waitAidList,
			'leftTileNum': len(self.tiles),
			'applyCloseFrom': self.dismiss_room_from,
			'applyCloseLeftTime': dismiss_left_time,
			'applyCloseStateList': self.dismiss_room_state_list,
			'player_advance_info_list': [p.get_reconnect_client_dict(userId) for p in self.players_list if p is not None],
			'prevailing_wind': self.prevailing_wind,
		}

	def broadcastEnterRoom(self, idx):
		new_p = self.players_list[idx]
		for i, p in enumerate(self.players_list):
			if p is None:
				continue
			if i == idx:
				p.mb.enterRoomSucceed(self, idx)
			else:
				p.mb.othersEnterRoom(new_p.get_init_client_dict())

	def record_round_result(self):
		# 玩家记录当局战绩
		d = datetime.fromtimestamp(time.time())
		round_result_d = {
			'date': '-'.join([str(d.year), str(d.month), str(d.day)]),
			'time': ':'.join([str(d.hour), str(d.minute)]),
			'round_record': [p.get_round_result_info() for p in self.players_list if p],
			'recordId': self.record_id
		}
		self.game_result['round_result'].append(round_result_d)

	def begin_record_room(self):
		# 在第一局的时候记录基本信息
		if self.current_round != 1:
			return
		self.game_result = {
			'maxRound': self.game_round,
			'roomID': self.roomID,
			'user_info_list': [p.get_basic_user_info() for p in self.players_list if p]
		}
		self.game_result['round_result'] = []

	def save_game_result(self):
		DEBUG_MSG('room:{},curround:{}  save_game_result len:{}'.format(self.roomID, self.current_round, len(self.game_result.get('round_result', []))))
		if len(self.game_result['round_result']) > 0:
			result_str = json.dumps(self.game_result)
			for p in self.players_list:
				p and p.save_game_result(result_str)

	def save_agent_complete_result(self):
		DEBUG_MSG('room:{},curround:{} ------ save agent complete result -----'.format(self.roomID, self.current_round))
		d = self.get_agent_complete_dict()
		result_str = json.dumps(d)
		if self.agent:
			if self.agent.isDestroyed:
				import x42
				for k, v in x42.GW.avatars.items():
					if v.userId == self.agent.userId:
						v.saveAgentRoomResult(result_str)
						break
				else:
					ERROR_MSG("room:{},curround:{} Save AgentRoom result failed!!! agent.userId = {}".format(self.roomID, self.current_round, self.agent.userId))
			else:
				self.agent.saveAgentRoomResult(result_str)

	def save_club_result(self):
		DEBUG_MSG('room:{},curround:{} ------ save club result -----'.format(self.roomID, self.current_round))
		d = self.get_club_complete_dict()
		if self.club:
			self.club.saveTableResult(d)

	def saveRoomResult(self):
		# 保存玩家的战绩记录
		self.save_game_result()
		# 保存代理开房的记录
		if self.room_type == const.AGENT_ROOM and self.agent:
			# 代理开房完成记录
			self.save_agent_complete_result()
			# 将房间从代理房间中删除
			self.agent.agentRoomDropped(self.roomID)
		# 保存茶楼的战绩
		if self.room_type == const.CLUB_ROOM:
			self.save_club_result()

	def timeoutDestroy(self):
		INFO_MSG("room:{},curround:{} timeout destroyed. room_type = {}, owner_uid = {}".format(self.roomID, self.current_round, self.room_type, self.owner_uid))
		if self.current_round < 1:
			self.do_drop_room()

	def destroySelf(self):
		self.clear_timers()
		not self.isDestroyed and self.destroy()

	def destroyByServer(self, reason=None):
		# 此接口由GameWorld关服时调用
		self.dismiss_timer = None
		for p in self.players_list:
			if p and p.mb:
				try:
					p.mb.quitRoomSucceed()
					if reason:
						p.mb.showTip(reason)
				except:
					pass

		self.destroySelf()

	def getSeatAbstractInfo(self):
		seat = 0
		for i in range(const.ROOM_PLAYER_NUMBER):
			p = self.players_list[i]
			if p:
				seat |= 2 ** i
		return seat

	def getSeatDetailInfo(self):
		detail = []
		for p in self.players_list:
			if p:
				detail.append(p.get_simple_client_dict())
		return detail
