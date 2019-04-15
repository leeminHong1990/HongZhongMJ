// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
"use strict"
var GamePlayerInfoUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/PlayerInfoUI.json";
	},

	initUI:function() {
        var self = this;
        this.gameplayerinfo_panel = this.rootUINode.getChildByName("gameplayerinfo_panel");
        if(cc.director.getRunningScene().constructor == GameHallScene){
            BasicDialogUI.addColorMask(this.rootUINode , undefined, function () {
                self.hide();
            }, cc.color(255,255,255,0));
        }

        this.posx_list = [[0.305,0.435,0.565,0.695],[0.09,0.91,0.73,0.09]];
        this.posy_list = [[0.82,0.82,0.82,0.82],[0.21,0.50,1,0.50]];
        this.anchor_list = [[0,1,1,0], [0,0,1,0]];
	},

	show_by_info:function(info_dict, serverSitNum){
	    var idx = serverSitNum >= 10 ? serverSitNum : h1global.player().server2CurSitNum(serverSitNum);
		var self = this;
        this.show(function(){
        	cc.log("info_dict:",info_dict);
        	cc.log("idx:",idx);
            self.rootUINode.getChildByName("playerinfo_panel").setVisible(false);
            self.rootUINode.getChildByName("gameselfplayerinfo_panel").setVisible(false);
            self.rootUINode.getChildByName("gameplayerinfo_panel").setVisible(false);
            self.rootUINode.getChildByName("prepareplayerinfo_panel").setVisible(false);
            if(idx >= 10){
                self.gameplayerinfo_panel = self.rootUINode.getChildByName("prepareplayerinfo_panel");
			}else {
                self.gameplayerinfo_panel = self.rootUINode.getChildByName("gameplayerinfo_panel");
			}
            if(self.gameplayerinfo_panel.getName() == "prepareplayerinfo_panel"){
            	for(var i = 0 ; i < 4 ; i++ ){
            		if(i == idx - 10){
            		    var curSitNum = h1global.player().server2CurSitNum(i);
            		    if(h1global.player().curGameRoom.curRound > 0){
                            self.gameplayerinfo_panel.setAnchorPoint(self.anchor_list[0][curSitNum], self.anchor_list[1][curSitNum]);
                            self.gameplayerinfo_panel.setPosition(cc.p(self.getContentSize().width * self.posx_list[1][curSitNum], self.getContentSize().height * self.posy_list[1][curSitNum]));
                        }else {
                            self.gameplayerinfo_panel.setPosition(cc.p(self.getContentSize().width * self.posx_list[0][i], self.getContentSize().height * self.posy_list[0][i]));
                        }
					}
				}
			}else {
            	if(idx == 0){self.gameplayerinfo_panel = self.rootUINode.getChildByName("gameselfplayerinfo_panel");}
                for(var i = 0 ; i < 4 ; i++ ){
                    if(i == idx){
                        self.gameplayerinfo_panel.setAnchorPoint(self.anchor_list[0][i], self.anchor_list[1][i]);
                        self.gameplayerinfo_panel.setPosition(cc.p(self.getContentSize().width * self.posx_list[1][i], self.getContentSize().height * self.posy_list[1][i]));
                    }
                }
			}
            self.gameplayerinfo_panel.setVisible(true);
            var player = h1global.player();
            var distance = parseInt(player.curGameRoom.playerDistanceList[player.serverSitNum][serverSitNum >= 10 ? serverSitNum - 10 : serverSitNum]);
            cc.log("playerinfo distance:",distance);
            if(idx >= 10){
                self.gameplayerinfo_panel.getChildByName("distance_label").setVisible(idx - 10 == player.serverSitNum ? false : true);
                self.gameplayerinfo_panel.getChildByName("distance_label").setString("距离：" + (distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "未知"));
			}else if(idx != 0){
                cutil.loadPortraitTexture(info_dict["head_icon"], info_dict["sex"], function(img){
                    if(h1global.curUIMgr.gameplayerinfo_ui && h1global.curUIMgr.gameplayerinfo_ui.is_show){
                        h1global.curUIMgr.gameplayerinfo_ui.rootUINode.getChildByName("gameplayerinfo_panel").getChildByName("portrait_sprite").removeFromParent();
                        var portrait_sprite  = new cc.Sprite(img);
                        portrait_sprite.setName("portrait_sprite");
                        portrait_sprite.setScale(100/portrait_sprite.getContentSize().width);
                        portrait_sprite.x = self.gameplayerinfo_panel.getContentSize().width * 0.16;
                        portrait_sprite.y = self.gameplayerinfo_panel.getContentSize().height * 0.72;
                        h1global.curUIMgr.gameplayerinfo_ui.rootUINode.getChildByName("gameplayerinfo_panel").addChild(portrait_sprite);
                    }
                });
                self.init_expression_action(serverSitNum);
                self.gameplayerinfo_panel.getChildByName("distance_label").setString("距离：" + (distance !== -1 ? (distance > 1000 ? parseInt(distance / 1000) + "k" : distance) + "m" : "未知"));
			}

			var ip_label = self.gameplayerinfo_panel.getChildByName("ip_label");
			if(info_dict["ip"]){
				ip_label.setString("IP:" + info_dict["ip"]);
				ip_label.setVisible(true);
			} else {
				ip_label.setVisible(false);
			}

			self.gameplayerinfo_panel.getChildByName("id_label").setString("ID: " + info_dict["userId"].toString());
			self.gameplayerinfo_panel.getChildByName("gps_label").setString(info_dict["location"] ? info_dict["location"].toString() : "未获得");
            self.gameplayerinfo_panel.runAction(cc.Sequence.create(
                cc.DelayTime.create(5.0),
                cc.CallFunc.create(function () {
                    self.hide();
                })
            ));
		});
	},

    init_expression_action : function(idx){
        var self = this;
        this.expression_list = [];
        for(var i = 0 ; i < const_val.EXPRESSION_ANIM_LIST.length ; i++) {
            var expression = this.rootUINode.getChildByName("gameplayerinfo_panel").getChildByName("expression_img_" + i.toString());
            this.expression_list.push(expression);
            expression.setTouchEnabled(true);
            expression.addTouchEventListener(expression_event);
        }
        function expression_event(sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED) {
                for(var j = 0 ; j < self.expression_list.length ; j ++) {
                    if(sender == self.expression_list[j]) {
                        var player = h1global.player();
                        player.sendExpression(player.serverSitNum, idx, j);
                        self.hide();
                    }
                }
            }
        }
    },
});