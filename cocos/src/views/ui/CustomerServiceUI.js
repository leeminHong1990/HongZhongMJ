"use strict";
var CustomerServiceUI = BasicDialogUI.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/CustomerServiceUI.json";
    },

    initUI:function(){
        var self = this;
        this.customerservice_panel = this.rootUINode.getChildByName("customerservice_panel");
        this.customerservice_panel.getChildByName("close_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        });

        this.init_panel = this.customerservice_panel.getChildByName("init_panel");
        this.proposal_panel = this.customerservice_panel.getChildByName("proposal_panel");
        this.init_panel.setVisible(true);
        this.proposal_panel.setVisible(false);
        this.init_panel.getChildByName("proposal_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                self.init_panel.setVisible(false);
                self.proposal_panel.setVisible(true);
            }
        });
        var wx_name = this.init_panel.getChildByName("wx_label").getString();
        this.init_panel.getChildByName("copy_btn").addTouchEventListener(function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                cutil.copyToClipBoard(wx_name);
            }
        });

        this.init_panel.getChildByName("online_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.webview_ui.show_by_info("https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=925069&configID=44140&jid=1687243822&s=1");
            }
        });

        //建议中提交按钮
        this.proposal_tf = this.proposal_panel.getChildByName("proposal_tf");
        this.phone_num_tf = this.proposal_panel.getChildByName("phone_num_tf");
        this.proposal_panel.getChildByName("submit_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                self.proposal_tf.setString("");
                self.phone_num_tf.setString("");
            }
        });

        if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            this.init_panel.getChildByName("wx_img").setVisible(false);
            this.init_panel.getChildByName("wx_tips_label").setVisible(false);
            this.init_panel.getChildByName("wx_label").setVisible(false);
            this.init_panel.getChildByName("copy_btn").setVisible(false);
        }
    },
});