# -*- coding: utf-8 -*-
import KBEngine
from KBEDebug import *
import const
import utility
import weakref
import x42
import switch
import json

class Table(object):

	def __init__(self, owner, club):
		self.owner = weakref.proxy(owner)
		self.club = club
		self.room = None

	def getDetailInfo(self):
		if self.roomAvailable():
			return self.room.getSeatDetailInfo()
		else:
			return []

	def getAbstractInfo(self):
		if self.roomAvailable():
			return self.room.getSeatAbstractInfo()
		else:
			return 0

	def takeASeat(self, avatar):
		# 都调用avatar进入房间的接口, 统一入口
		if self.roomAvailable():
			avatar.enterRoom(self.room.roomID)
		else:
			def check_cb(result, msg=None):
				if not result:
					msg and avatar.showTip(msg)
					return
				if self.roomAvailable():
					avatar.enterRoom(self.room.roomID)
					return 
				params = dict(self.club.roomType)
				self.room = KBEngine.createBaseLocally("GameRoom", params)
				if self.room:
					self.room.club_table = weakref.proxy(self)
					x42.GW.addRoom(self.room)
					avatar.enterRoom(self.room.roomID)
					msg and avatar.showTip(msg)
				else:
					ERROR_MSG("ClubTable takeASeat createRoom failed")

			self.cardCheck(avatar, check_cb)

	def roomAvailable(self):
		if self.room is None:
			return False

		return self.room.isDestroyed == False

	def roomDestroyed(self):
		self.room = None

	def seatInfoChanged(self):
		self.club.broadcastSeatInfo()

	def cardCheck(self, avatar, callback):
		# 调试环境直接返回成功
		if switch.DEBUG_BASE > 0:
			callable(callback) and callback(True)
			return
		club_game_round = self.club.roomType['game_round']
		club_pay_mode = self.club.roomType['pay_mode']

		if club_pay_mode == const.AA_PAY_MODE:
			account = avatar.accountName

			def user_cb(content):
				DEBUG_MSG("cardCheck user_cb content is {}".format(content))
				if content is None:
					DEBUG_MSG("cardCheck user_cb content is None")
					callable(callback) and callback(False, "网络有点问题")
					return
				try:
					data = json.loads(content)
					# AA付费 自己房卡必须大于等于房间最低消耗数量, 否则不让玩家坐下游戏

					card_cost, diamond_cost = switch.calc_cost(club_game_round, club_pay_mode)
					if data["card"] >= card_cost:
						callable(callback) and callback(True, None)
					else:
						callable(callback) and callback(False, "您的房卡不足, 无法坐下游戏")
				except:
					import traceback
					ERROR_MSG(traceback.format_exc())
					callable(callback) and callback(False, "网络有点问题")

			utility.get_user_info(account, user_cb)
		elif club_pay_mode == const.CLUB_PAY_MODE:
			account = self.club.owner['accountName']

			def user_cb(content):
				DEBUG_MSG("cardCheck user_cb content is {}".format(content))
				if content is None:
					DEBUG_MSG("cardCheck user_cb content is None")
					callable(callback) and callback(False, "网络有点问题")
					return
				try:
					data = json.loads(content)
					# 茶楼老板的房卡必须大于最低房卡数量, 否则不让玩家坐下游戏
					# param = dict(self.club.roomType)
					# d = {'game_mode': param['game_mode'], 'pay_mode': param['pay_mode'], 'game_max_lose': param['game_max_lose']}
					# card_cost, diamond_cost = switch.calc_cost(param['game_round'], param['pay_mode'])
					# DEBUG_MSG("cardCheck user_cb card_cost:{}, diamond_cost:{}".format(card_cost, diamond_cost))
					if data["card"] >= switch.CLUB_CARD_MIN:
						msg = None
						if data['card'] < switch.CLUB_CARD_WARN:
							msg = "茶楼房卡即将不足, 请及时提醒茶楼老板"
						callable(callback) and callback(True, msg)
					else:
						callable(callback) and callback(False, "茶楼老板房卡不足, 无法坐下游戏")
				except:
					import traceback
					ERROR_MSG(traceback.format_exc())
					callable(callback) and callback(False, "网络有点问题")

			utility.get_user_info(account, user_cb)
		else:
			callable(callback) and callback(False, "扣卡方式不正确")




class TableManager(object):

	def __init__(self, club):
		self.club = weakref.proxy(club)
		self.tables = {}
		self.initTable()

	def initTable(self):
		for i in range(const.CLUB_TABLE_NUM):
			self.tables[i] = Table(self, self.club)

	def takeASeat(self, avatar_mb, t_idx):
		table = self.tables.get(t_idx)
		if table is None:
			avatar_mb.showTip("桌子编号错误")
			return
		table.takeASeat(avatar_mb)

	def getTableDetailInfo(self, t_idx):
		table = self.tables.get(t_idx)
		if table is None:
			return []
		return table.getDetailInfo()

	def getTable(self, t_idx):
		return self.tables.get(t_idx)

	def getTableListInfo(self):
		d_list = []
		for i in range(const.CLUB_TABLE_NUM):
			d_list.append(self.tables[i].getAbstractInfo())

		return d_list
