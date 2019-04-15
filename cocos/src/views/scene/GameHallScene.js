// cc.loader.loadJs("src/views/uimanager/LoginSceneUIManager.js")

var GameHallScene = cc.Scene.extend({
    className: "GameHallScene",

    ctor:function (params_dict) {
        this.params_dict = params_dict;
        this._super()
    },

    onEnter: function () {
        this._super();
        this.loadUIManager();
        cutil.unlock_ui();

        if (cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.stopMusic();
        }
        cc.audioEngine.playMusic("res/sound/music/sound_bgm.mp3", true);

        if(!((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) || (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) || switches.TEST_OPTION)) {
            var title = switches.gameName;
            var desc = '访问公众号【' + switches.gzh_name + '】更多好玩的游戏等着你~';
            cutil.share_func(title, desc);
        }
    },

    loadUIManager: function () {
        var curUIManager = new GameHallSceneUIManager();
        curUIManager.setAnchorPoint(0, 0);
        curUIManager.setPosition(0, 0);
        this.addChild(curUIManager, const_val.curUIMgrZOrder);
        h1global.curUIMgr = curUIManager;

        // curUIManager.gamehall_ui.show(function(){
        //     if(h1global.reconnect){
        //         h1global.reconnect = false;
        //         h1global.runScene(new GameRoomScene());
        //     }
        // });
        curUIManager.gamehall_ui.setLocalZOrder(const_val.GameHallZOrder);
        curUIManager.gamehall_ui.show(function(){
            // Note: 主界面显示广播在重新show时ui层级会改变 在这里直接设置GameHall 和 broadcast的ui层级
            h1global.curUIMgr.broadcast_ui.setLocalZOrder(const_val.GameHallBroadcastZOrder);
            h1global.curUIMgr.broadcast_ui.show_default([
            "本游戏仅供娱乐，禁止赌博！",
            "发现抽水等赌博行为，请联系客服举报。",
            "诚招合作伙伴，福利多多！详情请咨询客服。"
        ])});

        if(this.params_dict && this.params_dict['from_scene'] === "LoginScene"){
            var t = cc.sys.localStorage.getItem(const_val.GAME_NAME + "_last_activity_time");
			var do_show = true;
			var now = new Date().getTime();
			if (cutil.isPositiveNumber(t)) {
				do_show = now - Number(t) > const_val.SHOW_ACTIVITY_INTERVAL;
			}
			if (do_show) {
				h1global.curUIMgr.sharecircle_ui.show(function () {
					h1global.curUIMgr.activity_ui.show();
				});
				cc.sys.localStorage.setItem(const_val.GAME_NAME + "_last_activity_time", now);
			}
        } else if(this.params_dict && this.params_dict['from_scene'] === "GameHallScene"){
            if(this.params_dict['club_id'] > 0){
                h1global.player().getClubDetailInfo(this.params_dict['club_id']);
            }
        }

        if (!onhookMgr) {
            onhookMgr = new OnHookManager();
        }

        onhookMgr.init(this);
        this.scheduleUpdateWithPriority(0);
    },

    update: function (delta) {
        onhookMgr.update(delta);
    }
});
