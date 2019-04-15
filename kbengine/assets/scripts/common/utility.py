# -*- coding: utf-8 -*-
import KBEngine
import random
import time
import re
import const
import copy
from datetime import datetime, timedelta
from KBEDebug import *
import hashlib
import AsyncRequest
import json
import switch
import x42

MELD_HISTORY = {}


def meld_with_pair_need_num(tiles, history=MELD_HISTORY):
	"""
	这个函数是赖子牌判断中最底层的函数, 尽量保证把万条筒中发白等分类出来(即保证清一色), 在扔到这里计算, 能够大幅提高效率
	:param tiles: 某个类型的牌, 比如清一色的万
	:param history: cache
	:return: 构成带将整扑所需要的赖子个数
	"""
	case1 = case2 = 999
	if meld_only_need_num(tiles, history) == 0:
		case1 = 2

	for i in tiles:
		tmp = list(tiles)
		if tiles.count(i) == 1:
			tmp.remove(i)
			case2 = min(case2, 1 + meld_only_need_num(tmp, history))
		else:
			tmp.remove(i)
			tmp.remove(i)
			case2 = min(case2, meld_only_need_num(tmp, history))

	return min(case1, case2)

def meld_only_need_num(tiles, history=MELD_HISTORY, used=0):
	"""
	这个函数是赖子牌判断中最底层的函数, 尽量保证把万条筒中发白等分类出来(即保证清一色), 在扔到这里计算, 能够大幅提高效率
	:param tiles: 某个类型的牌, 比如清一色的万
	:param history: cache
	:used: 已经使用的赖子个数
	:return: 构成带将整扑所需要的赖子个数
	"""
	if used > 4:
		return 999
	tiles = sorted(tiles)
	key = tuple(tiles)
	if key in history.keys():
		return history[key]

	size = len(tiles)
	if size == 0:
		return 0
	if size == 1:
		return 2
	if size == 2:
		p1, p2 = tiles[:2]
		case1 = 999
		if p1 < const.BOUNDARY and p2 - p1 <= 2:
			case1 = 1
		case2 = 0
		if p1 == p2:
			case2 = 1
		else:
			case2 = 4
		return min(case1, case2)

	first = tiles[0]
	# 自己组成顺子
	left1 = list(tiles[1:])
	case1 = 0
	if first >= const.BOUNDARY:
		case1 = 999
	else:
		if first+1 in left1:
			left1.remove(first+1)
		else:
			case1 += 1
		if first+2 in left1:
			left1.remove(first+2)
		else:
			case1 += 1
		res1 = meld_only_need_num(left1, history)
		history[tuple(left1)] = res1
		case1 += res1

	# 自己组成刻子
	left2 = list(tiles[1:])
	case2 = 0
	count = left2.count(first)
	if count >= 2:
		left2.remove(first)
		left2.remove(first)
	elif count == 1:
		left2.remove(first)
		case2 += 1
	else:
		case2 += 2
	res2 = meld_only_need_num(left2, history)
	history[tuple(left2)] = res2
	case2 += res2
	result = min(case1, case2)
	history[tuple(tiles)] = result
	return result


def getMeldNeed(handTiles):
	"""
	得到手牌中不含赖子牌之外的其他牌要凑成整扑(3*X)需要的赖子牌数
	:param handTiles: 手牌
	:return:
	"""
	tileList = classifyTiles(handTiles)
	tileList.pop(0)
	return sum(meld_only_need_num(t) for t in tileList)


def is_same_day(ts1, ts2):
	d1 = datetime.fromtimestamp(ts1)
	d2 = datetime.fromtimestamp(ts2)

	if (d1.year, d1.month, d1.day) == (d2.year, d2.month, d2.day):
		return True
	return False

def gen_uid(count):
	id_s = str(count)
	size = len(id_s)
	ran_num = pow(10, max(6 - size, 0))
	ran_fix = str(random.randint(ran_num, 10 * ran_num - 1))
	return int(ran_fix + id_s)

def gen_club_id(count):
	id_s = str(count)
	size = len(id_s)
	if size < 5:
		for i in range(1000):
			ran_num = pow(10, max(4 - size, 0))
			ran_fix = str(random.randint(ran_num, 10 * ran_num - 1))
			cid = int(ran_fix + id_s)
			if cid not in x42.ClubStub.clubs:
				return cid
	else:
		return count

def gen_room_id():
	if switch.DEBUG_BASE == 1:
		return 99999
	randomId = random.randint(10000, 99999)
	for i in range(89999):
		val = randomId + i
		if val > 99999:
			val = val%100000 + 10000
		if val not in KBEngine.globalData["GameWorld"].rooms:
			return val
	return 99999

def filter_emoji(nickname):
	try:
		# UCS-4
		highpoints = re.compile(u'[\U00010000-\U0010ffff]')
	except re.error:
		# UCS-2
		highpoints = re.compile(u'[\uD800-\uDBFF][\uDC00-\uDFFF]')
	nickname = highpoints.sub(u'', nickname)
	return nickname

def classifyTiles(tiles, kingTiles=None):
	kingTiles = kingTiles or []
	kings = []
	chars = []
	bambs = []
	dots = []
	winds = []
	dragons = []

	tiles = sorted(tiles)
	for t in tiles:
		if t in kingTiles:
			kings.append(t)
		elif t in const.CHARACTER:
			chars.append(t)
		elif t in const.BAMBOO:
			bambs.append(t)
		elif t in const.DOT:
			dots.append(t)
		elif t in const.WINDS:
			winds.append(t)
		elif t in const.DRAGONS:
			dragons.append(t)
	return [kings, chars, bambs, dots, winds, dragons]

