var PlaybackGameRoomSceneUIManager = UIManagerBase.extend({
    onCreate: function () {
        var game_room_ui_type = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI");
        var initUIClassNameList = ["GameRoomInfoUI", "SettlementUI", "ResultUI", "GamePlayerInfoUI", "HelpUI", "ShareUI", "PlaybackControlUI", "PlayBackUI"];

        if (game_room_ui_type == const_val.GAME_ROOM_2D_UI) {
            initUIClassNameList.push("PlaybackGameRoom2DUI");
        } else {
            initUIClassNameList.push("PlaybackGameRoom3DUI");
        }

        for (var uiClassName of initUIClassNameList) {
            this.add_ui(uiClassName.slice(0, uiClassName.length - 2).toLowerCase() + "_ui", [], uiClassName);
        }

        var game_room_bg_type = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_BG");

        if (game_room_ui_type == const_val.GAME_ROOM_2D_UI) {
            this.gameroom2d_ui = this.playbackgameroom2d_ui;
            this.roomLayoutMgr = new MultipleRoomLayout(this, [this.playbackgameroom2d_ui]);
        } else {
            this.gameroom3d_ui = this.playbackgameroom3d_ui;
            this.roomLayoutMgr = new MultipleRoomLayout(this, [this.playbackgameroom3d_ui]);
        }
        this.updateBackground(game_room_ui_type, game_room_bg_type);

    },

    gameRoomUIIsShow: function () {
        return this.roomLayoutMgr.gameRoomUIIsShow();
    },

    showGameRoomUI: function (callback) {
        this.roomLayoutMgr.showGameRoomUI(callback);
    },

    updateBackground: function (gameroom_type, gameroombg_type) {
        this.roomLayoutMgr.updateBackground(gameroom_type, gameroombg_type);
    },

    setGameRoomUI2Top: function (gameroom_type) {
        this.roomLayoutMgr.setGameRoomUI2Top(gameroom_type);
    },

});