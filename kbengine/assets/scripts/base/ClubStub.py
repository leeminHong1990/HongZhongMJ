# -*- coding: utf-8 -*-
import KBEngine
from KBEDebug import *
from BaseEntity import BaseEntity
import x42
from executor import Executor
import const
import utility
from Functor import Functor


class ClubStub(BaseEntity):

	def __init__(self):
		BaseEntity.__init__(self)
		self.isReady = False
		self.clubs = {}
		self.executor = Executor()
		self.loadClubs()
		x42.ClubStub = self

	def loadClubs(self):
		club_list = list(self.clubList)
		if len(club_list) == 0:
			self.initFinish()
			return

		self.executor.set('c', 0)
		self.executor.set('c_ok', 0)
		self.executor.add_condition(lambda: self.executor.get('c_ok') >= 1, [self.initFinish, []])
		self.executor.add_condition(lambda: self.executor.get('c') >= len(club_list), [self.executor.inc1, ['c_ok']])

		for id in club_list:
			def create_cb(baseRef, databaseID, wasActive):
				self.executor.inc1('c')
				if baseRef:
					self.clubs[baseRef.clubId] = baseRef
				else:
					if databaseID in self.clubList:
						self.clubList.remove(databaseID)
					INFO_MSG("ClubStub load club failed. Club_%d not exist!" % databaseID)

			KBEngine.createBaseFromDBID("Club", id, create_cb)

	def initFinish(self):
		self.isReady = True
		self.add_repeat_timer(1, 6 * 60 * 60, self.processClubTableResult)

	def clubOperation(self, avatar_mb, op, club_id, args):
		club = self.clubs.get(club_id)
		if club is None:
			avatar_mb.clubOperationFailed(const.CLUB_OP_ERR_CLUB_NOT_EXIST)
			return

		club.doOperation(avatar_mb, op, args)

	def createClub(self, avatar_mb, club_name, club_params_dict):
		if avatar_mb.isAgent != 1:
			avatar_mb.clubOperationFailed(const.CLUB_OP_ERR_PERMISSION_DENY)
			return

		club_name = utility.filter_emoji(club_name)
		club_name = club_name[:const.CLUB_NAME_LENGTH]
		self.clubCount += 1
		club_id = utility.gen_club_id(self.clubCount)
		owner_info = {
			'userId': avatar_mb.userId,
			'uuid': avatar_mb.uuid,
			'sex': avatar_mb.sex,
			'nickname': avatar_mb.name,
			'head_icon': avatar_mb.head_icon,
			'accountName': avatar_mb.accountName,
		}
		params = {
			'clubId' : club_id,
			'name' : club_name,
			'owner' : owner_info,
			'roomType'	: club_params_dict,
		}
		INFO_MSG("ClubStub player{} createClub {}".format(avatar_mb.userId, params))
		club = KBEngine.createBaseLocally("Club", params)
		if club:
			club.writeToDB(Functor(self._onClubSaved, avatar_mb, owner_info))

	def _onClubSaved(self, avatar_mb, owner_info, success, club):
		uid = owner_info['userId']
		INFO_MSG("ClubStub player{} _onClubSaved state: {}, {}".format(uid, success, club.databaseID))

		if success:
			self.clubList.append(club.databaseID)
			self.clubs[club.clubId] = club
			mem_info = {
				'userId': uid,
				'uuid': owner_info['uuid'],
				'sex': owner_info['sex'],
				'nickname': owner_info['nickname'],
				'head_icon': owner_info['head_icon'],
				'notes': '',
				'ts': utility.get_cur_timestamp(),
			}
			# 这么些是为了防止回调回来的时候avatar已经销毁
			if avatar_mb and not avatar_mb.isDestroyed:
				club.members[uid] = mem_info
				avatar_mb.clubList.append(club.clubId)
				avatar_mb.createClubCallback(club.getDetailInfo())
			else:
				club._addMemberIn(uid, mem_info)
			self.writeToDB()

	def deleteClub(self, avatar_mb, club_id):
		club = self.clubs.get(club_id)
		if club is None:
			avatar_mb.clubOperationFailed(const.CLUB_OP_ERR_CLUB_NOT_EXIST)
			return

		if club.isOwner(avatar_mb.userId):
			self.clubs.pop(club_id)
			self.clubList.remove(club.databaseID)
			club.dismiss()
			avatar_mb.deleteClubSucceed(club_id)
		else:
			avatar_mb.clubOperationFailed(const.CLUB_OP_ERR_PERMISSION_DENY)

	def getClubAbstract(self, club_id):
		club = self.clubs.get(club_id)
		if club is None:
			return None

		return club.getAbstract()

	def getClubDetailInfo(self, club_id):
		club = self.clubs.get(club_id)
		if club is None:
			return None, const.CLUB_OP_ERR_CLUB_NOT_EXIST

		return club.getDetailInfo(), None

	def isClubMember(self, club_id, user_id):
		""" 检查玩家是否是茶楼的成员 """
		club = self.clubs.get(club_id)
		if club is None:
			return False
		return club.isMember(user_id)

	def processClubTableResult(self):
		for v in self.clubs.values():
			v.processTableResult()