def classifyWindTiles(tiles, kingTiles):
	kings = []
	handTiles = []

	tiles = sorted(tiles)
	for t in tiles:
		if t in kingTiles:
			kings.append(t)
		elif t in const.CHARACTER:
			handTiles.append(t)
		elif t in const.BAMBOO:
			handTiles.append(t)
		elif t in const.DOT:
			handTiles.append(t)
		elif t in const.WINDS:
			handTiles.append(t)
		elif t in const.DRAGONS:
			handTiles.append(t)
	return [kings, handTiles]

def classifyTiles4Type(tiles):
	chars = []
	bambs = []
	dots = []
	winds_dragons = []
	tiles = sorted(tiles)
	for t in tiles:
		if t in const.CHARACTER:
			chars.append(t)
		elif t in const.BAMBOO:
			bambs.append(t)
		elif t in const.DOT:
			dots.append(t)
		elif t in const.WINDS or t in const.DRAGONS:
			winds_dragons.append(t)
	return [chars, bambs, dots, winds_dragons]

def getTile2NumDict(tiles):
	tile2NumDict = {}
	for t in tiles:
		tile2NumDict[t] = tile2NumDict.get(t, 0) + 1
	return tile2NumDict

def getPairNum(tiles, isContainTriple = False, isContainKong = False):
	num = 0
	tile2NumDict = getTile2NumDict(tiles)
	for tile in tile2NumDict:
		if tile2NumDict[tile] == 2:
			num += 1
		elif tile2NumDict[tile] == 3 and isContainTriple:
			num += 1
		elif tile2NumDict[tile] == 4 and isContainKong:
			num += 2
	return num

def getKongNum(tiles):
	num = 0
	tile2NumDict = getTile2NumDict(tiles)
	for tile in tile2NumDict:
		if tile2NumDict[tile] == 4:
			num += 1
	return num

def getTileNum(tiles, aimTile):
	num = 0
	tile2NumDict = getTile2NumDict(tiles)
	if aimTile in tile2NumDict:
		num = tile2NumDict[aimTile]
	return num

def get_md5(data):
	m = hashlib.md5()
	m.update(data.encode())
	return m.hexdigest()

# 发送网络请求
def get_user_info(accountName, callback):
	ts = get_cur_timestamp()
	to_sign = accountName + "_" + str(ts) + "_" + switch.PHP_SERVER_SECRET
	sign = get_md5(to_sign)
	url = switch.PHP_SERVER_URL + 'user_info_server'
	suffix = '?timestamp=' + str(ts) + '&unionid=' + accountName + '&sign=' + sign
	AsyncRequest.Request(url + suffix, lambda x: callback(x))

def get_is_proxy(accountName, callback):
	ts = get_cur_timestamp()
	to_sign = accountName + "_" + str(ts) + "_" + switch.PHP_SERVER_SECRET
	sign = get_md5(to_sign)
	url = switch.PHP_SERVER_URL + 'is_proxy'
	suffix = '?timestamp=' + str(ts) + '&unionid=' + accountName + '&sign=' + sign
	AsyncRequest.Request(url + suffix, lambda x: callback(x))

def update_card_diamond(accountName, deltaCard, deltaDiamond, callback, reason = ""):
	ts = get_cur_timestamp()
	to_sign = accountName + "_" + str(ts) + "_" + str(deltaCard) + "_" + str(deltaDiamond) + "_" + switch.PHP_SERVER_SECRET
	# DEBUG_MSG("to sign::" + to_sign)
	sign = get_md5(to_sign)
	# DEBUG_MSG("MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_card_diamond'
	data = {
		"timestamp" : ts,
		"delta_card" : deltaCard,
		"delta_diamond" : deltaDiamond,
		"unionid" : accountName,
		"sign" : sign,
		"reason" : reason
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))

def update_card_diamond_aa(accountList, deltaCard, deltaDiamond, callback, reason=""):
	ts = get_cur_timestamp()
	account_json = json.dumps(accountList)
	to_sign = account_json + "_" + str(ts) + "_" + str(deltaCard) + "_" + str(deltaDiamond) + "_" + switch.PHP_SERVER_SECRET
	# DEBUG_MSG("to sign::" + to_sign)
	sign = get_md5(to_sign)
	# DEBUG_MSG("aa MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_card_diamond_aa'
	data = {
		"timestamp": ts,
		"delta_card": deltaCard,
		"delta_diamond": deltaDiamond,
		"unionids": account_json,
		"sign": sign,
		"reason": reason
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))

def update_valid_account(accountName, callback):
	to_sign = accountName + "_" + switch.PHP_SERVER_SECRET
	# DEBUG_MSG("to sign::" + to_sign)
	sign = get_md5(to_sign)
	# DEBUG_MSG("valid MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_valid'
	data = {
		"unionid": accountName,
		"sign": sign,
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))


def update_data_statistics(ts, avatar_num, online_num, room_num, callback):
	to_sign = const.GAME_NAME + "_" + str(ts) + "_" + str(avatar_num) + "_" + str(online_num) + "_" + str(room_num) + "_"  + switch.PHP_SERVER_SECRET
	# INFO_MSG("stats to sign::" + to_sign)
	sign = get_md5(to_sign)
	# INFO_MSG("stats MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_data_statistics'
	data = {
		"game_name": const.GAME_NAME,
		"timestamp": ts,
		"avatar_num": avatar_num,
		"online_num": online_num,
		"room_num": room_num,
		"sign": sign,
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))


