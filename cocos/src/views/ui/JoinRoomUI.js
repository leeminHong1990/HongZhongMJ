"use strict";
var JoinRoomUI = BasicDialogUI.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/JoinRoomUI.json";
	},

	initUI:function(){
		this.curNum = 0;
		this.joinroom_panel = this.rootUINode.getChildByName("joinroom_panel");
		var self = this;
		var player = h1global.player();
		this.btn_list = [];
		function btn_event(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                for(var i = 0 ; i < self.btn_list.length ; i++) {
                	if(sender === self.btn_list[i]){
                        if (self.curNum > 99999) {
                            return;
                        }
                        self.curNum = (self.curNum * 10 + i) % 1000000;
                        self.update_click_num();
					}
				}
            }
		}
        for(var i = 0 ; i < 10 ; i ++) {
            var btn = this.joinroom_panel.getChildByName("_" + i.toString() + "_btn");
            this.btn_list.push(btn);
            btn.addTouchEventListener(btn_event);
        }

		this.joinroom_panel.getChildByName("_clear_btn").addTouchEventListener(function(sender, eventType){
			if(eventType === ccui.Widget.TOUCH_ENDED){
				self.clear_click_num();
			}
		});
		this.joinroom_panel.getChildByName("_del_btn").addTouchEventListener(function(sender, eventType){
			if(eventType === ccui.Widget.TOUCH_ENDED){
				self.curNum = Math.floor(self.curNum / 10);
				self.update_click_num();
			}
		});
		this.joinroom_panel.getChildByName("return_btn").addTouchEventListener(function(sender, eventType){
			if(eventType === ccui.Widget.TOUCH_ENDED){
				self.hide();
			}
		});

		this.update_click_num();
	},

	update_click_num:function(){
		var roomNum = this.curNum;
		for(var i = 0; i < 5; i++){
			var cur_num_img = this.joinroom_panel.getChildByName("num_img" + i.toString());
			cur_num_img.ignoreContentAdaptWithSize(true);
			if(roomNum <= 0){
				cur_num_img.setVisible(false);
			} else {
                cur_num_img.loadTexture("res/ui/JoinRoomUI/0" + (roomNum%10).toString() + ".png");
				cur_num_img.setVisible(true);
				roomNum = Math.floor(roomNum/10);
			}
		}
        this.try_join();
	},

	clear_click_num:function () {
		this.curNum = 0;
		for(var i = 0; i < 5; i++){
			var cur_num_img = this.joinroom_panel.getChildByName("num_img" + i.toString());
			cur_num_img.setVisible(false);
		}
    },

	try_join:function () {
        if (this.curNum > 9999) {
            h1global.player().enterRoom(this.curNum);
            this.hide();
        }
    },
});