"use strict"
var GameHallUI = UIBase.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/GameHallUI.json";
    },
    initUI:function(){
        var bg_img = ccui.helper.seekWidgetByName(this.rootUINode, "bg_img");
        var bg_img_content_size = bg_img.getContentSize();
        var scale = cc.winSize.width/bg_img_content_size.width;
        if (cc.winSize.height/bg_img_content_size.height > scale){
            scale = cc.winSize.height/bg_img_content_size.height;
        }
        bg_img.setScale(scale);

        // this.init_character_anim();
        this.init_character_panel();
        this.init_function_panel();
        this.init_top_panel();
        this.init_game_panel();
    },

    // init_character_anim:function () {
    //     UICommonWidget.load_effect_plist('eye');
    //
    //     let character_img = this.rootUINode.getChildByName('character_img');
    //     let eye_node = character_img.getChildByName('eye_node');
    //     let eye_sprite = cc.Sprite.create();
    //     eye_sprite.setVisible(false);
    //     character_img.addChild(eye_sprite);
    //     eye_sprite.setPosition(eye_node.getPosition());
    //     let eye_action = UICommonWidget.create_effect_action_ugly({"TIME": 0.2, "NAME": "Eye/eye", "FRAMENUM": 2}, eye_sprite);
    //     eye_sprite.runAction(cc.repeatForever(cc.sequence(cc.delayTime(4), cc.show(), eye_action, cc.hide())));
    //     eye_node.removeFromParent();
    // },

    init_character_panel:function(){
        var character_panel = ccui.helper.seekWidgetByName(this.rootUINode, "character_panel");
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var name_label = character_panel.getChildByName("name_label");
        name_label.setString(info_dict["nickname"]);
        var id_label = character_panel.getChildByName("id_label");
        id_label.setString("ID:" + info_dict["user_id"]);
        var roomcard_label = character_panel.getChildByName("card_label");
        roomcard_label.setString("— —");
        var frame_img = ccui.helper.seekWidgetByName(character_panel, "frame_img");
        character_panel.reorderChild(frame_img, 1);
        frame_img.addTouchEventListener(function(sender, eventType){
            h1global.curUIMgr.playerinfo_ui.show();
        });
        frame_img.setTouchEnabled(true);
        cutil.loadPortraitTexture(info_dict["headimgurl"], info_dict["sex"], function(img){
            if(h1global.curUIMgr.gamehall_ui && h1global.curUIMgr.gamehall_ui.is_show){
                h1global.curUIMgr.gamehall_ui.rootUINode.getChildByName("character_panel").getChildByName("portrait_sprite").removeFromParent();
                var portrait_sprite  = new cc.Sprite(img);
                portrait_sprite.setScale(102/portrait_sprite.getContentSize().width);
                var stencil = new cc.Sprite("res/ui/GameHallUI/mask.png"); // 遮罩模板 -- 就是你想把图片变成的形状
                var clipnode = new cc.ClippingNode();
                clipnode.x = 66;
                clipnode.y = 60;
                clipnode.setInverted(false);
                clipnode.setAlphaThreshold(0.5);
                clipnode.setStencil(stencil);
                clipnode.addChild(portrait_sprite);
                h1global.curUIMgr.gamehall_ui.rootUINode.getChildByName("character_panel").addChild(clipnode);
            }
        });

        function update_card_diamond(){
            cutil.get_user_info("wx_" + info_dict["unionid"], function(content){
                if(content[0] != '{'){
                    return
                }
                var info = eval('(' + content + ')');
                roomcard_label.setString(info["card"].toString());
            });
        }

        update_card_diamond();

        //认证
        character_panel.getChildByName("authenticate_btn").setVisible(false);
        character_panel.getChildByName("authenticate_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.authentucate_ui.show();
            }
        });

        //商城
        character_panel.getChildByName("buy_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
                    h1global.curUIMgr.shop_ui.show();
                } else {
                    // h1global.globalUIMgr.info_ui.show_by_info("请访问微信公众号搜索\r\n【" + switchesnin1.gzh_name + "】进行充值");
                    h1global.curUIMgr.publicnum_ui.show_by_info("请访问微信公众号搜索\r\n【" + switchesnin1.gzh_name + "】进行充值\r\n或扫以下二维码直接进入公众号进行充值");
                }
            }
        });
    },

    updateCharacterCard: function () {
        var character_panel = ccui.helper.seekWidgetByName(this.rootUINode, "character_panel");
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var name_label = character_panel.getChildByName("name_label");
        name_label.setString(info_dict["nickname"]);
        var id_label = character_panel.getChildByName("id_label");
        id_label.setString("ID:" + info_dict["user_id"]);
        var roomcard_label = character_panel.getChildByName("card_label");
        roomcard_label.setString("— —");
        var frame_img = ccui.helper.seekWidgetByName(character_panel, "frame_img");
        character_panel.reorderChild(frame_img, 1);

        function update_card_diamond(){
            cutil.get_user_info("wx_" + info_dict["unionid"],

                function(content){
                    if(content[0] !== '{'){
                        return
                    }
                    var info = eval('(' + content + ')');
                    roomcard_label.setString(info["card"].toString());
                });
        }

        update_card_diamond();
    },

    update_roomcard:function(cards){
        var character_panel = ccui.helper.seekWidgetByName(this.rootUINode, "character_panel");
        var roomcard_label = character_panel.getChildByName("card_label");
        roomcard_label.setString(cards);
    },

    init_top_panel:function(){
        var top_panel = ccui.helper.seekWidgetByName(this.rootUINode, "top_panel");

        var code_btn = top_panel.getChildByName("code_btn");
        var free_card_btn = top_panel.getChildByName("free_card_btn");
        var public_btn = top_panel.getChildByName("public_btn");

        //赚钱码
        code_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                // h1global.curUIMgr.addmine_ui.show();
                h1global.curUIMgr.gamehallshare_ui.show();
            }
        });

        //免费房卡
        free_card_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                // if(h1global.curUIMgr.webview_ui) {
                //     h1global.curUIMgr.webview_ui.show_by_info("http://" + switches.gameEngName + "update.zjfeixia.com/agent.html");
                // }
                // h1global.curUIMgr.gamehallshare_ui.show();
                h1global.curUIMgr.sharecircle_ui.show();
            }
        });

        //公众号
        public_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                h1global.curUIMgr.addmine_ui.show();
            }
        });

        // // 代开房
        // agent_room_btn.addTouchEventListener(function (sender, eventType) {
        //     if (eventType === ccui.Widget.TOUCH_ENDED) {
        //         h1global.curUIMgr.createagentroom_ui.show(function () {
        //             h1global.player().getPlayingRoomInfo();
        //         });
        //     }
        // });


		if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            top_panel.setVisible(false);
		}
    },

    init_function_panel:function(){
        var function_panel = ccui.helper.seekWidgetByName(this.rootUINode, "function_panel");
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');

        //公告
        function_panel.getChildByName("notice_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.activity_ui.show();
            }
        });

        //战绩
        function_panel.getChildByName("score_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.record_ui.show();
            }
        });

        //客服
        function_panel.getChildByName("customerservice_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                // h1global.curUIMgr.customerservice_ui.show();
                h1global.curUIMgr.cs_ui.show();
            }
        });

        //玩法
        function_panel.getChildByName("intro_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.help_ui.show_by_info();
            }
        });

        //设置
        function_panel.getChildByName("config_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.config_ui.show();
            }
        });

        // //分享
        // function_panel.getChildByName("share_btn").addTouchEventListener(function(sender, eventType){
        //     if(eventType == ccui.Widget.TOUCH_ENDED){
        //         h1global.curUIMgr.gamehallshare_ui.show();
        //     }
        // });

        // //获取
        // function_panel.getChildByName("obtain_btn").addTouchEventListener(function(sender, eventType){
        //     if(eventType == ccui.Widget.TOUCH_ENDED){
        //         if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
        //             h1global.curUIMgr.shop_ui.show();
        //         } else {
        //             h1global.curUIMgr.obtain_ui.show();
        //         }
        //     }
        // });


        if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            function_panel.getChildByName("customerservice_btn").setVisible(false);
            // function_panel.getChildByName("notice_btn").setPositionX(function_panel.getContentSize().width * 0.18);
            function_panel.getChildByName("score_btn").setPositionX(function_panel.getContentSize().width * 0.39);
            function_panel.getChildByName("intro_btn").setPositionX(function_panel.getContentSize().width * 0.51);
            // function_panel.getChildByName("config_btn").setPositionX(function_panel.getContentSize().width * 0.82);
		}
	},

    init_game_panel:function(){
        var game_panel = ccui.helper.seekWidgetByName(this.rootUINode, "game_panel");

        var create_club_btn = game_panel.getChildByName("create_club_btn");
        function create_club_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if (h1global.player().isAgent !== 1) {
                    h1global.globalUIMgr.info_ui.show_by_info("您不是代理，不能创建茶楼");
                    return;
                }
                if(h1global.player().club_entity_list.length >= const_val.CLUB_NUM_LIMIT){
                    if(h1global.globalUIMgr.info_ui && !h1global.globalUIMgr.info_ui.is_show){
                        h1global.globalUIMgr.info_ui.show_by_info("加入茶楼数量已达到上限");
                    }
                } else {
                    if(h1global.curUIMgr.createclub_ui && !h1global.curUIMgr.createclub_ui.is_show){
                        h1global.curUIMgr.createclub_ui.show()
                        let player = h1global.entityManager.player();
                        if (player) {
                            player.upLocationInfo();
                        } else {
                            cc.log('player undefined');
                        }
                    }
                }
            }
        }
        create_club_btn.addTouchEventListener(create_club_btn_event);

        var join_club_btn = game_panel.getChildByName("join_club_btn");
        function join_club_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if(h1global.curUIMgr.joinclub_ui && !h1global.curUIMgr.joinclub_ui.is_show){
                    h1global.curUIMgr.joinclub_ui.show();
                    let player = h1global.entityManager.player();
                    if (player) {
                        player.upLocationInfo();
                    } else {
                        cc.log('player undefined');
                    }
                }
            }
        }
        join_club_btn.addTouchEventListener(join_club_btn_event);

        var create_room_btn = game_panel.getChildByName("create_room_btn");
        function create_room_btn_event(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.createroom_ui.show();
                let player = h1global.player();
                if (player) {
                    player.upLocationInfo();
                } else {
                    cc.log('player undefined');
                }
            }
        }
        create_room_btn.addTouchEventListener(create_room_btn_event);

        var join_room_btn = game_panel.getChildByName("join_room_btn");
        function join_room_btn_event(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.joinroom_ui.show();
                let player = h1global.player();
                if (player) {
                    player.upLocationInfo();
                } else {
                    cc.log('player undefined');
                }
            }
        }
        join_room_btn.addTouchEventListener(join_room_btn_event);
    },
});