def update_dau(dau, callback):
	ts = get_cur_timestamp()
	to_sign = const.GAME_NAME + "_" + str(ts) + "_" + str(dau) + "_" + switch.PHP_SERVER_SECRET
	INFO_MSG("dau to sign::" + to_sign)
	sign = get_md5(to_sign)
	INFO_MSG("dau MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_dau'
	data = {
		"game_name": const.GAME_NAME,
		"timestamp": ts,
		"num": dau,
		"sign": sign,
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))


#移除边 3张 不判断胡
def getRemoveEdgeDict(handTilesButKing, finalTile, kingTilesList = []):
	tiles = handTilesButKing[:]

	removeEdgeDict = {} # example: [-1, 2, 3]: 1

	if finalTile in kingTilesList:
		
		for t in const.LEFT_EDGE:
			edgeList = []
			if t-1 in tiles:
				edgeList.append(t-1)
			else:
				edgeList.append(-1)

			if t-2 in tiles:
				edgeList.append(t-2)
			else:
				edgeList.append(-1)
			edgeList.append(-1)
			key = tuple(edgeList)
			removeEdgeDict[key] = sum([1 for i in key if i == -1])

		for t in const.RIGHT_EDGE:
			edgeList = [-1]
			if t+1 in tiles:
				edgeList.append(t+1)
			else:
				edgeList.append(-1)

			if t+2 in tiles:
				edgeList.append(t+2)
			else:
				edgeList.append(-1)
			key = tuple(edgeList)
			removeEdgeDict[key] = sum([1 for i in key if i == -1])
	elif finalTile in const.LEFT_EDGE:
		edgeList = []
		if finalTile-1 in tiles:
			edgeList.append(finalTile-1)
		else:
			edgeList.append(-1)

		if finalTile-2 in tiles:
			edgeList.append(finalTile-2)
		else:
			edgeList.append(-1)
		edgeList.append(finalTile)
		key = tuple(edgeList)
		removeEdgeDict[key] = sum([1 for i in key if i == -1])
	elif finalTile in const.RIGHT_EDGE:
		edgeList = [finalTile]
		if finalTile+1 in tiles:
			edgeList.append(finalTile+1)
		else:
			edgeList.append(-1)

		if finalTile+2 in tiles:
			edgeList.append(finalTile+2)
		else:
			edgeList.append(-1)
		key = tuple(edgeList)
		removeEdgeDict[key] = sum([1 for i in key if i == -1])
	return removeEdgeDict
	

#移除夹 3张 不判断胡
def getRemoveMidDict(handTilesButKing, finalTile, kingTilesList = []):
	tiles = handTilesButKing[:]
	removeMidDict = {}

	if finalTile in kingTilesList:
		for midTuple in const.MID:
			for midTile in midTuple:
				midList = []
				if midTile-1 in tiles:
					midList.append(midTile-1)
				else:
					midList.append(-1)
				midList.append(-1)
				if midTile+1 in tiles:
					midList.append(midTile+1)
				else:
					midList.append(-1)

				key = tuple(midList)
				removeMidDict[key] = sum([1 for i in key if i == -1])
	elif finalTile in const.CHAR_MID or finalTile in const.DOT_MID or finalTile in const.BAMB_MID:
		midList = []
		if finalTile-1 in tiles:
			midList.append(finalTile-1)
		else:
			midList.append(-1)
		midList.append(finalTile)
		if finalTile+1 in tiles:
			midList.append(finalTile+1)
		else:
			midList.append(-1)

		key = tuple(midList)
		removeMidDict[key] = sum([1 for i in key if i == -1])
	return removeMidDict

#移除单吊 2张 不判断胡
def getRemoveSingleCraneDict(handTilesButKing, finalTile, kingTilesList = []):
	tiles = handTilesButKing[:]
	tile2NumDict = getTile2NumDict(tiles)
	removeSingleCraneDict = {}
	if finalTile in const.SEASON or finalTile in const.FLOWER:
		return removeSingleCraneDict

	if finalTile in kingTilesList:
		for t in tile2NumDict:
			key = (-1, t)
			removeSingleCraneDict[key] = sum([1 for i in key if i == -1])
		key = (-1, -1)
		removeSingleCraneDict[key] = sum([1 for i in key if i == -1])
	elif finalTile in tile2NumDict:
		if tile2NumDict[finalTile] == 1:
			key = (finalTile, -1)
			removeSingleCraneDict[key] = sum([1 for i in key if i == -1])
		elif tile2NumDict[finalTile] >= 2:
			key = (finalTile, finalTile)
			removeSingleCraneDict[key] = sum([1 for i in key if i == -1])
	return removeSingleCraneDict

#移除对倒 3张 不判断胡
def getRemoveMatchOrderDict(handTilesButKing, finalTile, kingTilesList = []):
	tiles = handTilesButKing[:]
	tile2NumDict = getTile2NumDict(tiles)
	matchOrderDict = {}
	if finalTile in const.SEASON or finalTile in const.FLOWER:
		return matchOrderDict

	if finalTile in kingTilesList:
		for t in tile2NumDict:
			if tile2NumDict[t] == 1:
				key = (-1, -1, t)
				matchOrderDict[key] = sum([1 for i in key if i == -1])
			elif tile2NumDict[t] >= 2:
				key = (-1, t, t)
				matchOrderDict[key] = sum([1 for i in key if i == -1])
		key = (-1, -1, -1)
		matchOrderDict[key] = sum([1 for i in key if i == -1])
	elif finalTile in tile2NumDict:
		if tile2NumDict[finalTile] == 1:
			key = (finalTile, -1, -1)
			matchOrderDict[key] = sum([1 for i in key if i == -1])
		elif tile2NumDict[finalTile] == 2:
			key = (finalTile, finalTile, -1)
			matchOrderDict[key] = sum([1 for i in key if i == -1])
		else:
			key = (finalTile, finalTile, finalTile)
			matchOrderDict[key] = sum([1 for i in key if i == -1])
	return matchOrderDict

