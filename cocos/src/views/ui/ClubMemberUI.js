"use strict";

var ClubMemberUI = UIBase.extend({
    ctor:function () {
        this._super();
        this.resourceFilename = "res/ui/ClubMemberUI.json";
    },

    show_by_info:function (club_id) {
        if(!h1global.player().club_entity_dict[club_id]){return}
        this.club = h1global.player().club_entity_dict[club_id];
        this.show();
    },

    initUI:function () {
        var self = this;
        var club_player_panel = this.rootUINode.getChildByName("club_player_panel");
        var player_panel = club_player_panel.getChildByName("player_panel");

        player_panel.getChildByName("back_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                self.hide();
            }
        });

        this.mem_page_index = 0;
        this.apply_page_index = 0;
        this.page_show_num = 5;

        var member_btn = player_panel.getChildByName("member_btn");
        var apply_btn = player_panel.getChildByName("apply_btn");
        var search_btn = player_panel.getChildByName("search_btn");

        var btn_list = [member_btn, apply_btn, search_btn];

        var member_panel = player_panel.getChildByName("member_panel");
        var apply_panel = player_panel.getChildByName("apply_panel");
        var search_panel = player_panel.getChildByName("search_panel");

        var page_list = [member_panel, apply_panel, search_panel];
        UICommonWidget.create_tab(btn_list, page_list);

        this.init_invite_panel();

        h1global.player().clubOperation(const_val.CLUB_OP_GET_MEMBERS, this.club.club_id);
        if(this.club.is_owner(h1global.player().userId)){
            h1global.player().clubOperation(const_val.CLUB_OP_GET_APPLICANTS, this.club.club_id);
        }
    },

    update_club_member:function (member_list) {
        if(!this.is_show){return;}
        var self = this;
        this.club.members = member_list;
        var club_player_panel = this.rootUINode.getChildByName("club_player_panel");
        var player_panel = club_player_panel.getChildByName("player_panel");
        var member_panel = player_panel.getChildByName("member_panel");

        var title_panel = member_panel.getChildByName("title_panel");
        var info_panel = member_panel.getChildByName("info_panel");

        if(this.mem_page_index >= Math.ceil(member_list.length/this.page_show_num) && this.mem_page_index > 0){
            this.mem_page_index -= 1;
        }

        var show_list = member_list.slice(this.mem_page_index * this.page_show_num, this.mem_page_index * this.page_show_num + this.page_show_num);

        function update_page() {
            title_panel.getChildByName("page_progress_label").setString((self.mem_page_index+1).toString() + "/" + Math.ceil(member_list.length/self.page_show_num).toString())
        }

        title_panel.getChildByName("last_page_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                if(self.mem_page_index <= 0){
                    return
                }
                self.mem_page_index -= 1;
                update_page();
                var show_list = member_list.slice(self.mem_page_index * self.page_show_num, self.mem_page_index * self.page_show_num + self.page_show_num);
                self.update_member_page(info_panel, show_list)
            }
        });

        title_panel.getChildByName("next_page_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                if(self.mem_page_index + 1 >= Math.ceil(member_list.length/self.page_show_num)){
                    return
                }
                self.mem_page_index += 1;
                update_page();
                var show_list = member_list.slice(self.mem_page_index * self.page_show_num, self.mem_page_index * self.page_show_num + self.page_show_num);
                self.update_member_page(info_panel, show_list)
            }
        });
        update_page();
        this.update_member_page(info_panel, show_list)
    },

    update_member_page:function (info_panel, show_list) {
        if(!this.is_show){return;}
        var self = this;

        function update_item_func(itemPanel, itemData, index){
                if(index%2 === 1){
                    itemPanel.getChildByName("light_img").setVisible(false);
                } else {
                    itemPanel.getChildByName("light_img").setVisible(true);
                }
                var head_img_frame = itemPanel.getChildByName("head_img_frame");

                itemPanel.reorderChild(itemPanel.getChildByName("light_img"), head_img_frame.getLocalZOrder()-10);

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

                itemPanel.getChildByName("name_label").setString(itemData["nickname"]);
                itemPanel.getChildByName("id_label").setString(itemData["userId"]);
                itemPanel.getChildByName("time_label").setString(cutil.convert_timestamp_to_ymd(itemData["ts"]));
                itemPanel.getChildByName("mark_label").setString(itemData["notes"]);

                itemPanel.getChildByName("mark_btn").addTouchEventListener(function(sender, eventType){
                    if(eventType === ccui.Widget.TOUCH_ENDED){
                        if(h1global.curUIMgr.editor_ui && !h1global.curUIMgr.editor_ui.is_show){
                            h1global.curUIMgr.editor_ui.show_by_info(function (editor_string) {
                                h1global.player().clubOperation(const_val.CLUB_OP_SET_MEMBER_NOTES, self.club.club_id, [itemData["userId"], editor_string]);
                            }, "请输入玩家备注", const_val.CLUB_MAX_MARK_LEN)
                        }
                    }
                });

                itemPanel.getChildByName("delete_btn").addTouchEventListener(function (sender, eventType) {
                    if(eventType === ccui.Widget.TOUCH_ENDED){
                        if(h1global.curUIMgr.confirm_ui && !h1global.curUIMgr.confirm_ui.is_show && self.club.club_id) {
                            h1global.curUIMgr.confirm_ui.show_by_info("确定将该成员踢出茶楼?", function () {
								h1global.player().clubOperation(const_val.CLUB_OP_KICK_OUT, self.club.club_id, [itemData["userId"]]);
                            });
                        }
                    }
                });
                if(h1global.player().userId === self.club.owner.userId){
                    if(self.club.owner.userId === itemData.userId){
                        itemPanel.getChildByName("delete_btn").setVisible(false);
                    }else{
                        itemPanel.getChildByName("delete_btn").setVisible(true);
                    }
                }else{
                    itemPanel.getChildByName("delete_btn").setVisible(false);
                    itemPanel.getChildByName("mark_btn").setVisible(false);
                }
        }
        UICommonWidget.update_panel_items(info_panel, show_list, update_item_func)
    },

    update_club_apply:function (apply_list) {
        if (!this.is_show) {
            return;
        }
        var self = this;
        var club_player_panel = this.rootUINode.getChildByName("club_player_panel");
        var player_panel = club_player_panel.getChildByName("player_panel");
        var apply_panel = player_panel.getChildByName("apply_panel");

        var title_panel = apply_panel.getChildByName("title_panel");
        var info_panel = apply_panel.getChildByName("info_panel");

        if(this.apply_page_index >= Math.ceil(apply_list.length/this.page_show_num) && this.apply_page_index > 0){
            this.apply_page_index -= 1;
        }

        var show_list = apply_list.slice(this.apply_page_index * this.page_show_num, this.apply_page_index * this.page_show_num + this.page_show_num);

        function update_page() {
            title_panel.getChildByName("page_progress_label").setString((self.apply_page_index+1).toString() + "/" + Math.ceil(apply_list.length/self.page_show_num).toString())
        }

        title_panel.getChildByName("last_page_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                if(self.apply_page_index <= 0){
                    return
                }
                self.apply_page_index -= 1;
                update_page();
                var show_list = apply_list.slice(self.apply_page_index * self.page_show_num, self.apply_page_index * self.page_show_num + self.page_show_num);
                self.update_apply_page(info_panel, show_list)
            }
        });

        title_panel.getChildByName("next_page_btn").addTouchEventListener(function (sender, eventType) {
            if(eventType === ccui.Widget.TOUCH_ENDED){
                if(self.apply_page_index + 1 >= Math.ceil(apply_list.length/self.page_show_num)){
                    return
                }
                self.apply_page_index += 1;
                update_page();
                var show_list = apply_list.slice(self.apply_page_index * self.page_show_num, self.apply_page_index * self.page_show_num + self.page_show_num);
                self.update_apply_page(info_panel, show_list)
            }
        });
        update_page();
        this.update_apply_page(info_panel, show_list)
    },

    update_apply_page:function (info_panel, show_list) {
        if(!this.is_show){return;}
        var self = this;
        function update_item_func(itemPanel, itemData, index) {

            if(index%2 === 1){
                itemPanel.getChildByName("light_img").setVisible(false);
            } else {
                itemPanel.getChildByName("light_img").setVisible(true);
            }

            var head_img_frame = itemPanel.getChildByName("head_img_frame");
            itemPanel.reorderChild(itemPanel.getChildByName("light_img"), head_img_frame.getLocalZOrder()-10);

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
            itemPanel.getChildByName("name_label").setString(cutil.info_sub(itemData["nickname"], 7));
            itemPanel.getChildByName("id_label").setString(itemData["userId"]);
            itemPanel.getChildByName("time_label").setString(cutil.convert_timestamp_to_ymd(itemData["ts"]));

            itemPanel.getChildByName("agree_btn").addTouchEventListener(function(sender, eventType){
                if(eventType === ccui.Widget.TOUCH_ENDED){
                    if(h1global.curUIMgr.editor_ui && !h1global.curUIMgr.editor_ui.is_show){
                        h1global.player().clubOperation(const_val.CLUB_OP_AGREE_IN, self.club.club_id, [itemData["userId"]]);
                    }
                }
            });

            itemPanel.getChildByName("cancel_btn").addTouchEventListener(function (sender, eventType) {
                if(eventType === ccui.Widget.TOUCH_ENDED){
                    h1global.player().clubOperation(const_val.CLUB_OP_REFUSE_IN, self.club.club_id, [itemData["userId"]]);
                }
            });
        }
        UICommonWidget.update_panel_items(info_panel, show_list, update_item_func)
    },

    init_invite_panel:function () {
        var club_player_panel = this.rootUINode.getChildByName("club_player_panel");
        var player_panel = club_player_panel.getChildByName("player_panel");
        var search_panel = player_panel.getChildByName("search_panel");

        var sub_panel = search_panel.getChildByName("sub_panel");
        var info_panel = sub_panel.getChildByName("info_panel");

        var warning_label = search_panel.getChildByName("warning_label");
        
        if(!this.club.is_owner(h1global.player().userId)){
            warning_label.setVisible(true);
            sub_panel.setVisible(false);
            return
        }else {
            warning_label.setVisible(false);
            sub_panel.setVisible(true);
        }

        sub_panel.getChildByName("search_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                var id_str = sub_panel.getChildByName("id_edit_box").getString();
                if(isNaN(Number(id_str))){
                    if(h1global.globalUIMgr.info_ui){
                        h1global.globalUIMgr.info_ui.show_by_info("输入不合法");
                    }
                    return
                }
                var id = Number(id_str);
                if(id < 1000000 || id > 9999999){
                    if(h1global.globalUIMgr.info_ui){
                        h1global.globalUIMgr.info_ui.show_by_info("玩家ID不合法");
                    }
                    return
                }
                h1global.player().queryUserInfo(id);
                sub_panel.getChildByName("id_edit_box").setString("");
            }
        });

        info_panel.getChildByName("clear_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                info_panel.setVisible(false);
            }
        })
    },

    update_user_info:function (userInfo) {
        if(!this.is_show || !this.club){
            return;
        }
        if(!this.club.is_owner(h1global.player().userId)){
            return;
        }

        var self = this;
        var club_player_panel = this.rootUINode.getChildByName("club_player_panel");
        var player_panel = club_player_panel.getChildByName("player_panel");
        var search_panel = player_panel.getChildByName("search_panel");

        var sub_panel = search_panel.getChildByName("sub_panel");
        var info_panel = sub_panel.getChildByName("info_panel");

        var head_img_frame = info_panel.getChildByName("head_img_frame");
        cutil.loadPortraitTexture(userInfo["head_icon"], userInfo["sex"], function(img){
            if(self && self.is_show){
                if(info_panel.getChildByName("head_icon")){
                    info_panel.removeChild(info_panel.getChildByName("head_icon"))
                }
                var portrait_sprite  = new cc.Sprite(img);
                portrait_sprite.setScale(74/portrait_sprite.getContentSize().width);
                info_panel.addChild(portrait_sprite);
                portrait_sprite.setPosition(head_img_frame.getPosition());
                portrait_sprite.setName("head_icon");
                // info_panel.reorderChild(portrait_sprite, head_img_frame.getLocalZOrder()-1)
            }
        });

        info_panel.getChildByName("name_label").setString(cutil.str_sub(userInfo["name"], 7));
        info_panel.getChildByName("id_label").setString("ID:" + userInfo["userId"]);

        if (this.club.is_owner(userInfo['userId'])) {
			info_panel.getChildByName("invite_btn").setVisible(false);
			info_panel.getChildByName("delete_btn").setVisible(false);
			info_panel.setVisible(true);
        } else if (this.club.is_member(userInfo['userId'])) {
			info_panel.getChildByName("delete_btn").addTouchEventListener(function (sender, eventType) {
				if (eventType === ccui.Widget.TOUCH_ENDED) {
					if(h1global.curUIMgr.confirm_ui && !h1global.curUIMgr.confirm_ui.is_show && self.club.club_id) {
						h1global.curUIMgr.confirm_ui.show_by_info("确定将该成员踢出茶楼?", function () {
							h1global.player().clubOperation(const_val.CLUB_OP_KICK_OUT, self.club.club_id, [userInfo["userId"]]);
						});
						this.setVisible(false);
					}
				}
			});
			info_panel.getChildByName("invite_btn").setVisible(false);
			info_panel.getChildByName("delete_btn").setVisible(true);
			info_panel.setVisible(true);
        } else {
			info_panel.getChildByName("invite_btn").addTouchEventListener(function (sender, eventType) {
				if (eventType === ccui.Widget.TOUCH_ENDED) {
					h1global.player().clubOperation(const_val.CLUB_OP_INVITE_IN, self.club.club_id, [userInfo["userId"]]);
					this.setVisible(false);
				}
			});
			info_panel.getChildByName("invite_btn").setVisible(true);
			info_panel.getChildByName("delete_btn").setVisible(false);
			info_panel.setVisible(true);
		}
    },
});