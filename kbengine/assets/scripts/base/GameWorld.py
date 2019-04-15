# -*- coding: utf-8 -*-
import KBEngine
from KBEDebug import *
import Functor
import const
import time
from datetime import datetime
from BaseEntity import BaseEntity
import h1global
from urllib.parse import unquote
from LoggerManager import LoggerManager
from interfaces.GameObject import GameObject
from worldmembers.iGameManager import iGameManager
from worldmembers.iRoomManager import iRoomManager
from worldmembers.iPay import iPay
from worldmembers.iRoomRecord import iRoomRecord
from worldmembers.iActivity import iActivity
from worldmembers.iCache import iCache
import x42
import utility
import switch

BROADCAST_NUM = 100

INTERVAL_TIME = 60 * 60

class GameWorld(BaseEntity,
				GameObject,
				iGameManager,
				iRoomManager,
				iRoomRecord,
				iActivity,
				iPay,
				iCache):
	"""
	这是一个脚本层封装的空间管理器
	KBEngine的space是一个抽象空间的概念，一个空间可以被脚本层视为游戏场景、游戏房间、甚至是一个宇宙。
	"""
	def __init__(self):
		BaseEntity.__init__(self)
		GameObject.__init__(self)
		iGameManager.__init__(self)
		iRoomManager.__init__(self)
		iRoomRecord.__init__(self)
		iActivity.__init__(self)
		iCache.__init__(self)
		
		self.dbid = self.databaseID
		self.avatars = {}

		self.logger = LoggerManager()
		self.broadcastQueue = []
		self.broadcastTimer = None
		if self.serverStartTime == 0:
			self.serverStartTime = time.time()
		self.initGameWorld()
		self.world_notice = '#'
		# 不扣房卡的开关, 金钱之源, 慎重开启
		self.free_play = False
		# 开服之后的房卡消耗累积
		self.total_cards = 0
		# 日活(Daily Active Users)统计
		self.dau = set()
		x42.GW = self
		return

	def initGameWorld(self):
		self.initActivity()
		# 初始化数据统计timer
		self.initDataStatisticTimer()
		# 初始化日活统计timer
		self.initDailyActiveUsersTimers()
		return

	def getServerStartTime(self):
		return self.serverStartTime

	'''刷新排行榜'''
	def refreshOnResetDay(self, ttime, tlocaltime):
		iMercenaryCall.refreshMercenaryCallPrice(self)
		
		self.sendRewardOnRank()
		self.lastResetDayTime = ttime
		return
			
	def loginToSpace(self, avatarEntity):
		"""
		defined method.
		某个玩家请求登陆到某个space中
		"""
		self.avatars[avatarEntity.userId] = avatarEntity
		self.dau.add(avatarEntity.userId)
	
	def logoutSpace(self, avatarID):
		"""
		defined method.
		某个玩家请求登出这个space
		"""
		if avatarID in self.avatars:
			del self.avatars[avatarID]

	def runFuncOnAllPlayers(self, num, funcs, *args):
		alist = list(self.avatars.keys())
		bn = 0
		en = BROADCAST_NUM if len(alist) > BROADCAST_NUM else len(alist)
		self.broadcastQueue.append(Functor.Functor(self.runFuncOnSubPlayers, bn, en, alist, num, funcs, *args))
		if self.broadcastTimer is not None:
			self.cancel_timer(self.broadcastTimer)
			self.broadcastTimer = None
		self.broadcastTimer = self.add_timer(0.1, self.broadcastFunc)

	def broadcastFunc(self):
		if self.broadcastTimer:
			self.cancel_timer(self.broadcastTimer)
			self.broadcastTimer = None
		if self.broadcastQueue:
			func = self.broadcastQueue.pop()
			func()
			if len(self.broadcastQueue) > 0:
				self.broadcastTimer = self.add_timer(0.1, self.broadcastFunc)
				return

	def runFuncOnSubPlayers(self, bn, en, alist, num, funcs, *args):
		def getFuncInAvatar(avatar, num, funcs):
			if avatar is None:
				ERROR_MSG("GameWorld[%i].runFuncOnAllPlayers:avatar is None" % (self.id))
				return
			curFunc = avatar
			for count in range(num):
				curFunc = getattr(curFunc, funcs[count])
				if curFunc is None:
					ERROR_MSG("GameWorld[%i].runFuncOnAllPlayers: %s, %s is None" % (self.id, str(funcs), funcs[count]))
					return None
			return curFunc

		for i in range(bn, en):
			if alist[i] not in self.avatars or alist[i] in self.bots:
				continue
			avatarMailbox = self.avatars[alist[i]]
			curFunc = getFuncInAvatar(avatarMailbox, num, funcs)
			if curFunc is not None:
				curFunc(*args)

		if en >= len(alist):
			return

		bn = en
		en = (bn + BROADCAST_NUM) if len(alist) > (bn + BROADCAST_NUM) else len(alist)
		self.broadcastQueue.append(Functor.Functor(self.runFuncOnSubPlayers, bn, en, alist, num, funcs, *args))
		return

	def genGlobalBirthData(self, accountAvatar):
		self.userCount = self.userCount + 1
		props = {
			"userId" : utility.gen_uid(self.userCount),
		}
		accountAvatar.reqCreateAvatar(props)

	def callMethodOnAllAvatar(self, method_name, *args):
		for mb in self.avatars.values():
			func = getattr(mb, method_name, None)
			if func and callable(func):
				self.broadcastQueue.append(lambda avt_mb=mb: getattr(avt_mb, method_name)(*args))

		if self.broadcastTimer:
			self.cancel_timer(self.broadcastTimer)
			self.broadcastTimer = None
		self.broadcastTimer = self.add_timer(0.1, self.broadcastFunc)


	def externalDataDispatcher(self, dataStr):
		DEBUG_MSG("externalDataDispatcher data = {}".format(dataStr))

		try:
			dataStr = unquote(dataStr)
			(dataStr, op_code) = dataStr.split("&9op=")
			op = int(op_code)
			if (op == 1):
				(dataStr, free) = dataStr.split("free=")
				free = int(free)
				self.free_play = (free == 1)
				DEBUG_MSG("set free_play = {0}".format(free))
			elif (op == 2):
				(dataStr, content) = dataStr.split("&2content=")
				(dataStr, count) = dataStr.split("1count=")
				count = int(count)
				if content != '#':
					DEBUG_MSG("call recvWorldNotice content = {0}, count = {1}".format(content, count))
					self.callMethodOnAllAvatar("recvWorldNotice", content, count)
			elif (op == 3):
				(dataStr, proxy) = dataStr.split("&3proxy=")
				(dataStr, uid) = dataStr.split("&2uid=")
				uid = int(uid)
				(dataStr, cards) = dataStr.split("1cards=")
				cards = int(cards)
				self.userPaySuccess([proxy, uid, cards])
			else:
				DEBUG_MSG("Error: externalDataDispatcher, no this op={}".format(op_code))
		except:
			DEBUG_MSG("Error: externalDataDispatcher exception {}".format(dataStr))

	def initDataStatisticTimer(self):
		# 每整5分钟的时候往后台发送实时在线数据
		ts = utility.get_cur_timestamp()
		period = 5 * 60
		left = ts % period
		if left == 0:
			self.add_timer(10, self.updateDataStatistics)
			self.add_repeat_timer(period, period, self.updateDataStatistics)
		else:
			offset = period - left
			# 如果剩余时间大于1分钟, 则开服10s先发送一次数据, 之后再在整5分钟的时候发送数据
			if offset >= 60:
				self.add_timer(10, self.updateDataStatistics)
			self.add_repeat_timer(offset, period, self.updateDataStatistics)

	def updateDataStatistics(self):
		""" 统计当前玩家数量和房间数量 """
		ts = utility.get_cur_timestamp()
		p_num = len(self.avatars)
		o_num = len([p for p in self.avatars.values() if getattr(p, "client", None) is not None])
		r_num = len(self.rooms)

		if switch.DEBUG_BASE == 0:
			def update_cb(content):
				if content:
					INFO_MSG("updateDataStatistics-{}: {}".format(ts, content))
				else:
					INFO_MSG("updateDataStatistics-{}: Nothing".format(ts))

			utility.update_data_statistics(ts, p_num, o_num, r_num, update_cb)
		else:
			# 测试服直接打印统计信息
			INFO_MSG("updateDataStatistics-{}: {}".format(ts, [p_num, o_num, r_num]))

	def initDailyActiveUsersTimers(self):
		# 每天凌晨00:05分的时候往后台发送昨日日活
		now = datetime.now()
		offset = utility.get_seconds_till_n_days_later(now, 1, hour=0, minute=5)
		self.add_repeat_timer(offset, 24 * 3600, self.updateDailyActiveUsers)

	def updateDailyActiveUsers(self):
		last_dau = len(self.dau)
		self.dau = set()
		if switch.DEBUG_BASE == 0:
			def update_cb(content):
				if content:
					INFO_MSG("updateDAU: {}".format(content))
				else:
					INFO_MSG("updateDAU: {}: Nothing")

			utility.update_dau(last_dau, update_cb)
		else:
			# 测试服直接打印统计信息
			INFO_MSG("updateDAU: {}".format(last_dau))