def getTileColorType(handTilesButKing, uptiles):
	suitNumList = [0, 0, 0]
	honorNum = 0
	for t in handTilesButKing:
		if t in const.CHARACTER:
			suitNumList[0] = 1
		elif t in const.BAMBOO:
			suitNumList[1] = 1
		elif t in const.DOT:
			suitNumList[2] = 1
		elif t in const.DRAGONS or t in const.WINDS:
			honorNum = 1

	for meld in uptiles:
		for t in meld:
			if t in const.CHARACTER:
				suitNumList[0] = 1
			elif t in const.BAMBOO:
				suitNumList[1] = 1
			elif t in const.DOT:
				suitNumList[2] = 1
			elif t in const.DRAGONS or t in const.WINDS:
				honorNum = 1

	suitNum = sum([num for num in suitNumList])
	if suitNum > 1:
		return const.MIX_X_SUIT
	elif suitNum == 1:
		if honorNum == 1:
			return const.MIXED_ONE_SUIT
		else:
			return const.SAME_SUIT
	else:
		if honorNum == 1:
			return const.SAME_HONOR
		else:
			return const.MIX_X_SUIT

def checkIsPongPongWin(handTilesButKing, uptiles, kingTilesNum):
	for meld in uptiles:
		if (len(meld) != 3 and len(meld) != 4) or meld[0] != meld[-1]:
			return False
	tiles = handTilesButKing[:]
	tile2NumDict = getTile2NumDict(tiles)
	isDelete = False
	for t in tile2NumDict:
		if tile2NumDict[t] ==2:
			del tile2NumDict[t]
			isDelete = True
			break
	else:
		for t in tile2NumDict:
			if tile2NumDict[t] == 1:
				del tile2NumDict[t]
				kingTilesNum -= 1
				isDelete = True
				break
		else:
			for t in tile2NumDict:
				if tile2NumDict[t] == 4:
					del tile2NumDict[t]
					kingTilesNum -= 1
					isDelete = True
					break
			else:
				for t in tile2NumDict:
					if tile2NumDict[t] == 3:
						tile2NumDict[t] = 1
						isDelete = True
						break
	for t in tile2NumDict:
		needNum = abs(3-tile2NumDict[t])
		kingTilesNum -= needNum
	if not isDelete or kingTilesNum < 0:
		return False
	return True

def getDiscardNum(player_op_r):
	DEBUG_MSG("player_op_r {0}".format(player_op_r))
	drawNum = 0
	for i in range(len(player_op_r)-1, -1, -1):
		if player_op_r[i][0] == const.OP_DRAW:
			drawNum += 1
	return drawNum

# 杠上开花
def checkIsKongDrawWin(p_op_r):
	for i in range(len(p_op_r)-1, -1, -1):
		DEBUG_MSG(p_op_r[i])
		if p_op_r[i][0] == const.OP_DRAW or p_op_r[i][0] == const.OP_CUT:
			continue
		if p_op_r[i][0] == const.OP_CONCEALED_KONG:
			return True, 1
		elif p_op_r[i][0] == const.OP_EXPOSED_KONG:
			return True, 2
		elif p_op_r[i][0] == const.OP_KONG_WREATH:
			return True, 3
		elif p_op_r[i][0] == const.OP_CONTINUE_KONG:
			return True, 4
		return False, 0
	return False, 0

# 连杠开花
def checkIsSeriesKongWin(p_op_r):
	new_op_r = [0, 0, 0] #直杠，暗杠，风险杠
	kong_num = 0
	DEBUG_MSG("lianggang p_op_r: {0}".format(p_op_r))
	for i in range(len(p_op_r) - 1, -1, -1):
		if p_op_r[i][0] == 3 or kong_num > 2:
			DEBUG_MSG("##########")
			break

		if p_op_r[i][0] == const.OP_EXPOSED_KONG:
			new_op_r[0] += 1
			kong_num += 1
		elif p_op_r[i][0] == const.OP_CONCEALED_KONG:
			new_op_r[1] += 1
			kong_num += 1
		elif p_op_r[i][0] == const.OP_CONTINUE_KONG:
			new_op_r[2] += 1
			kong_num += 1		

	DEBUG_MSG("new_op_r: {0}".format(new_op_r))
	if sum([i for i in new_op_r if i > 0]) > 1:
		if new_op_r[1] == 2:
			return 1
		if new_op_r[1] == 1 and new_op_r[2] == 1:
			return 2
		if new_op_r[0] == 1 and new_op_r[2] == 1:
			return 3
		if new_op_r[2] == 2:
			return 4

	return 0

#手牌 台数
def getHandTileQuantity(handTilesButKing, p_wind, prevailing_wind):
	tile2NumDict = getTile2NumDict(handTilesButKing)
	quantity = 0
	for t in tile2NumDict:
		if t >= 3:
			if t == prevailing_wind: 	#圈风对应的 杠/刻
				quantity += 1
			if t == p_wind:				#位风对应的 杠/刻
				quantity += 1
	return quantity

