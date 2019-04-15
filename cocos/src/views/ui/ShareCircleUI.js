"use strict";

var ShareCircleUI = BasicDialogUI.extend({
    ctor:function () {
        this._super();
        this.resourceFilename = "res/ui/ShareCircleUI.json";
    },

    initUI:function () {
        var self = this;
        var share_panel = this.rootUINode.getChildByName("share_panel");

        var close_btn = share_panel.getChildByName("close_btn");
        function close_btn_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        }
        close_btn.addTouchEventListener(close_btn_event);


        var share_btn_left = share_panel.getChildByName("share_btn_left");
        function share_btn_left_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.share();
            }
        }
        share_btn_left.addTouchEventListener(share_btn_left_event);

        var share_btn_right = share_panel.getChildByName("share_btn_right");
        function share_btn_right_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.share();
            }
        }
        share_btn_right.addTouchEventListener(share_btn_right_event);
    },

    share:function () {
        cc.log("share-share-share-share-share")
        // var share_title = switches.gameName ;
        // var share_desc = switches.gameName;
        // if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)) {
        //     jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity","callWechatShareUrl", "(ZLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", false, share_url, share_title, share_desc);
        // } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)) {
        //     jsb.reflection.callStaticMethod("WechatOcBridge","callWechatShareUrlToSession:fromUrl:withTitle:andDescription:", false, share_url, share_title, share_desc);
        // } else {
        //     cutil.share_func(share_title, share_desc);
        //     h1global.curUIMgr.share_ui.show();
        // }

        if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
            jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "shareFreeCard", "()V");
        } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
            jsb.reflection.callStaticMethod("WechatOcBridge", "shareFreeCard");
        } else {
            cutil.share_func(switches.gameName + "下载二维码", "识别二维码下载游戏");
            h1global.curUIMgr.share_ui.show();
        }
    }
});