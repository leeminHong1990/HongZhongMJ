"use strict";

var JoinClubUI = UIBase.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/JoinClubUI.json";
    },
    
    initUI:function () {
        var self = this;
        this.join_club_panel = this.rootUINode.getChildByName("join_club_panel");
        var return_btn = this.join_club_panel.getChildByName("return_btn")
        function return_btn_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide()
            }
        }
        return_btn.addTouchEventListener(return_btn_event);

        this.init_join_panel();

        var club_entity_list = h1global.player().club_entity_list;
        var club_base_list = [];
        for(var i=0; i<club_entity_list.length; i++){
            club_base_list.push(club_entity_list[i].get_base_info());
        }
        this.update_club_scroll(club_base_list);
    },

    init_join_panel:function () {
        this.curNum = 0;
        var self = this;
        var join_panel = this.join_club_panel.getChildByName("join_panel");
        var player = h1global.player();
        this.btn_list = [];
        function btn_event(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                for(var i = 0 ; i < self.btn_list.length ; i++) {
                    if(sender === self.btn_list[i]){
                        if (self.curNum > 99999) {
                            return;
                        }
                        self.curNum = (self.curNum * 10 + i) % 1000000;
                        self.update_click_num();
                    }
                }
            }
        }
        for(var i = 0 ; i < 10 ; i ++) {
            var btn = join_panel.getChildByName("_" + i.toString() + "_btn");
            this.btn_list.push(btn);
            btn.addTouchEventListener(btn_event);
        }

        join_panel.getChildByName("_clear_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.clear_click_num();
            }
        });
        join_panel.getChildByName("_del_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.curNum = Math.floor(self.curNum / 10);
                self.update_click_num();
            }
        });

        this.update_click_num();
    },

    update_click_num:function(){
        var roomNum = this.curNum;
        var join_panel = this.join_club_panel.getChildByName("join_panel");
        for(var i = 0; i < 5; i++){
            var cur_num_img = join_panel.getChildByName("num_img" + i.toString());
            cur_num_img.ignoreContentAdaptWithSize(true);
            if(roomNum <= 0){
                cur_num_img.setVisible(false);
            } else {
                cur_num_img.loadTexture("res/ui/JoinRoomUI/0" + (roomNum%10).toString() + ".png");
                cur_num_img.setVisible(true);
                roomNum = Math.floor(roomNum/10);
            }
        }
        this.try_join();
    },

    try_join:function () {
        if (this.curNum > 9999) {
            if(h1global.player().club_entity_list.length >= const_val.CLUB_NUM_LIMIT){
                if(h1global.globalUIMgr.info_ui && !h1global.globalUIMgr.info_ui.is_show){
                    h1global.globalUIMgr.info_ui.show_by_info("加入茶楼数量已达到上限");
                }
            }else{
                h1global.player().clubOperation(const_val.CLUB_OP_APPLY_IN, this.curNum);
            }
            this.hide()
        }
    },

    clear_click_num:function () {
        this.curNum = 0;
        var join_panel = this.join_club_panel.getChildByName("join_panel");
        for(var i = 0; i < 5; i++){
            var cur_num_img = join_panel.getChildByName("num_img" + i.toString());
            cur_num_img.setVisible(false);
        }
    },

    update_club_scroll:function (club_base_list) {
        var self = this;
        var club_scroll = this.join_club_panel.getChildByName("club_scroll");
        function update_item_func(itemPanel, itemData, index) {
            cc.log(itemData)
            var club_name_label = itemPanel.getChildByName("club_name_label");
            var club_owner_label = itemPanel.getChildByName("club_owner_label");
            var head_bg_img = itemPanel.getChildByName("head_bg_img");

            club_owner_label.setString("老板:" + itemData["owner"]["nickname"]);
            club_name_label.setString(itemData["club_name"]);

            var room_detail_label = itemPanel.getChildByName("room_detail_label");
            room_detail_label.setString(cutil.get_club_share_desc(h1global.player().club_entity_dict[itemData["club_id"]].getRoomCreateDict()));

            cutil.loadPortraitTexture(itemData["owner"]["head_icon"], itemData["owner"]["sex"], function (img) {
                if (self.is_show && head_bg_img) {
                    head_bg_img.removeAllChildren();
                    var portrait_sprite = new cc.Sprite(img);
                    portrait_sprite.setName("portrait_sprite");
                    portrait_sprite.setScale(76 / portrait_sprite.getContentSize().width);
                    portrait_sprite.x = head_bg_img.getContentSize().width * 0.5;
                    portrait_sprite.y = head_bg_img.getContentSize().height * 0.5;
                    head_bg_img.addChild(portrait_sprite);
                }
            });

            var room_id_label = itemPanel.getChildByName("room_id_label");
            room_id_label.setString("茶楼号:" + itemData["club_id"]);

            var enter_btn = itemPanel.getChildByName("enter_btn");
            function enter_event(sender, eventType) {
                if(eventType === ccui.Widget.TOUCH_ENDED){
                    if(h1global.curUIMgr.club_ui && h1global.curUIMgr.club_ui.is_show){
                        h1global.curUIMgr.club_ui.hide();
                    }
                    h1global.player().getClubDetailInfo(itemData["club_id"]);
                    self.hide();
                    // h1global.curUIMgr.club_ui.show_by_info(itemData);
                }
            }
            enter_btn.addTouchEventListener(enter_event);
        }
        UICommonWidget.update_scroll_items(club_scroll, club_base_list, update_item_func)
    }
});