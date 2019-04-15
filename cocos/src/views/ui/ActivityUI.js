"use strict";
var ActivityUI = BasicDialogUI.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/ActivityUI.json";
    },

    initUI:function(){
        var self = this;
        var activity_panel = this.rootUINode.getChildByName("activity_panel");
        activity_panel.getChildByName("close_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        });

        this.btn_list = [];

		for (var i = 0; i < 5; i++) {
			var btn = activity_panel.getChildByName("notice_btn" + i.toString());
			if (i === 0) {
				btn.setTouchEnabled(false);
				btn.setBright(false);
			}
			let index = i;
			this.btn_list.push(btn);
			btn.addTouchEventListener(function (source, eventType) {
				if (eventType === ccui.Widget.TOUCH_ENDED) {
					var imgView = activity_panel.getChildByName("notice_panel")
						.getChildByName("notice_img");
					imgView.loadTexture("res/ui/ActivityUI/notice_img" + index + ".png");
					for (var j = 0; j < self.btn_list.length; j++) {
						var obj = self.btn_list[j];
						obj.setTouchEnabled(obj !== source);
						obj.setBright(obj !== source);
					}
				}
			});
		}
    },
});