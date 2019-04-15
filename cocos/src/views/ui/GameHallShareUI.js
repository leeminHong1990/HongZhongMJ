"use strict";
var GameHallShareUI = BasicDialogUI.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/GameHallShareUI.json";
    },

    initUI:function(){
        var self = this;
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var share_url = switches.PHP_SERVER_URL + '/' + switches.gameEngName + '_home';

        //分享
        this.freecard_panel = this.rootUINode.getChildByName("freecard_panel");
        this.freecard_panel.getChildByName("return_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide()
            }
        });

        this.freecard_panel.getChildByName("friend_btn").addTouchEventListener(function(sender, eventType) {
            //发送给好友/群
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                // var share_title = switches.gameName;
                // var share_desc = '[' + info_dict["nickname"] + ']邀请你来玩宣和' + switches.gameName + '，最正宗的' + switches.gameName + '，赶紧来玩吧！';
                // if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)) {
                //     jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity","callWechatShareUrl", "(ZLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", true, share_url, share_title, share_desc);
                // } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)) {
                //     jsb.reflection.callStaticMethod("WechatOcBridge","callWechatShareUrlToSession:fromUrl:withTitle:andDescription:", true, share_url, share_title, share_desc);
                // } else {
                //     cutil.share_func(share_title, share_desc);
                //     h1global.curUIMgr.share_ui.show();
                // }


                var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
                if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
                    jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "shareZQM", "(ZLjava/lang/String;)V", true, switches.PHP_SERVER_URL + "/invite/" + info_dict["user_id"]);
                } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
                    jsb.reflection.callStaticMethod("WechatOcBridge", "shareZQM:withURL:", true, switches.PHP_SERVER_URL + "/invite/" + info_dict["user_id"]);
                } else {
                    cutil.share_func(switches.gameName + "赚钱码", "专属赚钱码下载并使用游戏，自动绑定上下级关系。每成功邀请一名玩家，奖励现金红包。");
                    h1global.curUIMgr.share_ui.show();
                }
            }
        });

        this.freecard_panel.getChildByName("friends_btn").addTouchEventListener(function(sender, eventType) {
            //发送给朋友圈
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                // var share_title = switches.gameName;
                // var share_desc = switches.gameName;
                // if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)) {
                //     jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity","callWechatShareUrl", "(ZLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", false, share_url, share_title, share_desc);
                // } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)) {
                //     jsb.reflection.callStaticMethod("WechatOcBridge","callWechatShareUrlToSession:fromUrl:withTitle:andDescription:", false, share_url, share_title, share_desc);
                // } else {
                //     cutil.share_func(share_title, share_desc);
                //     h1global.curUIMgr.share_ui.show();
                // }
                var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
                if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
                    jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "shareZQM", "(ZLjava/lang/String;)V", false, switches.PHP_SERVER_URL + "/invite/" + info_dict["user_id"]);
                } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
                    jsb.reflection.callStaticMethod("WechatOcBridge", "shareZQM:withURL:", false, switches.PHP_SERVER_URL + "/invite/" + info_dict["user_id"]);
                } else {
                    cutil.share_func(switches.gameName + "赚钱码", "专属赚钱码下载并使用游戏，自动绑定上下级关系。每成功邀请一名玩家，奖励现金红包。");
                    h1global.curUIMgr.share_ui.show();
                }
            }
        });
    }
});