#桌牌 台数
def getUpTileQuantity(uptiles, p_wind, prevailing_wind):
	quantity = 0
	for tileList in uptiles:
		if tileList[0] == prevailing_wind:  #圈风对应的 杠/刻
			quantity += 1
		if tileList[0] == p_wind:			#位风对应的 杠/刻
			quantity += 1
		if tileList[0] in const.DRAGONS:	#中发白对应的 杠/刻
			quantity += 1
	return quantity

#花台数
def getWreathQuantity(wreaths, p_wind):
	p_wind_index = const.WINDS.index(p_wind)
	seasonList = [0] * len(const.SEASON)
	flowerList = [0] * len(const.FLOWER)
	for t in wreaths:
		if t in const.SEASON:
			index = const.SEASON.index(t)
			seasonList[index] = 1
		elif t in const.FLOWER:
			index = const.FLOWER.index(t)
			flowerList[index] = 1

	quantity = 0
	stands = 0
	four_flower = False
	if len(wreaths) == 8: #春夏秋冬 梅兰竹菊 8张齐
		quantity = 500

	if sum([i for i in seasonList]) == 4 or sum([i for i in flowerList]) == 4: #春夏秋冬或者梅兰竹菊4张
		quantity = 150
		four_flower = True
	
	for i in range(4):
		if seasonList[i] == 1:
			if i == p_wind_index:
				stands += 2
			else:
				stands += 1
		if flowerList[i] == 1:
			if i == p_wind_index:
				stands += 2
			else:
				stands += 1
	return quantity, stands, four_flower

# 乱老头
def getAllColorType(uptiles , handTilesButKing):
	# if getTileColorType(handTilesButKing, uptiles) == const.SAME_HONOR:
	# 	return False
	allTypeTiles = const.CHARACTER[:]
	allTypeTiles.extend(const.BAMBOO)	
	allTypeTiles.extend(const.DOT)
	for i in range(len(uptiles)):
		if uptiles[i][0] in allTypeTiles:
			return False
	for i in range(len(handTilesButKing)):
		if handTilesButKing[i] in allTypeTiles:
			return False
	return True

# 正风为2台
def checkIsSitWind(wind_tile, upTiles, handTiles, handTilesButKing, kingTilesNum, kingTiles):
	wind_count = 0
	for i in range(len(upTiles)):
		if wind_tile == upTiles[i][0]:
			return 1

	for i in range(len(handTilesButKing)):
		if wind_tile == handTilesButKing[i]:
			wind_count += 1
	wind_handTiles = handTiles[:]
	need_num = 3 - wind_count
	splice_num = 0
	if wind_count == 3:
		return 1
	elif kingTilesNum >= need_num and need_num != 3:
		for j in range(len(wind_handTiles)-1, -1, -1):
			if wind_tile == wind_handTiles[j]:
				del wind_handTiles[j]
		for j in range(len(wind_handTiles)-1, -1, -1):
			if wind_handTiles[j] in kingTiles:
				del wind_handTiles[j]
				splice_num += 1
				if splice_num == need_num:
					break
					
		wind_tiles_info = classifyWindTiles(wind_handTiles, kingTiles)
		wind_kings = wind_tiles_info[0]
		wind_tiles = wind_tiles_info[1]
		wind_need_tiles1 = meld_only_need_num(wind_tiles)
		wind_need_tiles2 = meld_with_pair_need_num(wind_tiles)
		# DEBUG_MSG("dragon_need_tiles : {0}".format(wind_need_tiles))
		if wind_need_tiles1 > len(wind_kings) and wind_need_tiles2 > len(wind_kings):					
			DEBUG_MSG("&&&&&&&&&&&&&&")
			return 0
		else:
			kingTilesNum = kingTilesNum - need_num
			return 1
	return 0

# 判断东风碰出
def checkIsEastWind(wind_tile, upTiles, handTiles, handTilesButKing, kingTilesNum, kingTiles):
	wind_count = 0
	for i in range(len(upTiles)):
		if wind_tile == upTiles[i][0]:
			return 1

	for i in range(len(handTilesButKing)):
		if wind_tile == handTilesButKing[i]:
			wind_count += 1
	wind_handTiles = handTiles[:]			
	need_num = 3 - wind_count
	splice_num = 0
	if wind_count == 3:
		return 1
	elif kingTilesNum >= need_num and need_num != 3:
		for j in range(len(wind_handTiles)-1, -1, -1):
			if wind_tile == wind_handTiles[j]:
				del wind_handTiles[j]
		for j in range(len(wind_handTiles) - 1, -1, -1):
			if wind_handTiles[j] in kingTiles:
				del wind_handTiles[j]
				splice_num += 1
				if splice_num == need_num:
					break
					
		wind_tiles_info = classifyWindTiles(wind_handTiles, kingTiles)
		wind_kings = wind_tiles_info[0]
		wind_tiles = wind_tiles_info[1]
		wind_need_tiles1 = meld_only_need_num(wind_tiles)
		wind_need_tiles2 = meld_with_pair_need_num(wind_tiles)
		# DEBUG_MSG("dragon_need_tiles : {0}".format(wind_need_tiles))
		if wind_need_tiles1 > len(wind_kings) and wind_need_tiles2 > len(wind_kings):					
			DEBUG_MSG("&&&&&&&&&&&&&&")
			return 0
		else:
			kingTilesNum = kingTilesNum - need_num
			return 1
	return 0

