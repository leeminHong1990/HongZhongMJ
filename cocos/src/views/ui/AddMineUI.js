"use strict";
var AddMineUI = BasicDialogUI.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/AddMineUI.json";
    },

    initUI:function(){
        var self = this;
        this.addmine_panel = this.rootUINode.getChildByName("addmine_panel");
        this.addmine_panel.getChildByName("close_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        });

        this.addmine_panel.getChildByName("copy_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                cutil.copyToClipBoard(switches.gzh_name);
            }
        });

        this.step_pagescroll = this.addmine_panel.getChildByName("step_pagescroll");
        function step_panel_event(sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_MOVED || eventType == ccui.Widget.TOUCH_ENDED || eventType == ccui.Widget.TOUCH_BEGAN) {
                step_chx_change();
                sender.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        step_chx_change();
                    })
                ));
            }
        }
        function step_chx_change(){
            for (var i = 0; i < self.step_chx_list.length; i++) {
                if (i === self.step_pagescroll.getCurrentPageIndex()) {
                    self.step_chx_list[i].setSelected(true);
                } else {
                    self.step_chx_list[i].setSelected(false);
                }
            }
        }
        for(var i = 0 ; i < self.step_pagescroll.getChildren().length ; i++) {
            var step_panel = this.step_pagescroll.getChildByName("step_panel_" + i);
            step_panel.addTouchEventListener(step_panel_event);
        }
        this.step_chx_list = [];
        this.ball_panel = this.addmine_panel.getChildByName("ball_panel");
        for(var i = 0 ; i < self.ball_panel.getChildren().length ; i++) {
            var step_chx = this.ball_panel.getChildByName("step_chx_" + i);
            step_chx.setTouchEnabled(false);
            this.step_chx_list.push(step_chx);
        }
    },
});