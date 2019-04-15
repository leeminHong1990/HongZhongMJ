# -*- coding: utf-8 -*-
import KBEngine
import random
import time
import math
import const
import switch
import h1global
from KBEDebug import *
from BaseEntity import BaseEntity

INTERVAL_TIME = 60 * 60

class iBase(BaseEntity):
	"""
	服务端游戏对象的基础接口类
	"""
	def __init__(self):
		BaseEntity.__init__(self)
		self.taskTimer = None
		self.setTimerByHour()

	def setTimerByHour(self):
		offset = 0
		ctime = time.time()
		ctime_s = list(time.localtime())
		if ctime_s[4] != 0 or ctime_s[5] != 0:
			ctime_s[3] += 1
			ctime_s[4] = 0
			ctime_s[5] = 0
			atime = time.mktime(time.struct_time(ctime_s))
			offset = atime - ctime

		ran = random.random() * 60
		offset += ran
		DEBUG_MSG("iTask::setTimerByHour: offset, %f random, %f" % (offset, ran))
		if self.taskTimer is not None:
			self.cancel_timer(self.taskTimer)
			self.taskTimer = None
		self.taskTimer = self.add_timer(offset, self.refresh_task_callback)
		return

	def refresh_task_callback(self):
		self.checkDailyRefresh()
		self.taskTimer = self.add_repeat_timer(INTERVAL_TIME, INTERVAL_TIME, self.checkDailyRefresh)

	'''检测清空日常任务'''
	def checkDailyRefresh(self):
		ttime = time.time()
		tlocaltime = time.localtime()
		ctime_s = list(tlocaltime)
		server_refresh = const.SERVER_REFRESH_TIME
		if ctime_s[3] == server_refresh[0]:
			self.refreshOnResetDay(ttime, tlocaltime)
			return

	'''初始化'''
	def initBase(self):
		ttime = time.time()
		tlocaltime = time.localtime()
		if not h1global.isSameDay(ttime, self.lastResetDayTime):
			self.refreshOnResetDay(ttime, tlocaltime)

		self.client and self.client.pushAvatarInfo(self.getAvatarInfo())
		return

	def queryAllChat(self, mid, rid):
		KBEngine.globalData["GameWorld"].queryAllChat(self, mid, rid)
		return

	def publishMainChat(self, content):
		KBEngine.globalData["GameWorld"].publishMainChat(self.uuid, content)
		return

	def responseMainChat(self, mid, content):
		KBEngine.globalData["GameWorld"].responseMainChat(self.uuid, mid, content)
		return

	def addDiamondByClient(self):
		if switch.PUBLISH_VERSION != 0 or switch.DEBUG_BASE != 1:
			return
		self.addFreeDiamond(1000, const.CLIENT_OPERATION)

	def sendWorldChannelChat(self, content):
		content = content[1:]
		if switch.PUBLISH_VERSION == 0 and switch.DEBUG_BASE == 1:
			if content[0] == "$":
				if len(content) > 14 and content[1:13].lower() == "addmercenary":
					mercenaryId = int(content[14:])
					mercenaryList = []
					mercenaryList.append(mercenaryId)
					self.addMercenaryList(mercenaryList)
				if len(content) > 8 and content[1:7].lower() == "addexp":
					exp = int(content[8:])
					self.addCurTroopExp(exp)
			return 
		return