def checkIsWordColor(upTiles, handTiles, handTilesButKing, kingTilesNum, kingTiles):
	wind_dragon = [const.DRAGON_RED, const.DRAGON_GREEN, const.DRAGON_WHITE]
	dragon_count = [0, 0, 0]	
	kingNum = kingTilesNum
	stand = 0
	dragon_type = [0, 0, 0]
	for i in range(len(wind_dragon)):
		for k in range(len(upTiles)):
			if wind_dragon[i] == upTiles[k][0]:
				stand += 1
				dragon_type[i] = 1
				DEBUG_MSG("zuopai hanyou san ge zi 11111")
		hand_count = 0
		for j in range(len(handTilesButKing)):
			if wind_dragon[i] == handTilesButKing[j]:
				dragon_count[i] += 1
	# DEBUG_MSG("dragon_count :{0}".format(dragon_count))
	dragon_handTiles = handTiles[:]	
	for i in range(len(dragon_count)):
		if dragon_count[i] == 3:
			stand += 1
			dragon_type[i] = 1
			DEBUG_MSG("shoupai hanyou san ge zi 22222")
			continue		
		need_kingtile_num = 3 - dragon_count[i]
		splice_kingtile_num = 0
		# DEBUG_MSG("dragon_handTiles : {0}".format(dragon_handTiles))
		# DEBUG_MSG("kingNum : {0}, need_kingtile_num : {1}".format(kingNum, need_kingtile_num))
		if dragon_count[i] != 0 and kingNum >= need_kingtile_num:
			for j in range(len(dragon_handTiles)-1, -1, -1):
				if wind_dragon[i] == dragon_handTiles[j]:
					del dragon_handTiles[j]
			for j in range(len(dragon_handTiles)-1, -1, -1):
				if dragon_handTiles[j] in kingTiles:
					del dragon_handTiles[j]
					splice_kingtile_num += 1
					kingNum -= 1
					if splice_kingtile_num == need_kingtile_num:
						break
			dragon_tiles_info = classifyWindTiles(dragon_handTiles, kingTiles)
			dragon_kings = dragon_tiles_info[0]
			dragon_tiles = dragon_tiles_info[1]
			dragon_need_tiles1 = meld_only_need_num(dragon_tiles)
			dragon_need_tiles2 = meld_with_pair_need_num(dragon_tiles)
			# DEBUG_MSG("dragon_need_tiles1: {0} , dragon_need_tiles2: {1}".format(dragon_need_tiles1, dragon_need_tiles2))
			if dragon_need_tiles1 > len(dragon_kings) and dragon_need_tiles2 > len(dragon_kings):					
				DEBUG_MSG("===========")
			else:
				stand += 1
				dragon_type[i] = 1
				DEBUG_MSG("shoupai hanyou san ge zi 33333")
	return stand, dragon_type


# 七对头
def get7DoubleWin(handTiles, handTilesButKing, kingTilesNum, lastTile):
	if len(handTiles) != 14:
		return False, False, False
	tileDict = getTile2NumDict(handTilesButKing)
	need_kingtiles_num = 0
	isBrightTiles = False
	isDarkTiles = False
	for tile in tileDict:
		need_kingtiles_num  += tileDict[tile] % 2
		if tileDict[tile] == 4:			
			if tile == lastTile:
				isBrightTiles = True
			else:
				isDarkTiles = True
	DEBUG_MSG("get7DoubleWin {0}, {1}".format(need_kingtiles_num,kingTilesNum))
	if kingTilesNum == need_kingtiles_num or need_kingtiles_num == 0:
		return True, isBrightTiles, isDarkTiles
	else:
		return False, False, False

