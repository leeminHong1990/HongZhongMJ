// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
"use strict";

var CreateAgentRoomUI = UIBase.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/CreateAgentRoomUI.json";
		var self = this;
		this.containUISnippets = {
			"CreateRoomSnippet" : new CreateRoomSnippet(function(){return self.rootUINode;})
		};
    },

    initUI:function(){
        this.createroom_panel = this.rootUINode.getChildByName("createroom_panel");
        this.gamename_panel = this.createroom_panel.getChildByName("gamename_panel");
        this.playing_scroll = this.createroom_panel.getChildByName("playing_room_scroll");
        this.complete_scroll = this.createroom_panel.getChildByName("complete_room_scroll");
        var self = this;
        var return_btn = ccui.helper.seekWidgetByName(this.createroom_panel, "return_btn");
        function return_btn_event(sender, eventType){
            if (eventType === ccui.Widget.TOUCH_ENDED) {
				h1global.curUIMgr.gamehall_ui.updateCharacterCard();
                self.hide();
            }
        }
        return_btn.addTouchEventListener(return_btn_event);

        this.initCreateRoom();
        this.initRoomScroll();
    },

    initRoomScroll: function () {
    	var self = this;
        this.playing_scroll.setVisible(false);
        this.complete_scroll.setVisible(false);

		this.playing_btn = this.createroom_panel.getChildByName("playing_btn");
		this.complete_btn = this.createroom_panel.getChildByName("complete_btn");

		function playing_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
				self.playing_btn.setEnabled(false);
				self.complete_btn.setEnabled(true);
               h1global.player().getPlayingRoomInfo();
            }
		}
		this.playing_btn.addTouchEventListener(playing_btn_event);

		function complete_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
				self.playing_btn.setEnabled(true);
				self.complete_btn.setEnabled(false);
                h1global.player().getCompleteRoomInfo();
            }
		}
		this.complete_btn.addTouchEventListener(complete_btn_event);

		var refresh_btn = this.createroom_panel.getChildByName("refresh_btn");
		function refresh_btn_event(sender, eventType) {
			if (eventType === ccui.Widget.TOUCH_ENDED) {
				if (self.playing_scroll.isVisible()) {
					h1global.player().getPlayingRoomInfo();
				} else {
					h1global.player().getCompleteRoomInfo();
				}
			}
		}
		refresh_btn.addTouchEventListener(refresh_btn_event);
	},

    initCreateRoom:function(){
        var self = this;
        var create_btn = ccui.helper.seekWidgetByName(this.gamename_panel, "create_btn");
        function create_btn_event(sender, eventType){
            if (eventType === ccui.Widget.TOUCH_ENDED) {
				cutil.lock_ui();
				var parameters = self.containUISnippets["CreateRoomSnippet"].getParameters();
				var pay_mode = parameters["pay_mode"];
				var round_num = parameters["round_num"];
				var lucky_num = parameters["lucky_num"];
				var hand_prepare = parameters["hand_prepare"];
				cc.log("CreateAgentRoom args: ", parameters);
				h1global.player().createRoom(pay_mode, round_num, lucky_num,
					hand_prepare, 1);
            }
        }
        create_btn.addTouchEventListener(create_btn_event);
    },

    updatePlayingRoom: function (playingRoomList) {
        var self = this;
        this.playing_scroll.setVisible(true);
        this.complete_scroll.setVisible(false);
		this.playing_btn.setEnabled(false);
		this.complete_btn.setEnabled(true);
		cc.log("updatePlayingRoom is ", playingRoomList);
		UICommonWidget.update_scroll_items(this.playing_scroll, playingRoomList, function (curItem, itemInfo, idx) {
            self.updatePlayingItem(curItem, itemInfo);
		});
	},

    updateCompleteRoom: function (finishRoomList) {
        var self = this;
		this.playing_scroll.setVisible(false);
		this.complete_scroll.setVisible(true);
		this.playing_btn.setEnabled(true);
		this.complete_btn.setEnabled(false);
		finishRoomList.reverse();
		cc.log("updateCompleteRoom is ", finishRoomList);
		UICommonWidget.update_scroll_items(this.complete_scroll, finishRoomList, function (curItem, itemInfo, idx) {
            self.updateCompleteItem(curItem, itemInfo);
		})
	},

    updatePlayingItem: function (item, data) {
    	var room_id = data['roomID'];
    	var cur_round = data['curRound'];
    	var max_round = data['maxRound'];
    	var player_list = data['player_simple_info_list'];

    	item.getChildByName("game_name").ignoreContentAdaptWithSize(true);
        var room_id_label = item.getChildByName("room_id_label");
        room_id_label.ignoreContentAdaptWithSize(true);
        room_id_label.setString("房号:" + room_id);
        var round_label = item.getChildByName("round_label");
        round_label.ignoreContentAdaptWithSize(true);
        round_label.setString(max_round + "局");

		var length = player_list.length;
        for (var i = 0; i < 4; i++) {
			let player_panel = item.getChildByName("player_panel_" + i.toString());
			let found = false;
			for (var j = 0; j < length; j++) {
				let player_d = player_list[j];
				if (player_d["idx"] === i) {
					found = true;
					this.updatePlayingPlayerInfo(player_panel, player_d);
				}
			}
			if (!found) {
				player_panel.getChildByName("name_label").setVisible(false);
				player_panel.getChildByName("name_bg").setVisible(false);
				player_panel.getChildByName("icon_img").setVisible(true);
				var portrait_sprite = player_panel.getChildByName("portrait_sprite");
				if (portrait_sprite) {
					portrait_sprite.removeFromParent();
				}
			}
		}

		var room_detail_label = item.getChildByName("room_detail_label");
        room_detail_label.ignoreContentAdaptWithSize(true);
        var detail_str = cutil.get_playing_room_detail(data);
        room_detail_label.setString(detail_str);

        var playing_label = item.getChildByName("playing_label");
		var invite_btn = item.getChildByName("invite_btn");
		var dismiss_btn = item.getChildByName("dismiss_btn");
        if (cur_round >= 1) {
        	invite_btn.setVisible(false);
        	dismiss_btn.setVisible(false);
        	var label_str = "游戏中(" + cur_round.toString() + '/' + max_round.toString() + ')';
        	playing_label.ignoreContentAdaptWithSize(true);
        	playing_label.setString(label_str);
			playing_label.setVisible(true);
		} else {
			playing_label.setVisible(false);
			invite_btn.setVisible(true);
			dismiss_btn.setVisible(true);
			var share_title = '红中麻将 房间号【' + room_id.toString() + '】' + "【代开房】";
			var share_desc = cutil.get_agent_room_desc(data);

			invite_btn.addTouchEventListener(function (sender, eventType) {
				if (eventType === ccui.Widget.TOUCH_ENDED) {
					var share_url = switches.PHP_SERVER_URL + '/gxmj_home?action=joinroom&roomId=' + room_id.toString();
					if((cc.sys.os === cc.sys.OS_ANDROID && cc.sys.isNative)){
						jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity","callWechatShareUrl", "(ZLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", true, share_url, share_title, share_desc);
					} else if((cc.sys.os === cc.sys.OS_IOS && cc.sys.isNative)){
						jsb.reflection.callStaticMethod("WechatOcBridge","callWechatShareUrlToSession:fromUrl:withTitle:andDescription:", true, share_url, share_title, share_desc);
					} else {
						cutil.share_func(share_title, share_desc);
						h1global.curUIMgr.share_ui.show();
					}
				}
			});

			dismiss_btn.addTouchEventListener(function (sender, eventType) {
				if (eventType === ccui.Widget.TOUCH_ENDED) {
					h1global.player().agentDismissRoom(room_id);
				}
			});
		}
	},

    updateCompleteItem: function (item, data) {
		var self = this;
		var room_id = data['roomID'];
		var max_round = data['maxRound'];
		var time = data['time'];
		var player_list = data['player_simple_info_list'];

		item.getChildByName("game_name").ignoreContentAdaptWithSize(true);
		var room_id_label = item.getChildByName("room_id_label");
		room_id_label.ignoreContentAdaptWithSize(true);
		room_id_label.setString("房号:" + room_id);
		var round_label = item.getChildByName("round_label");
		round_label.ignoreContentAdaptWithSize(true);
		round_label.setString(max_round + "局");
		var time_label = item.getChildByName("time_label");
		time_label.ignoreContentAdaptWithSize(true);
		var time_str = cutil.convert_timestamp_to_datetime(time);
		time_label.setString(time_str);
		var room_detail_label = item.getChildByName("room_detail_label");
		room_detail_label.ignoreContentAdaptWithSize(true);
		var detail_str = cutil.get_playing_room_detail(data);
		room_detail_label.setString(detail_str);

		for (var i = 0; i < player_list.length; i++) {
			let player_panel = item.getChildByName("player_panel_" + i.toString());
			let player_d = player_list[i];
			self.updateCompletePlayerInfo(player_panel, player_d);
		}
	},

	updatePlayingPlayerInfo: function (panel, player_d) {
		var self = this;
		cutil.loadPortraitTexture(player_d["head_icon"], player_d["sex"], function (img) {
			if (self.is_show && panel) {
				panel.getChildByName("icon_img").setVisible(false);
				let portrait_sprite = panel.getChildByName("portrait_sprite");
				if (portrait_sprite) {
					portrait_sprite.removeFromParent();
				}
				portrait_sprite = new cc.Sprite(img);
				portrait_sprite.setName("portrait_sprite");
				portrait_sprite.setScale(74 / portrait_sprite.getContentSize().width);
				portrait_sprite.x = panel.getContentSize().width * 0.5;
				portrait_sprite.y = panel.getContentSize().height * 0.5;
				panel.addChild(portrait_sprite);
				let name_label = panel.getChildByName("name_label");
				let name_bg = panel.getChildByName("name_bg");
				name_label.setString(player_d['nickname']);
				panel.reorderChild(name_bg, 1);
				panel.reorderChild(name_label, 2);
				portrait_sprite.setVisible(true);
				name_label.setVisible(true);
				name_bg.setVisible(true);
				panel.setVisible(true);
			}
		});
	},

	updateCompletePlayerInfo: function (panel, player_d) {
		var self = this;
		cutil.loadPortraitTexture(player_d["head_icon"], player_d["sex"], function (img) {
			if (self.is_show && panel) {
				panel.getChildByName("icon_img").setVisible(false);
				let portrait_sprite = panel.getChildByName("portrait_sprite");
				if (portrait_sprite) {
					portrait_sprite.removeFromParent();
				}
				portrait_sprite = new cc.Sprite(img);
				portrait_sprite.setName("portrait_sprite");
				portrait_sprite.setScale(74 / portrait_sprite.getContentSize().width);
				portrait_sprite.x = panel.getContentSize().width * 0.5;
				portrait_sprite.y = panel.getContentSize().height * 0.5;
				panel.addChild(portrait_sprite);
				var name_label = panel.getChildByName("name_label");
				let name_bg = panel.getChildByName("name_bg");
				name_label.setString(player_d['nickname']);
				let score_label = panel.getChildByName("score");
				score_label.ignoreContentAdaptWithSize(true);
				score_label.setString(player_d['score']);
				score_label.setTextColor(player_d['score']>=0 ? cc.color(62, 165, 2):cc.color(236, 88, 60));
				panel.reorderChild(panel.getChildByName("name_bg"), 1);
				panel.reorderChild(panel.getChildByName("name_label"), 2);
				portrait_sprite.setVisible(true);
				name_label.setVisible(true);
				name_bg.setVisible(true);
				score_label.setVisible(true);
				panel.setVisible(true);
			}
		});
	}
});