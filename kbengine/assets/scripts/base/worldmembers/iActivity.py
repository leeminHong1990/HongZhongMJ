# -*-coding:utf-8-*-
import  time

class iActivity:

	def __init__(self):
		return

	def initActivity(self):
		return

	@property
	def isDailyActFree(self):
		t = time.localtime()
		day_time = t.tm_hour + t.tm_min/60 + t.tm_sec/3600
		return self.daily_act_useful == 1 and self.daily_begin <= day_time <= self.daily_end

	def setDailySlot(self, begin, end):
		if begin >= end:
			return
		self.daily_begin 	= float(begin)
		self.daily_end 		= float(end)

	def setActUseful(self, daily_act_useful):
		self.daily_act_useful = daily_act_useful