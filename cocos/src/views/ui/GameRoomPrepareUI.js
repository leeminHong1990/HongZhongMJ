// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
var GameRoomPrepareUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/GameRoomPrepareUI.json";
		this.talk_img_num = 0;
	},

	initUI:function(){
        var player = h1global.player();
		this.gameprepare_panel = this.rootUINode.getChildByName("gameprepare_panel");
		if(player.curGameRoom.curRound > 0){
			//因为2D的GAME_ROOM_UI值为0,3D的值为1,所以这里加1
            this.gameprepare_panel.setVisible(false);
            this.gameprepare_panel = this.rootUINode.getChildByName("gameprepare" + (parseInt(cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI")) + 2).toString() + "d_panel");
		}
        this.gameprepare_panel.setVisible(true);
        this.gameprepare_panel.getChildByName("bg_panel").addTouchEventListener(function (sender, eventType) {
			if(eventType == ccui.Widget.TOUCH_ENDED){
                if (h1global.curUIMgr.gameplayerinfo_ui && h1global.curUIMgr.gameplayerinfo_ui.is_show) {
                    h1global.curUIMgr.gameplayerinfo_ui.hide();
                }
			}
        });
		if(player.curGameRoom.playerInfoList.length == 3) {
            for (var i = 0; i < 3; i++) {
                this.update_player_info_panel(i, player.curGameRoom.playerInfoList[i]);
                if (player.curGameRoom.playerInfoList[i]) {
                    this.update_player_state(i, player.curGameRoom.playerStateList[i]);
                }
            }
        }else {
            for (var i = 0; i < 4; i++) {
                this.update_player_info_panel(i, player.curGameRoom.playerInfoList[i]);
                if (player.curGameRoom.playerInfoList[i]) {
                    this.update_player_state(i, player.curGameRoom.playerStateList[i]);
                }
            }
		}
		var roomid_label = this.gameprepare_panel.getChildByName("roomid_label");
		roomid_label.setString(player.curGameRoom.roomID.toString());

		var roominfo_list = [["无摸宝,","摸一宝,","摸二宝,"], ["手动准备", "自动准备"]];
		var share_title = '红中麻将 ' + (player.curGameRoom.club_id > 0 ? '茶楼号【' + player.curGameRoom.club_id.toString() + '】' : '房间号【' + player.curGameRoom.roomID.toString() + '】');
		var share_desc =  (player.curGameRoom.maxRound + '局,') + (roominfo_list[0][player.curGameRoom.luckyTileNum]) + (roominfo_list[1][player.curGameRoom.hand_prepare]);
		var wxinvite_btn = this.gameprepare_panel.getChildByName("wxinvite_btn");
        if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true){
            wxinvite_btn.setVisible(false);
        }
		wxinvite_btn.addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
			    var share_url = switches.PHP_SERVER_URL + '/gxmj_home?action=joinroom&roomId=' + player.curGameRoom.roomID.toString();
                if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
					jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity","callWechatShareUrl", "(ZLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", true, share_url, share_title, share_desc);
				} else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
					jsb.reflection.callStaticMethod("WechatOcBridge","callWechatShareUrlToSession:fromUrl:withTitle:andDescription:", true, share_url, share_title, share_desc);
				} else {
					cutil.share_func(share_title, share_desc);
					h1global.curUIMgr.share_ui.show();
				}
			}
		})

        var prepare_btn = this.gameprepare_panel.getChildByName("prepare_btn");
        if(player.curGameRoom.hand_prepare == 1){
            prepare_btn.setVisible(false);
            wxinvite_btn.setPositionX(this.gameprepare_panel.getContentSize().width * 0.5);
        }
        prepare_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED){
                player.curGameRoom.updatePlayerState(player.serverSitNum, 1);
                h1global.curUIMgr.gameroomprepare_ui.update_player_state(player.serverSitNum, 1);
                player.prepare();
                prepare_btn.setVisible(false);
            }
        });

        if(h1global.player().curGameRoom.curRound != 0){
            wxinvite_btn.setVisible(false);
        }

		h1global.curUIMgr.gameroominfo_ui.show();

		if(!cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.resumeMusic();
        }

        if (h1global.curUIMgr.gameplayerinfo_ui && h1global.curUIMgr.gameplayerinfo_ui.is_show) {
            h1global.curUIMgr.gameplayerinfo_ui.hide();
        }

        var center_bg_img = this.gameprepare_panel.getChildByName("center_bg_img");
		if(player.curGameRoom.curRound > 0) {
            if (cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI") == 0) {
                var curServerSitNum = (player.serverSitNum - player.curGameRoom.dealerIdx + 4) % 4;
                center_bg_img.setRotation((90 * curServerSitNum) % 360);
            } else {
                var bgList = ["east", "south", "west", "north"];
                var curServerSitNum = (player.serverSitNum - player.curGameRoom.dealerIdx + 4) % 4;
                center_bg_img.loadTexture("res/ui/GameRoomUI/curplayer_" + bgList[curServerSitNum] + "_bg.png");
            }
        }
	},

	change_prepare_mode:function (gameType) {
		this.gameprepare_panel.setVisible(false);
		this.gameprepare_panel = this.rootUINode.getChildByName("gameprepare" + (parseInt(gameType) + 2).toString() + "d_panel");
		this.initUI();
        this.gameprepare_panel.setVisible(true);
    },

	check_invition:function(){
		var player = h1global.player();
		var playerNum = 0;
		for(var i = 0; i < 4; i++){
			if(player.curGameRoom.playerInfoList[i]){
				playerNum = playerNum + 1;
			}
		}
		var wxinvite_btn = this.gameprepare_panel.getChildByName("wxinvite_btn");
		if(playerNum < player.curGameRoom.player_num){
			wxinvite_btn.setVisible(true);
		} else {
			wxinvite_btn.setVisible(false);
		}
        if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true){
            wxinvite_btn.setVisible(false);
        }
        if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
		    wxinvite_btn.setVisible(false);
        }
	},

    check_prepare: function () {
        var player = h1global.player();
        var prepare_btn = this.gameprepare_panel.getChildByName("prepare_btn");
        if (player.curGameRoom.playerStateList[player.serverSitNum]){
            prepare_btn.setVisible(false);
        } else {
            prepare_btn.setVisible(true);
        }
    },

	update_player_info_panel:function(serverSitNum, playerInfo){
		if(serverSitNum < 0 || serverSitNum > 3){
			return;
		}
		var player = h1global.player();
        var player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + serverSitNum.toString());
		var frame_bg_img = this.gameprepare_panel.getChildByName("frame_img_" + serverSitNum.toString());
		if(player.curGameRoom.curRound > 0){
            player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + player.server2CurSitNum(serverSitNum).toString());
        }
		if(playerInfo){
            frame_bg_img.setVisible(false);
			var name_label = ccui.helper.seekWidgetByName(player_info_panel, "name_label");
			name_label.setString(playerInfo["nickname"]);
			var frame_img = ccui.helper.seekWidgetByName(player_info_panel, "frame_img");
			player_info_panel.reorderChild(frame_img, -2);
			frame_img.setTouchEnabled(true);
			frame_img.addTouchEventListener(function(sender, eventType){
				if(eventType == ccui.Widget.TOUCH_ENDED){
					h1global.curUIMgr.gameplayerinfo_ui.show_by_info(playerInfo, serverSitNum + 10);
				}
			});
			cutil.loadPortraitTexture(playerInfo["head_icon"], playerInfo["sex"], function(img){
				if(h1global.curUIMgr.gameroomprepare_ui && h1global.curUIMgr.gameroomprepare_ui.is_show && player_info_panel){
					player_info_panel.getChildByName("portrait_sprite").removeFromParent();
					var portrait_sprite  = new cc.Sprite(img);
					portrait_sprite.setName("portrait_sprite");
                    if(player.curGameRoom.curRound > 0) {
                        portrait_sprite.setScale(74 / portrait_sprite.getContentSize().width);
                    }else {
                        portrait_sprite.setScale(100 / portrait_sprite.getContentSize().width);
					}
                    portrait_sprite.x = player_info_panel.getContentSize().width * 0.5;
					portrait_sprite.y = player_info_panel.getContentSize().height * 0.5;
	    			player_info_panel.addChild(portrait_sprite);
                    player_info_panel.reorderChild(portrait_sprite, -1);
				}
			});
			if(player.curGameRoom.curRound > 0){
                var score_label = ccui.helper.seekWidgetByName(player_info_panel, "score_label");
                score_label.ignoreContentAdaptWithSize(true);
                score_label.setString((playerInfo["total_score"] == undefined ? 0 : playerInfo["total_score"]).toString());
			}
			var dealer_img = ccui.helper.seekWidgetByName(player_info_panel, "dealer_img");
			if(player.curGameRoom.dealerIdx == serverSitNum && player.curGameRoom.curRound > 0){
				dealer_img.setVisible(true);
			} else {
				dealer_img.setVisible(false);
			}
			var owner_img = ccui.helper.seekWidgetByName(player_info_panel, "owner_img");
			player_info_panel.reorderChild(owner_img, 3);
			if(serverSitNum == 0){
				owner_img.setVisible(true);
			} else {
				owner_img.setVisible(false);
			}
			var red_mark_img = player_info_panel.getChildByName("red_mark_img");
            player_info_panel.reorderChild(red_mark_img, 5);
			if(!playerInfo["location"] && player.curGameRoom.curRound < 1){
				red_mark_img.setVisible(true);
			}else {
                red_mark_img.setVisible(false);
            }
			player_info_panel.setVisible(true);
		} else {
            frame_bg_img.setVisible(true);
			player_info_panel.setVisible(false);
		}
		if(player.curGameRoom.playerInfoList.length == 3) {
            this.gameprepare_panel.getChildByName("player_info_panel2").setVisible(false);
        }
		this.check_invition();
        this.check_prepare();
	},

	update_player_state:function(serverSitNum, state){
		if(serverSitNum < 0 || serverSitNum > 3){
			return;
		}
		var player = h1global.player();
		var player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + serverSitNum.toString());
		if(player.curGameRoom.curRound > 0){
            var player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + player.server2CurSitNum(serverSitNum).toString());
        }
		var ready_img = ccui.helper.seekWidgetByName(player_info_panel, "ready_img");
		player_info_panel.reorderChild(ready_img, 4);
		if(state == 1){
			// name_label.setString(playerInfo["name"]);
			ready_img.setVisible(true);
		} else {
			ready_img.setVisible(false);
		}
	},

	getMessagePos:function(playerInfoPanel){
		var anchor_point = playerInfoPanel.getAnchorPoint();
		var content_size = playerInfoPanel.getContentSize();
		var cur_pos = playerInfoPanel.getPosition();
		return cc.p(cur_pos.x - content_size.width * anchor_point.x + 130,
					cur_pos.y - content_size.height * anchor_point.y + 180);
	},

    playEmotionAnim:function(serverSitNum, eid){
        var player_info_panel = undefined;
        if (!this.is_show) {
            return false;
        }
        var player = h1global.entityManager.player();
        if (!player || !player.curGameRoom) {
            return
        }
        var curSitNum = serverSitNum;
        if (player.curGameRoom.curRound > 0) {
            curSitNum = player.server2CurSitNum(serverSitNum);
        }
        player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + curSitNum.toString());
        // player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + h1global.entityManager.player().server2CurSitNum(serverSitNum));
        var talk_img = ccui.ImageView.create();
        if(h1global.entityManager.player().curGameRoom.curRound > 0) {
            talk_img.setPosition(this.getMsgPos(player_info_panel, curSitNum));
        }else {
            talk_img.setPosition(this.getMessagePos(player_info_panel).x - 70, this.getMessagePos(player_info_panel).y + 25);
        }
        talk_img.loadTexture("res/ui/Default/talk_frame.png");
        talk_img.setScale9Enabled(true);
        talk_img.setContentSize(cc.size(100, 120));
        this.gameprepare_panel.addChild(talk_img);
        var talk_angle_img = ccui.ImageView.create();
        talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
        talk_img.addChild(talk_angle_img);
        // 加载表情图片
        cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA4444;
        var cache = cc.spriteFrameCache;
        var plist_path = "res/effect/biaoqing.plist";
        var png_path = "res/effect/biaoqing.png";
        cache.addSpriteFrames(plist_path, png_path);
        cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA8888;

        var anim_frames = [];
        for (var i = 1; i <= const_val.ANIM_LIST[eid - 1] ; i++) {
            var frame = cache.getSpriteFrame("Emot/biaoqing_" + eid.toString() + "_" + i.toString() + ".png");
            if (frame) {
                anim_frames.push(frame);
            }
        }
        var effect_animation = new cc.Animation(anim_frames, 1.5 / const_val.ANIM_LIST[eid - 1]);
        var effect_action = new cc.Animate(effect_animation);

        var emot_sprite = cc.Sprite.create();
        // emot_sprite.setScale(1.0);
        emot_sprite.setScale(0.4);
        emot_sprite.setPosition(cc.p(50, 60));
        // emot_sprite.setPosition(this.getMessagePos(player_info_panel));
        talk_img.addChild(emot_sprite);
        // this.gameprepare_panel.addChild(emot_sprite);
        if(h1global.entityManager.player().curGameRoom.curRound > 0){
            if(curSitNum > 0 && curSitNum < 3){
                talk_img.setScaleX(-1);
                talk_img.setPositionX(talk_img.getPositionX() - 40);
                talk_img.setPositionY(talk_img.getPositionY() - 10);
            }else {
                talk_img.setPositionX(talk_img.getPositionX() + 40);
                talk_angle_img.setLocalZOrder(3);
            }
            talk_angle_img.setPosition(3, talk_angle_img.getPositionY() + 50);
        }else {
            talk_angle_img.setRotation(-90);
            talk_angle_img.setLocalZOrder(3);
            talk_angle_img.setPosition(talk_img.getContentSize().width*0.5, 2);
        }
        emot_sprite.runAction(cc.Sequence.create(cc.Repeat.create(effect_action, 2), cc.CallFunc.create(function(){
            talk_img.removeFromParent();
        })));
    },

    playMessageAnim:function(serverSitNum, mid, msg){
        // var player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + h1global.entityManager.player().server2CurSitNum(serverSitNum));
        if (!this.is_show) {
            return false;
        }
        var player = h1global.entityManager.player();
        if (!player || !player.curGameRoom) {
            return
        }
        var idx = serverSitNum;
        if (player.curGameRoom.curRound > 0) {
            idx = player.server2CurSitNum(serverSitNum);
        }
        var player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + idx.toString());
        // player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + h1global.entityManager.player().server2CurSitNum(serverSitNum));
        var talk_img = ccui.ImageView.create();
        var talk_angle_img = ccui.ImageView.create();
        if(player.curGameRoom.curRound > 0){
            talk_img.setAnchorPoint(0,0.5);
        }else {
            talk_img.setAnchorPoint(0.5,0.5);
        }
        talk_img.setScale(1.0);
        // talk_img.setPosition(this.getMessagePos(player_info_panel));
        // talk_img.setPosition(talk_img.getPositionX() - 70,talk_img.getPositionY() - 15);
        if(player.curGameRoom.curRound > 0) {
            talk_img.setPosition(this.getMsgPos(player_info_panel, idx));
        }else {
            talk_img.setPosition(this.getMessagePos(player_info_panel));
            talk_img.setPosition(talk_img.getPositionX() - 70,talk_img.getPositionY() - 15);
        }
        talk_img.loadTexture("res/ui/Default/talk_frame.png");
        talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
        talk_img.addChild(talk_angle_img);
        this.gameprepare_panel.addChild(talk_img);

        var msg_label = cc.LabelTTF.create("", "Arial", 22);
        msg_label.setString(mid < 0 ? msg : const_val.MESSAGE_LIST[mid]);
        msg_label.setDimensions(msg_label.getString().length * 26, 0);
        msg_label.setColor(cc.color(0, 0, 0));
        msg_label.setAnchorPoint(cc.p(0.5, 0.5));
        talk_img.addChild(msg_label);
        talk_img.setScale9Enabled(true);
        talk_img.setContentSize(cc.size(msg_label.getString().length * 23 + 20, talk_img.getContentSize().height));
        if(player.curGameRoom.curRound > 0){
            talk_angle_img.setPosition(3,talk_img.getContentSize().height*0.5);
            if(idx > 0 && idx < 3){
                msg_label.setPosition(cc.p(msg_label.getString().length * 26 * 0.37 + 10, 23));
                talk_img.setScaleX(-1);
                msg_label.setScaleX(-1);
            }else {
                msg_label.setPosition(cc.p(msg_label.getString().length * 26 * 0.50 + 13, 23));
                talk_angle_img.setLocalZOrder(3);
            }
        }else {
            msg_label.setPosition(cc.p(talk_img.getContentSize().width*0.58, 23));
            talk_angle_img.setPosition(talk_img.getContentSize().width*0.5, 2);
            talk_angle_img.setRotation(-90);
            talk_angle_img.setLocalZOrder(3);
        }
        cc.log("talk_angle_img",talk_angle_img.getWorldPosition());
        msg_label.runAction(cc.Sequence.create(cc.DelayTime.create(2.0), cc.CallFunc.create(function(){
            talk_img.removeFromParent();
        })));
    },

    playVoiceAnim:function(serverSitNum, record_time){
        var self = this;
        if (!this.is_show) {
            return false;
        }
        var player = h1global.entityManager.player();
        if (!player || !player.curGameRoom) {
            return
        }
        var idx = serverSitNum;
        if (player.curGameRoom.curRound > 0) {
            idx = player.server2CurSitNum(serverSitNum);
        }
        if(cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.pauseMusic();
        }
        var interval_time = 0.8;
        this.talk_img_num += 1;
        // var player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + h1global.entityManager.player().server2CurSitNum(serverSitNum));
        var player_info_panel = undefined;
        player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + idx);
        // player_info_panel = this.gameprepare_panel.getChildByName("player_info_panel" + h1global.entityManager.player().server2CurSitNum(serverSitNum));
        var talk_img = ccui.ImageView.create();
        if(h1global.entityManager.player().curGameRoom.curRound > 0) {
            talk_img.setPosition(this.getMsgPos(player_info_panel, idx));
        }else {
            talk_img.setPosition(this.getMessagePos(player_info_panel).x - 70, this.getMessagePos(player_info_panel).y - 15);
        }
        talk_img.loadTexture("res/ui/Default/talk_frame.png");
        talk_img.setScale9Enabled(true);
        talk_img.setContentSize(cc.size(100, talk_img.getContentSize().height));
        this.gameprepare_panel.addChild(talk_img);
        var talk_angle_img = ccui.ImageView.create();
        talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
        talk_img.addChild(talk_angle_img);
        // 加载表情图片
        var voice_img1 = ccui.ImageView.create();
        voice_img1.loadTexture("res/ui/Default/voice_img1.png");
        voice_img1.setPosition(cc.p(50, 23));
        talk_img.addChild(voice_img1);
        var voice_img2 = ccui.ImageView.create();
        voice_img2.loadTexture("res/ui/Default/voice_img2.png");
        voice_img2.setPosition(cc.p(50, 23));
        voice_img2.setVisible(false);
        talk_img.addChild(voice_img2);
        voice_img2.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(interval_time), cc.CallFunc.create(function(){voice_img1.setVisible(false);voice_img2.setVisible(true);voice_img3.setVisible(false);}), cc.DelayTime.create(interval_time*2), cc.CallFunc.create(function(){voice_img2.setVisible(false)}))));
        var voice_img3 = ccui.ImageView.create();
        voice_img3.loadTexture("res/ui/Default/voice_img3.png");
        voice_img3.setPosition(cc.p(50, 23));
        voice_img3.setVisible(false);
        talk_img.addChild(voice_img3);
        voice_img3.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(interval_time*2), cc.CallFunc.create(function(){voice_img1.setVisible(false);voice_img2.setVisible(false);voice_img3.setVisible(true);}), cc.DelayTime.create(interval_time), cc.CallFunc.create(function(){voice_img3.setVisible(false);voice_img1.setVisible(true);}))));
        talk_angle_img.setRotation(-90);
        talk_angle_img.setLocalZOrder(3);
        talk_angle_img.setPosition(talk_img.getContentSize().width*0.5, 2);
        talk_img.runAction(cc.Sequence.create(cc.DelayTime.create(record_time), cc.CallFunc.create(function(){
            talk_img.removeFromParent();
            self.talk_img_num -= 1;
            if(self.talk_img_num == 0){
                if(!cc.audioEngine.isMusicPlaying()){
                    cc.audioEngine.resumeMusic();
                }
            }
        })));
        // return talk_img;
    },

    getMsgPos:function(playerInfoPanel, idx){
        var pos = playerInfoPanel.getPosition();
        if(idx == 1){
            pos = cc.p(pos.x - playerInfoPanel.width, pos.y + playerInfoPanel.height * 0.5);
        } else if(idx == 2){
            pos = cc.p(pos.x, pos.y - playerInfoPanel.height * 0.5);
        } else if(idx == 3){
            pos = cc.p(pos.x + playerInfoPanel.width, pos.y + playerInfoPanel.height * 0.5);
        } else {
            pos = cc.p(pos.x + playerInfoPanel.width, pos.y + playerInfoPanel.height * 0.5);
        }
        return pos;
    },
});