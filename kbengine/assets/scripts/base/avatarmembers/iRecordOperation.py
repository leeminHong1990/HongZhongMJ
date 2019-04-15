# -*- coding: utf-8 -*-

import KBEngine
import const
from KBEDebug import *


class iRecordOperation(object):
	def __init__(self):
		pass

	def initRecord(self):
		pass

	def queryRecord(self, record_id):
		DEBUG_MSG("iRecordOperation queryRecord {0}".format(record_id))
		KBEngine.globalData['GameWorld'].query_record(self, record_id)

	def queryUserRecord(self, user_id, count):
		DEBUG_MSG("iRecordOperation queryRecord {0} {1}".format(user_id, count))
		KBEngine.globalData['GameWorld'].query_user_record(self, user_id, count)

	def queryUserRecordResult(self, records):
		self.queryUserRecordSuccess(records)

	def queryUserRecordSuccess(self, records):
		DEBUG_MSG('queryUserRecordSuccess', records)
		if getattr(self, 'client', None):
			self.client.queryUserRecordResult(records)

	def queryRecordResult(self, record):
		if record is None:
			self.queryRecordFailed(const.QUERY_RECORD_NO_EXIST)
		else:
			self.queryRecordSuccess(record)

	def queryRecordSuccess(self, record):
		if getattr(self, 'client', None):
			self.client.queryRecordResult(record)

	def queryRecordFailed(self, code):
		if getattr(self, 'client', None):
			self.client.queryRecordFailed(code)
