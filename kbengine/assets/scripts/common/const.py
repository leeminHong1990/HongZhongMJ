# -*- coding: utf-8 -*-

HTTP_SERVER_IP = 'qxjoy.cn'
HTTP_DEBUG_SERVER_IP = '112.124.111.15'

GAME_NAME = "GXMJ"

DEBUG_JSON_NAME = "0015hzmj"

TABLE_GAME_RECORD_NAME = "cus_record"

SERVER_REFRESH_TIME = [3,0,0]


PLAYER_DISCARD_WAIT_TIME 							= 12 	# 玩家摸一张牌后, 打牌的等待时间45
ROOM_EXIST_TIME 									= 3600  # 每一局房间的时间，时间结束房间不销毁
DISMISS_ROOM_WAIT_TIME 								= 90	# 申请解散房间后等待的时间, 单位为秒

Latitude_Division = 1 # 维度在半球上的划分
Longitude_Division = 2 # 经度在半球上的划分

LOGIN_OPERATION = 3
GM_OPERATION = 4
CLIENT_OPERATION = 19

ONEDAY_TIME = 24 * 60 * 60

# 关服时GameWorld的状态
DESTROY_PROCESS_BEGIN = 1	# 开始关服处理
DESTROY_PROCESS_END = 2		# 关服处理完成
DESTROY_PROCESS_TIME = 30	# GameWorld关服处理超时时间, 超过此时间, 强制关服

##########################################

# 房间玩家数
ROOM_PLAYER_NUMBER = 4

# 初始手牌数目
INIT_TILE_NUMBER = 13

# 房间操作id #
OP_PASS             = 8 		#0b0001000 过
OP_DRAW             = 16 		#0b0010000 摸
OP_DISCARD          = 24 		#0b0011000 打
OP_CHOW             = 32 		#0b0100000 吃
OP_PONG             = 40 		#0b0101000 碰
OP_KONG_WREATH      = 48 		#0b0110000 杠花
OP_EXPOSED_KONG     = 56 		#0b0111000 明杠
OP_CONTINUE_KONG    = 57 		#0b0111001 碰后接杠
OP_CONCEALED_KONG   = 58 		#0b0111010 暗杠
OP_POST_KONG        = 64 		#0b1000000 放杠
OP_GET_KONG         = 72		#0b1001000 接杠
OP_CUT              = 80		#0b1010000 杠后切牌
OP_READY            = 88 		#0b1011000 听牌
OP_DRAW_END         = 96		#0b1100000 流局
OP_DRAW_WIN         = 104		#0b1101000 自摸胡
OP_KONG_WIN         = 105		#0b1101001 抢杠胡
OP_WREATH_WIN       = 106		#0b1101010 杠花胡
OP_GIVE_WIN		  	= 107		#0b1101011 放炮胡

# OP_SPECIAL_DISCARD_FORCE = 1 << 0

SHOW_CHOW 	= 4
SHOW_PONG 	= 5
SHOW_KONG 	= 7
SHOW_WIN 	= 13
SHOW_PASS 	= 1
SHOW_OP_LIST = [SHOW_CHOW, SHOW_PONG, SHOW_KONG, SHOW_WIN, SHOW_PASS] # 吃 碰 杠 胡 过

OP2STR = {
	OP_PASS             : 'pass', 				# 过
	OP_DRAW             : 'draw', 				# 摸
	OP_DISCARD          : 'discard', 			# 打
	OP_CHOW             : 'chow', 				# 吃
	OP_PONG             : 'pong', 				# 碰
	OP_KONG_WREATH     	: 'kong_wreath', 		# 杠花
	OP_EXPOSED_KONG     : 'exposed_kong', 		# 明杠(直杠)
	OP_CONTINUE_KONG    : 'continue_kong',		# 碰后接杠
	OP_CONCEALED_KONG   : 'concealed_kong', 	# 暗杠
	# OP_POST_KONG        : 'post_kong', 		# 放杠
	# OP_GET_KONG         : 'get_kong',			# 接杠
	OP_CUT  	        : 'cut',				# 杠后切牌
	OP_READY            : 'ready', 				# 听牌
	OP_DRAW_END         : 'draw_end',			# 流局
	OP_DRAW_WIN         : 'draw_win',			# 自摸胡
	OP_KONG_WIN         : 'kong_win',			# 抢杠胡
	OP_WREATH_WIN  		: 'wreath_win',			# 杠花胡
	OP_GIVE_WIN  		: 'give_win',			# 放炮胡
}

