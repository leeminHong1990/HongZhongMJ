// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
var GameConfigUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/GameConfigUI.json";
		this.setLocalZOrder(const_val.GameConfigZOrder);
	},

	initUI:function(){
		this.gameconfig_panel = this.rootUINode.getChildByName("gameconfig_panel");
		var player = h1global.player();
		var self = this;
        this.bg_panel = this.rootUINode.getChildByName("bg_panel");
        this.bg_panel.setLocalZOrder(this.gameconfig_panel.getLocalZOrder() + 1);
        this.bg_panel.addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){

				if(h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show){
					h1global.curUIMgr.gameroominfo_ui.applyNewLayout();
				}

                self.gameconfig_panel.runAction(cc.Sequence.create(
                    cc.MoveTo.create(0.1,cc.winSize.width *1.5, cc.winSize.height * 0.5),
                    cc.CallFunc.create(function () {
                        self.hide();
                    })
                ));
            }
        });

		this.gameconfig_panel.getChildByName("return_btn").addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){

				if(h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show){
					h1global.curUIMgr.gameroominfo_ui.applyNewLayout();
				}

                self.gameconfig_panel.runAction(cc.Sequence.create(
                    cc.MoveTo.create(0.1,cc.winSize.width *1.5 ,cc.winSize.height * 0.5),
					cc.CallFunc.create(function () {
                        self.hide();
                    })
                ));
			}
		});

		var mode_3d_btn = this.gameconfig_panel.getChildByName("mode_btn_0");
		var mode_2d_btn = this.gameconfig_panel.getChildByName("mode_btn_1");
		this.mode_btn_list = [mode_2d_btn,mode_3d_btn];

		var color_btn_0 = this.gameconfig_panel.getChildByName("color_btn_0");
		var color_btn_1 = this.gameconfig_panel.getChildByName("color_btn_1");
		var color_btn_2 = this.gameconfig_panel.getChildByName("color_btn_2");
		this.color_btn_list = [color_btn_0,color_btn_1,color_btn_2];

		this.out_btn = this.gameconfig_panel.getChildByName("out_btn");
		this.out_btn.addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				player.quitRoom();
				self.hide();
			}
		});

		this.close_btn = this.gameconfig_panel.getChildByName("close_btn");
		this.close_btn.addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				player.quitRoom();
				self.hide();
			}
		});

		this.applyclose_btn = this.gameconfig_panel.getChildByName("applyclose_btn");
		this.applyclose_btn.addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				player.applyDismissRoom();
				self.hide();
			}
		});

		this.gameconfig_panel.getChildByName("music_slider").addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				cc.audioEngine.setMusicVolume(sender.getPercent()*0.01);
				cc.sys.localStorage.setItem("MUSIC_VOLUME", sender.getPercent());
			}
		});
		this.gameconfig_panel.getChildByName("music_slider").setPercent(cc.sys.localStorage.getItem("MUSIC_VOLUME"));

		this.gameconfig_panel.getChildByName("effect_slider").addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				cc.audioEngine.setEffectsVolume(sender.getPercent()*0.01);
				cc.sys.localStorage.setItem("EFFECT_VOLUME", sender.getPercent());
			}
		});
		this.gameconfig_panel.getChildByName("effect_slider").setPercent(cc.sys.localStorage.getItem("EFFECT_VOLUME"));

		this.update_state();
		this.update_mode_color();

        this.gameconfig_panel.setPositionX(cc.winSize.width * 1.5);
        this.gameconfig_panel.runAction(cc.moveBy(0.3, cc.winSize.width * -0.5, 0));
    },

	change_color:function () {
        var gameBgType = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_BG");
        if(h1global.curUIMgr.updateBackground){
            h1global.curUIMgr.updateBackground(cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI"),gameBgType);
		}
    },

    change_mode:function () {
		var gameType = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI");
		if(h1global.curUIMgr.setGameRoomUI2Top){
			h1global.curUIMgr.setGameRoomUI2Top(gameType);
		}
		if(h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show){
			h1global.curUIMgr.gameroominfo_ui.setLayout(GameRoomInfoUI.getResourceFile(gameType));
		}
        if(h1global.curUIMgr.gameroomprepare_ui && h1global.curUIMgr.gameroomprepare_ui.is_show){
            h1global.curUIMgr.gameroomprepare_ui.change_prepare_mode(gameType);
        }
    },

	update_mode_color:function () {
        if(!this.is_show){
            return;
        }
        var self = this;
        function mode_btn_event(sender, eventType) {
			if(eventType == ccui.Widget.TOUCH_ENDED){
				for(var i = 0 ; i < self.mode_btn_list.length ; i++){
					if(sender != self.mode_btn_list[i]){
						self.mode_btn_list[i].setTouchEnabled(true);
						self.mode_btn_list[i].getChildByName("mode_frame_img").setVisible(false);
					}else{
						sender.setTouchEnabled(false);
						sender.getChildByName("mode_frame_img").setVisible(true);
						cc.sys.localStorage.setItem(const_val.GAME_NAME+"GAME_ROOM_UI",i);
						self.change_mode();
					}
				}
			}
        }
        for(var i = 0 ; i < self.mode_btn_list.length ; i++){
        	var mode_btn = self.mode_btn_list[i];
        	mode_btn.addTouchEventListener(mode_btn_event);
		}
        let btn_mode = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI");
        self.mode_btn_list[btn_mode].setTouchEnabled(false);
        self.mode_btn_list[btn_mode].getChildByName("mode_frame_img").setVisible(true);

        function color_btn_event(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED){
                for(var i = 0 ; i < self.color_btn_list.length ; i++){
                    if(sender != self.color_btn_list[i]){
                        self.color_btn_list[i].setTouchEnabled(true);
                        self.color_btn_list[i].getChildByName("color_frame_img").setVisible(false);
                    }else{
                        sender.setTouchEnabled(false);
                        sender.getChildByName("color_frame_img").setVisible(true);
                        cc.sys.localStorage.setItem(const_val.GAME_NAME+"GAME_ROOM_BG",i);
                        self.change_color();
                    }
                }
            }
        }

        for(var i = 0 ; i < self.color_btn_list.length ; i++){
            self.color_btn_list[i].addTouchEventListener(color_btn_event);
        }
        let bg_mode = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_BG");
        self.color_btn_list[bg_mode].setTouchEnabled(false);
        self.color_btn_list[bg_mode].getChildByName("color_frame_img").setVisible(true);
    },

	update_state:function(){
		if(!this.is_show){
			return;
		}
		var player = h1global.player();
		if(player.curGameRoom){
			if(player.curGameRoom.curRound > 0){
				this.applyclose_btn.setVisible(true);
				this.close_btn.setVisible(false);
				this.out_btn.setVisible(false);
			} else if(player.serverSitNum == 0 && player.curGameRoom.roomType !== const_val.CLUB_ROOM){
				this.applyclose_btn.setVisible(false);
				this.close_btn.setVisible(true);
				this.out_btn.setVisible(false);
			} else {
				this.applyclose_btn.setVisible(false);
				this.close_btn.setVisible(false);
				this.out_btn.setVisible(true);
			}
		}
	},
});