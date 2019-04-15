"use strict";

var ClubRecordUI = UIBase.extend({
    ctor:function () {
        this._super();
        this.resourceFilename = "res/ui/ClubRecordUI.json";
    },

    show_by_info:function (club_id) {
        if(!h1global.player().club_entity_dict[club_id]){return}
        this.club = h1global.player().club_entity_dict[club_id];
        this.show();
    },

    initUI:function () {
        var self = this;
        var record_panel = this.rootUINode.getChildByName("record_panel");
        var return_btn = record_panel.getChildByName("return_btn");
        function return_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.hide();
            }
        }
        return_btn.addTouchEventListener(return_btn_event);

        var record_all_btn = record_panel.getChildByName("record_all_btn");
        var record_yesterday_btn = record_panel.getChildByName("record_yesterday_btn");
        var record_mine_btn = record_panel.getChildByName("record_mine_btn");

        var record_all_scroll = record_panel.getChildByName("record_all_scroll");
        var record_yesterday_scroll = record_panel.getChildByName("record_yesterday_scroll");
        var record_mine_scroll = record_panel.getChildByName("record_mine_scroll");

        this.btn_list = [record_all_btn, record_yesterday_btn, record_mine_btn];
        this.scroll_list = [record_all_scroll, record_yesterday_scroll, record_mine_scroll];

        UICommonWidget.create_tab(this.btn_list, this.scroll_list);
        h1global.player().clubOperation(const_val.CLUB_OP_GET_RECORDS, self.club.club_id);
    },
    
    update_recrod:function (club_id, record_list) {
        if(!this.is_show){return;}
        if(this.club.club_id !== club_id){return;}
        // 时间排序 从大到小
        record_list.sort(function (a, b) {
           return b.time - a.time;
        });
        // 分数排序 从 大到小
        for(var i=0; i<record_list.length; i++){
            record_list[i]["player_info_list"].sort(function (a,b) {
                return b.score - a.score;
            })
        }
        var group_record_list = this.group_record(record_list);

        for(var i=0; i<group_record_list.length; i++){
            this.update_scroll(this.scroll_list[i], group_record_list[i])
        }
    },

    update_scroll:function (scroll, info_list) {
        function init_panel_item(itemPanel, itemData, idx) {
            var room_id_label = itemPanel.getChildByName("room_id_label");
            var time_label = itemPanel.getChildByName("time_label");

            room_id_label.setString("房号:" + itemData["roomID"]);
            time_label.setString(cutil.convert_timestamp_to_mdhms(itemData["time"]));

            for(var i=0; i<itemData["player_info_list"].length; i++){
                var name_label = itemPanel.getChildByName("name_label_" + String(i));
                var score_label = itemPanel.getChildByName("score_label_" + String(i));

                var info = itemData["player_info_list"][i];
                name_label.setString(cutil.info_sub(info["nickname"], 7) + "(" + info["userId"].toString() + ")");
                score_label.setTextColor(cc.color(255, 255, 255));
                if(info["score"] > 0){
                    score_label.setString("+" + info["score"]);
                    score_label.setTextColor(cc.color(220, 56, 12));
                }else{
                    score_label.setString(info["score"]);
                    score_label.setTextColor(cc.color(26, 146, 95));
                }

                if(info["score"] >= itemData["player_info_list"][0]["score"]){
                    // 得分最多的人 名字特殊显示
                    name_label.setTextColor(cc.color(255, 255, 255));
                    name_label.setTextColor(cc.color(220, 56, 12));
                }
            }

        }
        UICommonWidget.update_scroll_items(scroll, info_list, init_panel_item);
    },
    
    group_record:function (record_list) {
        var group_record_list = [[], [], []];
        for(let i=0; i<record_list.length; i++){
            group_record_list[0].push(record_list[i]);
            if(cutil.convert_timestamp_to_ymd(record_list[i]["time"]) !== cutil.convert_timestamp_to_ymd(Math.floor(Date.parse(new Date())/1000))){
                group_record_list[1].push(record_list[i]);
            }

            var player_info_list = record_list[i]["player_info_list"];
            for(let j=0; j<player_info_list.length; j++){
                if(h1global.player().userId === player_info_list[j]["userId"]){
                    group_record_list[2].push(record_list[i]);
                    break;
                }
            }
        }
        return group_record_list
    }
});