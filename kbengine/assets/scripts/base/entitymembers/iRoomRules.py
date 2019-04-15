# -*- coding: utf-8 -*-

import KBEngine
from KBEDebug import *
import utility
import const
import random

class iRoomRules(object):

	def __init__(self):
		# 房间的牌堆
		self.tiles = []
		self.lucky_set = (const.CHAR1, const.CHAR5, const.CHAR9,
						  const.BAMB1, const.BAMB5, const.BAMB9,
						  const.DOT1, const.DOT5, const.DOT9, const.DRAGON_RED)

	def swapSeat(self, swap_list):
		random.shuffle(swap_list)
		for i in range(len(swap_list)):
			self.players_list[i] = self.origin_players_list[swap_list[i]]

		for i,p in enumerate(self.players_list):
			if p is not None:
				p.idx = i

	def setPrevailingWind(self):
		#圈风
		if self.player_num != 4:
			return
		minDearerNum = min(self.dealerNumList)
		self.prevailing_wind = const.WINDS[(self.prevailing_wind + 1 - const.WIND_EAST)%len(const.WINDS)] if minDearerNum >= 1 else self.prevailing_wind
		self.dealerNumList = [0] * self.player_num if minDearerNum >= 1 else self.dealerNumList
		self.dealerNumList[self.dealer_idx] += 1

	def setPlayerWind(self):
		if self.player_num != 4:
			return
		#位风
		for i,p in enumerate(self.players_list):
			if p is not None:
				p.wind = (self.player_num + i - self.dealer_idx)%self.player_num + const.WIND_EAST

	def initTiles(self):
		# 万 条 筒
		self.tiles = list(const.CHARACTER) * 4 + list(const.BAMBOO) * 4 + list(const.DOT) * 4
		# 红中
		self.tiles += [const.DRAGON_RED] * 4
		# 东 西 南 北
		# self.tiles += [const.WIND_EAST, const.WIND_SOUTH, const.WIND_WEST, const.WIND_NORTH] * 4
		# 中 发 白
		# self.tiles += [const.DRAGON_RED, const.DRAGON_GREEN, const.DRAGON_WHITE] * 4
		# # 春 夏 秋 冬
		# self.tiles += [const.SEASON_SPRING, const.SEASON_SUMMER, const.SEASON_AUTUMN, const.SEASON_WINTER]
		# # 梅 兰 竹 菊
		# self.tiles += [const.FLOWER_PLUM, const.FLOWER_ORCHID, const.FLOWER_BAMBOO, const.FLOWER_CHRYSANTHEMUM]
		DEBUG_MSG("room:{},curround:{} init tiles:{}".format(self.roomID, self.current_round, self.tiles))
		self.shuffle_tiles()

	def shuffle_tiles(self):
		random.shuffle(self.tiles)
		DEBUG_MSG("room:{},curround:{} shuffle tiles:{}".format(self.roomID, self.current_round, self.tiles))

	def deal(self, prefabHandTiles, prefabTopList):
		""" 发牌 """
		if prefabHandTiles is not None:
			for i,p in enumerate(self.players_list):
				if p is not None and len(prefabHandTiles) >= 0:
					p.tiles = prefabHandTiles[i] if len(prefabHandTiles[i]) <= const.INIT_TILE_NUMBER else prefabHandTiles[i][0:const.INIT_TILE_NUMBER]
			topList = prefabTopList if prefabTopList is not None else []
			allTiles = []
			for i, p in enumerate(self.players_list):
				if p is not None:
					allTiles.extend(p.tiles)
			allTiles.extend(topList)

			tile2NumDict = utility.getTile2NumDict(allTiles)
			warning_tiles = [t for t, num in tile2NumDict.items() if num > 4]
			if len(warning_tiles) > 0:
				WARNING_MSG("room:{},curround:{} prefab {} is larger than 4.".format(self.roomID, self.current_round,
																					 warning_tiles))
			for t in allTiles:
				if t in self.tiles:
					self.tiles.remove(t)
			for i in range(const.INIT_TILE_NUMBER):
				num = 0
				for j in range(self.player_num):
					if len(self.players_list[j].tiles) >= const.INIT_TILE_NUMBER:
						continue
					self.players_list[j].tiles.append(self.tiles[num])
					num += 1
				self.tiles = self.tiles[num:]

			newTiles = topList
			newTiles.extend(self.tiles)
			self.tiles = newTiles
		else:
			for i in range(const.INIT_TILE_NUMBER):
				for j in range(self.player_num):
					self.players_list[j].tiles.append(self.tiles[j])
				self.tiles = self.tiles[self.player_num:]

		for i, p in enumerate(self.players_list):
			DEBUG_MSG("room:{},curround:{} idx:{} deal tiles:{}".format(self.roomID, self.current_round, i, p.tiles))

	def kongWreath(self):
		""" 杠花 """
		for i in range(self.player_num):
			for j in range(len(self.players_list[i].tiles)-1, -1, -1):
				tile = self.players_list[i].tiles[j]
				if tile in const.SEASON or tile in const.FLOWER:
					del self.players_list[i].tiles[j]
					self.players_list[i].wreaths.append(tile)
					DEBUG_MSG("room:{},curround:{} kong wreath, idx:{},tile:{}".format(self.roomID, self.current_round, i, tile))

	def addWreath(self):
		""" 补花 """
		for i in range(self.player_num):
			while len(self.players_list[i].tiles) < const.INIT_TILE_NUMBER:
				if len(self.tiles) <= 0:
					break
				tile = self.tiles[0]
				self.tiles = self.tiles[1:]
				if tile in const.SEASON or tile in const.FLOWER:
					self.players_list[i].wreaths.append(tile)
					DEBUG_MSG("room:{},curround:{} add wreath, tile is wreath,idx:{},tile:{}".format(self.roomID, self.current_round, i, tile))
				else:
					self.players_list[i].tiles.append(tile)
					DEBUG_MSG("room:{},curround:{} add wreath, tile is not wreath, idx:{},tile:{}".format(self.roomID, self.current_round, i, tile))

	def rollKingTile(self):
		""" 财神 """
		self.kingTiles = []
		if self.king_num > 0:
			self.kingTiles.append(const.DRAGON_RED)
		# if self.king_num > 0:
		# 	for i in range(len(self.tiles)):
		# 		t = self.tiles[i]
		# 		if t not in const.SEASON and t not in const.FLOWER: #第一张非花牌
		# 			# 1-9为一圈 东南西北为一圈 中发白为一圈
		# 			self.kingTiles.append(t)
		# 			if self.king_num > 1:
		# 				for tup in (const.CHARACTER, const.BAMBOO, const.DOT, const.WINDS, const.DRAGONS):
		# 					if t in tup:
		# 						index = tup.index(t)
		# 						self.kingTiles.append(tup[(index + 1)%len(tup)])
		# 						break
		# 			del self.tiles[i]
		# 			break

	def tidy(self):
		""" 整理 """
		for i in range(self.player_num):
			self.players_list[i].tidy(self.kingTiles)

	def throwTheDice(self, idxList):
		if self.player_num == 3:
			diceList = [[0, 0], [0, 0], [0, 0]]
		else:
			diceList = [[0, 0], [0, 0], [0, 0], [0, 0]]
		for idx in idxList:
			for i in range(0,2):
				diceNum = random.randint(1, 6)
				diceList[idx][i] = diceNum
		return diceList

	def getMaxDiceIdx(self, diceList):
		numList = []
		for i in range(len(diceList)):
			numList.append(diceList[i][0] + diceList[i][1])

		idx = 0
		num = 0
		for i in range(len(numList)):
			if numList[i] > num:
				idx = i
				num = numList[i]
		return idx, num


	def getKongRecord(self):
		kong_record_list = []
		for i,p in enumerate(self.players_list):
			if p is not None:
				kong_record_list.extend(p.kong_record_list)
		return kong_record_list

	def cal_lucky_tile(self, win_tiles, lucky_num):
		if lucky_num == 1:
			# 一码全中
			if len(self.tiles) > 0:
				final = self.tiles[0]
				self.tiles = self.tiles[1:]
				return [final], 10 if final == const.DRAGON_RED else final % 10
			else:
				return [], 0
		else:
			if win_tiles.count(const.DRAGON_RED) == 0:
				lucky_num += 1

			final = min(len(self.tiles), lucky_num)
			see_tiles = []
			count = 0
			for i in range(final):
				t = self.tiles[0]
				self.tiles = self.tiles[1:]
				see_tiles.append(t)
				if t in self.lucky_set:
					count += 1
			return see_tiles, count

	def swapTileToTop(self, tile):
		if tile in self.tiles:
			tileIdx = self.tiles.index(tile)
			self.tiles[0], self.tiles[tileIdx] = self.tiles[tileIdx], self.tiles[0]

	def winCount(self):
		pass

	def canTenPai(self, handTiles):
		length = len(handTiles)
		if length % 3 != 1:
			return False

		result = []
		tryTuple = (const.CHARACTER, const.BAMBOO, const.DOT, const.WINDS, const.DRAGONS)
		for tup in tryTuple:
			for t in tup:
				tmp = list(handTiles)
				tmp.append(t)
				sorted(tmp)
				if utility.isWinTile(tmp, self.kingTiles):
					result.append(t)
		return result != []


	def can_cut_after_kong(self):
		return True

	def can_discard(self, tiles, t):
		if t in tiles:
			return True
		return False

	def can_chow(self, tiles, t):
		return	False
		# if t >= 30:
		# 	return False
		# neighborTileNumList = [0, 0, 1, 0, 0]
		# for i in range(len(tiles)):
		# 	if (tiles[i] - t >= -2 and tiles[i] - t <= 2):
		# 		neighborTileNumList[tiles[i] - t + 2] += 1
		# for i in range(0,3):
		# 	tileNum = 0
		# 	for j in range(i,i+3):
		# 		if neighborTileNumList[j] > 0:
		# 			tileNum += 1
		# 		else:
		# 			break
		# 	if tileNum >= 3:
		# 		return True
		# return False

	def can_chow_list(self, tiles, tile_list):
		return False
		# """ 能吃 """
		# if tile_list[0] >= 30:
		# 	return False
		# if sum([1 for i in tiles if i == tile_list[1]]) >= 1 and sum([1 for i in tiles if i == tile_list[2]]) >= 1:
		# 	sortLis = sorted(tile_list)
		# 	if (sortLis[2] + sortLis[0])/2 == sortLis[1] and sortLis[2] - sortLis[0] == 2:
		# 		return True
		# return False

	def can_pong(self, tiles, t):
		""" 能碰 """
		if t in self.kingTiles:
			return False
		return sum([1 for i in tiles if i == t]) >= 2

	def can_exposed_kong(self, tiles, t):
		""" 能明杠 """
		if t in self.kingTiles:
			return False
		return tiles.count(t) == 3

	def can_continue_kong(self, player, t):
		""" 能够风险杠 """
		if t in self.kingTiles:
			return False
		for op in player.op_r:
			if op[0] == const.OP_PONG and op[1][0] == t:
				return True
		return False

	def can_concealed_kong(self, tiles, t):
		""" 能暗杠 """
		if t in self.kingTiles:
			return False
		return tiles.count(t) == 4

	def can_kong_wreath(self, tiles, t):
		if t in tiles and (t in const.SEASON or t in const.FLOWER):
			return True
		return False

	def can_wreath_win(self, wreaths):
		if len(wreaths) == len(const.SEASON) + len(const.FLOWER):
			return True
		return False

	def getNotifyOpList(self, idx, aid, tile):
		# notifyOpList 和 self.wait_op_info_list 必须同时操作
		# 数据结构：问询玩家，操作玩家，牌，操作类型，得分，结果，状态
		notifyOpList = [[] for i in range(self.player_num)]
		self.wait_op_info_list = []
		#胡
		if aid == const.OP_KONG_WREATH and self.can_wreath_win(self.players_list[idx].wreaths): # 8花胡
			opDict = {"idx":idx, "from":idx, "tileList":[tile,], "aid":const.OP_WREATH_WIN, "score":0, "result":[], "state":const.OP_STATE_WAIT}
			notifyOpList[idx].append(opDict)
			self.wait_op_info_list.append(opDict)
		elif aid == const.OP_EXPOSED_KONG: #直杠 抢杠胡
			wait_for_win_list = self.getExposedKongWinList(idx, tile)
			self.wait_op_info_list.extend(wait_for_win_list)
			for i in range(len(wait_for_win_list)):
				dic = wait_for_win_list[i]
				notifyOpList[dic["idx"]].append(dic)
		elif aid == const.OP_CONTINUE_KONG: #碰后接杠 抢杠胡
			wait_for_win_list = self.getContinueKongWinList(idx, tile)
			self.wait_op_info_list.extend(wait_for_win_list)
			for i in range(len(wait_for_win_list)):
				dic = wait_for_win_list[i]
				notifyOpList[dic["idx"]].append(dic)
		elif aid == const.OP_DISCARD:
			#胡(放炮胡)
			wait_for_win_list = self.getGiveWinList(idx, tile)
			self.wait_op_info_list.extend(wait_for_win_list)
			for i in range(len(wait_for_win_list)):
				dic = wait_for_win_list[i]
				notifyOpList[dic["idx"]].append(dic)
			#杠 碰
			for i, p in enumerate(self.players_list):
				if p and i != idx:
					if self.can_exposed_kong(p.tiles, tile):
						opDict = {"idx":i, "from":idx, "tileList":[tile,], "aid":const.OP_EXPOSED_KONG, "score":0, "result":[], "state":const.OP_STATE_WAIT}
						self.wait_op_info_list.append(opDict)
						notifyOpList[i].append(opDict)
					if self.can_pong(p.tiles, tile):
						opDict = {"idx":i, "from":idx, "tileList":[tile,], "aid":const.OP_PONG, "score":0, "result":[], "state":const.OP_STATE_WAIT}
						self.wait_op_info_list.append(opDict)
						notifyOpList[i].append(opDict)
			#吃
			nextIdx = self.nextIdx
			if self.can_chow(self.players_list[nextIdx].tiles, tile):
				opDict = {"idx":nextIdx, "from":idx, "tileList":[tile,], "aid":const.OP_CHOW, "score":0, "result":[], "state":const.OP_STATE_WAIT}
				self.wait_op_info_list.append(opDict)
				notifyOpList[nextIdx].append(opDict)
		return notifyOpList

	def getExposedKongWinList(self, idx, tile):
		return []
		# wait_for_win_list = []
		# for i,p in enumerate(self.players_list):
		# 	if p is not None and i != idx:
		# 		# 抢直杠 卡张 必须卖宝
		# 		if p.discard_tiles and tile == p.discard_tiles[-1] and utility.getCanWinTiles(p.tiles) == [tile]:
		# 			DEBUG_MSG("getExposedKongWinList {}".format(i))
		# 			tryTiles = list(p.tiles)
		# 			tryTiles.append(tile)
		# 			tryTiles = sorted(tryTiles)
		# 			_, score, result = self.can_win(tryTiles, tile, const.OP_KONG_WIN, i)
		# 			wait_for_win_list.append({"idx":i, "from":idx, "tileList":[tile,], "aid":const.OP_KONG_WIN, "score":score, "result":result, "state":const.OP_STATE_WAIT})
		# 		else: # 平胡 可以 抢直杠
		# 			tryTiles = list(p.tiles)
		# 			tryTiles.append(tile)
		# 			tryTiles = sorted(tryTiles)
		# 			isWin, score, result = self.can_win(tryTiles, tile, const.OP_KONG_WIN, i)
		# 			if isWin and score == 1:
		# 				wait_for_win_list.append({"idx": i, "from": idx, "tileList": [tile, ], "aid": const.OP_KONG_WIN, "score": score,"result": result, "state": const.OP_STATE_WAIT})
		# return wait_for_win_list

	# 抢杠胡 玩家列表
	def getContinueKongWinList(self, idx, tile):
		wait_for_win_list = []
		for i in range(self.player_num - 1):
			ask_idx = (idx+i+1)%self.player_num
			p = self.players_list[ask_idx]
			tryTiles = list(p.tiles)
			tryTiles.append(tile)
			tryTiles = sorted(tryTiles)
			DEBUG_MSG("room:{},curround:{} getContinueKongWinList {}".format(self.roomID, self.current_round, ask_idx))
			is_win, score, result = self.can_win(tryTiles, tile, const.OP_KONG_WIN, ask_idx)
			if is_win:
				wait_for_win_list.append({"idx":ask_idx, "from":idx, "tileList":[tile,], "aid":const.OP_KONG_WIN, "score":score, "result":result, "state":const.OP_STATE_WAIT})
		return wait_for_win_list

	# 放炮胡 玩家列表
	def getGiveWinList(self, idx, tile):
		return []
		# wait_for_win_list = []
		# for i in range(self.player_num - 1):
		# 	ask_idx = (idx+i+1)%self.player_num
		# 	p = self.players_list[ask_idx]
		# 	tryTiles = list(p.tiles)
		# 	tryTiles.append(tile)
		# 	tryTiles = sorted(tryTiles)
		# 	DEBUG_MSG("getGiveWinList {0}".format(ask_idx))
		# 	is_win, score, result = self.can_win(tryTiles, tile, const.OP_GIVE_WIN, ask_idx)
		# 	if is_win:
		# 		wait_for_win_list.append({"idx":ask_idx, "from":idx, "tileList":[tile,], "aid":const.OP_GIVE_WIN, "score":score, "result":result, "state":const.OP_STATE_WAIT})
		# return wait_for_win_list

	def classify_tiles(self, tiles):
		chars = []
		bambs = []
		dots = []
		dragon_red = 0
		for t in tiles:
			if t in const.CHARACTER:
				chars.append(t)
			elif t in const.BAMBOO:
				bambs.append(t)
			elif t in const.DOT:
				dots.append(t)
			elif t == const.DRAGON_RED:
				dragon_red += 1
			else:
				DEBUG_MSG("iRoomRules classify tiles failed, no this tile %s" % t)
		return chars, bambs, dots, dragon_red

	def can_win(self, handTiles, finalTile, win_op, idx):
		""" 能胡牌 """
		quantity, result = 0, []
		if len(handTiles) % 3 != 2:
			return False, quantity, result

		tiles = sorted(handTiles)
		chars, bambs, dots, dragon_red = self.classify_tiles(tiles)

		c_need1 = utility.meld_only_need_num(chars)
		c_need2 = utility.meld_with_pair_need_num(chars)
		if c_need1 > dragon_red and c_need2 > dragon_red:
			return False, quantity, result

		b_need1 = utility.meld_only_need_num(bambs)
		b_need2 = utility.meld_with_pair_need_num(bambs)
		if b_need1 > dragon_red and b_need2 > dragon_red:
			return False, quantity, result

		d_need1 = utility.meld_only_need_num(dots)
		d_need2 = utility.meld_with_pair_need_num(dots)
		if d_need1 > dragon_red and d_need2 > dragon_red:
			return False, quantity, result

		if c_need2 + b_need1 + d_need1 <= dragon_red or \
			c_need1 + b_need2 + d_need1 <= dragon_red or \
			c_need1 + b_need1 + d_need2 <= dragon_red:
			return True, quantity, result
		return False, quantity, result

	def multiply_kong_win(self, op_list, tile):

		idx_list = [op["idx"] for op in op_list]
		DEBUG_MSG("multiply player kong_win:{}".format(idx_list))

		if len(idx_list) == 1:
			op = op_list[0]
			p = self.players_list[idx_list[0]]
			p.kong_win(op["tileList"][0], op["score"], op["result"])
		else:
			self.broadcastMultiOperation(idx_list, [const.OP_KONG_WIN] * len(idx_list), [tile, ])
			self.dealer_idx = idx_list[0]
			all_mem_tiles = []
			for idx in idx_list:
				p = self.players_list[idx]
				p.multiply_kong_win(tile)
				all_mem_tiles.extend(p.tiles)

			from_idx = op_list[0]["from"]

			lucky_tiles, hit = self.cal_lucky_tile(all_mem_tiles, self.lucky_num)
			for idx in idx_list:
				p = self.players_list[idx]
				if self.lucky_num == 1:
					p.score += (hit + 2) * 3
					self.players_list[from_idx].score -= (hit + 2) * 3
				else:
					p.score += 2 * (hit + 1) * 3
					self.players_list[from_idx].score -= 2 * (hit + 1) * 3

			self.settlement()
			info = dict()
			info['win_op'] = const.OP_KONG_WIN
			info['win_idx'] = idx_list
			info['lucky_tiles'] = lucky_tiles
			info['result_list'] = op_list[0]["result"]
			info['finalTile'] = tile
			info['from_idx'] = from_idx
			info['dealer_idx'] = self.dealer_idx
			if self.current_round < self.game_round:
				self.broadcastRoundEnd(info)
			else:
				self.endAll(info)