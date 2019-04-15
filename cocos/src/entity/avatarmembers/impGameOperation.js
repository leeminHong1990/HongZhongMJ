"use strict";
/*-----------------------------------------------------------------------------------------
												interface
-----------------------------------------------------------------------------------------*/
var impGameOperation = impCommunicate.extend({
	__init__ : function()
	{
		this._super();
		this.diceList = [[0,0],[0,0],[0,0],[0,0]]
		this.startTilesList = []
		this.runMode = const_val.GAME_ROOM_GAME_MODE;
		this.startActions = {};
	    KBEngine.DEBUG_MSG("Create impRoomOperation");
  	},

	startGame : function(dealerIdx, tileList, wreathsList, kingTiles, prevailing_wind, playerWindList, diceList){
		cc.log("startGame")
		cc.log(dealerIdx, tileList, wreathsList, kingTiles, prevailing_wind, playerWindList, diceList)
		var self = this;
		if(!this.curGameRoom){
			return;
		}
		this.runMode = const_val.GAME_ROOM_GAME_MODE;
		this.curGameRoom.startGame(kingTiles, wreathsList);
		this.curGameRoom.curPlayerSitNum = dealerIdx
		this.diceList = diceList;
		this.curGameRoom.dealerIdx = dealerIdx;
		this.curGameRoom.prevailing_wind = prevailing_wind;
		this.curGameRoom.playerWindList = playerWindList;

		this.startTilesList = cutil.deepCopy(this.curGameRoom.handTilesList)
		this.startTilesList[this.serverSitNum] = tileList.concat([])
		cc.log("startGame", this.startTilesList[this.serverSitNum])

        if (this.serverSitNum == dealerIdx) {
            var drawTile = tileList.pop() // 庄家最后一张牌是牌局开始后摸上来的不参与排序
            this.curGameRoom.handTilesList[this.serverSitNum] = tileList.sort(cutil.tileSortFunc);
            this.curGameRoom.lastDrawTile = drawTile
            //庄家最后一张牌放最后
            this.curGameRoom.handTilesList[this.serverSitNum].push(drawTile)
            this.curGameRoom.last_op = const_val.OP_DRAW;
        } else {
            this.curGameRoom.handTilesList[this.serverSitNum] = tileList.sort(cutil.tileSortFunc);
            this.curGameRoom.handTilesList[dealerIdx].push(0) //庄家开局多一张牌的
        }

		if(h1global.curUIMgr.gameroomprepare_ui){
			h1global.curUIMgr.gameroomprepare_ui.hide();
		}

		this.startActions["GameRoomUI"] = function() {
        	h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "startBeginAnim",self.startTilesList, diceList, dealerIdx);
            if (onhookMgr && const_val.FAKE_COUNTDOWN > 0) {
                onhookMgr.setWaitLeftTime(const_val.FAKE_COUNTDOWN + const_val.FAKE_BEGIN_ANIMATION_TIME);
            }
            cc.audioEngine.playEffect("res/sound/effect/saizi_music.mp3");
        }

        if(this.curGameRoom.curRound <= 1) {
            this.startActions["GameRoomScene"] = function(){
                if (h1global.curUIMgr.gameroominfo_ui) {
                    if (!h1global.curUIMgr.gameroominfo_ui.is_show) {
                        h1global.curUIMgr.gameroominfo_ui.hide();
                    }
                    h1global.curUIMgr.gameroominfo_ui.show();
                }
                if(h1global.curUIMgr.gps_ui){
                    h1global.curUIMgr.gps_ui.show();
                }
			}
		}
        if(h1global.curUIMgr.roomLayoutMgr){
			// 如果GameRoomScene已经加载完成
			if(this.startActions["GameRoomScene"]) {
                this.startActions["GameRoomScene"]();
                this.startActions["GameRoomScene"] = undefined;
            } else {
                if(h1global.curUIMgr.gameroom3d_ui && h1global.curUIMgr.gameroom2d_ui){
                    h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide");
                    h1global.curUIMgr.showGameRoomUI(function(complete){
                        if(complete){
                            if (self.startActions["GameRoomUI"]) {
                                self.startActions["GameRoomUI"]();
                                self.startActions["GameRoomUI"] = undefined;
                            }
                            h1global.curUIMgr.setGameRoomUI2Top(cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI"))
                        }
                    });
                }
			}
        }

		if(h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show){
			h1global.curUIMgr.gameroominfo_ui.update_round();
			h1global.curUIMgr.gameroominfo_ui.update_round_wind(prevailing_wind);
		}
		if(h1global.curUIMgr.gameconfig_ui && h1global.curUIMgr.gameconfig_ui.is_show){
			h1global.curUIMgr.gameconfig_ui.update_state();
		}
		// 关闭结算界面
		if(h1global.curUIMgr.settlement_ui){
			h1global.curUIMgr.settlement_ui.hide();
		}
		if(h1global.curUIMgr.result_ui){
			h1global.curUIMgr.result_ui.hide();
		}

	},

	readyForNextRound : function(serverSitNum){
		if(!this.curGameRoom){
			return;
		}
		this.curGameRoom.updatePlayerState(serverSitNum, 1);		
		if(h1global.curUIMgr.gameroomprepare_ui && h1global.curUIMgr.gameroomprepare_ui.is_show){
			h1global.curUIMgr.gameroomprepare_ui.update_player_state(serverSitNum, 1);			
		}
	},

	postMultiOperation : function(idx_list, aid_list, tile_list){
		cc.log("postMultiOperation===", idx_list, aid_list, tile_list)
		// 用于特殊处理多个人同时胡牌的情况
		if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
			for(var i = 0; i < idx_list.length; i++){
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", const_val.OP_KONG_WIN, idx_list[i]);
			}
		}
		// if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
		// 	cc.audioEngine.playEffect("res/sound/voice/male/sound_man_win.mp3");
		// } else {
		cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_win.mp3");
		// }
	},

    removeHandTile: function (serverSitNum, tileNum, count , sort) {
        sort = sort || this.runMode === const_val.GAME_ROOM_PLAYBACK_MODE;
        if (this.runMode === const_val.GAME_ROOM_PLAYBACK_MODE || serverSitNum == this.serverSitNum) {
            var index = -1;
            for (var i = 0; i < count; i++) {
                index = this.curGameRoom.handTilesList[serverSitNum].indexOf(tileNum);
                if (index >= 0) {
                    this.curGameRoom.handTilesList[serverSitNum].splice(index, 1)
                }
            }
            index = undefined;
        } else {
			this.curGameRoom.handTilesList[serverSitNum].splice(0, count);
        }
        if(sort){
            this.curGameRoom.handTilesList[serverSitNum].sort(cutil.tileSortFunc);
        }
    },
	
	postOperation : function(serverSitNum, aid, tileList){
		cc.log("postOperation: ", serverSitNum, aid, tileList);
		if(!this.curGameRoom){
			return;
		}
		if(h1global.curUIMgr.gameroom3d_ui && h1global.curUIMgr.gameroom3d_ui.is_show && 
			h1global.curUIMgr.gameroom3d_ui.beginAnimPlaying && 
			aid != const_val.OP_DRAW){
			// 开局动画播放过程中，如果收到抓牌以外的操作，则马上停止播放动画
			h1global.curUIMgr.gameroom3d_ui.stopBeginAnim();
            this.startActions["GameRoomUI"] = undefined;
		}
		if(h1global.curUIMgr.gameroom2d_ui && h1global.curUIMgr.gameroom2d_ui.is_show && 
			h1global.curUIMgr.gameroom2d_ui.beginAnimPlaying && 
			aid != const_val.OP_DRAW){
			// 开局动画播放过程中，如果收到抓牌以外的操作，则马上停止播放动画
			h1global.curUIMgr.gameroom2d_ui.stopBeginAnim();
            this.startActions["GameRoomUI"] = undefined;
		}

		if(aid == const_val.OP_PASS){

		} else if(aid == const_val.OP_DRAW) {
            if (onhookMgr && const_val.FAKE_COUNTDOWN > 0) {
                onhookMgr.setWaitLeftTime(const_val.FAKE_COUNTDOWN);
            }
			// 设置当前玩家
			this.curGameRoom.curPlayerSitNum = serverSitNum;
			this.curGameRoom.lastDrawTile = tileList[0]
			this.curGameRoom.leftTileNum--;

			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_roominfo_panel");
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide_operation_panel"); //如果自己碰，自动过了，然后轮到自己摸会出现问题 这里先hide，后自摸show
			}
			
			if(this.serverSitNum == serverSitNum){
				this.curGameRoom.handTilesList[this.serverSitNum].push(tileList[0]);
				this.curGameRoom.last_op = const_val.OP_DRAW;
				if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_curplayer_panel", this.serverSitNum);
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				}
				// cc.log(this.curGameRoom.discardStateList)

				if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
					cc.log("post operation draw===>")
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_operation_panel", this.getDrawOpDict(tileList[0]), const_val.SHOW_DO_OP);
					if(this.runMode === const_val.GAME_ROOM_PLAYBACK_MODE){
						this.selfWaitForOperation(serverSitNum, this.getDrawOpDict(tileList[0], serverSitNum), this.nextOp());
					}
				}
				if(h1global.curUIMgr.gameroom3d_ui && h1global.curUIMgr.gameroom3d_ui.is_show){
					// 轮到自己摸牌, 不一定可以进行打牌操作
					if (const_val.SEASON.indexOf(tileList[0]) < 0 && const_val.FLOWER.indexOf(tileList[0]) < 0) {
						if(h1global.curUIMgr.gameroom3d_ui.beginAnimPlaying) {
							h1global.curUIMgr.gameroom3d_ui.lock_player_hand_tiles();
						}else {
							h1global.curUIMgr.gameroom3d_ui.unlock_player_hand_tiles();
						}
					}
				}
				if(h1global.curUIMgr.gameroom2d_ui && h1global.curUIMgr.gameroom2d_ui.is_show){
					// 轮到自己摸牌, 不一定可以进行打牌操作
					if (const_val.SEASON.indexOf(tileList[0]) < 0 && const_val.FLOWER.indexOf(tileList[0]) < 0) {
						if(h1global.curUIMgr.gameroom2d_ui.beginAnimPlaying) {
							h1global.curUIMgr.gameroom2d_ui.lock_player_hand_tiles();
						}else {
							h1global.curUIMgr.gameroom2d_ui.unlock_player_hand_tiles();
						}
					}
				}

			} else {
				this.curGameRoom.handTilesList[serverSitNum].push(tileList[0]);
                if(this.runMode === const_val.GAME_ROOM_PLAYBACK_MODE){
                    this.selfWaitForOperation(serverSitNum, this.getDrawOpDict(tileList[0], serverSitNum), this.nextOp());
                }
				if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_curplayer_panel", serverSitNum);
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				}
			}
		} else if(aid == const_val.OP_DISCARD) {
			this.curGameRoom.lastDiscardTile = tileList[0];
			this.curGameRoom.lastDiscardTileFrom = serverSitNum;
			if(this.serverSitNum == serverSitNum){
				cc.log("DEBUG###DISCARD:", this.curGameRoom.handTilesList[this.serverSitNum])
                this.curGameRoom.last_op = const_val.OP_DISCARD;
				this.removeHandTile(this.serverSitNum, tileList[0] , 1, true);
				if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide_operation_panel");
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", this.serverSitNum);
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "lock_player_hand_tiles");
				}
			} else {
                this.removeHandTile(serverSitNum, tileList[0] , 1);
                if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				}
			}
			this.curGameRoom.discardTilesList[serverSitNum].push(tileList[0]);
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_discard_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "play_discard_anim", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_canwin_tile_panel", const_val.NOT_DISPLAY_CANWIN_PANEL);
			}
			if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_" + tileList[0].toString() + ".mp3");
			} else {
				cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_" + tileList[0].toString() + ".mp3");
			}
			cc.audioEngine.playEffect("res/sound/effect/sound_tileout.mp3");
		} else if(aid == const_val.OP_CHOW){
			this.curGameRoom.curPlayerSitNum = serverSitNum;
			if(this.serverSitNum == serverSitNum){
				for(var i = 1; i < 3; i++){
					this.removeHandTile(this.serverSitNum, tileList[i] ,1 , i === 2);
				}
                this.curGameRoom.last_op = const_val.OP_CHOW;
				this.curGameRoom.handTilesList[this.serverSitNum].sort(cutil.tileSortFunc);
				this.curGameRoom.upTilesList[this.serverSitNum].push((tileList.concat()).sort(cutil.tileSortFunc));
				this.curGameRoom.upTilesOpsList[this.serverSitNum].push([{"opId":aid, "tiles":tileList.concat(), "fromIdx":this.curGameRoom.lastDiscardTileFrom}]);
				if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()){
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "unlock_player_hand_tiles");
                    h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_operation_panel", this.getPongKongOpDict(), const_val.SHOW_DO_OP);
				}
			} else {
				// 手牌全是0，任意删除2张即可
				for(var i = 1; i < 3; i++){
					this.removeHandTile(serverSitNum, tileList[i], 1, i === 2)
				}

                this.curGameRoom.upTilesList[serverSitNum].push((tileList.concat()).sort(cutil.tileSortFunc));
				this.curGameRoom.upTilesOpsList[serverSitNum].push([{"opId":aid, "tiles":tileList.concat(), "fromIdx":this.curGameRoom.lastDiscardTileFrom}]);
			}
			var lastDiscardTileFrom = this.curGameRoom.lastDiscardTileFrom;
			if(lastDiscardTileFrom >= 0){
				this.curGameRoom.lastDiscardTile = 0;
				this.curGameRoom.lastDiscardTileFrom = -1;
				this.curGameRoom.discardTilesList[lastDiscardTileFrom].pop();
			}
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				if (lastDiscardTileFrom >= 0) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "remove_last_discard_tile", lastDiscardTileFrom);
				}
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_curplayer_panel", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_up_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", aid, serverSitNum);

			}
			if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_chow.mp3");
			} else {
				cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_chow.mp3");
			}
		} else if(aid == const_val.OP_PONG){
			this.curGameRoom.curPlayerSitNum = serverSitNum;
            if (onhookMgr && const_val.FAKE_COUNTDOWN > 0) {
                onhookMgr.setWaitLeftTime(const_val.FAKE_COUNTDOWN);
            }
			if(this.serverSitNum == serverSitNum){
                this.curGameRoom.last_op = const_val.OP_PONG;
                this.removeHandTile(this.serverSitNum, tileList[0], 2, true)

				this.curGameRoom.upTilesList[this.serverSitNum].push(tileList.concat());
				this.curGameRoom.upTilesOpsList[this.serverSitNum].push([{"opId":aid, "tiles":[tileList[0]], "fromIdx":this.curGameRoom.lastDiscardTileFrom}]);
				if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "unlock_player_hand_tiles");
                    h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_operation_panel", this.getPongKongOpDict(), const_val.SHOW_DO_OP);
				}
			} else {
				// 手牌全是0，任意删除2张即可
                this.removeHandTile(serverSitNum, tileList[0], 2);

				this.curGameRoom.upTilesList[serverSitNum].push(tileList.concat());
				this.curGameRoom.upTilesOpsList[serverSitNum].push([{"opId":aid, "tiles":[tileList[0]], "fromIdx":this.curGameRoom.lastDiscardTileFrom}]);
			}
			var lastDiscardTileFrom = this.curGameRoom.lastDiscardTileFrom;
			if(lastDiscardTileFrom >= 0){
				this.curGameRoom.lastDiscardTile = 0;
				this.curGameRoom.lastDiscardTileFrom = -1;
				this.curGameRoom.discardTilesList[lastDiscardTileFrom].pop();
			}
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				if (lastDiscardTileFrom >= 0) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "remove_last_discard_tile", lastDiscardTileFrom);
				}
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_curplayer_panel", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_up_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", aid, serverSitNum);

			}
			if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_pong.mp3");
			} else {
				cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_pong.mp3");
			}
		} else if(aid == const_val.OP_EXPOSED_KONG){
			cc.log("明杠 OP_EXPOSED_KONG");
			var kongIdx = this.getContinueKongUpIdx(this.curGameRoom.upTilesList[serverSitNum], tileList[0]);
			// if(kongIdx < 0){
			// 直接明杠
			if(this.serverSitNum == serverSitNum){
                this.curGameRoom.last_op = const_val.OP_EXPOSED_KONG;
                this.removeHandTile(this.serverSitNum, tileList[0], 3, true)
				this.curGameRoom.upTilesList[this.serverSitNum].push(tileList.concat());
				this.curGameRoom.upTilesOpsList[this.serverSitNum].push([{"opId":aid, "tiles":[tileList[0]], "fromIdx":this.curGameRoom.lastDiscardTileFrom}]);
			} else {
				// 手牌全是0，任意删除3张即可
				// this.curGameRoom.handTilesList[serverSitNum].splice(0, 3);
                this.removeHandTile(serverSitNum, tileList[0], 3)

				this.curGameRoom.upTilesList[serverSitNum].push(tileList);
				this.curGameRoom.upTilesOpsList[serverSitNum].push([{"opId":aid, "tiles":[tileList[0]], "fromIdx":this.curGameRoom.lastDiscardTileFrom}]);
			}
			var lastDiscardTileFrom = this.curGameRoom.lastDiscardTileFrom;
			var lastDiscardTile = this.curGameRoom.lastDiscardTile;
			// if(lastDiscardTileFrom >= 0 && this.serverSitNum != serverSitNum){
			if(lastDiscardTileFrom >= 0 && tileList[0] == lastDiscardTile){
				this.curGameRoom.lastDiscardTile = 0;
				this.curGameRoom.lastDiscardTileFrom = -1;
				this.curGameRoom.discardTilesList[lastDiscardTileFrom].pop();
			}
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				if (lastDiscardTileFrom >= 0 && tileList[0] == lastDiscardTile) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "remove_last_discard_tile", lastDiscardTileFrom);
				}
				// if (this.serverSitNum == serverSitNum){
    //                 h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_operation_panel", this.getPongKongOpDict(), const_val.SHOW_DO_OP);
				// }
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_up_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", aid, serverSitNum);
			}
			if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_kong.mp3");
			} else {
				cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_kong.mp3");
			}
		} else if(aid == const_val.OP_CONTINUE_KONG){
			cc.log("风险杠 OP_CONTINUE_KONG");
			var kongIdx = this.getContinueKongUpIdx(this.curGameRoom.upTilesList[serverSitNum], tileList[0]);
			// 已有对应的碰的情况下加杠
			if(this.serverSitNum == serverSitNum){
                this.curGameRoom.last_op = const_val.OP_CONTINUE_KONG;
                this.removeHandTile(this.serverSitNum, tileList[0], 1, true);

				this.curGameRoom.upTilesList[this.serverSitNum][kongIdx].push(tileList[0]);
				this.curGameRoom.upTilesOpsList[this.serverSitNum][kongIdx].push({"opId":aid, "tiles":[tileList[0]], "fromIdx":this.serverSitNum});
			} else {
				// 手牌全是0，任意删除1张即可
                this.removeHandTile(serverSitNum, tileList[0], 1);
				this.curGameRoom.upTilesList[serverSitNum][kongIdx].push(tileList[0]);
				this.curGameRoom.upTilesOpsList[serverSitNum][kongIdx].push({"opId":aid, "tiles":[tileList[0]], "fromIdx":serverSitNum});
			}
			var lastDiscardTileFrom = this.curGameRoom.lastDiscardTileFrom;
			var lastDiscardTile = this.curGameRoom.lastDiscardTile;
			// if(lastDiscardTileFrom >= 0 && this.serverSitNum != serverSitNum){
			if(lastDiscardTileFrom >= 0 && tileList[0] == lastDiscardTile){
				this.curGameRoom.lastDiscardTile = 0;
				this.curGameRoom.lastDiscardTileFrom = -1;
				this.curGameRoom.discardTilesList[lastDiscardTileFrom].pop();
			}
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				if (lastDiscardTileFrom >= 0 && tileList[0] == lastDiscardTile) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "remove_last_discard_tile", lastDiscardTileFrom);
				}
                // if (this.serverSitNum == serverSitNum){
                //     h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_operation_panel", this.getPongKongOpDict(), const_val.SHOW_DO_OP);
                // }
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_up_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", aid, serverSitNum);
			}
			if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_kong.mp3");
			} else {
				cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_kong.mp3");
			}
		} else if(aid == const_val.OP_CONCEALED_KONG){
			if(this.serverSitNum == serverSitNum){
                this.curGameRoom.last_op = const_val.OP_CONCEALED_KONG;
                this.removeHandTile(this.serverSitNum, tileList[3], 4, true);
				this.curGameRoom.upTilesList[this.serverSitNum].push(tileList);
				this.curGameRoom.upTilesOpsList[this.serverSitNum].push([{"opId":aid, "tiles":[tileList[3]], "fromIdx":this.serverSitNum}]);
			} else {
				// 手牌全是0，任意删除4张即可
                this.removeHandTile(serverSitNum, tileList[3], 4);
				this.curGameRoom.upTilesList[serverSitNum].push(tileList);
				this.curGameRoom.upTilesOpsList[serverSitNum].push([{"opId":aid, "tiles":[tileList[3]], "fromIdx":serverSitNum}]);
			}
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
                // if (this.serverSitNum == serverSitNum){
                //     h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_operation_panel", this.getPongKongOpDict(), const_val.SHOW_DO_OP);
                // }
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_up_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", aid, serverSitNum);
			}
			if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_kong.mp3");
			} else {
				cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_kong.mp3");
			}
		} else if(aid == const_val.OP_DRAW_WIN){
            if (this.serverSitNum == serverSitNum){
                this.curGameRoom.last_op = const_val.aid;
            }
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", aid, serverSitNum);
			}
			if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_draw_win.mp3");
			} else {
				cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_draw_win.mp3");
			}
		} else if(aid == const_val.OP_KONG_WIN || aid == const_val.OP_GIVE_WIN){
            if (this.serverSitNum == serverSitNum){
                this.curGameRoom.last_op = const_val.aid;
            }
            if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
                h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", aid, serverSitNum);
            }
            if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
                cc.audioEngine.playEffect("res/sound/voice/male/sound_man_win.mp3");
            } else {
                cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_win.mp3");
            }
        } else if(aid == const_val.OP_READY){

		} else if(aid == const_val.OP_CUT){
            if (this.serverSitNum == serverSitNum){
                this.curGameRoom.last_op = const_val.OP_CUT;
            }
			this.curGameRoom.leftTileNum--
			this.curGameRoom.cutIdxsList[serverSitNum].push(this.curGameRoom.discardTilesList[serverSitNum].length)
			this.curGameRoom.discardTilesList[serverSitNum].push(tileList[0]);
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_discard_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "play_discard_anim", serverSitNum)
			}
		} else if (aid == const_val.OP_KONG_WREATH) {
			cc.log("玩家 杠花")
			if (this.serverSitNum == serverSitNum){
                this.curGameRoom.last_op = const_val.OP_KONG_WREATH;
			}
			var idx = this.curGameRoom.handTilesList[this.serverSitNum].indexOf(tileList[0]);
			if(idx >= 0){
				this.curGameRoom.handTilesList[this.serverSitNum].splice(idx, 1);
			}else{
                //删除1张即可
                this.curGameRoom.handTilesList[serverSitNum].splice(0, 1);
			}
			this.curGameRoom.wreathsList[serverSitNum].push(tileList[0])

			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playOperationEffect", const_val.OP_KONG_WREATH, serverSitNum, tileList[0]);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_hand_tiles", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_wreath_panel", serverSitNum);
			}
			if(this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1){
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_buhua.mp3");
			} else {
				cc.audioEngine.playEffect("res/sound/voice/male/sound_man_buhua.mp3");
			}
		}
		if(this.serverSitNum != serverSitNum && h1global.curUIMgr.roomLayoutMgr){
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_wintips_btn");
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide_operation_panel");
		}
	},

	selfPostOperation : function(aid, tiles){
		// 由于自己打的牌自己不需要经服务器广播给自己，因而只要在doOperation时，自己postOperation给自己
		// 而doOperation和postOperation的参数不同，这里讲doOperation的参数改为postOperation的参数
		var tileList = tiles.slice(0);
		if(aid == const_val.OP_PASS){

		} else if(aid == const_val.OP_DRAW) {
			
		} else if(aid == const_val.OP_DISCARD) {
			
		} else if(aid == const_val.OP_CHOW){
			
		} else if(aid == const_val.OP_PONG){
			tileList = [tileList[0], tileList[0], tileList[0]];
		} else if(aid == const_val.OP_EXPOSED_KONG){
			tileList = [tileList[0], tileList[0], tileList[0], tileList[0]];
		} else if(aid == const_val.OP_CONCEALED_KONG){
			tileList = [0, 0, 0, tileList[0]];
		} else if(aid == const_val.OP_DRAW_WIN){

		} else if(aid == const_val.OP_WREATH_WIN){

		} else if(aid == const_val.OP_KONG_WIN){

		} else if(aid == const_val.OP_GIVE_WIN){

		} else if(aid == const_val.OP_READY){

		} else if(aid == const_val.OP_KONG_WREATH){

		}
		// 用于转换doOperation到postOperation的参数
		this.postOperation(this.serverSitNum, aid, tileList);
	},

	doOperation : function(aid, tileList){
		cc.log("doOperation: ", aid, tileList)
		if(!this.curGameRoom){
			return;
		}
		if(this.curGameRoom.curPlayerSitNum == this.serverSitNum && aid == const_val.OP_PASS){
			return;
		}
		if (this.curGameRoom.curPlayerSitNum != this.serverSitNum) {
			return;
		}
		if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
			h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "lock_player_hand_tiles");
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide_discard_tips");
		}
        // 自己的操作直接本地执行，不需要广播给自己
        this.selfPostOperation(aid, tileList);
		this.baseCall("doOperation", aid, tileList);
	},

	doOperationFailed : function(err){
		cc.log("doOperationFailed: " + err.toString());
	},

	confirmOperation : function(aid, tileList){
		cc.log("confirmOperation: ", aid, tileList)
		if(!this.curGameRoom){
			return;
		}
		this.curGameRoom.waitAidList = [];
        if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
			h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "lock_player_hand_tiles");
		}
		// 自己的操作直接本地执行，不需要广播给自己
		// this.selfPostOperation(aid, tileList);
		this.baseCall("confirmOperation", aid, tileList);
	},

	waitForOperation : function(aid_list, tileList){
		cc.log("waitForOperation", aid_list, tileList);
		if(!this.curGameRoom){
			return;
		}
        this.curGameRoom.waitAidList = aid_list;
        if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_operation_panel", this.getWaitOpDict(aid_list, tileList), const_val.SHOW_CONFIRM_OP);
        }
	},


	roundResult : function(roundRoomInfo){
		if(!this.curGameRoom){
			return;
		}
		cc.log("roundResult")
		cc.log(roundRoomInfo)
		this.curGameRoom.endGame();
		var playerInfoList = roundRoomInfo["player_info_list"];
		for(var i = 0; i < playerInfoList.length; i++){
			this.curGameRoom.playerInfoList[i]["score"] = playerInfoList[i]["score"];
			this.curGameRoom.playerInfoList[i]["total_score"] = playerInfoList[i]["total_score"];
		}
		var anim_end_num = 0;
        var self = this;

        // Note: 此处只在回放上
        var replay_func = undefined;
        if(self.runMode === const_val.GAME_ROOM_PLAYBACK_MODE){
            replay_func = arguments[1];
		}

        let player = h1global.player();
        var curGameRoom = player.curGameRoom;
        var serverSitNum = player.serverSitNum;

		function callbackfunc(){
            if (self.runMode === const_val.GAME_ROOM_PLAYBACK_MODE) {
                h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, serverSitNum, curGameRoom, undefined, replay_func);
            } else {
                if (anim_end_num >= 2 && h1global.curUIMgr.settlement_ui) {
                    h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, serverSitNum, curGameRoom);
                }
            }
		}
		function showResult() {
			if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "play_result_anim", playerInfoList);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "play_luckytiles_anim", roundRoomInfo["lucky_tiles"], function(){
					anim_end_num += 1;
					callbackfunc()
				});
			}
		}

		if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
			if (h1global.curUIMgr.roomLayoutMgr.gameRoomUIIsShow()) {
				showResult();
			} else {
				h1global.curUIMgr.roomLayoutMgr.registerShowObserver(function () {
					showResult();
				})
			}
		} else {
			callbackfunc();
		}

	},

	finalResult : function(finalPlayerInfoList, roundRoomInfo){
		cc.log("finalResult", finalPlayerInfoList, roundRoomInfo)
		if(!this.curGameRoom){
			return;
		}

        // Note: 为了断线重连后继续停留在总结算上，此处设置一个标志位作为判断
        if(h1global.curUIMgr.result_ui) {
            h1global.curUIMgr.result_ui.finalResultFlag = true;
        }

        var anim_end_num = 0;
        let player = h1global.player();
        var curGameRoom = player.curGameRoom;
        var serverSitNum = player.serverSitNum;
		function callbackfunc(){
			if (anim_end_num >= 2 && h1global.curUIMgr.settlement_ui) {
                h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, serverSitNum, curGameRoom, function () {
					if(h1global.curUIMgr.result_ui){
                        h1global.curUIMgr.result_ui.show_by_info(finalPlayerInfoList, curGameRoom);
					}
				});
			}
		}
		function showResult() {
			if (h1global.curUIMgr.gameRoomUIIsShow &&h1global.curUIMgr.gameRoomUIIsShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "play_result_anim", roundRoomInfo["player_info_list"]);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "play_luckytiles_anim", roundRoomInfo["lucky_tiles"], function(){
					anim_end_num += 1;
					callbackfunc()
				});
			}
		}
		if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
			if (h1global.curUIMgr.roomLayoutMgr.gameRoomUIIsShow()) {
				showResult();
			} else {
				h1global.curUIMgr.roomLayoutMgr.registerShowObserver(function () {
					showResult();
				})
			}
		} else {
			callbackfunc();
		}
	},

    subtotalResult:function (finalPlayerInfoList) {
        if(!this.curGameRoom){
            return;
        }
        if (onhookMgr) {
            onhookMgr.setApplyCloseLeftTime(null);
        }

		if(h1global.curUIMgr.applyclose_ui && h1global.curUIMgr.applyclose_ui.is_show){
            h1global.curUIMgr.applyclose_ui.hide()
		}
        if (h1global.curUIMgr.settlement_ui && h1global.curUIMgr.settlement_ui.is_show) {
            h1global.curUIMgr.settlement_ui.hide()
        }
        // Note: 为了断线重连后继续停留在总结算上，此处设置一个标志位作为判断
        if(h1global.curUIMgr.result_ui) {
            h1global.curUIMgr.result_ui.finalResultFlag = true;
        }
        let player = h1global.player();
        var curGameRoom = player.curGameRoom;
        if (h1global.curUIMgr.result_ui) {
            h1global.curUIMgr.result_ui.show_by_info(finalPlayerInfoList, curGameRoom);
        }
    },

	prepare:function(){
		if(!this.curGameRoom){
			return;
		}
		this.baseCall("prepare");
	},
	
	notifyPlayerOnlineStatus:function(serverSitNum, status){
		if(!this.curGameRoom){
			return;
		}
		this.curGameRoom.updatePlayerOnlineState(serverSitNum, status);
		if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
			h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_player_online_state", serverSitNum, status);
		}
	},
});
