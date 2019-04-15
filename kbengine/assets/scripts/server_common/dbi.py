# -*- coding: utf-8 -*-
import KBEngine
from KBEDebug import *
import const
import switch

# 默认用户信息字段
UINFO_DEFAULT = ['id', 'sm_uuid', 'sm_userId', 'sm_accountName', 'sm_name', 'sm_head_icon', 'sm_sex']


def findAvatarDBIDByUserId(user_id, callback=None):
	select_sql = "SELECT id FROM {}.tbl_Avatar WHERE sm_userId={}".format(switch.DB_NAME, user_id)

	def select_cb(result, rows, insertid, error):
		# DEBUG_MSG("findAvatarDBIDByUserId result:", result)
		if result:
			dbid = int(result[0][0])
			callable(callback) and callback(dbid, None)
		else:
			if error:
				ERROR_MSG("dbi queryAvatarDBIDByUserId Error = {}".format(error))
				callable(callback) and callback(None, error)

	KBEngine.executeRawDatabaseCommand(select_sql, select_cb)


def findAvatarClubList(dbid, callback=None):
	select_sql = "SELECT sm_value FROM {}.tbl_Avatar_clubList WHERE parentID={}".format(switch.DB_NAME, dbid)

	def select_cb(result, rows, insertid, error):
		# DEBUG_MSG("findAvatarClubList111 result:", result)
		if error:
			ERROR_MSG("dbi queryAvatarClubList Error = {}".format(error))
			callable(callback) and callback(None, error)
		else:
			result = [int(m[0]) for m in result]
			# DEBUG_MSG("findAvatarClubList222 result:", result)
			callable(callback) and callback(result, None)

	KBEngine.executeRawDatabaseCommand(select_sql, select_cb)


def insertIntoAvatarClubList(dbid, club_id, callback=None):
	insert_sql = "INSERT INTO {}.tbl_Avatar_clubList (`parentID`,`sm_value`) VALUES ({}, {})".format(switch.DB_NAME, dbid, club_id)

	def insert_cb(result, rows, insertid, error):
		if error:
			ERROR_MSG("dbi insertIntoAvatarClubList result = {} {}".format(result, (rows, insertid, error)))
			callable(callback) and callback(False, error)
		else:
			callable(callback) and callback(True, None)

	KBEngine.executeRawDatabaseCommand(insert_sql, insert_cb)


def deleteFromAvatarClubList(dbid, club_id, callback=None):
	delete_sql = "DELETE FROM {}.tbl_Avatar_clubList WHERE parentID={} AND sm_value={}".format(switch.DB_NAME, dbid, club_id)

	def delete_cb(result, rows, insertid, error):
		if error:
			ERROR_MSG("dbi deleteFromAvatarClubList Error = {}".format(error))
			callable(callback) and callback(False, error)
		else:
			callable(callback) and callback(True, None)

	KBEngine.executeRawDatabaseCommand(delete_sql, delete_cb)


def deleteClub(club_id, callback=None):
	delete_sql = "DELETE FROM {}.tbl_Avatar_clubList WHERE sm_value={}".format(switch.DB_NAME, club_id)

	def delete_cb(result, rows, insertid, error):
		if error:
			ERROR_MSG("kickOutClub delete_cb Error = {}".format(error))
			callable(callback) and callback(False, error)
		else:
			callable(callback) and callback(True, None)

	KBEngine.executeRawDatabaseCommand(delete_sql, delete_cb)


def addOfflineMemberInClub(club_id, uid, callback=None):
	""" callback hell """
	def query_dbid_cb(dbid, err1):
		if dbid:
			def query_club_cb(club_list, err2):
				if club_list is not None:
					if len(club_list) < const.CLUB_NUM_LIMIT:
						def insert_cb(result, err3):
							if result:
								callable(callback) and callback(True, None)
							else:
								callable(callback) and callback(False, err3)

						insertIntoAvatarClubList(dbid, club_id, insert_cb)
					else:
						callable(callback) and callback(False, "Avatar clubList limit")
				else:
					callable(callback) and callback(False, err2)

			findAvatarClubList(dbid, query_club_cb)
		else:
			callable(callback) and callback(False, err1)

	findAvatarDBIDByUserId(uid, query_dbid_cb)


def kickOfflineMemberOutClub(club_id, uid, callback=None):
	def query_dbid_cb(dbid, err1):
		if dbid:
			def delete_cb(result, err2):
				if result:
					callable(callback) and callback(True, None)
				else:
					callable(callback) and callback(False, err2)

			deleteFromAvatarClubList(dbid, club_id, delete_cb)
		else:
			callable(callback) and callback(False, err1)

	findAvatarDBIDByUserId(uid, query_dbid_cb)


def findAvatarByUserId(user_id, callback=None):
	select_sql = "SELECT {} FROM {}.tbl_Avatar WHERE sm_userId={}".format(','.join(UINFO_DEFAULT), switch.DB_NAME, user_id)

	def select_cb(result, rows, insertid, error):
		# DEBUG_MSG("findAvatarByUserId result:", result)
		if result:
			result = result[0]
			user_info = {
				'id': int(result[0]),
				'uuid': int(result[1]),
				'userId': int(result[2]),
				'accountName': str(result[3], 'utf-8'),
				'name': str(result[4], 'utf-8'),
				'head_icon': str(result[5], 'utf-8'),
				'sex': int(result[6]),
			}
			# DEBUG_MSG("findAvatarByUserId result:", user_info)
			callable(callback) and callback(user_info, None)
		else:
			callable(callback) and callback(None, None)
			if error:
				ERROR_MSG("dbi findAvatarByUserId Error = {}".format(error))

	KBEngine.executeRawDatabaseCommand(select_sql, select_cb)
