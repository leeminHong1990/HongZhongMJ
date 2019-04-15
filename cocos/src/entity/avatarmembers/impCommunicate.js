"use strict";
/*-----------------------------------------------------------------------------------------
												interface
-----------------------------------------------------------------------------------------*/
var impCommunicate = impBase.extend({
	__init__ : function()
	{
		this._super();
  	},

	sendEmotion : function(eid){
		// TEST:
		this.baseCall("sendEmotion", eid);
		this.recvEmotion(this.serverSitNum, eid);
	},

	recvEmotion : function(serverSitNum, eid){
		if(eid <= 0 || eid >= 19){
			return;
		}
		if(h1global.curUIMgr.gameroomprepare_ui && h1global.curUIMgr.gameroomprepare_ui.is_show){
			h1global.curUIMgr.gameroomprepare_ui.playEmotionAnim(serverSitNum, eid);
		}
		if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
			h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playEmotionAnim", serverSitNum, eid);
		}
	},

	sendMsg : function(mid, msg){
		// TEST
        msg = msg || "";
		this.baseCall("sendMsg", mid, msg);
		this.recvMsg(this.serverSitNum, mid, msg);
	},

	recvMsg : function(serverSitNum, mid, msg){
		if((mid < 0 || mid > 8) && msg == ""){
			return;
		}
		// var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
		var info_dict = {};
		info_dict = this.curGameRoom.playerInfoList[serverSitNum];
        this.curGameRoom.msgList.push((msg || const_val.MESSAGE_LIST[mid]) + serverSitNum.toString());
		cc.log("this.curGameRoom.msgList:",this.curGameRoom.msgList)
        // if(h1global.curUIMgr.communicate_ui && h1global.curUIMgr.communicate_ui.is_show){
         //    h1global.curUIMgr.communicate_ui.update_chatrecord();
		// }
		if(h1global.curUIMgr.gameroomprepare_ui && h1global.curUIMgr.gameroomprepare_ui.is_show){
			h1global.curUIMgr.gameroomprepare_ui.playMessageAnim(serverSitNum, mid, msg);
			if(mid >= 0 && mid <= 8) {
                if (info_dict["sex"] == 1) {
                    cc.audioEngine.playEffect("res/sound/voice/male/sound_man_msg_" + mid.toString() + ".mp3");
                } else {
                    cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_msg_" + mid.toString() + ".mp3");
                }
            }
		}
		if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
			h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playMessageAnim", serverSitNum, mid, msg);
            if(mid >= 0 && mid <= 8) {
                if (info_dict["sex"] == 1) {
                    cc.audioEngine.playEffect("res/sound/voice/male/sound_man_msg_" + mid.toString() + ".mp3");
                } else {
                    cc.audioEngine.playEffect("res/sound/voice/female/sound_woman_msg_" + mid.toString() + ".mp3");
                }
            }
		}
	},

    sendExpression : function(fromIdx, toIdx, eid){
        // TEST:
		cc.log("fromIdx:" + fromIdx + " toIdx:" + toIdx + " eid:" + eid);
        this.baseCall("sendExpression", fromIdx, toIdx, eid);
        this.recvExpression(fromIdx, toIdx, eid);
    },

    recvExpression : function(fromIdx, toIdx, eid){
        if(eid < 0 || eid > const_val.EXPRESSION_ANIM_LIST.length - 1){
            return;
        }
        fromIdx = h1global.player().server2CurSitNum(fromIdx);
        toIdx = h1global.player().server2CurSitNum(toIdx);
        if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playExpressionAnim", fromIdx, toIdx, eid);
            var voice_root = "res/sound/effect/";
            switch(eid){
                case 0:
                    cc.audioEngine.playEffect(voice_root + "egg.mp3");
                    break;
                case 1:
                    cc.audioEngine.playEffect(voice_root + "kiss.mp3");
                    break;
                case 2:
                    cc.audioEngine.playEffect(voice_root + "cheers.mp3");
                    break;
                case 3:
                    //cc.audioEngine.playEffect(voice_root + "money.mp3");
                    break;
                default:
                    break;
            }
        }
    },

	sendVoice : function(url, record_time){
		this.baseCall("sendVoice", url, record_time);
		this.recvVoice(this.serverSitNum, url, record_time);
	},

	sendAppVoice : function(url, record_time){
		this.baseCall("sendAppVoice", url, record_time);
		this.recvAppVoice(this.serverSitNum, url, record_time);
	},

	recvVoice : function(serverSitNum, url, record_time){
        if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) || (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
			return;
		}
		var self = this;
		wx.downloadVoice({
	      	serverId: url,
	      	success: function (res) {
	        	// alert('下载语音成功，localId 为' + res.localId);
	        	// voice.localId = res.localId;
	        	// 直接播放
	        	// var talk_img = undefined;
				if(h1global.curUIMgr.gameroomprepare_ui && h1global.curUIMgr.gameroomprepare_ui.is_show){
					h1global.curUIMgr.gameroomprepare_ui.playVoiceAnim(serverSitNum, record_time)
				} else if (h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()){
					h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playVoiceAnim", serverSitNum, record_time);
				}
				// self.voiceCache[res.localId] = talk_img;
	        	wx.playVoice({
			      	localId: res.localId,
			    });
	      	}
	    });
	},

	recvAppVoice : function(serverSitNum, fileID, record_time){
		cc.log("recvAppVoice#######################################################");
		cc.log(fileID);
        // 直接播放
        if(h1global.curUIMgr.gameroomprepare_ui && h1global.curUIMgr.gameroomprepare_ui.is_show){
            h1global.curUIMgr.gameroomprepare_ui.playVoiceAnim(serverSitNum, record_time / 1000);
        } else if(h1global.curUIMgr.gameRoomUIIsShow && h1global.curUIMgr.gameRoomUIIsShow()) {
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "playVoiceAnim", serverSitNum, record_time / 1000);
        }
        cutil.download_voice(fileID);
	},
});