def getStarType(handTilesButKing, kingTileDict, finalTile, isDrawWin): # kingTileDict = {1:3, 5:0}
	kingTilesNum = sum([kingTileDict[val] for val in kingTileDict])
	if len(handTilesButKing) + kingTilesNum != 14: # 不是14张
		return []
	if len(getTile2NumDict(handTilesButKing)) != len(handTilesButKing): # 有重叠牌
		return []
	classifyList = classifyTiles4Type(handTilesButKing)
	char_dict = getTile2NumDict(classifyList[0])
	bamboo_dict = getTile2NumDict(classifyList[1])
	dot_dict = getTile2NumDict(classifyList[2])
	wind_dragon_dict = getTile2NumDict(classifyList[3])
	# 超过类型数量
	if len(char_dict) > 3 or len(bamboo_dict) > 3 or len(dot_dict) > 3 or len(wind_dragon_dict) > 7:
		return []

	suitList = [char_dict, bamboo_dict, dot_dict]
	suitList = sorted(suitList, key = lambda x:len(x), reverse = True)
	# 是否匹配
	def check_is_match(tryList):
		for i in range(len(tryList)-1, -1, -1):
			if i >= 1 and tryList[i] - tryList[i-1] < 3:
				return False
		return True

	# 填充数量
	def fill(tryList, kingTilesNum):
		fillList = tryList[:]
		for i in range(1,10):
			if sum([1 for val in fillList if abs(val - i) < 3]) <= 0:
				if kingTilesNum <= 0:
					break
				fillList.append(i)
				fillList = sorted(fillList)
				kingTilesNum -= 1	
		return fillList, kingTilesNum
	# 7星类型
	def sevenStar(suitList, kingTilesNum, isDrawWin):
		for cellDict in suitList:
			keyList = [i%10 for i in cellDict]
			keyList = sorted(keyList)
			if not check_is_match(keyList):
				return []
			fillList, kingTilesNum = fill(keyList, kingTilesNum)
		if kingTilesNum > 0:
			return []
		# 明7星/暗7星
		if sum([1 for cellDict in suitList if len(cellDict) <= 0]) > 0: #缺色
			if not isDrawWin and (finalTile in const.DRAGONS or finalTile in const.WINDS): # 明7星
				return [const.STAR_7_LIGHT_MISS_SUIT]
			else:
				return [const.STAR_7_SHADE_MISS_SUIT]
		else:
			if not isDrawWin and (finalTile in const.DRAGONS or finalTile in const.WINDS): # 明7星
				return [const.STAR_7_LIGHT]
			else:
				return [const.STAR_7_SHADE]
	# 7星
	if len(wind_dragon_dict) == 7:
		return sevenStar(suitList, kingTilesNum, isDrawWin)
	# 财神归位 7星
	try_wind_dragon_dict = copy.deepcopy(wind_dragon_dict)
	try_king_tiles_num = kingTilesNum
	for t in kingTileDict:
		if kingTileDict[t] > 0 and (t in const.DRAGONS or t in const.WINDS) and t not in try_wind_dragon_dict:
			try_wind_dragon_dict[t] = 1
			try_king_tiles_num -= 1
	if len(try_wind_dragon_dict) == 7:
		result = sevenStar(suitList, try_king_tiles_num, isDrawWin)
		if len(result) > 0:
			return result

	def notMatchStar(suitList, kingTilesNum, is7Star):
		for cellDict in suitList:
			keyList = [i%10 for i in cellDict]
			keyList = sorted(keyList)
			if not check_is_match(keyList):
				return []
			fillList, kingTilesNum = fill(keyList, kingTilesNum)
		if kingTilesNum > 0:
			return []
		if is7Star and sum([1 for cellDict in suitList if len(cellDict) <= 0]) > 0: # 7星 缺色
			return [const.STAR_LESS_7_MISS_SUIT]
		else:
			return [const.STAR_LESS_7]

	# 非7星 (财神优先填充字牌)
	rest_king_tiles_num = kingTilesNum - (7-len(wind_dragon_dict)) if len(wind_dragon_dict) + kingTilesNum > 7 else 0
	if len(wind_dragon_dict) + kingTilesNum >= 7:
		return notMatchStar(suitList, rest_king_tiles_num, True)
	else:
		return notMatchStar(suitList, rest_king_tiles_num, False)


def getRemoveTwoSides(handTilesButKing, finalTile, kingTilesNum, kingTiles):
	if finalTile in kingTiles:
		return False
	handtiles = handTilesButKing[:]
	twoSides = []
	twoSidesUp = []
	twoSidesDown = []
	if (finalTile + 1) in handtiles and (finalTile + 2) in handtiles:
		twoSidesUp.append(finalTile + 1)
		twoSidesUp.append(finalTile + 2)
		DEBUG_MSG("getRemoveTwoSides  11111")
	if (finalTile - 1) in handtiles and (finalTile - 2) in handtiles:
		twoSidesDown.append(finalTile - 1)
		twoSidesDown.append(finalTile - 2)
		DEBUG_MSG("getRemoveTwoSides  22222")

	handtiles.remove(finalTile)
	twoSides.append(twoSidesUp)
	twoSides.append(twoSidesDown)
	DEBUG_MSG("twoSides: {0}".format(twoSides))
	for i in range(len(twoSides)):
		handTwotiles = handtiles[:]
		if len(twoSides[i]) == 2:
			for j in range(len(twoSides[i])):
				for k in range(len(handTwotiles) - 1, -1, -1):
					if twoSides[i][j] == handTwotiles[k]:
						del handTwotiles[k]
		DEBUG_MSG("handTwotiles: {0}".format(handTwotiles))
		if meld_with_pair_need_num(handTwotiles, {}) <= kingTilesNum:
			return True
		else:
			continue
	return False

def getCheckWinThorw(handTiles, finalTile, kingTiles):
	if finalTile in kingTiles:
		return False
	kingTile = kingTiles[0]
	newHandTiles = handTiles[:]
	newHandTiles.remove(finalTile)
	newHandTiles.remove(kingTile)

	newHandTiles = sorted(newHandTiles)
	classifyList = classifyTiles(newHandTiles, kingTiles)  
	kingTilesNum = len(classifyList[0])  #百搭的数量
	handTilesButKing = []  #除百搭外的手牌
	for i in range(1, len(classifyList)):
		handTilesButKing.extend(classifyList[i])

	if getMeldNeed(handTilesButKing) <= kingTilesNum:
		return True
	return False

# 获取测试模式 初始信息
def getDebugPrefab(owner, callback):
	ts = int(time.mktime(datetime.now().timetuple()))
	url = '{}?timestamp={}&from=py&game={}&owner={}'.format(switch.PHP_DEBUG_URL, ts, const.DEBUG_JSON_NAME, owner)
	AsyncRequest.Request(url, lambda x: callback(x))

def validTile(t):
	return any(t in tiles for tiles in const.VALID_TILES)

def getCanWinTiles(handTiles):
	result = []
	if (len(handTiles) % 3 != 1):
		return result

	tryTuple = (const.CHARACTER, const.BAMBOO, const.DOT, const.WINDS, const.DRAGONS)
	for tup in tryTuple:
		for t in tup:
			tmp = list(handTiles)
			tmp.append(t)
			tmp = sorted(tmp)
			if canWinWithoutKing(tmp):
				result.append(t)

	return result

