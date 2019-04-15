// cc.loader.loadJs("src/views/uimanager/LoginSceneUIManager.js")

var GameRoomScene = cc.Scene.extend({
    className:"GameRoomScene",
    onEnter:function () {
        this._super();
        if(!cc.sys.localStorage.getItem("TEMP_TEST")){
            cc.sys.localStorage.setItem("TEMP_TEST",1);
            cc.sys.localStorage.setItem(const_val.GAME_NAME+"GAME_ROOM_UI", const_val.GAME_ROOM_2D_UI);
            cc.sys.localStorage.setItem(const_val.GAME_NAME+"GAME_ROOM_BG", const_val.GAME_ROOM_BG_GREEN);
        }
        if (cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI") == null) {
            cc.sys.localStorage.setItem(const_val.GAME_NAME+"GAME_ROOM_UI", const_val.GAME_ROOM_2D_UI)
        }
        if (cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_BG") == null) {
            cc.sys.localStorage.setItem(const_val.GAME_NAME+"GAME_ROOM_BG", const_val.GAME_ROOM_BG_GREEN);
        }
        this.loadUIManager();
        cutil.unlock_ui();

        if(cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.stopMusic();
        }
        if(!cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.playMusic("res/sound/music/game_bgm.mp3", true);
        }
    },

    loadUIManager:function() {
    	var curUIManager = new GameRoomSceneUIManager();
    	curUIManager.setAnchorPoint(0, 0);
    	curUIManager.setPosition(0, 0);
    	this.addChild(curUIManager, const_val.curUIMgrZOrder);
        h1global.curUIMgr = curUIManager;

        if(h1global.player().startActions["GameRoomScene"]){
            h1global.player().startActions["GameRoomScene"]();
            h1global.player().startActions["GameRoomScene"] = undefined;
        } else if(h1global.player().curGameRoom.room_state == const_val.ROOM_PLAYING){
            // curUIManager.gameroomprepare_ui.hide();
            if(h1global.curUIMgr.gameroom3d_ui && h1global.curUIMgr.gameroom2d_ui){
                h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide");
                h1global.curUIMgr.showGameRoomUI(function(complete){
                    if(complete){
                        let player = h1global.player();
                        if (player && player.startActions["GameRoomUI"]) {
                            player.startActions["GameRoomUI"]();
                            player.startActions["GameRoomUI"] = undefined;
                        }
                        h1global.curUIMgr.setGameRoomUI2Top(cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI"))
                    }
                });
            }
        } else {
            h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide")
            curUIManager.gameroomprepare_ui.show();
        }

        if (!onhookMgr) { 
            onhookMgr = new OnHookManager();
        }

        onhookMgr.init(this);
        this.scheduleUpdateWithPriority(0);

        if(onhookMgr.applyCloseLeftTime > 0){
            curUIManager.applyclose_ui.show_by_sitnum(h1global.player().curGameRoom.applyCloseFrom);
        }
    },

    update:function( delta ){
        // if (physicsUpdate) {
        //     physicsUpdate();
        // }
        onhookMgr.update(delta);
    }
});