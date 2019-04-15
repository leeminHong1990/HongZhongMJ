# -*- coding: utf-8 -*-
import KBEngine
from KBEDebug import *
from BaseEntity import BaseEntity
import const
import x42
from clubmembers.ClubTable import TableManager
from Functor import Functor
import utility
import inspect
import dbi
import copy

OP2NAME = {
	const.CLUB_OP_AGREE_IN		: 'agreeInClub',
	const.CLUB_OP_REFUSE_IN		: 'refuseInClub',
	const.CLUB_OP_INVITE_IN		: 'inviteInClub',
	const.CLUB_OP_KICK_OUT		: 'kickOutClub',
	const.CLUB_OP_APPLY_IN		: 'applyInClub',
	const.CLUB_OP_APPLY_OUT		: 'applyOutClub',
	const.CLUB_OP_SET_NAME		: 'setClubName',
	const.CLUB_OP_SET_NOTICE	: 'setClubNotice',
	const.CLUB_OP_GET_MEMBERS	: 'getClubMembers',
	const.CLUB_OP_GET_APPLICANTS: 'getClubApplicants',
	const.CLUB_OP_SIT_DOWN		: 'sitDown',
	const.CLUB_OP_SET_MEMBER_NOTES: 'setMemberNotes',
	const.CLUB_OP_GET_TABLE_DETAIL: 'getTableDetailInfo',
	const.CLUB_OP_GET_RECORDS	: 'getClubRecords',
}

OWNER_ONLY_OP = [const.CLUB_OP_AGREE_IN, const.CLUB_OP_REFUSE_IN, const.CLUB_OP_INVITE_IN,
				 const.CLUB_OP_KICK_OUT, const.CLUB_OP_SET_NAME, const.CLUB_OP_GET_APPLICANTS,
				 const.CLUB_OP_SET_NOTICE, const.CLUB_OP_SET_MEMBER_NOTES]
MEMBER_ONLY_OP = [const.CLUB_OP_APPLY_OUT]
COMMON_OP = [const.CLUB_OP_GET_MEMBERS, const.CLUB_OP_SIT_DOWN, const.CLUB_OP_GET_TABLE_DETAIL,
			 const.CLUB_OP_GET_RECORDS]
NON_MEMBER_OP = [const.CLUB_OP_APPLY_IN]


class Club(BaseEntity):

	def __init__(self):
		BaseEntity.__init__(self)
		self.table_mgr = TableManager(self)

	def doOperation(self, avatar_mb, op, args):
		""" 各种操作的dispatcher, 集中检查权限 """
		INFO_MSG("Club doOperation op_uid = {}, op = {}, args = {}".format(avatar_mb.userId, op, args))
		uid = avatar_mb.userId

		# 检查操作是否存在
		if op not in OP2NAME:
			avatar_mb.clubOperationFailed(const.CLUB_OP_ERR_WRONG_ARGS)
			return

		# 检查操作权限
		if op not in NON_MEMBER_OP and not self.isMember(uid):
			avatar_mb.clubOperationFailed(const.CLUB_OP_ERR_PERMISSION_DENY)
			return
		if op in OWNER_ONLY_OP and not self.isOwner(uid):
			avatar_mb.clubOperationFailed(const.CLUB_OP_ERR_PERMISSION_DENY)
			return
		if op in MEMBER_ONLY_OP:
			if self.isOwner(uid):
				if op == const.CLUB_OP_APPLY_OUT:
					avatar_mb.showTip("无法退出, 请解散茶楼")
					return

		f = getattr(self, OP2NAME[op])
		if callable(f):
			sig = inspect.signature(f)
			if len(sig.parameters.keys()) == len(args) + 1:
				f(avatar_mb, *args)
			else:
				ERROR_MSG("Club doOperation Arguments Error:{}".format((avatar_mb.userId, op, args)))
		else:
			ERROR_MSG("Club doOperation NonFunction Error:{}".format((avatar_mb.userId, op, args)))