def isWinTile(handTiles, kingTiles):
	length = len(handTiles)
	if length % 3 != 2:
		return False

	handCopyTiles = list(handTiles)
	handCopyTiles = sorted(handCopyTiles)
	classifyList = classifyTiles(handCopyTiles, kingTiles)
	kingTilesNum = len(classifyList[0])  # 百搭的数量
	handTilesButKing = []  # 除百搭外的手牌
	for i in range(1, len(classifyList)):
		handTilesButKing.extend(classifyList[i])

	is7Double, _, _ = get7DoubleWin(handCopyTiles, handTilesButKing, kingTilesNum + 1, 0)
	if is7Double:
		return True
	normalWin = canWinWithoutKing(handCopyTiles)
	return normalWin


def canWinWithKing(handTiles, kingTiles):
	"""
	Attention: 正常的胡牌(3N + 2, 有赖子牌), 七对胡那种需要特殊判断, 这里不处理
	:param handTiles: 手牌
	:param kingTiles: 赖子牌列表
	:return: True or False
	"""
	if len(handTiles) % 3 != 2:
		return False

	kings, chars, bambs, dots, winds, dragons = classifyTiles(handTiles, kingTiles)
	kingTilesNum = len(kings)
	others = [chars, bambs, dots, winds, dragons]
	meld_need = []
	mos = mps = 0
	for tiles in others:
		mo = meld_only_need_num(tiles)
		mp = meld_with_pair_need_num(tiles)
		mos += mo
		mps += mp
		meld_need.append((mo, mp))

	for mo, mp in meld_need:
		if mp + (mos - mo) <= kingTilesNum:
			return True
	return False


def canWinWithoutKing(handTiles):
	"""
	Attention: 正常的的胡牌(3N + 2, 没有赖子), 七对胡那种需要特殊判断, 这里不处理
	:param handTiles: 手牌
	:return: True or False
	"""
	if len(handTiles) % 3 != 2:
		return False

	_, chars, bambs, dots, winds, dragons = classifyTiles(handTiles)
	hasPair = False

	for w in const.WINDS:
		n = winds.count(w)
		if n == 1:
			return False
		elif n == 2:
			if hasPair:
				return False
			hasPair = True
		else:
			continue

	for d in const.DRAGONS:
		n = dragons.count(d)
		if n == 1:
			return False
		elif n == 2:
			if hasPair:
				return False
			hasPair = True
		else:
			continue

	tiles = chars + bambs + dots
	if (hasPair):
		return isMeld(tiles)
	else:
		return isMeldWithPair(tiles)


def isMeld(tiles):
	if (len(tiles) % 3 != 0):
		return False

	tilesCopy = sorted(tiles)
	total = sum(tiles)
	magic = total % 3
	if magic == 0:
		while (len(tilesCopy) >= 3):
			left = tilesCopy[0]
			n = tilesCopy.count(left)
			tilesCopy.remove(left)
			if n == 1:
				# 移除一个顺子
				if left + 1 in tilesCopy:
					tilesCopy.remove(left + 1)
				else:
					return False
				if left + 2 in tilesCopy:
					tilesCopy.remove(left + 2)
				else:
					return False
			elif n == 2:
				# 移除两个顺子
				tilesCopy.remove(left)
				if tilesCopy.count(left + 1) >= 2:
					tilesCopy.remove(left + 1)
					tilesCopy.remove(left + 1)
				else:
					return False
				if tilesCopy.count(left + 2) >= 2:
					tilesCopy.remove(left + 2)
					tilesCopy.remove(left + 2)
				else:
					return False
			else:
				# 移除一个刻子
				tilesCopy.remove(left)
				tilesCopy.remove(left)

	return len(tilesCopy) == 0


def isMeldWithPair(tiles):
	if (len(tiles) % 3 != 2):
		return False

	total = sum(tiles)
	magic = total % 3
	if magic == 0:
		possible = [3, 6, 9, 33, 36, 39, 51, 54, 57]
		return checkMeldInPossible(tiles, possible)
	elif magic == 1:
		possible = [2, 5, 8, 32, 35, 38, 53, 56, 59]
		return checkMeldInPossible(tiles, possible)
	elif magic == 2:
		possible = [1, 4, 7, 31, 34, 37, 52, 55, 58]
		return checkMeldInPossible(tiles, possible)
	return False


def checkMeldInPossible(tiles, possibleList):
	for i in possibleList:
		if tiles.count(i) >= 2:
			tmp = list(tiles)
			tmp.remove(i)
			tmp.remove(i)
			if isMeld(tmp):
				return True
	return False


def get_cur_timestamp():
	return int(time.time())

def get_seconds_till_n_days_later(begin, day, hour=0, minute=0, second=0):
	""" 获取第几天后的几点几分几秒的delta_time """
	dt = timedelta(days=day, hours=hour - begin.hour, minutes=minute - begin.minute, seconds=second - begin.second)
	seconds = dt.total_seconds()
	seconds = 0 if seconds <= 0 else seconds
	return seconds

def getRoomParams(create_dict):
	# @formatter:off
	return {
		'lucky_num'		: create_dict['lucky_num'],
		'game_round'	: create_dict['game_round'],
		'hand_prepare'	: create_dict['hand_prepare'],
		'pay_mode'		: create_dict['pay_mode'],
		'room_type'		: create_dict['room_type'],
	}
	# @formatter:on


def isValidUid(uid):
	if not isinstance(uid, int):
		return False
	if len(str(uid)) != 7:
		return False
	return True
