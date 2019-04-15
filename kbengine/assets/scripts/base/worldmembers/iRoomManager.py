# -*- coding: utf-8 -*-
import KBEngine
from Functor import Functor
import const
from KBEDebug import *
import switch
from executor import Executor
import utility

MAX_ROOM_NUM = 3000


class iRoomManager(object):
	"""
	服务端游戏对象的基础接口类
	"""
	def __init__(self):
		self.rooms = {}
		self.destroyState = None
		self.destroy_ts = None
		self.executor = Executor()

	def addRoom(self, room):
		self.rooms[room.roomID] = room

	def delRoom(self, room):
		if room.roomID in self.rooms:
			del self.rooms[room.roomID]

	def enterRoom(self, roomID, user):
		if roomID in self.rooms:
			room = self.rooms[roomID]
			room.reqEnterRoom(user)
		else:
			user.enterRoomFailed(const.ENTER_FAILED_ROOM_NO_EXIST)

	def quitRoom(self, roomID, user):
		if roomID in self.rooms:
			room = self.rooms[roomID]
			room.reqLeaveRoom(user)

			if room.isEmpty:
				self.delRoom(room)
				room.destroySelf()

	def swapTileToTop(self, roomID, tile):
		if roomID in self.rooms:
			room = self.rooms[roomID]
			room.swapTileToTop(tile)

	def getRoom(self, roomID):
		return self.rooms.get(roomID)

	def readyForDestroy(self):
		INFO_MSG('iRoomManager readyForDestroy()')
		self.destroyState = const.DESTROY_PROCESS_BEGIN
		self.destroy_ts = utility.get_cur_timestamp()

		card_req = {}
		for key in list(self.rooms.keys()):
			room = self.rooms[key]
			if room.room_type == const.AGENT_ROOM and room.current_round < 1:
				# 代开房间没开始打, 返还房卡
				card_cost, diamond_cost = switch.calc_cost(room.game_round, room.pay_mode)
				if room.agent:
					key = room.agent.accountName
					if key in card_req:
						val = card_req[key]
						card_req[key] = (val[0] + card_cost, val[1] + diamond_cost)
					else:
						card_req[key] = (card_cost, diamond_cost)
			try:
				room.destroyByServer()
			except:
				pass
		self.rooms.clear()
		self.handleCardBack(card_req)

	def handleCardBack(self, req_d):
		if switch.DEBUG_BASE != 0 or len(req_d) == 0:
			# 1.测试服不用管 2.长度为空也直接结束
			self.destroyProcessFinish()
			return
		INFO_MSG("handleCardBack, all Request = {}".format(req_d))
		self.executor.set('c', 0)
		self.executor.set('c_ok', 0)
		self.executor.add_condition(lambda: self.executor.get('c_ok') >= 1, [self.destroyProcessFinish, []])
		self.executor.add_condition(lambda: self.executor.get('c') >= len(req_d), [self.executor.inc1, ['c_ok']])

		for k, v in req_d.items():
			utility.update_card_diamond(k, v[0], v[1], Functor(self.updateCb, k, v), "GuiXi safe kill server, pay back agent:{}".format(k))  # reason 必须为英文

	def updateCb(self, accountName, value, content=None):
		try:
			content = content.decode()
			if content[0] != '{':
				INFO_MSG("{}: {} payBack failed1, content = {}".format(accountName, value, content))
			else:
				INFO_MSG("{}: {} payBack succeed, content = {}".format(accountName, value, content))
		except:
			INFO_MSG("{}: {} payBack failed2, content = {}".format(accountName, value, content))
		finally:
			self.executor.inc1('c')

	def destroyProcessFinish(self):
		self.destroyState = const.DESTROY_PROCESS_END


	def clubDismissed(self, club_id):
		for key in list(self.rooms.keys()):
			room = self.rooms[key]
			if room.room_type == const.CLUB_ROOM and room.club and room.club.clubId == club_id:
				if room.current_round < 1:
					try:
						room.destroyByServer("茶楼已解散")
					except:
						pass
				else:
					room.club_table = None