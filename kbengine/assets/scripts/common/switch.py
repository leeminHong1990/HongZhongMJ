# -*- coding: utf-8 -*-
DB_NAME = "kbe_GXMJ"

PUBLISH_VERSION = 0

DEBUG_BASE = 1

PHP_SERVER_URL = 'http://10.0.0.4:9981/api/'
PHP_SERVER_SECRET = "zDYnetiVvFgWCRMIBGwsAKaqPOUjfNXS"
ACCOUNT_LOGIN_SECRET = "KFZ<]~ct(uYHM%#LABX<>>O6-N(~F#GM" # 登录校验的密钥

PHP_DEBUG_URL = 'http://localhost:9080/index.php'
CLUB_CARD_MIN	= 24
CLUB_CARD_WARN	= 100

#计算消耗
def calc_cost(game_round, pay_mode):
	import const
	if pay_mode == const.AA_PAY_MODE:
		if game_round == 8:
			return(1, 9999)
		elif game_round == 16:
			return(2, 9999)
		elif game_round == 24:
			return(3, 9999)
	else:
		if game_round == 8:
			return(4, 9999)
		elif game_round == 16:
			return(8, 9999)
		elif game_round == 24:
			return(12, 9999)
	return (9999, 9999)