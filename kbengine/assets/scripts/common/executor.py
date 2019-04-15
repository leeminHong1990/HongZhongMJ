# -*- coding: utf-8 -*-

"""
用来保障各种异步操作的调用顺序, 不会用参考async_test.py
by: LBB
"""

class Executor(object):
	"""	保障各种异步操作的调用顺序 """
	def __init__(self):
		self.register = {}
		self.conditions = {}

	def reset(self):
		self.register = {}
		self.conditions = {}

	def set(self, k, v):
		self.register[k] = v

	def get(self, k):
		return self.register.get(k)

	def add_condition(self, condition, op):
		self.conditions[condition] = op

	def inc1(self, k):
		self.register[k] += 1
		self.check_conditions()

	def check_conditions(self):
		has_ok = True
		while has_ok:
			has_ok = False
			_func, _args = None, None
			_condition = None
			for condition, op in self.conditions.items():
				if condition():
					has_ok = True
					_condition = condition
					_func, _args = op
					break
			if _condition:
				del self.conditions[_condition]
				_func(*_args)

	def finish(self):
		return len(self.conditions) == 0