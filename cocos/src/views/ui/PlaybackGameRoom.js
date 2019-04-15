// 进入游戏前需要数据
//
//     用户数据
//
//     房间信息
//
//     出牌数据
//         手牌
//         每次出牌的操作
//
// 打明牌
//
// 吃刚碰胡操作修改
//
// 回放进度
//
// 桌面牌更新
//
// impGameOperation.postOperation()
//
"use strict"
var PlaybackGameRoom = cc.Node.extend({
    ctor: function (roomUI) {
        this._super();
        this.setName("PlaybackGameRoom");
        this.commands = [];
        this.roomUI = roomUI;
        this.timeScale = 0;
        this.step_interval = 1;
        this.timeScaleList = [1, 1.2, 2]
    },

    init: function () {
        let self = this;

        this.roomUI.rootUINode.getChildByName("room_info_panel").setVisible(false);

        this.roomUI.update_wintips_btn = function () {
            self.roomUI.rootUINode.getChildByName("wintips_btn").setVisible(false);
        };
        this.roomUI.update_canwin_tile_panel = function (select_tile) {
        };
        this.roomUI.show_operation_select_panel = function (op_btn) {
        };
        this.roomUI.show_operation_panel = function () {
        };
        this.roomUI.update_operation_panel = function (op_dict, from_type) {

        };
        this.roomUI.update_playback_operation_panel = function (serverSitNum, op_dict, doOP) {
            if (Object.keys(op_dict).length <= 0) return;
            if (Object.keys(op_dict).length === 2) {
                var pass_flag = false;
                var discard_flag = false;
                var draw_flag = false;
                for (var op in op_dict) {
                    if (op == const_val.OP_PASS) pass_flag = true;
                    else if (op == const_val.OP_DISCARD) discard_flag = true;
                    else if (op == const_val.OP_DRAW) draw_flag = true;
                }
                if (pass_flag && discard_flag || pass_flag && draw_flag) return;
            }

            if (doOP == const_val.OP_DISCARD) {
                doOP = const_val.OP_PASS;
            }

            if (h1global.curUIMgr.playback_ui) {
                h1global.curUIMgr.playback_ui.showOperationPanel(serverSitNum, op_dict, doOP);
            }
        };

        let curGameRoom = h1global.player().curGameRoom;
        this.parseCommands(curGameRoom.op_record_list);

        this.hide_player_hand_panel();
        this.disableRoomTouch();
        if (h1global.curUIMgr.playbackcontrol_ui) {
            h1global.curUIMgr.playbackcontrol_ui.show(function () {
                h1global.curUIMgr.playbackcontrol_ui.setPlaybackGameRoom(self);
            })
        }

        if (h1global.curUIMgr.playback_ui) {
            h1global.curUIMgr.playback_ui.show(function () {
                self._updateRoomInfo();
            });
        }

        if (h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show) {
            h1global.curUIMgr.gameroominfo_ui.setPlaybackLayout();
        } else {
            let node = cc.Node.create();
            this.addChild(node);
            node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1 / 60.0), cc.callFunc(function () {
                if (h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show) {
                    h1global.curUIMgr.gameroominfo_ui.setPlaybackLayout();
                    node.removeFromParent();
                }
            }))))
        }
        // this.testNext()
    },

    disableRoomTouch: function () {
        let mask = this.roomUI.getChildByName("touch_mask");
        if (mask) {
            mask.removeFromParent();
        }
        mask = new ccui.Layout();
        mask.setContentSize(cc.winSize.width, cc.winSize.height);
        mask.setTouchEnabled(true);
        mask.setName("touch_mask");
        mask.setAnchorPoint(0, 0);
        this.roomUI.addChild(mask);
    },

    hide_player_hand_panel: function () {
        for (var i = 0; i < 4; i++) {
            var player_hand_panel = this.roomUI.rootUINode.getChildByName("player_tile_panel" + i).getChildByName("player_hand_panel");
            player_hand_panel.setVisible(false);
        }
    },

    startPlayback: function () {
        let self = this;
        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            self.resumePlayback();
        })))
    },

    resumePlayback: function () {
        let self = this;
        self.runAction(cc.repeatForever(cc.sequence(cc.delayTime(this.step_interval), cc.callFunc(function () {
            self.doNext()
        }))))
    },

    pausePlayback: function () {
        this.stopPlayback()
    },

    stopPlayback: function () {
        this.stopAllActions();
    },

    replay: function () {
        this.resetTimeScale();
        this.stopPlayback();
        this.commands = [];
        let self = this;
        // this.commands = this.originCommands.slice(0);
        let player = h1global.player();
        if (player) {
            h1global.curUIMgr.playbackcontrol_ui.resetUI();
            player.replayGame(function () {
                self.startPlayback();
            });
        } else {
            cc.warn('player undefined')
        }
    },

    nextTimeScale: function () {
        this.timeScale = ++this.timeScale % this.timeScaleList.length;
        this.setActionTimeScale(this.timeScaleList[this.timeScale]);
    },

    resetTimeScale: function () {
        this.timeScale = 0;
        this.setActionTimeScale(1)
    },

    setActionTimeScale: function (rate) {
        this._updateRoomInfo();
        cc.director.getScheduler().setTimeScale(rate);
    },

    _updateRoomInfo: function () {
        if (h1global.curUIMgr.playback_ui && h1global.curUIMgr.playback_ui.is_show) {
            h1global.curUIMgr.playback_ui.updateRoomInfo(cc.formatStr('%d/%d', this.totalCommand - this.commands.length, this.totalCommand),
                Math.max(1, this.timeScale * 2));
        }
    },

    playbackComplete: function () {
        cc.log("playbackComplete");
        this.stopPlayback();
        let player = h1global.player();
        let self = this;
        player.roundResult(player.curGameRoom["round_result"], function () {
            self.replay();
        });
    },

    quitRoom: function () {
        this.resetTimeScale();
        this.stopPlayback();
        let player = h1global.player();
        if (player) {
            player.curGameRoom = undefined;
            player.originRoomInfo = undefined;
        }
        h1global.runScene(new GameHallScene());
    },

    parseCommands: function (op_list) {
        for (var i = 0; i < op_list.length; i++) {
            let command = {};
            let obj = op_list[i];
            let aid = obj[0];
            command.aid = aid;
            command.serverSitNum = obj[1];
            command.last_serverSitNum = obj[2];
            command.index = i;
            let tile = obj[3][0];
            if (aid == const_val.OP_PONG) {
                command.tileList = [tile, tile, tile];
            } else if (aid == const_val.OP_EXPOSED_KONG || aid == const_val.OP_CONTINUE_KONG) {
                command.tileList = [tile, tile, tile, tile];
            } else if (aid == const_val.OP_CONCEALED_KONG) {
                command.tileList = [0, 0, 0, tile]
            } else {
                command.tileList = obj[3];
            }
            this.commands.push(command);
        }
        this.commands.reverse();
        this.totalCommand = this.commands.length;
    },

    doNext: function () {
        let commands = this.commands;
        if (commands.length > 0) {
            this._updateRoomInfo();
            let command = commands.pop();
            let player = h1global.player();
            if (commands.length > 0) {
                player.curGameRoom.lastCommand = commands[commands.length - 1];
            }
            player.postOperation(command.serverSitNum, command.aid, command.tileList);
            if (commands.length > 0) {
                let last = player.curGameRoom.lastCommand;
                player.waitForOperationFromNext(last.serverSitNum, last.aid, last.tileList)
            }
            // this.doSpecialCommand();
        } else {
            this._updateRoomInfo();
            this.playbackComplete();
        }
    },

    /**
     * 处理下乡等特殊操作
     */
    doSpecialCommand: function () {
        // let player = h1global.player();
        // let op_special_record = player.curGameRoom.op_special_record_list;
        // if (op_special_record) {
        //     let flag = op_special_record.length > 0;
        //     while (flag) {
        //         let re = op_special_record[0];
        //         if (re[3] == this.totalCommand - this.commands.length) {
        //             op_special_record.shift();
        //             player.postPlayerDiscardState(re[1], const_val.DISCARD_FORCE);
        //             flag = op_special_record.length > 0;
        //         } else {
        //             flag = false;
        //         }
        //     }
        // }
    },

    testNext: function () {
        var self = this;
        let game_info_panel = this.roomUI.rootUINode.getChildByName("game_info_panel");
        game_info_panel.setTouchEnabled(true);
        game_info_panel.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.doNext()
            }
        })
    }

});