##################################################################################################################
# ---------------------------------------------- CLUB OPERATION --------------------------------------------------
##################################################################################################################
	def applyInClub(self, avatar_mb):
		uid = avatar_mb.userId
		if len(avatar_mb.clubList) >= const.CLUB_NUM_LIMIT:
			avatar_mb.showTip("达到茶楼数量上限, 无法加入更多茶楼")
			return
		if uid in self.members:
			avatar_mb.showTip("您已经在该茶楼中, 无需重复加入")
			return
		if self.isApplicant(uid):
			avatar_mb.showTip("请等待审核, 无需重复申请")
			return
		if len(self.members) >= const.CLUB_MEMBER_LIMIT:
			avatar_mb.showTip("茶楼成员已满, 请加入别的茶楼")
			return

		app_info = {
			'userId': uid,
			'uuid': avatar_mb.uuid,
			'sex':avatar_mb.sex,
			'nickname': avatar_mb.name,
			'head_icon': avatar_mb.head_icon,
			'ts': utility.get_cur_timestamp(),
		}
		self.applicants[uid] = app_info
		avatar_mb.showTip("申请已发送, 请联系茶楼老板通过审核")

	def applyOutClub(self, avatar_mb):
		uid = avatar_mb.userId
		if self.isOwner(uid):
			avatar_mb.showTip("无法退出, 请解散茶楼")
			return

		if uid in self.members:
			del self.members[uid]
		avatar_mb.leaveOneClub(self.clubId, "退出茶楼成功")

	def agreeInClub(self, avatar_mb, target_uid):
		app_info = self.applicants.get(target_uid)
		if app_info is None:
			app_list = self.getApplicants()
			avatar_mb.gotClubApplicants(app_list)
			return
		if len(self.members) >= const.CLUB_MEMBER_LIMIT:
			avatar_mb.showTip("操作失败, 茶楼成员已满")
			return

		# 移出申请列表
		del self.applicants[target_uid]

		if target_uid in self.members:
			avatar_mb.showTip("该玩家已经是茶楼成员")
			avatar_mb.gotClubApplicants(self.getApplicants())
			return

		# 将玩家加入茶楼成员
		mem_info = {
			'userId': target_uid,
			'uuid': app_info['uuid'],
			'sex': app_info['sex'],
			'nickname': app_info['nickname'],
			'head_icon': app_info['head_icon'],
			'notes': '',
			'ts': utility.get_cur_timestamp(),
		}

		def add_cb(avatar_mb, result, msg=None):
			if result:
				avatar_mb.gotClubMembers(self.getMembers())
			else:
				msg and avatar_mb.showTip(msg)
		self._addMemberIn(target_uid, mem_info, Functor(add_cb, avatar_mb))
		avatar_mb.gotClubApplicants(self.getApplicants())

	def refuseInClub(self, avatar_mb, target_uid):
		if target_uid in self.applicants:
			del self.applicants[target_uid]

		avatar_mb.gotClubApplicants(self.getApplicants())

	def kickOutClub(self, avatar_mb, target_uid):
		if target_uid not in self.members:
			avatar_mb.gotClubMembers(self.getMembers())
			return

		if self.isOwner(target_uid):
			avatar_mb.showTip("不能对茶楼老板进行该操作")
			return

		self._kickMemberOut(target_uid)
		avatar_mb.gotClubMembers(self.getMembers())

	def setClubName(self, avatar_mb, new_name):
		new_name = utility.filter_emoji(new_name)
		new_name = new_name[:const.CLUB_NAME_LENGTH]
		self.name = new_name
		avatar_mb.setClubNameSucceed(self.clubId, new_name)

	def setClubNotice(self, avatar_mb, new_notice):
		new_notice = utility.filter_emoji(new_notice)
		new_notice = new_notice[:const.CLUB_NOTICE_LENGTH]
		self.notice = new_notice
		avatar_mb.setClubNoticeSucceed(self.clubId, new_notice)

	def setMemberNotes(self, avatar_mb, target_uid, notes):
		mem = self.members.get(target_uid)
		if mem:
			notes = utility.filter_emoji(notes)
			notes = notes[:const.MEMBER_NOTES_LENGTH]
			mem['notes'] = notes
			avatar_mb.gotClubMembers(self.getMembers())
		else:
			avatar_mb.showTip("成员不存在")
			avatar_mb.gotClubMembers(self.getMembers())

	def inviteInClub(self, avatar_mb, target_uid):
		if target_uid in self.members:
			avatar_mb.showTip("该玩家已经是茶楼成员")
			return

		def query_cb(uinfo):
			# 将玩家加入茶楼成员
			mem_info = {
				'userId': target_uid,
				'uuid': uinfo['uuid'],
				'sex': uinfo['sex'],
				'nickname': uinfo['name'],
				'head_icon': uinfo['head_icon'],
				'notes': '',
				'ts': utility.get_cur_timestamp(),
			}

			def add_cb(avatar_mb, result, msg=None):
				if result:
					avatar_mb.showTip("邀请成功")
					avatar_mb.gotClubMembers(self.getMembers())
				else:
					msg and avatar_mb.showTip(msg)

			self._addMemberIn(target_uid, mem_info, Functor(add_cb, avatar_mb))

		x42.GW.getUserInfoByUID(target_uid, query_cb)

	def getClubMembers(self, avatar_mb):
		if self.isOwner(avatar_mb.userId):
			mem_list = self.getMembers()
		else:
			mem_list = self.getMembersWithoutNotes()
		avatar_mb.gotClubMembers(mem_list)

	def getClubApplicants(self, avatar_mb):
		app_list = self.getApplicants()
		avatar_mb.gotClubApplicants(app_list)

	def sitDown(self, avatar_mb, table_idx):
		self.table_mgr.takeASeat(avatar_mb, table_idx)

	def getTableDetailInfo(self, avatar_mb, table_idx):
		table = self.table_mgr.getTable(table_idx)
		if table is None:
			avatar_mb.showTip("桌子编号错误")
			return

		detail = table.getDetailInfo()
		avatar_mb.gotTableDetailInfo(table_idx, detail)

	def getClubRecords(self, avatar_mb):
		rec = list(self.records)
		avatar_mb.gotClubRecords(self.clubId, rec)