#服务端 投票 状态机
OP_STATE_PASS 		= 0		#放弃操作
OP_STATE_WAIT 		= 1		#等待确认
OP_STATE_SURE 		= 2		#确认操作

#玩家 出牌 状态机
DISCARD_FREE 		= 0 	# 玩家自由出牌
DISCARD_FORCE 		= 1 	# 强制玩家出牌 (摸什么打什么 不吃 不碰 直到胡为止)

#是否一炮多响
MULTIPLY_WIN = True

#牌局状态
ROOM_WAITING 		= 0 	# 游戏未开始
ROOM_PLAYING 		= 1		# 游戏中
ROOM_TRANSITION 	= 2  	# 游戏过渡状态 从等待切换到开始的中间值

#清字混一色
MIX_X_SUIT 			= 0
SAME_SUIT 			= 1 		# 清一色
SAME_HONOR 			= 2 		# 字一色
MIXED_ONE_SUIT 		= 3 		# 混一色

NOT_GIVE_UP = 0
GIVE_UP = 1
WAIT_GIVE_UP = 2

CHARACTER	= (1, 2, 3, 4, 5, 6, 7, 8, 9)				# 万
BAMBOO		= (31, 32, 33, 34, 35, 36, 37, 38, 39)		# 条
DOT			= (51, 52, 53, 54, 55, 56, 57, 58, 59)		# 筒
WINDS 		= (71, 72, 73, 74)							# 东, 南, 西, 北
DRAGONS 	= (75, 76, 77)								# 中, 发, 白
SEASON 		= (91, 92, 93, 94)							# 春, 夏, 秋, 冬
FLOWER 		= (95, 96, 97, 98)							# 梅, 兰, 竹, 菊

# 顺子分界(小于可以组成顺子)
BOUNDARY = 60

VALID_TILES = (CHARACTER, BAMBOO, DOT, WINDS, DRAGONS)

CHAR1, CHAR2, CHAR3, CHAR4, CHAR5, CHAR6, CHAR7, CHAR8, CHAR9 	= CHARACTER # 万
BAMB1, BAMB2, BAMB3, BAMB4, BAMB5, BAMB6, BAMB7, BAMB8, BAMB9 	= BAMBOO    # 条
DOT1,  DOT2,  DOT3,  DOT4,  DOT5,  DOT6,  DOT7,  DOT8,  DOT9  	= DOT 		# 筒
WIND_EAST, WIND_SOUTH, WIND_WEST, WIND_NORTH					= WINDS 	# 东, 南, 西, 北
DRAGON_RED, DRAGON_GREEN, DRAGON_WHITE 							= DRAGONS 	# 中, 发, 白
SEASON_SPRING, SEASON_SUMMER, SEASON_AUTUMN, SEASON_WINTER 		= SEASON 	# 春, 夏, 秋, 冬
FLOWER_PLUM, FLOWER_ORCHID, FLOWER_BAMBOO, FLOWER_CHRYSANTHEMUM	= FLOWER 	# 梅, 兰, 竹, 菊

#字牌
WINDS_DRAGONS = (WIND_EAST, WIND_SOUTH, WIND_WEST, WIND_NORTH, DRAGON_RED, DRAGON_GREEN, DRAGON_WHITE)
#花牌
WREATH = (SEASON_SPRING, SEASON_SUMMER, SEASON_AUTUMN, SEASON_WINTER, FLOWER_PLUM, FLOWER_ORCHID, FLOWER_BAMBOO, FLOWER_CHRYSANTHEMUM)

LUCKY_TUPLE = ([CHAR1, BAMB1, DOT1, CHAR5, BAMB5, DOT5, CHAR9, BAMB9, DOT9, WIND_EAST, DRAGON_RED],
	[CHAR2, BAMB2, DOT2, CHAR6, BAMB6, DOT6, WIND_SOUTH, DRAGON_GREEN],
	[CHAR3, BAMB3, DOT3, CHAR7, BAMB7, DOT7, WIND_WEST, DRAGON_WHITE],
	[CHAR4, BAMB4, DOT4, CHAR8, BAMB8, DOT8, WIND_NORTH], )

