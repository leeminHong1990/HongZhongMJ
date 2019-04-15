"use strict";

var ClubMgrUI = UIBase.extend({
    ctor:function () {
        this._super();
        this.resourceFilename = "res/ui/ClubMgrUI.json";
    },

    show_by_info:function (club_id) {
        if(!h1global.player().club_entity_dict[club_id]){return}
        this.club = h1global.player().club_entity_dict[club_id];
        this.show();
    },

    initUI:function () {
        var self = this;
        var mgr_panel = this.rootUINode.getChildByName("club_mgr_panel").getChildByName("mgr_panel");
        var name_label = mgr_panel.getChildByName("name_label");
        var onwer_label = mgr_panel.getChildByName("onwer_label");
        var mem_label = mgr_panel.getChildByName("mem_label");
        var billboard_label = mgr_panel.getChildByName("billboard_label");

        name_label.setString(this.club.club_name);
        onwer_label.setString(this.club.owner.nickname);
        mem_label.setString(String(this.club.member_num) + "/" + String(const_val.CLUB_MAX_MEM_NUM));
        billboard_label.setString(this.club.club_notice);

        mgr_panel.getChildByName("name_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                if(h1global.curUIMgr.editor_ui && !h1global.curUIMgr.editor_ui.is_show){
                    h1global.curUIMgr.editor_ui.show_by_info(function (editor_string) {
                        h1global.player().clubOperation(const_val.CLUB_OP_SET_NAME, self.club.club_id, [editor_string]);
                    }, "给您的茶楼取个名", const_val.CLUB_NAME_LEN)
                }
            }
        });

        mgr_panel.getChildByName("billboard_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                if(h1global.curUIMgr.editor_ui && !h1global.curUIMgr.editor_ui.is_show){
                    h1global.curUIMgr.editor_ui.show_by_info(function (editor_string) {
                        h1global.player().clubOperation(const_val.CLUB_OP_SET_NOTICE, self.club.club_id, [editor_string]);
                    }, "请输入茶楼公告", const_val.CLUB_NOTICE_LEN)
                }
            }
        });

        mgr_panel.getChildByName("dismiss_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                // if(h1global.curUIMgr.club_ui && h1global.curUIMgr.club_ui.is_show){
                //     h1global.curUIMgr.club_ui.hide();
                // }
                if(h1global.curUIMgr.confirm_ui && !h1global.curUIMgr.confirm_ui.is_show && self.club){
                    h1global.curUIMgr.confirm_ui.show_by_info("是否解散茶楼", function () {
                        h1global.player().deleteClub(self.club.club_id);
                        self.hide();
                    });
                }
            }
        });

        this.rootUINode.getChildByName("club_mgr_panel").getChildByName("click_panel").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        });

        mgr_panel.getChildByName("close_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        });
    },

    update_club_name:function (club_id) {
        if(!this.is_show || this.club.club_id !== club_id){
            return;
        }
        var mgr_panel = this.rootUINode.getChildByName("club_mgr_panel").getChildByName("mgr_panel");
        var name_label = mgr_panel.getChildByName("name_label");
        name_label.setString(this.club.club_name);
    },

    update_club_notice:function (club_id) {
        if(!this.is_show || this.club.club_id !== club_id){
            return;
        }
        var mgr_panel = this.rootUINode.getChildByName("club_mgr_panel").getChildByName("mgr_panel");
        var billboard_label = mgr_panel.getChildByName("billboard_label");
        billboard_label.setString(this.club.club_notice)
    }
});