# -*- coding: utf-8 -*-
import KBEngine
import time
import const
import json
from LoggerManager import LoggerManager
from KBEDebug import *
from interfaces.GameObject import GameObject
from avatarmembers.iBase import iBase
from avatarmembers.iRoomOperation import iRoomOperation
from avatarmembers.iAchievement import iAchievement
from avatarmembers.iRecordOperation import iRecordOperation
from avatarmembers.iClubOperation import iClubOperation
import utility
import switch
from Functor import Functor
import x42

class Avatar(KBEngine.Proxy,
			 GameObject,
			 iBase,
			 iRoomOperation,
			 iRecordOperation,
			 iClubOperation,
			 iAchievement):
	"""
	角色实体
	"""
	def __init__(self):
		KBEngine.Proxy.__init__(self)

		self.logger = LoggerManager()
		self.logger.set_user_info({"entity_id" : self.id, "account_id": self.accountName, 
			"avatar_uuid" : self.uuid, "avatar_name" : self.name, "avatar_user_id" : self.userId})

		GameObject.__init__(self)
		iBase.__init__(self)
		iRoomOperation.__init__(self)
		iRecordOperation.__init__(self)
		iClubOperation.__init__(self)
		iAchievement.__init__(self)
		self.accountEntity = None
		self.is_reconnect = False
		self.ip = '0.0.0.0'
		self.location = ""
		self.lat = ""
		self.lng = ""
		# if self.uuid != 0:
		# 	KBEngine.globalData["GameWorld"].addUUID2Pid(self.name, self.uuid, self.id)

	def getAvatarInfo(self):
		info = {
			"uuid" : self.uuid,
			"uid": self.userId,
			"cards": self.cards,
			"ip": self.ip,
		}
		return info

	'''初始化Avatar'''
	def initAvatar(self):
		self.extract_ip()
		iBase.initBase(self)
		iAchievement.initAchievement(self)
		iRecordOperation.initRecord(self)
		self.initFinish()

		if self.is_reconnect and self.isInRoom:
			# 如果需要断线重连, 则进行处理
			self.client and self.client.beginGame(1)
			# 预防可能出现的问题, 不要卡登录
			try:
				self.process_reconnection()
				self.room.notify_player_online_status(self.userId, 1)
			except:
				import traceback
				ERROR_MSG(traceback.format_exc())
			self.is_reconnect = False
		else:
			self.room = None
			self.client and self.client.beginGame(0)

		# 更新代理房间列表
		self.updatePlayingRoomList()
		# 更新茶楼列表
		self.updateClubList()
		# 全服公告
		world_notice = KBEngine.globalData["GameWorld"].world_notice
		if world_notice and world_notice != '#':
			self.recvWorldNotice(world_notice, 3)

	def extract_ip(self):
		""" 抽取ip """
		if getattr(self, 'client', None):
			s = str(self.client)
			s = s.split(',')
			s = s[-1]
			s = s.split(':')
			self.ip = s[1]

	'''刷新每日任务'''
	def refreshOnResetDay(self, ttime, tlocaltime):
		# iPVP.refreshPVP(self, ttime, tlocaltime)
		# iMail.refreshMail(self)
		self.lastResetDayTime = ttime
		return

	'''注销'''
	def logout(self):
		self.client and self.client.closeClient()
		self.destroySelf()
		self.logger.log("LogOutInfo", {"logout_type" : "注销"})

	def initFinish(self):
		self.client and self.client.pushGameRecordList([json.loads(r) for r in self.game_history])
		self.lastLoginTime = time.time()
		DEBUG_MSG("Avatar[%i] userId[%d] initFinish, %f" % (self.id, self.userId, self.lastLoginTime))
		return

	def updateUserInfo(self, info):
		if switch.DEBUG_BASE:
			self.isAgent = 1
			if self.userId != 0:
				return
			name = info['nickname']
			self.name = utility.filter_emoji(name) or str(self.userId)
			self.head_icon = info['head_icon']
			self.sex = info['sex']
		else:
			name = info['nickname']
			self.name = utility.filter_emoji(name) or str(self.userId)
			self.head_icon = info['head_icon']
			self.sex = info['sex']
			self.isAgent = info['isAgent']
		DEBUG_MSG("Avatar client call updateUserInfo:{}".format(info))

	def onEnterWorld(self):
		"""
		KBEngine method.
		这个entity已经进入世界了
		"""
		DEBUG_MSG("Avatar[%i] onEnterWorld. mailbox:%s" % (self.id, self.client))
		return

	def onLeaveWorld(self):
		"""
		KBEngine method.
		这个entity将要离开世界了
		"""
		DEBUG_MSG("Avatar[%i] onLeaveWorld. mailbox:%s" % (self.id, self.client))
		return

	def onEntitiesEnabled(self):
		"""
		KBEngine method.
		该entity被正式激活为可使用， 此时entity已经建立了client对应实体， 可以在此创建它的
		cell部分。
		"""
		DEBUG_MSG("Avatar[%i] userId[%d] entities enable. mailbox:%s" % (self.id, self.userId, self.client))
		KBEngine.globalData["GameWorld"].loginToSpace(self)
		self.logger.log("Login", {})

		self.initAvatar()

		
	def onGetCell(self):
		"""
		KBEngine method.
		entity的cell部分实体被创建成功
		"""
		DEBUG_MSG('Avatar::onGetCell: %s' % self.cell)

	def destroySelf(self):
		""" 准备销毁自身, 但需要根据是否在房间来做断线重连 """
		self.lastLoginTime = time.time()
		DEBUG_MSG("Avatar[%i] userId[%i] destroySelf, %f" % (self.id, self.userId, self.lastLoginTime))
		# if self.uuid != 0:
		# 	KBEngine.globalData['GameWorld'].delUUID2Pid(self.name, self.uuid, self.id)

		if self.isInRoom:
			# 如果已经在房间中并且房间游戏已经开始(或者代理开房还有在进行的), 则不销毁avatar, 等待其断线重连
			self.is_reconnect = True
			try:
				self.room.notify_player_online_status(self.userId, 0)
			except:
				import traceback
				ERROR_MSG(traceback.format_exc())
			return False

		if len(self.playingRoomList) > 0:
			# 代理开房还有在进行的, 不销毁avatar, 等待其断线重连
			self.is_reconnect = True
			return False

		# 如果帐号ENTITY存在 则也通知销毁它
		# DEBUG_MSG("Avatar{0} want to destroy account {1}".format(self.id, self.accountEntity))
		if self.accountEntity is not None:
			self.accountEntity.activeCharacter = None
			self.accountEntity.onClientDeath()
			self.accountEntity = None

		DEBUG_MSG("self.room is None, We will destroy")
		# 销毁world中的avatar
		KBEngine.globalData["GameWorld"].logoutSpace(self.userId)

		self.logger.log("LogOut", {})

		DEBUG_MSG("Avatar[%i] userId[%d] destroyBase" % (self.id, self.userId))
		self.clear_timers()
		# 销毁base
		if not self.isDestroyed:
			self.destroy()
		return True

	def destroySelfFromAccount(self):
		DEBUG_MSG("Avatar[%i] userId[%d] destroySelfFromAccount, %f" % (self.id, self.userId, self.lastLoginTime))

		if self.isInRoom:
			# 如果已经在房间中并且房间游戏已经开始, 则不销毁avatar, 等待其断线重连
			self.is_reconnect = True
			try:
				self.room.notify_player_online_status(self.userId, 0)
			except:
				import traceback
				ERROR_MSG(traceback.format_exc())
			return False

		if len(self.playingRoomList) > 0:
			# 代理开房还有在进行的, 不销毁avatar, 等待其断线重连
			self.is_reconnect = True
			return False

		if self.accountEntity is not None:
			self.accountEntity.activeCharacter = None
			self.accountEntity = None

		DEBUG_MSG("self.room is None, We will destroy")
		# 销毁world中的avatar
		KBEngine.globalData["GameWorld"].logoutSpace(self.userId)

		self.logger.log("LogOut", {})

		DEBUG_MSG("Avatar[%i].destroyBase")
		self.clear_timers()
		# 销毁base
		self.destroy()
		return True

	def onClientDeath(self):
		"""
		KBEngine method.
		entity丢失了客户端实体
		"""
		DEBUG_MSG("Avatar[%i] userId[%d] onClientDeath:" % (self.id, self.userId))
		# 防止正在请求创建cell的同时客户端断开了， 我们延时一段时间来执行销毁cell直到销毁base
		# 这段时间内客户端短连接登录则会激活entity
		# 这里有点问题, 现在直接销毁
		self.destroySelf()
		self.logger.log("LogOutInfo", {"logout_type" : "客户端丢失"})

	def onClientGetCell(self):
		"""
		KBEngine method.
		客户端已经获得了cell部分实体的相关数据
		"""
		DEBUG_MSG("Avatar[%i].onClientGetCell:%s" % (self.id, self.client))

	def onDestroyTimer(self, tid, tno):
		DEBUG_MSG("Avatar::onDestroyTimer: %i, tid:%i, arg:%i" % (self.id, tid, tno))
		self.destroySelf()

	def onDestroy(self):
		"""
		KBEngine method
		entity销毁
		"""
		DEBUG_MSG("Avatar::onDestroy: {}, userId = {}.".format(self.id, self.userId))


	def setNameByClient(self, name):
		self.name = name[1:]
		self.cell.setName(self.name)
		# add to Cache
		KBEngine.globalData['GameWorld'].updateCachedInfo(self.uuid, {'name':self.name})

	def setGenderByClient(self, gender):
		self.gender = gender
		self.cell.setGender(gender)
		# add to Cache
		KBEngine.globalData['GameWorld'].updateCachedInfo(self.uuid, {'gender':self.gender})
		return

	def getNameByClient(self, uuid):
		KBEngine.globalData['GameWorld'].sendNameToClient(self, uuid)
		return

	def insertRobotFail(self):
		KBEngine.globalData["GameWorld"].insertRobotFail(self.id)

	def setDeviceInfo(self, deviceInfoStr):
		deviceInfoList = deviceInfoStr.split('_')
		if len(deviceInfoList) == 9:
			deviceInfo = {'ip': deviceInfoList[0], 'device_model': deviceInfoList[1], 'os_name': deviceInfoList[2], 'os_ver': deviceInfoList[3], 'udid': deviceInfoList[4], \
							'app_ver': deviceInfoList[5], 'network': deviceInfoList[6], 'device_height': deviceInfoList[7], 'device_width': deviceInfoList[8]}
			self.logger.set_device_info(deviceInfo)

	def setUserId(self, userId):
		self.userId = userId

	def addCards(self, num, reason='proxy_charge'):
		if num < 0:
			return False
		self.cards += num
		record_str = 'player{0}-{1} addCards by {2}'.format(self.userId, self.name, reason)
		INFO_MSG(record_str)
		self.client and self.client.pushRoomCard(self.cards)
		return True

	def useCards(self, num, reason = 'create_room'):
		if self.cards < num:
			return False
		# 免费时间内, 不扣房卡
		if KBEngine.globalData["GameWorld"].free_play:
			return

		self.cards -= num
		KBEngine.globalData["GameWorld"].total_cards += num
		record_str = 'player{0}-{1} use {2} cards by {3}'.format(self.userId, self.name, num, reason)
		INFO_MSG(record_str)
		self.client and self.client.pushRoomCard(self.cards)
		return True

	def showTip(self, tip):
		DEBUG_MSG("call showTip: {}".format(tip))
		if getattr(self, 'client', None):
			self.client.showTip(tip)

	def recvWorldNotice(self, notice_text, num):
		""" 全服公告 """
		if notice_text and self.client:
			self.client.recvWorldNotice(notice_text, int(num))
		else:
			DEBUG_MSG("recvWorldNotice: {}".format(notice_text))

	def addGameCount(self, value=1):
		self.gameCount += value
		# 成为有效玩家, 达成红包条件
		if self.gameCount >= const.RED_ENVELOP_THRESHOLD and self.countFlag == 0:

			def callback(uid, content):
				res = True
				if content is None:
					res = False
				try:
					ret = json.loads(content)
					if ret['errcode'] != 0:
						res = False
						DEBUG_MSG('update_valid {} error code={}, msg={}'.format(uid, ret['errcode'], ret['errmsg']))
				except:
					res = False
					import traceback
					ERROR_MSG(traceback.format_exc())

				if res:
					p = x42.GW.avatars.get(uid)
					if p and not p.isDestroyed:
						p.countFlag = 1

			utility.update_valid_account(self.accountName, Functor(callback, self.userId))

	def queryUserInfo(self, uid):
		if not utility.isValidUid(uid):
			self.showTip("非法的玩家id")
			return

		def query_cb(result):
			if result:
				uinfo = {
					'userId': result['userId'],
					'sex': result['sex'],
					'head_icon': result['head_icon'],
					'name': result['name'],
				}
				self.client.gotUserInfo(uinfo)
			else:
				self.showTip("查无此人")

		x42.GW.getUserInfoByUID(uid, query_cb)
