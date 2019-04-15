# -*- coding: utf-8 -*-
from executor import Executor
from AsyncRequest import Request
import time

"""
Attention: 需要本地搭的一个的http服, 提供api这个接口.
by: LBB
"""

LOCAL_TEST_URL = "http://localhost:5000/api"

class AsyncTest(object):

	def __init__(self, n):
		self.count = n
		self.executor = Executor()
		self.begin = self.end = 0

	def run(self):
		self.executor.set("r", 0)
		self.executor.set("r_ok", 0)
		self.executor.add_condition(lambda : self.executor.get('r_ok') >= 1, [self.finish, []])
		self.executor.add_condition(lambda : self.executor.get('r') >= self.count, [self.executor.inc1, ['r_ok']])

		self.begin = time.time()
		for i in range(self.count):
			Request(LOCAL_TEST_URL, self.callback)

	def callback(self, *args):
		self.executor.inc1("r")

	def finish(self):
		self.end = time.time()
		print("{} times Request cost: {}".format(self.count, self.end - self.begin))