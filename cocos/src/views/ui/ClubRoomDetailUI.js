"use strict";

var ClubRoomDetailUI = UIBase.extend({
    ctor:function () {
        this._super();
        this.resourceFilename = "res/ui/ClubRoomDetailUI.json";
    },

    show_by_info:function (table_idx, table_detail) {
        this.table_idx = table_idx;
        this.table_detail = table_detail;
        this.show()
    },

    initUI:function () {
        var self = this;
        var back_btn = this.rootUINode.getChildByName("club_room_detail_panel").getChildByName("room_detail_panel").getChildByName("back_btn");
        function back_btn_event(sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        }
        back_btn.addTouchEventListener(back_btn_event);
        this.update_scroll_panel(this.table_detail)
    },

    update_scroll_panel:function (player_list) {
        var self = this;
        var detail_scroll = this.rootUINode.getChildByName("club_room_detail_panel").getChildByName("room_detail_panel").getChildByName("detail_scroll");
        function init_item_func(itemPanel, itemData, index) {
            var head_img_frame = itemPanel.getChildByName("head_img_frame");
            var name_label = itemPanel.getChildByName("name_label");
            var id_label = itemPanel.getChildByName("id_label");

            name_label.setString(cutil.info_sub(itemData["nickname"], 7));
            id_label.setString(itemData["userId"]);

            itemPanel.reorderChild(itemPanel.getChildByName("bg_img"), head_img_frame.getLocalZOrder()-2);
            cutil.loadPortraitTexture(itemData["head_icon"], itemData["sex"], function(img){
                if(self && self.is_show){
                    if(itemPanel.getChildByName("head_icon")){
                        itemPanel.removeChild(itemPanel.getChildByName("head_icon"))
                    }
                    var portrait_sprite  = new cc.Sprite(img);
                    portrait_sprite.setScale(52/portrait_sprite.getContentSize().width);
                    itemPanel.addChild(portrait_sprite);
                    portrait_sprite.setPosition(head_img_frame.getPosition());
                    portrait_sprite.setName("head_icon");
                    itemPanel.reorderChild(portrait_sprite, head_img_frame.getLocalZOrder()-1)
                }
            });
        }
      UICommonWidget.update_scroll_items(detail_scroll, player_list, init_item_func)
    },
});