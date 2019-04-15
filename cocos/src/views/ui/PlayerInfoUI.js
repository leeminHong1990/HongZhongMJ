"use strict";
var PlayerInfoUI = BasicDialogUI.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/PlayerInfoUI.json";
	},

	initUI:function(){
		this.playerinfo_panel = this.rootUINode.getChildByName("playerinfo_panel");
        this.playerinfo_panel.setVisible(true);
		this.rootUINode.getChildByName("prepareplayerinfo_panel").setVisible(false);
		this.rootUINode.getChildByName("gameselfplayerinfo_panel").setVisible(false);
		this.rootUINode.getChildByName("gameplayerinfo_panel").setVisible(false);
		var player = h1global.player();
		var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
		var self = this;
		this.playerinfo_panel.getChildByName("return_btn").addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				self.hide();
			}
		});

		cc.log("info_dict:",info_dict);
		cutil.loadPortraitTexture(info_dict["headimgurl"], info_dict["sex"], function(img){
			if(h1global.curUIMgr.playerinfo_ui && h1global.curUIMgr.playerinfo_ui.is_show){
				h1global.curUIMgr.playerinfo_ui.rootUINode.getChildByName("playerinfo_panel").getChildByName("portrait_sprite").removeFromParent();
				var portrait_sprite  = new cc.Sprite(img);
				portrait_sprite.setName("portrait_sprite");
				portrait_sprite.setScale(96/portrait_sprite.getContentSize().width);
				portrait_sprite.x = 147;
				portrait_sprite.y = 258.5;
    			h1global.curUIMgr.playerinfo_ui.rootUINode.getChildByName("playerinfo_panel").addChild(portrait_sprite);
			}
		});

		this.playerinfo_panel.getChildByName("name_label").setString("昵称：" + info_dict["nickname"]);

		this.playerinfo_panel.getChildByName("id_label").setString("ID号：" + info_dict["user_id"]);

		//发送好友
		this.playerinfo_panel.getChildByName("send_friend_btn").addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
                if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
                    jsb.fileUtils.captureScreen("", "screenShot.png");
                } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
                    jsb.reflection.callStaticMethod("WechatOcBridge","takeScreenShot");
                } else {
                    h1global.curUIMgr.share_ui.show();
                }
			}
		});
		if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            this.playerinfo_panel.getChildByName("send_friend_btn").setVisible(false);
		}
	},
});