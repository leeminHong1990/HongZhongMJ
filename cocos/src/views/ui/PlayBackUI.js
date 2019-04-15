"use strict";
var PlayBackUI = MultipleLayoutUI.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = PlayBackUI.getResourceFile(cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI"));
        this.op_chk_list = {
            // 'chow_chk': [const_val.OP_CHOW],
            'pong_chk': [const_val.OP_PONG],
            'kong_chk': [const_val.OP_KONG_WREATH, const_val.OP_EXPOSED_KONG, const_val.OP_CONTINUE_KONG, const_val.OP_CONCEALED_KONG],
            'win_chk': [const_val.OP_DRAW_WIN, const_val.OP_KONG_WIN, const_val.OP_WREATH_WIN, const_val.OP_GIVE_WIN],
            'pass_chk': [const_val.OP_PASS]
        };
    },

    initUI: function () {
        this.onLayoutChanged(false);
    },

    onLayoutChanged: function (fromCache) {
        this.finger_img = this.rootUINode.getChildByName("finger_img");
        let rate_label = this.rootUINode.getChildByName("room_info_panel").getChildByName("rate_label");
        rate_label.ignoreContentAdaptWithSize(true);
        let speed_label = this.rootUINode.getChildByName("room_info_panel").getChildByName("speed_label");
        speed_label.ignoreContentAdaptWithSize(true);
        this._copyRoomInfoToBackground();
    },

    // Note: 由于回放ui显示在游戏场上面，进度显示需要在飞出动画牌的下面，这里把ui加到游戏场下方
    // 但是之后如果有UI调整可能会出现问题
    _copyRoomInfoToBackground: function () {
        let info_panel = h1global.curUIMgr.getChildByName("room_info_panel");
        if (info_panel) {
            this.speed_label = info_panel.getChildByName("speed_label");
            this.rate_label = info_panel.getChildByName("rate_label");
            return;
        }
        info_panel = this.rootUINode.getChildByName("room_info_panel");
        let copy_info_panel = info_panel.clone();

        h1global.curUIMgr.addChild(copy_info_panel, const_val.GameRoomZOrder - 5);
        this.speed_label = copy_info_panel.getChildByName("speed_label");
        this.rate_label = copy_info_panel.getChildByName("rate_label");

        info_panel.setVisible(false);
    },

    updateRoomInfo: function (rateTxt, speed) {
        this.rate_label.setString('进度：' + rateTxt);
        this.speed_label.setString(speed + '倍速');
    },

    showOperationPanel: function (serverSitNum, ops, doOp) {
        let player = h1global.player();
        let index = player.server2CurSitNum(serverSitNum);
        var cur_player_operation_panel = undefined;
        for (var i = 0; i < player.curGameRoom.player_num; i++) {
            cur_player_operation_panel = this.rootUINode.getChildByName('player_operation_panel' + i);
            cur_player_operation_panel.stopAllActions();
            cur_player_operation_panel.setVisible(i === index);
        }
        this.resetOperationPanel(cur_player_operation_panel);
        this.showOperation(index, ops, doOp)
    },

    resetOperationPanel: function (panel) {

    },

    _hasOp: function (op, btn_name) {
        let ops = this.op_chk_list[btn_name];
        for (let obj of ops) {
            if (obj == op) return true;
        }
        return false;
    },

    layoutChks: function (show_chks) {

    },

    replaceUI: function (index, chk_name, chk, ops, selected) {
        // 替换过和弃有2种做法，这里选1实现
        // 1: cocos studio 放2个ui，在代码里更新显示和隐藏关系
        // 2: 在代码里动态加载图片，但是需要判断2d和3d ui 和座位号
        if (chk_name == 'pass_chk') {
            var player_operation_panel = this.rootUINode.getChildByName('player_operation_panel' + index);
            let chk2 = player_operation_panel.getChildByName('pass2_chk');
            chk2.setSelected(selected);
            let keys = Object.keys(ops);
            if (keys.indexOf(const_val.OP_DRAW_WIN + '') >= 0 ||
                keys.indexOf(const_val.OP_KONG_WIN + '') >= 0 ||
                keys.indexOf(const_val.OP_GIVE_WIN + '') >= 0 ||
                keys.indexOf(const_val.OP_WREATH_WIN + '') >= 0) {
                chk.setVisible(true);
                chk2.setVisible(false);
            } else {
                chk2.setVisible(true);
                chk.setVisible(false);
            }
        }
    },

    showOperation: function (index, ops, doOp) {
        var player_operation_panel = this.rootUINode.getChildByName('player_operation_panel' + index);
        let show_chks = [];
        for (var op in ops) {
            for (var chk_name in this.op_chk_list) {
                if (this._hasOp(op, chk_name)) {
                    var chk = player_operation_panel.getChildByName(chk_name);
                    chk.showMask = true;
                    show_chks.push(chk);
                }
            }
        }

        this.layoutChks(show_chks);

        for (var chk_name in this.op_chk_list) {
            var chk = player_operation_panel.getChildByName(chk_name);
            chk.setScale(1);
            // this.replaceUI(index, chk_name, chk, ops, chk.showMask === true);
            chk.setSelected(chk.showMask === true);
            if (chk.showMask) {
                chk.showMask = undefined;
                if (this._hasOp(doOp, chk_name)) {
                    chk.stopAllActions();
                    this.playHandAnim(index, player_operation_panel, chk)
                }
            } else {
                chk.stopAllActions();
            }
        }
    },

    playHandAnim: function (index, panel, op_chk) {
        let parent = panel.getParent();

        let point = op_chk.getPosition();
        point = panel.convertToWorldSpace(point);
        point.x -= 20;
        point.y += 20;

        point = parent.convertToNodeSpace(point);

        this.finger_img.setVisible(true);
        this.finger_img.setScale(1.2);
        this.finger_img.setPosition(point);

        this.finger_img.runAction(cc.sequence(cc.scaleTo(0.5, 1, 1), cc.hide()));

        panel.runAction(cc.sequence(cc.delayTime(0.8), cc.hide()));
    }

});

PlayBackUI.ResourceFile2D = "res/ui/PlayBack2DUI.json";
PlayBackUI.ResourceFile3D = "res/ui/PlayBack3DUI.json";
PlayBackUI.getResourceFile = function (gameType) {
    if (gameType == const_val.GAME_ROOM_2D_UI) {
        return PlayBackUI.ResourceFile2D;
    } else if (gameType == const_val.GAME_ROOM_3D_UI) {
        return PlayBackUI.ResourceFile3D;
    } else {
        cc.warn("not support game type : ", gameType)
        return PlayBackUI.ResourceFile3D;
    }
};