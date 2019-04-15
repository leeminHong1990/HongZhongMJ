"use strict";
var ClubConfigUI = ConfigUI.extend({
	show_by_info:function(club_id){
		this.club_id = club_id;
		this.show();
	},

    update_out_btn:function() {
		var self = this;
        this.gameconfig_panel.getChildByName("logout_btn").loadTextures("ClubUI/club_exit_btn.png", null, null, ccui.Widget.PLIST_TEXTURE);
        this.gameconfig_panel.getChildByName("logout_btn").addTouchEventListener(function(sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED) {
                if(h1global.curUIMgr.confirm_ui && !h1global.curUIMgr.confirm_ui.is_show && self.club_id){
                    h1global.curUIMgr.confirm_ui.show_by_info("退出茶楼你将无法打麻将,是否确定退出本茶楼?", function () {
                        h1global.player().clubOperation(const_val.CLUB_OP_APPLY_OUT, self.club_id);
                    });
                }
            }
        })
	},
});