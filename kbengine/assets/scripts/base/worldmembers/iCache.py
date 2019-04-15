# -*- coding: utf-8 -*-
from KBEDebug import *
import const
from SimpleCache import SimpleCache
import dbi
from Functor import Functor

class iCache:

	def __init__(self):
		self.user_info = SimpleCache(const.USER_INFO_CACHE_SIZE)

	def getUserInfoByUID(self, uid, callback):
		if uid in self.user_info:
			res = self.user_info[uid]
			callable(callback) and callback(res)
		else:
			def find_cb(uid, result, error):
				if result:
					self.user_info[uid] = result
					callable(callback) and callback(result)
				else:
					callable(callback) and callback(None)
					if error:
						ERROR_MSG("getUserInfoByUID Failed. userId = {}, error = {}".format(uid, error))

			avt_mb = self.avatars.get(uid)
			if avt_mb and avt_mb.isDestroyed == False:
				res = {
					'id': avt_mb.databaseID,
					'uuid': avt_mb.uuid,
					'userId': avt_mb.userId,
					'accountName': avt_mb.accountName,
					'name': avt_mb.name,
					'head_icon': avt_mb.head_icon,
					'sex': avt_mb.sex,
				}
				find_cb(uid, res, None)
			else:
				dbi.findAvatarByUserId(uid, Functor(find_cb, uid))