TRY_READY = (CHARACTER, BAMBOO, DOT, WINDS, DRAGONS)

#边
LEFT_EDGE = (CHAR3, DOT3, BAMB3)
RIGHT_EDGE = (CHAR7, DOT7, BAMB7)
#夹
CHAR_MID = (CHAR2, CHAR3, CHAR4, CHAR5, CHAR6, CHAR7, CHAR8)
DOT_MID = (DOT2,  DOT3,  DOT4,  DOT5,  DOT6,  DOT7,  DOT8)
BAMB_MID = (BAMB2, BAMB3, BAMB4, BAMB5, BAMB6, BAMB7, BAMB8)
MID = (CHAR_MID, DOT_MID, BAMB_MID)

# 定义一些错误码
OP_ERROR_NOT_CURRENT    = 1 # 非当前控牌玩家
OP_ERROR_ILLEGAL        = 2 # 操作非法
OP_ERROR_TIMEOUT        = 3 # 操作超时
OP_ERROR_STATE			= 4 # 房间状态不正确
OP_ERROR_VOTE			= 5 # 房间正在投票中
##########################################

# 牌局战绩保存上限
MAX_HISTORY_RESULT = 10
# 代理开房上限
AGENT_ROOM_LIMIT = 10
# 代理开房完成记录保存上限
COMPLETE_ROOM_LIMIT = 10

# 创建房间失败错误码
CREATE_FAILED_NO_ENOUGH_CARDS = -1 # 房卡不足
CREATE_FAILED_ALREADY_IN_ROOM = -2 # 已经在房间中
CREATE_FAILED_AGENT_ROOM_LIMIT = -3 # 代开房达到上限
CREATE_FAILED_NET_SERVER_ERROR = -4  # 访问外部网络结果失败
CREATE_FAILED_PERMISSION_DENIED	= -5 # 不是代理, 不能代开房

CREATE_FAILED_OTHER = -9

# 进入房间失败错误码
ENTER_FAILED_ROOM_NO_EXIST				= -1 # 房间不存在
ENTER_FAILED_ROOM_FULL					= -2 # 房间已经满员
ENTER_FAILED_ROOM_DIAMOND_NOT_ENOUGH	= -3 # 进入AA制付费房间时，钻石不足
ENTER_FAILED_NOT_CLUB_MEMBER			= -4 # 不是茶楼成员
ENTER_FAILED_ALREADY_IN_ROOM 			= -5 # 已经在房间中
ENTER_FAILED_ROOM_DESTROYED 			= -9 # 房间已经销毁


# 进入房间失败错误码
QUIT_FAILED_ROOM_STARTED				= -1 # 房间已经开始游戏

###########################################
# 签到相关 #
SIGN_IN_ACHIEVEMENT_DAY = 10 # 签到几天得奖励
SIGN_IN_ACHIEVEMENT_NUM = 1  # 奖励几张房卡
###########################################

BEGIN_ANIMATION_TIME = 5

STAR_LESS_7				= 0 # 十三不搭
STAR_LESS_7_MISS_SUIT 	= 1	# 十三不搭 缺色

STAR_7_SHADE 			= 2 # 暗7星 最后一张非 字牌
STAR_7_LIGHT 			= 3	# 明7星 最后一张   字牌
STAR_7_SHADE_MISS_SUIT 	= 4	# 暗7星 缺色 
STAR_7_LIGHT_MISS_SUIT 	= 5	# 明7星 缺色


MAX_RECORD_CACHE = 5000  # 最大缓存记录条数
MAX_RECORD_NONE_CACHE = 10000  # 最大缓存空记录条数
CLEAN_RECORD_CACHE_INTERVAL = 60 * 60 * 3  # 定时清理回放缓存时间间隔 单位秒
CLEAN_RECORD_CACHE_IDLE_INTERVAL = 60 * 60 * 3  # 清理回放超过一定时间间隔的数据 单位秒
ROOM_TTL = 60 * 60 * 3  # 房间的生存时间, 如果超过时间还没有人在打牌, 则销毁房间

