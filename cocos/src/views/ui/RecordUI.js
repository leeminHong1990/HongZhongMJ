"use strict";
var RecordUI = UIBase.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/RecordUI.json";
    },

    initUI: function () {

        let info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        this.nickname = info_dict["nickname"];

        this.record_panel = this.rootUINode.getChildByName("record_panel");
        this.title_img = this.record_panel.getChildByName("title_img");
        this.recorddetails_panel = this.record_panel.getChildByName("recorddetails_panel");
        let player = h1global.player();
        cc.log("player.gameRecordList:", player.gameRecordList);
        let self = this;
        this.return_btn = this.record_panel.getChildByName("return_btn");
        this.return_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.hide();
            }
        });

        this.backnum_panel = this.record_panel.getChildByName("backnum_panel");
        this.backnum_panel_return_btn = this.backnum_panel.getChildByName("return_btn");
        this.backnum_panel_return_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.backnum_panel.setVisible(false);
            }
        });

        this.backnum_panel_ok_btn = this.backnum_panel.getChildByName("ok_btn");
        this.backnum_panel_backnum_tf = this.backnum_panel.getChildByName("backnum_tf");
        //观看他人回放
        this.backnum_panel_ok_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                var text = self.backnum_panel_backnum_tf.getString();
                if (self.reqPlayback(text)) {
                    self.backnum_panel.setVisible(false);
                }
            }
        });

        this.playback_btn = this.record_panel.getChildByName("playback_btn");
        this.playback_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.backnum_panel.setVisible(true);
                BasicDialogUI.addColorMask(self.backnum_panel, undefined, function () {
                    self.backnum_panel.setVisible(false);
                });
                BasicDialogUI.applyShowEffect(self.backnum_panel)
            }
        });
        this.back_btn = this.record_panel.getChildByName("back_btn");

        function back_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.title_img.loadTexture("res/ui/RecordUI/title.png");
                self.recorddetails_panel.setVisible(false);
                self.back_btn.setVisible(false);
                self.return_btn.setVisible(true);
                self.curState = 0;
            }
        }

        this.back_btn.addTouchEventListener(back_btn_event);

        this.record_scroll = this.record_panel.getChildByName("record_scroll");
        this.recorddetails_scroll = this.recorddetails_panel.getChildByName("recorddetails_scroll");
        this.updateRecordScroll(0, player.gameRecordList);
    },

    reqPlayback: function (text) {
        if (cutil.isPositiveNumber(text)) {
            let player = h1global.player();
            if (!player) {
                cc.log('player undefined');
                return false;
            }
            player.reqPlayback(cc.isNumber(text) ? text : parseInt(text));
            return true;
        } else {
            h1global.globalUIMgr.info_ui.show_by_info("回放码错误！")
        }
        return false;
    },

    update_record_title: function (recordList) {
        let round_result = recordList['round_result'];
        this.title_img.loadTexture("res/ui/RecordUI/recorddetails_title.png");
        var roomid_label = this.recorddetails_panel.getChildByName("roomid_label");
        roomid_label.setString("No." + recordList["roomID"].toString() + " (" + switches.gameName + ")");
        let user_info_list = recordList["user_info_list"];
        this.update_base_info(this.recorddetails_panel, round_result, user_info_list);
    },

    update_base_info: function (parent, round_result, user_info_list) {
        var date_label = parent.getChildByName("date_label");
        var time_label = parent.getChildByName("time_label");
        date_label.setString(round_result[0]["date"]);
        let time_text = round_result[0]["time"].split(":", 2);
        for (var i = 0; i < time_text.length; i++) {
            if (time_text[i] < 10) {
                time_text[i] = "0" + time_text[i];
            }
        }
        time_label.setString(time_text[0] + ":" + time_text[1]);

        for (var i = 0; i < 4; i++) {
            let player_label = parent.getChildByName("player_label" + i.toString());
            player_label.setString(user_info_list[i]["nickname"]);
        }
    },

    update_score_color: function (score_label, score) {
        if (score >= 0) {
            score_label.setColor(cc.color(220, 56, 12));
            score_label.setOpacity(255);
        } else {
            score_label.setOpacity(150);
            score_label.setColor(cc.color(38, 149, 110));
        }
    },

    update_record_details_small: function (view, itemData, index) {
        // 每次游戏的子局内容
        let long_bg_img = view.getChildByName("long_bg_img");
        long_bg_img.setVisible((index + 1) % 2 !== 0);

        let num_label = view.getChildByName("num_label");
        let round_time_label = view.getChildByName("round_time_label");
        num_label.setString((index + 1).toString());

        let time_text = itemData["time"].split(":", 2);
        for (var i = 0; i < time_text.length; i++) {
            if (time_text[i] < 10) {
                time_text[i] = "0" + time_text[i];
            }
        }
        round_time_label.setString(time_text[0] + ":" + time_text[1]);

        let self = this;
        //回看
        view.getChildByName("playback_btn").addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.reqPlayback(itemData['recordId']);
            }
        });

        //分享
        let share_inside_btn = view.getChildByName("share_btn");
        let share_title = switches.gameName + ' 回放码【' + itemData['recordId'] + '】';

        let share_desc = '玩家[' + this.nickname + ']分享了游戏录像,点击战绩-观看他人回放,输入回放码即可查看。';
        share_inside_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if ((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)) {
                    jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "callWechatShareUrl", "(ZLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", true, switches.share_android_url, share_title, share_desc);
                } else if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)) {
                    jsb.reflection.callStaticMethod("WechatOcBridge", "callWechatShareUrlToSession:fromUrl:withTitle:andDescription:", true, switches.share_ios_url, share_title, share_desc);
                } else {
                    cutil.share_func(share_title, share_desc);
                    h1global.curUIMgr.share_ui.show();
                }
            }
        });
        if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            share_inside_btn.setVisible(false);
        }

        for (var i = 0; i < 4; i++) {
            let score_label = view.getChildByName("score_label" + i.toString());
            if (!itemData['round_record'][i]) {
                score_label.setVisible(false);
                return;
            }
            score_label.setVisible(true);
            let score = itemData["round_record"][i]["score"];
            score_label.setString(score > 0 ? "+" + score : score.toString());
            this.update_score_color(score_label, score)
        }

    },

    update_record_details_big: function (view, itemData) {
        // 游戏总体信息，时间取第1局开始的时间
        let round_result = itemData['round_result'];
        let user_info_list = itemData['user_info_list'];
        let roomid_label = view.getChildByName("roomid_label");
        roomid_label.setString("No." + itemData["roomID"].toString());
        let lackrecord_label = view.getChildByName("lackrecord_label");
        lackrecord_label.setVisible(round_result.length < itemData["maxRound"]);
        this.update_base_info(view, round_result, user_info_list);

        for (var i = 0; i < 4; i++) {
            let score_label = view.getChildByName("score_label" + i.toString());
            let player_label = view.getChildByName("player_label" + i.toString());
            if (!round_result[0]["round_record"][i]) {
                player_label.setVisible(false);
                score_label.setVisible(false);
                return;
            }
            player_label.setVisible(true);
            score_label.setVisible(true);
            player_label.setString(user_info_list[i]["nickname"]);
            let total_score = 0;
            for (var j = 0; j < round_result.length; j++) {
                total_score += round_result[j]["round_record"][i]["score"];
            }
            score_label.setString(total_score > 0 ? "+" + total_score : total_score.toString());
            this.update_score_color(score_label, total_score)
        }
    },

    updateRecordScroll: function (curState, recordList) {
        // recordList反向
        recordList = recordList.concat([]).reverse();
        let self = this;

        UICommonWidget.update_scroll_items(this.record_scroll, recordList, function (curItem, curInfo, index) {
            self.update_record_details_big(curItem, curInfo);
        });
        let items = this.record_scroll.getChildren();
        for (var i = 0; i < items.length; i++) {
            items[i].getChildByName("checkdetails_btn").addTouchEventListener(function (i) {
                return function (sender, eventType) {
                    if (eventType === ccui.Widget.TOUCH_ENDED) {
                        self.back_btn.setVisible(true);
                        self.return_btn.setVisible(false);
                        self.recorddetails_panel.setVisible(true);
                        let recordData = recordList[i];
                        self.update_record_title(recordData);
                        UICommonWidget.update_scroll_items(self.recorddetails_scroll, recordData['round_result'], function (view, itemData, index) {
                            self.update_record_details_small(view, itemData, index);
                        });
                    }
                }
            }(i));
        }
    },
});