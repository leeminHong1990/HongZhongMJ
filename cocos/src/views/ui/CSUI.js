"use strict"

var CSUI = UIBase.extend({
   ctor:function () {
       this._super();
       this.resourceFilename = "res/ui/CSUI.json";
   },

    initUI:function () {
        var self = this;
        var cs_panel = this.rootUINode.getChildByName("cs_panel");

        cs_panel.getChildByName("wx_label").setString(switches.customerService_wx);

        var return_btn = cs_panel.getChildByName("return_btn");
        function return_btn_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide()
            }
        }
        return_btn.addTouchEventListener(return_btn_event);

        var copy_btn = cs_panel.getChildByName("copy_btn");
        function copy_btn_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                cutil.copyToClipBoard(switches.customerService_wx);
            }
        }
        copy_btn.addTouchEventListener(copy_btn_event);
    }
});