QUERY_RECORD_NO_EXIST = 1100

####################################  房间开房的一些模式 ####################################

# 规则
NORMAL_GAME_MODE = 0	# 普通模式
DOUBLE_GAME_MODE = 1	# 东带庄(庄家翻倍)
GAME_MODE = (NORMAL_GAME_MODE, DOUBLE_GAME_MODE)
# 局数
ROUND = (8, 16, 24)
# 奖码
LUCKY_NUM = (1, 2, 3, 4, 6)
# 出牌时限
DISCARD_SECONDS = (0, 10, 15, 20)
# 是否手动准备开局
HAND_PREPARE = 0	# 手动准备
AUTO_PREPARE = 1	# 自动准备
PREPARE_MODE = (AUTO_PREPARE, HAND_PREPARE)
# 谁开的房
NORMAL_ROOM = 0	# 普通开房
AGENT_ROOM = 1	# 代理开房
CLUB_ROOM = 2	# 茶楼开房
OPEN_ROOM_MODE = (NORMAL_ROOM, AGENT_ROOM, CLUB_ROOM)
# 支付模式
NORMAL_PAY_MODE = 0 # 房主支付
AA_PAY_MODE = 1		# AA支付
AGENT_PAY_MODE = 2	# 代理开房, 代理支付
CLUB_PAY_MODE = 3	# 茶楼开房, 茶楼老板支付
PAY_MODE = (NORMAL_PAY_MODE, AA_PAY_MODE, AGENT_PAY_MODE, CLUB_PAY_MODE)

###########################################################################################
# 加入茶楼的限制
CLUB_NUM_LIMIT = 10
# 茶楼中的桌子数
CLUB_TABLE_NUM = 8
# 茶楼名字长度限制
CLUB_NAME_LENGTH = 8
# 成员备注长度限制
MEMBER_NOTES_LENGTH = 11
# 茶楼公告长度限制
CLUB_NOTICE_LENGTH = 18
# 茶楼战绩保存期限
CLUB_TABLE_RESULT_TTL = 3 * 24 * 3600
# 茶楼成员上限
CLUB_MEMBER_LIMIT = 500

# 茶楼相关错误码
CLUB_OP_ERR_PERMISSION_DENY = -1 # 权限不足
CLUB_OP_ERR_INVALID_OP		= -2 # 非法操作
CLUB_OP_ERR_NUM_LIMIT		= -3 # 茶楼数量限制
CLUB_OP_ERR_WRONG_ARGS		= -4 # 参数错误
CLUB_OP_ERR_CLUB_NOT_EXIST	= -5 # 茶楼不存在

# 茶楼相关操作码
CLUB_OP_AGREE_IN		= 1 # 同意玩家加入茶楼
CLUB_OP_REFUSE_IN		= 2 # 拒绝玩家加入茶楼
CLUB_OP_INVITE_IN		= 3 # 邀请玩家茶楼
CLUB_OP_KICK_OUT		= 4 # 将玩家踢出茶楼
CLUB_OP_APPLY_IN		= 5 # 申请加入茶楼
CLUB_OP_APPLY_OUT		= 6 # 离开茶楼
CLUB_OP_SET_NAME		= 7 # 茶楼改名
CLUB_OP_GET_MEMBERS		= 8 # 获取成员列表
CLUB_OP_GET_APPLICANTS	= 9 # 获取申请者列表
CLUB_OP_SET_NOTICE		= 10# 设置茶楼公告
CLUB_OP_SET_MEMBER_NOTES= 11# 设置成员备注
CLUB_OP_SIT_DOWN		= 12# 选择一张桌子坐下
CLUB_OP_GET_TABLE_DETAIL= 13# 获取桌子详情
CLUB_OP_GET_RECORDS		= 14# 获取俱乐部战绩

###########################################################################################
RED_ENVELOP_THRESHOLD = 6	# 符合生成红包, 成为有效玩家需要完成的整圈数

# 用户信息最大缓存条目数量
USER_INFO_CACHE_SIZE = 1024