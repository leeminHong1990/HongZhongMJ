var GameRoomSceneUIManager = UIManagerBase.extend({
    onCreate: function () {

        var initUIClassNameList = ["GameRoom2DUI", "GameRoom3DUI", "GameRoomPrepareUI", "GameRoomInfoUI", "AudioRecordUI", "SettlementUI", "ResultUI", "HelpUI", "GameConfigUI", "GamePlayerInfoUI", "CommunicateUI", "ShareUI", "ApplyCloseUI", "GPSUI"];

        for (var uiClassName of initUIClassNameList) {
            this.add_ui(uiClassName.slice(0, uiClassName.length - 2).toLowerCase() + "_ui", [], uiClassName);
        }
        this.roomLayoutMgr = new MultipleRoomLayout(this, [this.gameroom2d_ui, this.gameroom3d_ui]);
        var game_room_ui_type = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI")
        var game_room_bg_type = cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_BG");
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