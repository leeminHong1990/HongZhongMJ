// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
var ResultUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/ResultUI.json";
        this.setLocalZOrder(const_val.MAX_LAYER_NUM);
	},
	initUI:function(){
        this.result_panel = this.rootUINode.getChildByName("result_panel");
		this.player_panels = [];
		this.player_panels.push(this.rootUINode.getChildByName("result_panel").getChildByName("player_info_panel0"));
		this.player_panels.push(this.rootUINode.getChildByName("result_panel").getChildByName("player_info_panel1"));
		this.player_panels.push(this.rootUINode.getChildByName("result_panel").getChildByName("player_info_panel2"));
		this.player_panels.push(this.rootUINode.getChildByName("result_panel").getChildByName("player_info_panel3"));

		var share_btn = this.rootUINode.getChildByName("result_panel").getChildByName("share_btn");
        if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true){
            share_btn.setVisible(false);
        }
		function share_btn_event(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
                if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
					jsb.fileUtils.captureScreen("", "screenShot.png");
                } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
                    jsb.reflection.callStaticMethod("WechatOcBridge","takeScreenShot");
                } else {
                    // share_btn.setVisible(false);
                    h1global.curUIMgr.share_ui.show();
                }
			}
		}
		share_btn.addTouchEventListener(share_btn_event);
        if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            share_btn.setVisible(false);
        }
		// if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) || (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
		// 	share_btn.setVisible(true);
		// } else {
		// 	share_btn.setVisible(false);
		// }
		var self = this;
		var confirm_btn = this.rootUINode.getChildByName("result_panel").getChildByName("confirm_btn");
		function confirm_btn_event(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
                let player = h1global.player();
                self.finalResultFlag = false;
                if(player && player.curGameRoom){
                    var club_id = player.curGameRoom.club_id;
                    player.curGameRoom = null;
                    h1global.runScene(new GameHallScene({'from_scene':'GameHallScene', 'club_id':club_id}));
                } else {
                    h1global.runScene(new GameHallScene());
                }
			}
		}
		confirm_btn.addTouchEventListener(confirm_btn_event);

        //保存截屏
        var save_screen_btn = this.rootUINode.getChildByName("result_panel").getChildByName("save_screen_btn");
        function save_screen_btn_event(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
                    var currTimeStr = new Date().getTime().toString();
                    jsb.fileUtils.captureScreen("",  "MJ_" + currTimeStr + "_MJ.png");
                } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
                    jsb.reflection.callStaticMethod("WechatOcBridge","saveScreenShot");
                } else {
                    // share_btn.setVisible(false);
                }
            }
        }
        save_screen_btn.addTouchEventListener(save_screen_btn_event);
	},
	
	show_by_info:function(finalPlayerInfoList, curGameRoom){
		cc.log("finalPlayerInfoList:",finalPlayerInfoList)
		var self = this;
		this.show(function(){
			var maxScore = 0;
			// var maxIdxList = [];
            // 需求 将玩家自己放在第一位
            var left = [];
            var right = [];
            var serverSitNum = h1global.player().serverSitNum;
            for(let i=0; i<finalPlayerInfoList.length; i++){
                if (finalPlayerInfoList[i]["idx"] < serverSitNum){
                    left.push(finalPlayerInfoList[i])
                }else{
                    right.push(finalPlayerInfoList[i])
                }
            }
            finalPlayerInfoList = right.concat(left);

            for(var i = 0; i < finalPlayerInfoList.length; i++){
                var finalPlayerInfo = finalPlayerInfoList[i];
                if(finalPlayerInfo["score"] > maxScore){
                    maxScore = finalPlayerInfo["score"];
                }
			}
			for(var i = 0; i < finalPlayerInfoList.length; i++){
                var finalPlayerInfo = finalPlayerInfoList[i];
				if(finalPlayerInfo["score"] > maxScore){
					maxScore = finalPlayerInfo["score"];
				}
                if(finalPlayerInfoList[i]["score"] == maxScore && maxScore != 0){
                    self.update_player_info(finalPlayerInfo["idx"], finalPlayerInfo, i, curGameRoom);
                }else {
                    self.update_player_info(finalPlayerInfo["idx"], finalPlayerInfo, -1, curGameRoom);
                }
                if (finalPlayerInfoList.length == 3) {
                    self.player_panels[0].setPositionX(self.result_panel.getContentSize().width * 0.30);
                    self.player_panels[1].setPositionX(self.result_panel.getContentSize().width * 0.50);
                    self.player_panels[2].setPositionX(self.result_panel.getContentSize().width * 0.70);
                    self.player_panels[3].setVisible(false);
                }else {
                    self.player_panels[0].setPositionX(self.result_panel.getContentSize().width * 0.14);
                    self.player_panels[1].setPositionX(self.result_panel.getContentSize().width * 0.38);
                    self.player_panels[2].setPositionX(self.result_panel.getContentSize().width * 0.62);
                    self.player_panels[3].setPositionX(self.result_panel.getContentSize().width * 0.86);
                    self.player_panels[3].setVisible(true);
				}
			}
			// for(var i = 0; i < finalPlayerInfoList.length; i++){
			// 	if(finalPlayerInfoList[i]["score"] == maxScore){
			// 		maxIdxList.push(finalPlayerInfoList[i]["idx"]);
			// 	}
			// }
			var clubStr = "";
			if (curGameRoom.club_id > 0) {
				clubStr = "    茶楼号：" + curGameRoom.club_id;
			}
			var roomInfoLabel = self.result_panel.getChildByName("roominfo_label");
			roomInfoLabel.setString(cutil.convert_timestamp_to_datetime_exsec(new Date() / 1000) + "   房间号：" + curGameRoom.roomID.toString() + clubStr);

			cutil.unlock_ui();

            if(!((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) || (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) || switches.TEST_OPTION)) {
                var result_list = {};
                var result_str = '';
                for (var i = 0; i < finalPlayerInfoList.length; i++) {
                    var finalPlayerInfo = finalPlayerInfoList[i];
                    result_list[finalPlayerInfo["idx"]] = finalPlayerInfo;
                }
                for (var i = 0; i < finalPlayerInfoList.length; i++) {
                    if (result_list[i]) {
                        result_str = result_str + '[' + curGameRoom.playerInfoList[i]["nickname"] + ']:' + result_list[i]["score"];
                        if (i != finalPlayerInfoList.length - 1) {
                            result_str = result_str + ','
                        }
                    }
                }
                var title = curGameRoom.club_id > 0 ? '茶楼号【' + curGameRoom.club_id.toString() + '】,招募群主,1000红包奖励群主!' : '房间号【' + curGameRoom.roomID.toString() + '】,招募群主,1000红包奖励群主!';
                var desc = result_str;
                cutil.share_func(title, desc);
            }
		});
	},

    update_player_info: function (serverSitNum, finalPlayerInfo, win_idx, curGameRoom) {
        win_idx = win_idx >= 0 ? win_idx : -1;
	    cc.log("finalPlayerInfo:",finalPlayerInfo);
		var cur_player_info_panel = this.player_panels[serverSitNum];
		var playerInfo = curGameRoom.playerInfoList[serverSitNum];
		cur_player_info_panel.getChildByName("name_label").setString(playerInfo["nickname"]);
		// cur_player_info_panel.getChildByName("userid_label").setString("ID:" + playerInfo["userId"].toString());
		var frame_img = ccui.helper.seekWidgetByName(cur_player_info_panel, "frame_img");
		cur_player_info_panel.reorderChild(frame_img, 1);
		var owner_img = ccui.helper.seekWidgetByName(cur_player_info_panel, "owner_img");
		cur_player_info_panel.reorderChild(owner_img, 2);
        var id_label = ccui.helper.seekWidgetByName(cur_player_info_panel, "id_label");
        id_label.setString("ID:" + playerInfo["userId"].toString());
        var kong_num = finalPlayerInfo["concealed_kong"] + finalPlayerInfo["continue_kong"] + finalPlayerInfo["exposed_kong"];
        var win_num = finalPlayerInfo["win_times"];
        var pong_num = finalPlayerInfo["pong_times"];
        var kong_num_label = ccui.helper.seekWidgetByName(cur_player_info_panel, "kong_num_label");
        kong_num_label.setString(kong_num.toString());
        var win_num_label = ccui.helper.seekWidgetByName(cur_player_info_panel, "win_num_label");
        win_num_label.setString(win_num.toString());
        var pong_num_label = ccui.helper.seekWidgetByName(cur_player_info_panel, "pong_num_label");
        pong_num_label.setString(pong_num.toString());
		if(serverSitNum == 0){
			owner_img.setVisible(true);
		} else {
			owner_img.setVisible(false);
		}
		cutil.loadPortraitTexture(playerInfo["head_icon"], playerInfo["sex"], function(img){
			cur_player_info_panel.getChildByName("portrait_sprite").removeFromParent();
			var portrait_sprite  = new cc.Sprite(img);
			portrait_sprite.setName("portrait_sprite");
			portrait_sprite.setScale(81/portrait_sprite.getContentSize().width);
			portrait_sprite.x = cur_player_info_panel.getContentSize().width * 0.29;
			portrait_sprite.y = cur_player_info_panel.getContentSize().height * 0.675;
			cur_player_info_panel.addChild(portrait_sprite);
		});
		var final_score = finalPlayerInfo["score"];
		this.player_panels[serverSitNum].getChildByName("score_label").setString(final_score.toString());
        this.player_panels[serverSitNum].getChildByName("score_label").color = (final_score >= 0 ? cc.color(62, 165, 2) : cc.color(236, 88, 60));
        var win_title_img = ccui.helper.seekWidgetByName(cur_player_info_panel, "win_title_img");
		if(win_idx < 0){
            win_title_img.setVisible(false);
		}else {
            cur_player_info_panel.reorderChild(win_title_img, 3);
            win_title_img.setVisible(true);
		}
	},
	
	onHide:function () {
		this.finalResultFlag = false;
    }
	
});
