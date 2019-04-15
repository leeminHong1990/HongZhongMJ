"use strict";

var ClubViewUI = UIBase.extend({
   ctor:function(){
       this._super();
       this.resourceFilename = "res/ui/ClubViewUI.json";
   } ,

    initUI:function () {
       var self = this;
        var ui_panel = this.rootUINode.getChildByName("ui_panel");
        ui_panel.runAction(cc.MoveTo.create(0.3, cc.p(0, 0)));

        var back_btn = ui_panel.getChildByName("back_btn")
        function ui_panel_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.close();
            }
        }
        back_btn.addTouchEventListener(ui_panel_event);
        ui_panel.addTouchEventListener(ui_panel_event);

        var club_entity_list = h1global.player().club_entity_list;
        var club_base_list = [];
        for(var i=0; i<club_entity_list.length; i++){
            club_base_list.push(club_entity_list[i].get_base_info());
        }
        this.update_club_scroll(club_base_list);
    },

    update_club_scroll:function (club_base_list) {
        var self = this;
        var ui_panel = this.rootUINode.getChildByName("ui_panel");
        var club_panel = ui_panel.getChildByName("club_panel");
        var club_scroll = club_panel.getChildByName("club_scroll");
        function update_item_func(itemPanel, itemData, index) {
            var club_name_label = itemPanel.getChildByName("club_name_label");
            var club_owner_label = itemPanel.getChildByName("club_owner_label");
            var head_bg_img = itemPanel.getChildByName("head_bg_img");

            club_owner_label.setString("老板:" + itemData["owner"]["nickname"]);
            club_name_label.setString(itemData["club_name"]);

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

            function item_panel_event(sender, eventType) {
                if(eventType === ccui.Widget.TOUCH_ENDED){
                    if(h1global.curUIMgr.club_ui && h1global.curUIMgr.club_ui.is_show){
                        h1global.curUIMgr.club_ui.hide();
                    }
                    h1global.player().getClubDetailInfo(itemData["club_id"]);
                    self.close();
                    // h1global.curUIMgr.club_ui.show_by_info(itemData);
                }
            }
            itemPanel.addTouchEventListener(item_panel_event);
        }
        UICommonWidget.update_scroll_items(club_scroll, club_base_list, update_item_func)
    },

    close:function () {
        var self = this;
        var ui_panel = this.rootUINode.getChildByName("ui_panel");
        ui_panel.runAction(cc.Sequence.create(
            cc.MoveTo.create(0.3, cc.p(-ui_panel.getContentSize().width/2, 0)),
            cc.CallFunc.create(function(){
                self.hide()
            })
        ))
    }
});