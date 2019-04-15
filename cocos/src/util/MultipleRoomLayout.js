"use strict"
var MultipleRoomLayout = cc.Class.extend({

    ctor: function (uiMgr, ui_list) {
        this.curUIMgr = uiMgr;
        this.ui_list = ui_list;
        this.all_show = true;
		this.showObservers = null;
    },

    gameRoomUIIsShow: function () {
        if (this.ui_list) {
            for (var ui of this.ui_list) {
                if (!ui.is_show) return false;
            }
            return true;
        }
        return false;
    },

	notifyObserver: function (object_name, notification) {
		Array.prototype.shift.apply(arguments);
		Array.prototype.shift.apply(arguments);
		for (var i = 0; i < this.ui_list.length; i++) {
			if (cc.isFunction(this.ui_list[i][notification])) {
				this.ui_list[i][notification].apply(this.ui_list[i], arguments)
			} else {
				cc.error("notifyObserver " + notification + " is not found!", this.ui_list[i])
			}
		}
	},

	registerShowObserver: function (func) {
		if (this.showObservers === null) {
			this.showObservers = [];
		}
		this.showObservers.push(func);
	},

    showGameRoomUI: function (callback) {
        var complete = false;
        var count = 0;
        var self = this;
        this.notifyObserver(const_val.GAME_ROOM_UI_NAME, "show", function () {
            count++;
            complete = count === self.ui_list.length;
            // Note: 在多个ui未加载完成时先隐藏ui，不然会出现ui闪现
            // 但是如果有一套资源出现问题加载不完可能会一直不显示
            if (self.all_show) {
                for (var ui in self.ui_list) {
                    if(ui.is_show){
                        ui.setVisible(false);
                        ui.setLocalZOrder(const_val.GameRoomZOrder);
                    }
                }
            }
            if (callback) callback(complete & self.all_show);
			if (self.showObservers !== null && complete) {
				for (var i = 0; i < self.showObservers.length; i++) {
					self.showObservers[i]();
				}
				self.showObservers = null;
			}
        })
    },

    updateBackground: function (gameroom_type, gameroombg_type) {
        if (this.curGameRoomType == gameroom_type && this.curGameRoomBgType == gameroombg_type) {
            return true;
        }
        this.curGameRoomType = gameroom_type;
        this.curGameRoomBgType = gameroombg_type;

        var bgImgPath = "res/ui/BackGround/gameroom3d_bg" + gameroombg_type + ".png";
        var bgDescImgPath = "res/ui/BackGround/bg_desc3d" + gameroombg_type + ".png";

        if (gameroom_type == const_val.GAME_ROOM_2D_UI) {
            bgImgPath = "res/ui/BackGround/gameroom2d_bg" + gameroombg_type + ".png";
            bgDescImgPath = "res/ui/BackGround/bg_desc2d" + gameroombg_type + ".png";
        }

        var bg_img = this.curUIMgr.getChildByName("bg_img");
        if (!bg_img) {
            bg_img = ccui.ImageView.create();
            bg_img.setName("bg_img");
            bg_img.setAnchorPoint(0.5, 0.5);
            bg_img.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
            bg_img.setLocalZOrder(const_val.GameRoomBgZOrder)
            this.curUIMgr.addChild(bg_img);
        }
        if(gameroom_type == const_val.GAME_ROOM_2D_UI){
            bg_img.setScale9Enabled(true);
            bg_img.setCapInsets(cc.rect(422,320,436,246))
            bg_img.loadTexture(bgImgPath);

            bg_img.setSizeType(ccui.Widget.SIZE_PERCENT);
            bg_img.setSizePercent(cc.p(1,1));
            bg_img.setScale(1);
        } else {
            bg_img.setScale9Enabled(false);
            bg_img.loadTexture(bgImgPath);
            var bg_img_content_size = bg_img.getContentSize();
            var scale = cc.winSize.width / bg_img_content_size.width;
            if (cc.winSize.height / bg_img_content_size.height > scale) {
                scale = cc.winSize.height / bg_img_content_size.height;
            }
            bg_img.setScale(scale);
        }

        var bg_desc_img = this.curUIMgr.getChildByName("bg_desc");
        if (!bg_desc_img) {
            bg_desc_img = ccui.ImageView.create();
            bg_desc_img.setName("bg_desc");
            bg_desc_img.setAnchorPoint(0.5, 0.5);
            bg_desc_img.setLocalZOrder(const_val.GameRoomBgZOrder)
            this.curUIMgr.addChild(bg_desc_img);
        }
        bg_desc_img.loadTexture(bgDescImgPath);

        if (gameroom_type === const_val.GAME_ROOM_2D_UI) {
            bg_desc_img.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5 - 100);
        } else {
            bg_desc_img.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5 - 88);
        }
    },

    setGameRoomUI2Top: function (gameroom_type) {
        for (var ui of this.ui_list) {
            if (ui.is_show) {
                ui.setVisible(gameroom_type == ui.uiType)
            }
        }
        var game_room_bg_type = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_BG");
        this.updateBackground(gameroom_type, game_room_bg_type);
    },

});