##################################################################################################################
# ---------------------------------------------- CLUB OPERATION --------------------------------------------------
##################################################################################################################

	def _kickALLMembersOut(self):
		""" 仅仅在解散的时候调用 """
		for uid in self.members:
			avt = x42.GW.avatars.get(uid)
			if avt and not avt.isDestroyed:
				avt.leaveOneClub(self.clubId)

		# 玩家上线的时候会检查处理, 其实这里不操作DB也没问题
		def delete_cb(result, error):
			if error:
				ERROR_MSG("kickOutClub delete_cb Error = {}".format(error))

		dbi.deleteClub(self.clubId, delete_cb)

	def _kickMemberOut(self, target_uid):
		""" 这里写的通用逻辑, 不要直接使用此接口, 因为没有检查权限 """
		# 移出茶楼成员列表
		self.members.pop(target_uid, None)
		# 处理玩家的茶楼列表
		avt = x42.GW.avatars.get(target_uid)
		if avt and not avt.isDestroyed:
			avt.leaveOneClub(self.clubId)
		else:
			# 玩家上线的时候会检查处理, 其实这里不操作DB也没问题
			def kick_cb(club_id, uid, result, error):
				if not result:
					ERROR_MSG("_kickMemberOut kick_cb clubId:{}, userId: Error = {}".format(club_id, uid, error))

			dbi.kickOfflineMemberOutClub(self.clubId, target_uid, Functor(kick_cb, self.clubId, target_uid))

	def _addMemberIn(self, target_uid, mem_info, callback=None):
		""" 这里写的通用逻辑, 不要直接使用此接口, 因为没有检查权限 """
		# 需要检查玩家加入的茶楼数量
		avt = x42.GW.avatars.get(target_uid)
		if avt and not avt.isDestroyed:
			if len(avt.clubList) < const.CLUB_NUM_LIMIT:
				# 加入茶楼成员列表
				self.members[target_uid] = mem_info
				avt.joinOneClub(self.clubId)
				callable(callback) and callback(True)
			else:
				callable(callback) and callback(False, "该玩家茶楼数量达到上限, 无法再加入本茶楼")
		else:
			def add_cb(result, error):
				if result:
					# 加入茶楼成员列表
					self.members[target_uid] = mem_info
					callable(callback) and callback(True)
				else:
					DEBUG_MSG("_addMemberIn add_cb clubId:{}, userId: Error = {}".format(self.clubId, target_uid, error))
					callable(callback) and callback(False, "该玩家茶楼数量达到上限, 无法再加入本茶楼")

			dbi.addOfflineMemberInClub(self.clubId, target_uid, add_cb)

	def dismiss(self):
		""" 解散茶楼, 此条目将从数据库中删除 """
		try:
			x42.GW.clubDismissed(self.clubId)
			self._kickALLMembersOut()
		except:
			import traceback
			ERROR_MSG(traceback.format_exc())
		finally:
			self.destroy(True)

	def saveTableResult(self, result):
		self.records.append(result)

	def processTableResult(self):
		now = utility.get_cur_timestamp()
		keep = []
		for r in self.records:
			ts = r['time']
			if now - ts < const.CLUB_TABLE_RESULT_TTL:
				keep.append(r)
		self.records = keep

	def isOwner(self, user_id):
		return self.owner['userId'] == user_id

	def isMember(self, user_id):
		return user_id in self.members

	def isApplicant(self, user_id):
		return user_id in self.applicants

	def broadcastSeatInfo(self):
		seat_list = self.table_mgr.getTableListInfo()
		for uid in self.members:
			avt = x42.GW.avatars.get(uid)
			avt and avt.gotClubTableList(self.clubId, seat_list)

	def getMembers(self):
		mem_list = copy.deepcopy(list(self.members.values()))
		mem_list = sorted(mem_list, key=lambda x: x['ts'], reverse=True)
		return mem_list

	def getApplicants(self):
		app_list = copy.deepcopy(list(self.applicants.values()))
		app_list = sorted(app_list, key=lambda x: x['ts'])
		return app_list

	def getMembersWithoutNotes(self):
		mem_list = copy.deepcopy(list(self.members.values()))
		for mem in mem_list:
			mem['notes'] = ''
		mem_list = sorted(mem_list, key=lambda x: x['ts'], reverse=True)
		return mem_list

	def getAbstract(self):
		return {
			'club_id': self.clubId,
			'club_name': self.name,
			'owner': dict(self.owner),
			'room_type': utility.getRoomParams(dict(self.roomType)),
		}

	def getDetailInfo(self):
		return {
			'club_id': self.clubId,
			'club_name': self.name,
			'club_notice': self.notice,
			'member_num': len(self.members),
			'room_type':  utility.getRoomParams(dict(self.roomType)),
			'owner': dict(self.owner),
			'table_info_list': self.table_mgr.getTableListInfo(),
		}
