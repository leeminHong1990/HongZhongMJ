"use strict";

var CreateClubUI = CreateRoomUI.extend({
    initUI:function () {
        this._super();
        this.createroom_panel.getChildByName("title_img").loadTexture("res/ui/ClubUI/club_create_title.png");
    },

    initCreateFunction:function(){
        var self = this;
        var create_btn = this.gamename_panel.getChildByName("create_btn");
        function create_btn_event(sender, eventType){
            if (eventType == ccui.Widget.TOUCH_ENDED) {
                var parameters = self.containUISnippets["CreateRoomSnippet"].getParameters();
                parameters['room_type'] = const_val.CLUB_ROOM;
                cc.log("CreateClub args: ", parameters);
                //
                if(h1global.curUIMgr.editor_ui && !h1global.curUIMgr.editor_ui.is_show){
                    h1global.curUIMgr.editor_ui.show_by_info(function (editor_string) {
                        if(h1global.curUIMgr.createclub_ui && h1global.curUIMgr.createclub_ui.is_show){
                            h1global.curUIMgr.createclub_ui.hide()
                        }
                        h1global.player().createClub(editor_string, parameters);
                    }, "给您的茶楼取个名", const_val.CLUB_NAME_LEN)
                }
                // self.hide();
            }
        }
        create_btn.addTouchEventListener(create_btn_event);
    },

	onShow:function () {
		var self = this;
		self.containUISnippets["CreateRoomSnippet"].updateRoomType(const_val.CLUB_ROOM);
	}
});