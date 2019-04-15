"use strict";
/*-----------------------------------------------------------------------------------------
												interface
-----------------------------------------------------------------------------------------*/
var impPlaybackOperation = impRoomOperation.extend({
    __init__: function () {
        this._super();
    },

    _createGameRoom: function (roomInfo, serverSitNum) {
        let initRoomInfo = roomInfo['init_info'];
        this.curGameRoom = new GameRoomEntity(initRoomInfo['player_num']);
        this.curGameRoom.updateRoomData(initRoomInfo);
        this.serverSitNum = serverSitNum;
        this.curGameRoom.playerStateList = roomInfo["player_state_list"];
        this.diceList = roomInfo['dice_list'] ? cutil.deepCopy(roomInfo['dice_list']) : undefined;
        this.curGameRoom.startGame(roomInfo['kingTiles'] ? cutil.deepCopy(roomInfo['kingTiles']) : undefined, roomInfo['wreathsList'] ? cutil.deepCopy(roomInfo['wreathsList']) : undefined);
        this.curGameRoom.curRound = this.curGameRoom.curRound - 1;
        let dealerIdx = initRoomInfo['dealerIdx'];
        this.curGameRoom.curPlayerSitNum = dealerIdx;
        this.curGameRoom.dealerIdx = dealerIdx;
        this.curGameRoom.prevailing_wind = roomInfo['prevailing_wind'];
        this.curGameRoom.playerWindList = roomInfo['playerWindList'] ? cutil.deepCopy(roomInfo['playerWindList']) : undefined;
        // this.curGameRoom.op_record_list = roomInfo['op_record_list'] ? cutil.deepCopy(roomInfo['op_record_list']) : undefined;
        this.curGameRoom.op_record_list = JSON.parse(roomInfo['op_record_list']);
        // this.curGameRoom.op_special_record_list = roomInfo['op_special_record_list'] ? cutil.deepCopy(roomInfo['op_special_record_list']) : undefined;

        var init_tiles = roomInfo['init_tiles'] ? cutil.deepCopy(roomInfo['init_tiles']) : undefined;
        this.curGameRoom.handTilesList = [];
        for (var i = 0; i < init_tiles.length; i++) {
            this.curGameRoom.handTilesList[i] = init_tiles[i];
            if (i == dealerIdx) {
                this.curGameRoom.handTilesList[i].pop();
            }
        }
        this.curGameRoom['round_result'] = roomInfo['round_result'];
    },

    _convertJsonValues: function (json_data) {
        let init_info = json_data['init_info'];
        for (var i = 0; i < init_info["player_base_info_list"].length; i++) {
            // let userId = init_info["player_base_info_list"][i].userId;
            // init_info["player_base_info_list"][i].userId = new KBEngine.UINT64(userId, 0);
            // Note: 回放时认为玩家全都是在线的
            init_info["player_base_info_list"][i].online = 1
        }
    },

    _findServerSitNum: function (id_list) {
        let uid = h1global.player().userId;
        for (var i = 0; i < id_list.length; i++) {
            if (id_list[i] == uid) {
                return i;
            }
        }
        return 0;
    },

    reqPlayback: function (recordId) {
        let data = cc.sys.localStorage.getItem('record_' + recordId);
        if (data && cc.isString(data) && data.length > 0) {
            let info = JSON.parse(data);
            if (parseInt(info['recordId']) == recordId) {
                this._convertJsonValues(info);
                this.playbackGame(info);
                return;
            }
        }
        this.baseCall('queryRecord', recordId);
        cutil.lock_ui();
    },

    queryRecordResult: function (json_str) {
        let scene = cc.director.getRunningScene();
        if (scene.className === 'GameRoomScene') {
            return;
        }
        let info = JSON.parse(json_str);
        cc.sys.localStorage.setItem('record_' + info['recordId'], json_str);
        cutil.unlock_ui();
        this._convertJsonValues(info);
        this.playbackGame(info);
    },

    queryRecordFailed: function (code) {
        cc.log('queryRecordFailed', code);
        let scene = cc.director.getRunningScene();
        if (scene.className === 'GameRoomScene') {
            return;
        }
        cutil.unlock_ui();
        h1global.globalUIMgr.info_ui.show_by_info("回放码错误！");
    },

    playbackGame: function (roomInfo) {
        cc.log("playbackGame", roomInfo);
        this.runMode = const_val.GAME_ROOM_PLAYBACK_MODE;
        this.originRoomInfo = roomInfo;
        this._createGameRoom(roomInfo, this._findServerSitNum(roomInfo['player_id_list']));
        h1global.runScene(new PlaybackGameRoomScene());
    },

    replayGame: function (callback) {
        if (!this.originRoomInfo) {
            cc.error("replay game: room info undefined");
            return;
        }
        cc.log("replay game");
        this._createGameRoom(this.originRoomInfo, this._findServerSitNum(this.originRoomInfo['player_id_list']));
        if (h1global.curUIMgr.roomLayoutMgr) {
            if (h1global.curUIMgr.gameroom3d_ui || h1global.curUIMgr.gameroom2d_ui) {
                h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide");
                h1global.curUIMgr.showGameRoomUI(function (complete) {
                    if (complete) {
                        // h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "startBeginAnim",self.startTilesList, diceList, dealerIdx);
                        h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_kingtile_panel");
                        h1global.curUIMgr.setGameRoomUI2Top(cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI"))
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
        }
    },

    selfWaitForOperation: function (serverSitNum, op_dict, doAid) {
        cc.log("selfWaitForOperation", op_dict, doAid);
        if (!this.curGameRoom) return;
        if (h1global.curUIMgr.roomLayoutMgr) {
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_playback_operation_panel",
                serverSitNum, op_dict, doAid, const_val.SHOW_CONFIRM_OP);
        }
    },

    waitForOperationFromNext: function (serverSitNum, aid, tileList) {
        if (!this.curGameRoom) return;
        this.curGameRoom.waitAidList = [aid];
        if (h1global.curUIMgr.roomLayoutMgr) {
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "update_playback_operation_panel",
                serverSitNum, this.getWaitOpDict([aid], tileList, serverSitNum), aid, const_val.SHOW_CONFIRM_OP);
        }
    },

    //由于服务端不能判断摸到牌时的操作，所以摸牌时显示操作面板使用本地判断
    nextOp: function () {
        let command = this.curGameRoom.lastCommand;
        if (command) return command.aid;
        return undefined;
    }

});
