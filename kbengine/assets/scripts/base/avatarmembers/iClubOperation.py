# -*- coding: utf-8 -*-
import KBEngine
from KBEDebug import *
import const
import x42
import json
from Functor import Functor
import utility
import switch

class iClubOperation(object):
	""" 茶楼相关 """

	def __init__(self):
		pass

	def createClub(self, club_name, create_dict):
		DEBUG_MSG("create club name = {} args = {}".format(club_name, create_dict))
		game_round = create_dict['game_round']
		lucky_num = create_dict['lucky_num']
		hand_prepare = create_dict['hand_prepare']
		pay_mode = create_dict['pay_mode']
		room_type = create_dict['room_type']
		if game_round not in const.ROUND \
				or lucky_num not in const.LUCKY_NUM \
				or pay_mode not in (const.NORMAL_PAY_MODE, const.AA_PAY_MODE, const.CLUB_PAY_MODE) \
				or room_type not in (const.NORMAL_ROOM, const.CLUB_ROOM) \
				or hand_prepare not in const.PREPARE_MODE:
			self.clubOperationFailed(const.CLUB_OP_ERR_WRONG_ARGS)
			return

		# 检查代理创建茶楼的权限
		if not self.isAgent:
			self.clubOperationFailed(const.CLUB_OP_ERR_PERMISSION_DENY)
			return
		if len(self.clubList) >= const.CLUB_NUM_LIMIT:
			self.clubOperationFailed(const.CLUB_OP_ERR_NUM_LIMIT)
			return
		# @formatter:off
		room_params = {
			'owner_uid'			: self.userId,
			'king_num' 			: 1,
			'player_num'		: 4,
			'game_round'		: game_round,
			'pay_mode' 			: pay_mode,
			'lucky_num' 		: lucky_num,
			'hand_prepare'		: hand_prepare,
			'room_type'			: room_type,
		}

		def query_cb(club_name, room_params, content):
			res = False
			DEBUG_MSG("query proxy cb: {}".format(content))
			try:
				ret = json.loads(content)
				if ret['errcode'] == 0 and ret['is_proxy']:
					res = True
			except:
				import traceback
				ERROR_MSG(traceback.format_exc())
			finally:
				if res:
					self.isAgent = 1
					x42.ClubStub.createClub(self, club_name, room_params)
				else:
					self.isAgent = 0
					self.clubOperationFailed(const.CLUB_OP_ERR_PERMISSION_DENY)

		if switch.DEBUG_BASE == 0:
			utility.get_is_proxy(self.accountName, Functor(query_cb, club_name, room_params))
		else:
			x42.ClubStub.createClub(self, club_name, room_params)

	def createClubCallback(self, club_detail):
		self.createClubSucceed(club_detail)

	def updateClubList(self):
		""" 可能在玩家离线的时候被茶楼踢出或者所在的茶楼已解散 """
		real = []
		for club_id in self.clubList:
			if x42.ClubStub.isClubMember(club_id, self.userId):
				real.append(club_id)

		self.clubList = real
		self.getClubListInfo()

	def deleteClub(self, club_id):
		if club_id not in self.clubList:
			return
		x42.ClubStub.deleteClub(self, club_id)

	def clubOperation(self, op, club_id, args):
		args = json.loads(args)
		if not isinstance(args, list):
			self.clubOperationFailed(const.CLUB_OP_ERR_WRONG_ARGS)
			return

		DEBUG_MSG("iClubOperation clubOperation {}".format((op, club_id, args)))
		x42.ClubStub.clubOperation(self, op, club_id, args)

	def getClubListInfo(self):
		club_info_list = []
		for club_id in self.clubList:
			d = x42.ClubStub.getClubAbstract(club_id)
			d and club_info_list.append(d)

		if getattr(self, 'client', None):
			self.client.gotClubListInfo(club_info_list)

	def getClubDetailInfo(self, club_id):
		if club_id not in self.clubList:
			return

		d, err_code = x42.ClubStub.getClubDetailInfo(club_id)
		if d is not None:
			self.client.gotClubDetailInfo(d)
		else:
			err_code and self.clubOperationFailed(err_code)

	def gotTableDetailInfo(self, t_idx, detail):
		if getattr(self, 'client', None):
			self.client.gotTableDetailInfo(t_idx, detail)

	def gotClubTableList(self, club_id, club_seat_list):
		if getattr(self, 'client', None):
			self.client.gotClubTableList(club_id, club_seat_list)

	def createClubSucceed(self, club_detail):
		if getattr(self, 'client', None):
			self.client.createClubSucceed(club_detail)

	def deleteClubSucceed(self, club_id):
		if getattr(self, 'client', None):
			self.client.deleteClubSucceed(club_id)

	def joinOneClub(self, club_id, msg=None):
		if len(self.clubList) >= const.CLUB_NUM_LIMIT:
			return
		if club_id not in self.clubList:
			self.clubList.append(club_id)
			self.getClubListInfo()
			if msg:
				self.client.showTip(msg)

	def leaveOneClub(self, club_id, msg=None):
		if club_id in self.clubList:
			self.clubList.remove(club_id)
			self.getClubListInfo()
			if msg:
				self.client.showTip(msg)

	def setClubNameSucceed(self, club_id, name):
		if getattr(self, 'client', None):
			self.client.setClubNameSucceed(club_id, name)

	def setClubNoticeSucceed(self, club_id, name):
		if getattr(self, 'client', None):
			self.client.setClubNoticeSucceed(club_id, name)

	def setMemberNotesSucceed(self, club_id, target_uid, name):
		if getattr(self, 'client', None):
			self.client.setMemberNotesSucceed(club_id, target_uid, name)

	def gotClubApplicants(self, applicants):
		if getattr(self, 'client', None):
			self.client.gotClubApplicants(applicants)

	def gotClubMembers(self, members):
		if getattr(self, 'client', None):
			self.client.gotClubMembers(members)

	def gotClubRecords(self, club_id, records):
		if getattr(self, 'client', None):
			self.client.gotClubRecords(club_id, records)

	def clubOperationFailed(self, err_code):
		if getattr(self, 'client', None):
			self.client.clubOperationFailed(err_code)