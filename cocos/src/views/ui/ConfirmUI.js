"use strict";

var ConfirmUI = UIBase.extend({
    ctor:function () {
        this._super();
        this.resourceFilename = "res/ui/ConfirmUI.json";
    },

    show_by_info:function (desc_str, sure_func) {
        var self = this;
        this.desc_str = desc_str;
        this.sure_func = sure_func;
        this.show()
    },

    initUI:function () {
        var self = this;
        var confirm_panel = this.rootUINode.getChildByName("bg_panel").getChildByName("confirm_panel")
        var desc_label = confirm_panel.getChildByName("desc_label");
        desc_label.setString(this.desc_str);

        var cancel_btn = confirm_panel.getChildByName("cancel_btn");
        var close_btn = confirm_panel.getChildByName("close_btn");
        function cancel_btn_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        }
        cancel_btn.addTouchEventListener(cancel_btn_event);
        close_btn.addTouchEventListener(cancel_btn_event);

        var sure_btn = confirm_panel.getChildByName("sure_btn");
        function sure_btn_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                if(self.sure_func){
                    self.sure_func();
                }
                self.hide();
            }
        }
        sure_btn.addTouchEventListener(sure_btn_event);
    }
});