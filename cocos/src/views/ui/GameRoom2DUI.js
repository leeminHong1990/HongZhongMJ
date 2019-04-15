"use strict"

var GameRoom2DUI = GameRoomUI.extend({
    className: "GameRoom2DUI",
    uiType: const_val.GAME_ROOM_2D_UI,
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/GameRoom2DUI.json";
    },
    init_discard_tile_anim_img: function () {
        this._super();
        this.discard_tile_anim_img.setAnchorPoint(0, 0);
        // this.discard_tile_anim_img.scale = 0.8;
        var mahjong_img = this.discard_tile_anim_img.getChildByName("mahjong_img");
        mahjong_img.setPosition(45,48);
        var cur_player_tile_panel = this.rootUINode.getChildByName("player_tile_panel0");
        // this.discard_tile_anim_img.setOrderOfArrival(cur_player_tile_panel.getOrderOfArrival() - 1);

    },
    load_discard_tile_anim_img: function (tile_img) {
        tile_img.loadTexture("Mahjong2D/mahjong_tile_player_hand.png", ccui.Widget.PLIST_TEXTURE);
    },

    init_curplayer_panel_direction:function(){
        var player = h1global.player();
        var curServerSitNum = (player.serverSitNum - player.curGameRoom.dealerIdx + 4) % 4;
        var player_panel = this.cur_player_panel.getChildByName("player_panel");
        player_panel.setRotation((90 * curServerSitNum) % 360);
    },

    update_curplayer_panel: function (serverSitNum) {
        if (!this.is_show) { return; }
        var player = h1global.player();
        var player_panel = this.cur_player_panel.getChildByName("player_panel");
        var curServerSitNum = (serverSitNum - player.curGameRoom.dealerIdx + 4) % 4;

        for (var i = 0; i < 4; i++) {
            var direct_img = player_panel.getChildByName("direct_img" + i.toString());
            if (i == curServerSitNum) {
                direct_img.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.FadeIn.create(1.0), cc.FadeOut.create(1.0))));
                direct_img.setVisible(true);
            } else {
                direct_img.stopAllActions();
                direct_img.setVisible(false);
            }
        }
    },

    getHandTileConfig:function(){
        var config = {};
        config.tile_width   = 92;
        config.tile_height  = 122;
        config.real_width   = 84;
        config.real_height  = 118;
        config.bottom_height = 3;
        config.sel_posy     = 30;
        return config;
    },

    get_update_player_hand_tiles_config:function(index){
        if (!this.cacheHandTilesOptions) {
            this.cacheHandTilesOptions=[];
        }
        if (this.cacheHandTilesOptions[index]) {
            return this.cacheHandTilesOptions[index];
        }
        var options = {};
        if(index == 0){
            options.tilePanelOffsetFunc = function(tileCount , panel){
                panel.setPositionX(tileCount * (84 * 3 - 5));
            };
            options.tilePanelDownOffsetFunc = function(tileCount , panel){
                panel.setPositionX(tileCount * (84 * 3 - 5));
            };

            options.mahjongHandImgPath = "Mahjong2D/mahjong_tile_player_hand.png";
            options.mahjongTxtImgPath ="Mahjong/mahjong_big_%d.png";
            options.mahjongDownImgPath ="Mahjong2D/mahjong_tile_down.png";

            options.tilePositionFunc = function(tile_img,i){
                tile_img.setPositionX(84 *i-3);
            };
            options.tileDownPositionFunc = function(tile_img , i) {
                tile_img.setPositionX(84 *i-3);
            };

            options.kingtilemark ={};
            options.kingtilemark.anchorPoint = cc.p(0,1);
            options.kingtilemark.position = cc.p(0, 90);
            options.kingtilemark.scale = 0.7;

            options.draw = {};
            options.draw.offset = cc.p(20,0);
            options.draw.animFrom = cc.p(0,20);
            options.draw.animTo = cc.p(0,-20);
        }else if(index == 1){
            let p1 = [0, 32 * 4, 32 * 4 * 2 - 15, 32 * 4 * 3 - 30, 32 * 4 * 4 - 60];
            options.tilePanelOffsetFunc = function(tileCount , panel){
                panel.setPositionY(p1[tileCount]);
            };
            let p2 = [0, 32 * 4, 32 * 4 * 2 - 15, 32 * 4 * 3 - 30, 32 * 4 * 4 - 60];
            options.tilePanelDownOffsetFunc = function(tileCount , panel){
                panel.setPositionY(p2[tileCount]);
                panel.setPositionX(panel.editorOrigin.x + 5);
            };
            options.tileDownPositionFunc = function(tile_img , i) {
                tile_img.setPositionY(35 *i);
            };

            options.mahjongHandImgPath = "Mahjong2D/mahjong_tile_side_hand.png";
            options.mahjongUpImgPath = "Mahjong2D/mahjong_tile_side_desk.png";
            options.mahjongDownImgPath ="Mahjong2D/mahjong_tile_side_down.png";
            options.mahjongTxtImgPath ="Mahjong/mahjong_small_%d.png";

            options.tilePositionFunc = function(tile_img,i){
                tile_img.setPositionY(32 *i);
            };

            options.kingtilemark ={};
            options.kingtilemark.anchorPoint = cc.p(0,1);
            options.kingtilemark.position = cc.p(20, 20);
            options.kingtilemark.rotate = -90;
            options.kingtilemark.scale = 0.4;

            options.draw = {};
            options.draw.offset = cc.p(0,10);
            options.draw.animFrom = cc.p(0,10);
            options.draw.animTo = cc.p(0,-10);
        }else if(index == 2){
            options.tilePanelOffsetFunc = function(tileCount , panel){
                panel.setPositionX(703 - tileCount * (84 * 3 + 12) * 0.5);
            };
            options.tilePanelDownOffsetFunc = function(tileCount , panel){
                panel.setPositionX(713 - tileCount * (84 * 3 + 12) * 0.5);
            };
            options.mahjongDownImgPath ="Mahjong2D/mahjong_tile_down.png";
            options.mahjongHandImgPath = "Mahjong2D/mahjong_tile_top_hand.png";
            options.mahjongUpImgPath = "Mahjong2D/mahjong_tile_player_desk.png";
            options.mahjongTxtImgPath ="Mahjong/mahjong_small_%d.png";

            options.tilePositionFunc = function(tile_img,i){
                tile_img.setPositionX(1092 - 84 * i);
            };
            options.tileDownPositionFunc = function(tile_img , i) {
                tile_img.setPositionX(1092 - 78 * i);
            };

            options.kingtilemark ={};
            options.kingtilemark.anchorPoint = cc.p(0,1);
            options.kingtilemark.position = cc.p(40, 14);
            options.kingtilemark.rotate = 180;
            options.kingtilemark.scale = 0.4;

            options.draw = {};
            options.draw.offset = cc.p(-20,0);
            options.draw.animFrom = cc.p(0,10);
            options.draw.animTo = cc.p(0,-10);
        }else if(index  == 3){
            options.tilePanelOffsetFunc = function(tileCount , panel){
                panel.setPositionY(520 - tileCount * (42 * 2 + 10));
            };

            let p2 = [0, (42 * 2 + 15), (42 * 2 + 15) * 2 + 10, 32 * 4 * 3 - 60, 32 * 4 * 4 - 80];
            options.tilePanelDownOffsetFunc = function (tileCount, panel) {
                panel.setPositionY(550 - p2[tileCount]);
            };
            options.mahjongHandImgPath = "Mahjong2D/mahjong_tile_side_hand.png";
            options.mahjongUpImgPath = "Mahjong2D/mahjong_tile_side_desk.png";
            options.mahjongDownImgPath ="Mahjong2D/mahjong_tile_side_down.png";
            options.mahjongTxtImgPath ="Mahjong/mahjong_small_%d.png";

            options.tilePositionFunc = function(tile_img,i){
                tile_img.setPositionY(390 - 32 * i);
            };
            options.tileDownPositionFunc = function(tile_img , i) {
                tile_img.setPositionY(390 - 35 * i);
            };
            options.kingtilemark ={};
            options.kingtilemark.anchorPoint = cc.p(0,1);
            options.kingtilemark.position = cc.p(68, 56);
            options.kingtilemark.rotate = 90;
            options.kingtilemark.scale = 0.4;

            options.draw = {};
            options.draw.offset = cc.p(0,-10);
            options.draw.animFrom = cc.p(0,10);
            options.draw.animTo = cc.p(0,-10);
        }else{
            cc.error("not support index", index);
        }
        this.cacheHandTilesOptions[index] = options;
        return options;
    },

    get_update_player_exposed_tiles_config: function (index) {
        var options = {};
        options.mahjongTxtImgPath = "Mahjong2D/mahjong_tile_player_up.png";
        options.mahjongTxtImgPath = "Mahjong/mahjong_big_%d.png";

        if (index === 0) {
            options.tilePositionFunc = function (tile_img, i) {
                tile_img.setPositionX(78 * i);
            };
            options.tilePanelOffsetFunc = function (tileCount, panel) {
                panel.setPositionX(panel.editorOrigin.x + tileCount * (84 * 3) + 15);
            };
            options.mahjongTxtImgPath = "Mahjong/mahjong_big_%d.png";

            options.draw = {};
            options.draw.offset = cc.p(20,0);
            options.draw.animFrom = cc.p(0,20);
            options.draw.animTo = cc.p(0,-20);
        } else if (index === 1) {
            options.tilePositionFunc = function (tile_img, i) {
                tile_img.setPositionY(37 * i);
            };
            options.tilePanelOffsetFunc = function (tileCount, panel) {
                panel.setPositionY(panel.editorOrigin.y + tileCount * (37 * 3) + 15);
            };
            options.mahjongTxtImgPath = "Mahjong/mahjong_small_%d.png";

            options.draw = {};
            options.draw.offset = cc.p(0,10);
            options.draw.animFrom = cc.p(0,10);
            options.draw.animTo = cc.p(0,-10);
        } else if (index === 2) {
            options.tilePositionFunc = function (tile_img, i) {
                tile_img.setPositionX(486 - 42 * i);
            };
            options.tilePanelOffsetFunc = function (tileCount, panel) {
                panel.setPositionX(panel.editorOrigin.x - tileCount * (42 * 3) - 12);
            };
            options.mahjongTxtImgPath = "Mahjong/mahjong_small_%d.png";

            options.draw = {};
            options.draw.offset = cc.p(-20,0);
            options.draw.animFrom = cc.p(0,10);
            options.draw.animTo = cc.p(0,-10);
        } else if (index === 3) {
            options.tilePositionFunc = function (tile_img, i) {
                tile_img.setPositionY(37 * (14 - i));
            };
            options.tilePanelOffsetFunc = function (tileCount, panel) {
                panel.setPositionY(panel.editorOrigin.y - tileCount * (37 * 3) - 37);
            };
            options.mahjongTxtImgPath = "Mahjong/mahjong_small_%d.png";

            options.draw = {};
            options.draw.offset = cc.p(0,-10);
            options.draw.animFrom = cc.p(0,10);
            options.draw.animTo = cc.p(0,-10);
        } else {
            cc.error("not support index", index);
        }
        return options;
    },

    get_update_player_up_tiles_config:function(index){
        if (!this.cacheUpTilesOptions) {
            this.cacheUpTilesOptions=[];
        }
        if (this.cacheUpTilesOptions[index]) {
            return this.cacheUpTilesOptions[index];
        }
        var options = {};
        if(index == 0){
            options.mahjongUpImgPath = "Mahjong2D/mahjong_tile_player_up.png";
            options.mahjongDownImgPath = "Mahjong2D/mahjong_tile_down.png";
            options.mahjongUpKongImgPath = options.mahjongUpImgPath;
            options.mahjongDownKongImgPath = options.mahjongDownImgPath;
            options.mahjongTxtPath = "Mahjong/mahjong_big_%d.png";

            options.kongArrowOffset = cc.p(0,28);

            options.kongTileUpOffset = cc.p(0,23); //明杠
            options.kongTileDownOffset = cc.p(0,32); //暗杠

            options.kingtilemark ={};
            options.kingtilemark.anchorPoint = cc.p(0,1);
            options.kingtilemark.position = cc.p(0, 60);
            options.kingtilemark.scale = 0.46;

        }else if(index == 1){
            options.mahjongUpImgPath = "Mahjong2D/mahjong_tile_side_desk.png";
            options.mahjongDownImgPath = "Mahjong2D/mahjong_tile_side_down.png";
            options.mahjongTxtPath = "Mahjong/mahjong_small_%d.png";
            options.mahjongUpKongImgPath = options.mahjongUpImgPath;
            options.mahjongDownKongImgPath = options.mahjongDownImgPath;

            options.kingtilemark ={};
            options.kingtilemark.anchorPoint = cc.p(0,1);
            options.kingtilemark.position = cc.p(20, 20);
            options.kingtilemark.scale = 0.4;
            options.kingtilemark.rotate = -90;

            options.kongArrowOffset = cc.p(0,12);

            options.kongTileUpOffset = cc.p(0,12); //明杠
            options.kongTileDownOffset = cc.p(0,12); //暗杠

            options.upPanelOffset = cc.p(0,5)
            options.upPanelOffsetFunc = function(upCount, originPosition){
                return cc.p(originPosition.x, -5*upCount);
            }
        }else if(index == 2){
            options.mahjongUpImgPath = "Mahjong2D/mahjong_tile_player_desk.png";
            options.mahjongDownImgPath = "Mahjong2D/mahjong_tile_down.png";
            options.mahjongTxtPath = "Mahjong/mahjong_small_%d.png";
            options.mahjongUpKongImgPath = options.mahjongUpImgPath;
            options.mahjongDownKongImgPath = options.mahjongDownImgPath;

            options.kingtilemark ={};
            options.kingtilemark.anchorPoint = cc.p(0,1);
            options.kingtilemark.position = cc.p(40, 14);
            options.kingtilemark.scale = 0.4;
            options.kingtilemark.rotate = 180;

            options.kongArrowOffset = cc.p(0,16);

            options.kongTileUpOffset = cc.p(0,13); //明杠
            options.kongTileDownOffset = cc.p(0,16); //暗杠

            options.upPanelOffsetFunc = function(upCount, originPosition){
                return cc.p(703 + upCount * 5 , originPosition.y)
            }
        }else if(index == 3){
            options.mahjongUpImgPath = "Mahjong2D/mahjong_tile_side_desk.png";
            options.mahjongDownImgPath = "Mahjong2D/mahjong_tile_side_down.png";
            options.mahjongTxtPath = "Mahjong/mahjong_small_%d.png";
            options.mahjongUpKongImgPath = options.mahjongUpImgPath;
            options.mahjongDownKongImgPath = options.mahjongDownImgPath;

            options.kingtilemark ={};
            options.kingtilemark.anchorPoint = cc.p(0,1);
            options.kingtilemark.position = cc.p(68, 56);
            options.kingtilemark.scale = 0.4;
            options.kingtilemark.rotate = 90;

            options.kongArrowOffset = cc.p(0,12);

            options.kongTileUpOffset = cc.p(0,12); //明杠
            options.kongTileDownOffset = cc.p(0,12); //暗杠
            options.upPanelOffsetFunc = function(upCount, originPosition){
                return cc.p(originPosition.x,555 + upCount * 5)
            }
        }else{
            cc.error("not support index", index);
        }
        this.cacheUpTilesOptions[index] = options;
        return options
    },

    get_play_discard_anim_config: function (serverSitNum, index, onlyTilePointer) {
        var cur_player_hand_panel = this.rootUINode.getChildByName("player_tile_panel" + index.toString()).getChildByName("player_hand_panel");

        var player = h1global.player();
        var handTilesList = player.curGameRoom.handTilesList[serverSitNum]

        var options = {};
        options.pointerScale = 0.8
        var discardTileIdx = player.curGameRoom.discardTilesList[serverSitNum].length;
        if(discardTileIdx > const_val.MAX_DISCARD_TILES_SIZE){
            discardTileIdx = Math.min(discardTileIdx , const_val.MAX_DISCARD_TILES_SIZE);
        }
        discardTileIdx = Math.max(0 , --discardTileIdx);
        var cur_player_discard_panel = this.game_info_panel.getChildByName("player_discard_panel" + index);
        var cur_discard_tile_img = cur_player_discard_panel.getChildByName("tile_img_" + discardTileIdx);
        var cur_discard_tile_position = cur_discard_tile_img.getPosition();
        var cur_hand_tile_position = undefined

        if (index == 0) {
            options.pointerPosition = cc.p(26, 68);
            if (!onlyTilePointer) {
                // if(this.lastDiscardPosition == undefined){
                //     cur_hand_tile_position = cur_player_hand_panel.convertToWorldSpace(cc.p(84 * handTilesList.length ,0));
                // }else{
                //     cur_hand_tile_position = this.lastDiscardPosition;
                // }
                cur_hand_tile_position = cc.p(cc.winSize.width * 0.46, cc.winSize.height * 0.25);
                cur_discard_tile_position.x = cur_discard_tile_position.x - cur_discard_tile_img.anchorX * cur_discard_tile_img.width + 5;
                cur_discard_tile_position.y = cur_discard_tile_position.y - cur_discard_tile_img.anchorY * cur_discard_tile_img.height + 10;
                cur_discard_tile_position = cur_player_discard_panel.convertToWorldSpace(cur_discard_tile_position);
            }
        } else if (index == 1) {
            options.pointerPosition = cc.p(30, 56);
            if (!onlyTilePointer) {
                cur_hand_tile_position = cc.p(cc.winSize.width * 0.6, cc.winSize.height * 0.46);
                cur_discard_tile_position = cur_player_discard_panel.convertToWorldSpace(cur_discard_tile_position);
            }
        } else if (index == 2) {
            options.pointerPosition = cc.p(26, 60);
            if (!onlyTilePointer) {
                cur_hand_tile_position = cc.p(cc.winSize.width * 0.46, cc.winSize.height * 0.65);
                cur_discard_tile_position.x = cur_discard_tile_position.x - cur_discard_tile_img.anchorX * cur_discard_tile_img.width + 50;
                cur_discard_tile_position.y = cur_discard_tile_position.y - cur_discard_tile_img.anchorY * cur_discard_tile_img.height + 10;
                cur_discard_tile_position = cur_player_discard_panel.convertToWorldSpace(cur_discard_tile_position);
            }
        } else if (index == 3) {
            options.pointerPosition = cc.p(30, 56);
            if (!onlyTilePointer) {
                cur_hand_tile_position = cc.p(cc.winSize.width * 0.3, cc.winSize.height * 0.46);
                cur_discard_tile_position.x = cur_discard_tile_position.x - cur_discard_tile_img.anchorX * cur_discard_tile_img.width;
                cur_discard_tile_position.y = cur_discard_tile_position.y - cur_discard_tile_img.anchorY * cur_discard_tile_img.height;
                cur_discard_tile_position = cur_player_discard_panel.convertToWorldSpace(cur_discard_tile_position);
            }
        }
        if (!onlyTilePointer) {
            options.mahjongTxtPath = "Mahjong/mahjong_big_%d.png";
            options.tileStartPosition = cur_hand_tile_position;
            options.tileEndPosition = cur_discard_tile_position;
        }
        return options;
    },

	get_play_fly_anim_end_time:function () {
		return 0.2;
	},

	play_discard_fly_anim: function (tile_img, discard_tile, start_position, end_position) {
		if (start_position == undefined || end_position == undefined || tile_img == undefined) {
			cc.error("play_discard_fly_anim params error", tile_img, start_position, end_position);
			return;
		}
		discard_tile.setVisible(false);
		tile_img.setPosition(start_position);
		tile_img.setScale(1);
		tile_img.runAction(cc.Spawn.create(
			cc.scaleTo(0.15, 0.8, 0.8),
			cc.Sequence.create(
				cc.MoveTo.create(0.15, end_position),
				cc.CallFunc.create(function () {
					tile_img.setVisible(false);
					if (discard_tile.tile_num && discard_tile.tile_num > 0) {
						discard_tile.setVisible(true);
					}
				}))
		));
	},

    get_player_discard_tiles_config: function (index) {
        if(!this.cacheDiscardTilesOptions){
            this.cacheDiscardTilesOptions = [];
        }
        if(this.cacheDiscardTilesOptions[index]){
            return this.cacheDiscardTilesOptions[index];
        }
        var options = {};
        options.mahjongTxtPath = "Mahjong/mahjong_small_%d.png";
        options.kingtilemark = {}
        if (index == 0) {
            options.mahjongDeskImgPath = "Mahjong2D/mahjong_tile_player_desk.png";

            options.kingtilemark.anchorPoint = cc.p(0.0, 1.0);
            options.kingtilemark.position = cc.p(5, 66);
            options.kingtilemark.scale = 0.4;
        } else if (index == 1) {
            options.mahjongDeskImgPath = "Mahjong2D/mahjong_tile_side_desk.png";

            options.kingtilemark.anchorPoint = cc.p(0.0, 1.0);
            options.kingtilemark.position = cc.p(5, 18);
            options.kingtilemark.scale = 0.4;
            options.kingtilemark.rotate = -90;
        } else if (index == 2) {
            options.mahjongDeskImgPath = "Mahjong2D/mahjong_tile_player_desk.png";

            options.kingtilemark.anchorPoint = cc.p(0.0, 1.0);
            options.kingtilemark.position = cc.p(50, 17.5);
            options.kingtilemark.scale = 0.4;
            options.kingtilemark.rotate = 180;
        } else if (index == 3) {
            options.mahjongDeskImgPath = "Mahjong2D/mahjong_tile_side_desk.png";

            options.kingtilemark.anchorPoint = cc.p(0.0, 1.0);
            options.kingtilemark.position = cc.p(61, 58);
            options.kingtilemark.scale = 0.4;
            options.kingtilemark.rotate = 90;
        }
        this.cacheDiscardTilesOptions[index] = options;
        return options;
    },

    get_start_begin_anim_config: function () {
        var options = {};
        options.groupSize = 3;
        options.tileDownImgPaths = [
            "Mahjong2D/mahjong_tile_down.png",
            "Mahjong2D/mahjong_tile_side_down.png",
            "Mahjong2D/mahjong_tile_down.png",
            "Mahjong2D/mahjong_tile_side_down.png"
        ];
        options.downRootNodeScales = [1, 0.95, 0.6, 0.95];
        options.downRootNodeOffsets = [
            cc.p(0, 0), cc.p(0, -30), cc.p(100, 0), cc.p(0, 40)
        ];
        options.downTilePositionFuncs = [
            function (index) {
                return cc.p(76 * index, 0);
            },
            function (index) {
                return cc.p(0, 485 - 38 * index)
            },
            function (index) {
                return cc.p(76 * index, 0)
            },
            function (index) {
                return cc.p(0, 485 - 38 * index)
            }
        ]
        return options;
    },

    adapter_operation_panel: function (panel, editorOrigin, can_win) {
        if (can_win) {
            panel.setPositionX(editorOrigin.x - 20)
        } else {
            panel.setPositionX(editorOrigin.x)
        }
    },
});