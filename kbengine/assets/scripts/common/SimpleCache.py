# -*- coding: utf-8 -*-

import time
import collections


class Cache(object):
	__slots__ = ('obj', 'time')

	def __init__(self, obj):
		self.obj = obj
		self.time = time.time()

	def update(self):
		self.time = time.time()

	def __str__(self) -> str:
		return self.obj + ' ' + self.time


class SimpleCache:
	def __init__(self, count):
		self.count = count
		self.items = collections.OrderedDict()

	def __len__(self):
		return len(self.items)

	def __delitem__(self, key):
		if self.items.__contains__(key):
			del self.items[key]

	def __setitem__(self, key, value):

		if self.items.__contains__(key):
			cache = self.items[key]
			cache.obj = value
			cache.update()
			self.items.move_to_end(key)
		else:
			self.items[key] = Cache(value)

		if len(self.items) > self.count:
			self.items.popitem(False)

	def __getitem__(self, key):
		if self.items.__contains__(key):
			v = self.items[key]
			v.update()
			self.items.move_to_end(key)
			return v.obj
		return None

	def __contains__(self, key):
		return self.items.__contains__(key)

	def update_cache_time(self, key):
		self.items.move_to_end(key)
		self.items[key].update()

	def clean_cache(self, max_time_interval):
		t = time.time()
		for k in self.items.keys():
			v = self.items[k]
			if t - v.time > max_time_interval:
				del self.items[k]

	def clean(self):
		self.items.clear()

	def print_data(self):
		s = ''
		for k, v in self.items.items():
			s += '({0}, {1}), '.format(k, v.obj)
		print(s)
