var GPSUI = UIBase.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/GPSUI.json";
    },

    initUI:function(){
        if(h1global.curUIMgr.gameplayerinfo_ui && h1global.curUIMgr.gameplayerinfo_ui.is_show){
            h1global.curUIMgr.gameplayerinfo_ui.hide();
        }
        this.gps_panel = this.rootUINode.getChildByName("gps_panel");
        var player = h1global.player();
        var self = this;
        var scanning_img = this.gps_panel.getChildByName("scanning_img");
        scanning_img.runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.RotateTo.create(2,720)
        )));
        for(var i = 0 ; i < player.curGameRoom.player_num ; i++){
            var flash_point_img = this.gps_panel.getChildByName("flash_point_img_" + i.toString());
            flash_point_img.runAction(cc.RepeatForever.create(cc.Sequence.create(
                    cc.FadeIn.create(0.5 + i * 0.1),
                    cc.FadeOut.create(0.5)
                ))
            );
        }
        this.check_list = ["系统防作弊检测开始","玩家IP地址检测中...","玩家定位距离检测中..."];
        this.check_idx = 0;
        var detect_label = this.gps_panel.getChildByName("detect_label");
        detect_label.setString(this.check_list[this.check_idx]);
        detect_label.setPosition(cc.p(detect_label.getPositionX(),this.gps_panel.getContentSize().height * 0.26));
        this.runAction(cc.Sequence.create(
            cc.DelayTime.create(0.2),
            cc.CallFunc.create(function () {
                self.update_detect_label(detect_label);
            })
        ));
        this.runAction(cc.Sequence.create(
            cc.DelayTime.create(6),
            cc.Spawn.create(
                cc.FadeOut.create(0.3),
                cc.ScaleTo.create(0.3,0.01)
            ),
            cc.CallFunc.create(function () {
                self.hide();
                if(h1global.curUIMgr.gameroom3d_ui && h1global.curUIMgr.gameroom2d_ui){
                    h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "hide");
                    h1global.curUIMgr.showGameRoomUI(function(complete){
                        if(complete){
                            let player2 = h1global.player();
                            if (player2 && player2.startActions["GameRoomUI"]) {
                                player2.startActions["GameRoomUI"]();
                                player2.startActions["GameRoomUI"] = undefined;
                            }
                            h1global.curUIMgr.setGameRoomUI2Top(cc.sys.localStorage.getItem(const_val.GAME_NAME+"GAME_ROOM_UI"))
                        }
                    });
                }
            })
        ));
    },

    update_detect_label:function (detect_label) {
        var self = this;
        detect_label.runAction(cc.Sequence.create(
            cc.Spawn.create(
                cc.FadeIn.create(0.2),
                cc.MoveTo.create(0.2,cc.p(detect_label.getPositionX(),this.gps_panel.getContentSize().height * 0.32))
            ),
            cc.DelayTime.create(1),
            cc.Spawn.create(
                cc.FadeOut.create(0.2),
                cc.MoveTo.create(0.2,cc.p(detect_label.getPositionX(),this.gps_panel.getContentSize().height * 0.39))
            ),
            cc.CallFunc.create(function () {
                detect_label.setPosition(cc.p(detect_label.getPositionX(),self.gps_panel.getContentSize().height * 0.26));
                self.check_idx++;
                if(self.check_idx > 2){
                    self.check_ip_same();
                    if(self.check_idx > 3){
                        detect_label.setString("");
                        // self.update_detect_label(detect_label);
                        detect_label.runAction(cc.Sequence.create(
                            cc.Spawn.create(
                                cc.FadeIn.create(0.3),
                                cc.MoveTo.create(0.3,cc.p(detect_label.getPositionX(),self.gps_panel.getContentSize().height * 0.32))
                            ),
                            cc.DelayTime.create(3),
                            cc.CallFunc.create(function () {
                                detect_label.removeFromParent();
                                return;
                            })
                        ))
                    }else {
                        detect_label.removeFromParent();
                        return;
                    }
                    return;
                }
                detect_label.setString(self.check_list[self.check_idx]);
                self.update_detect_label(detect_label);
                return;
            })
        ));
    },

    check_ip_same:function () {
        var player = h1global.player();
        cc.log("player:",player);
        var self = this;
        var playerInfoList = player.curGameRoom.playerInfoList;
        var ip_list = [];
        var idx_ip_list = [];
        var distance_list = player.curGameRoom.playerDistanceList;
        var idx_distance_list = [];
        for(var i = 0 ; i < player.curGameRoom.player_num ; i++) {
            if(i == player.serverSitNum){
                ip_list.push("0");
            }else{
                ip_list.push(playerInfoList[i]["ip"]);
            }
        }
        for(var i = 0 ; i < ip_list.length ; i++){
            for(var j = 0 ; j < ip_list.length ; j++){
                if(i == j){continue;}
                if(ip_list[i] == ip_list[j]){
                    if(idx_ip_list.indexOf(i) < 0){idx_ip_list.push(i);}
                    if(idx_ip_list.indexOf(j) < 0){idx_ip_list.push(j);}
                }
            }
        }
        for(var i = 0 ; i < distance_list.length ; i++){
            for(var j = 0 ; j < distance_list.length ; j++){
                if(i == j || i == player.serverSitNum || j == player.serverSitNum) {continue;}
                if(distance_list[i][j] < 100 && distance_list[i][j] >= 0){
                    if(idx_distance_list.indexOf(i) < 0){idx_distance_list.push(i);}
                    if(idx_distance_list.indexOf(j) < 0){idx_distance_list.push(j);}
                }
            }
        }
        cc.log("ip_list:",ip_list);
        cc.log("idx_ip_list:",idx_ip_list);
        cc.log("distance_list:",distance_list);
        cc.log("idx_distance_list:",idx_distance_list);
        if(idx_ip_list.length == 0 && idx_distance_list == 0){
            self.check_idx ++;
        }
        if (idx_ip_list.length > 3 || idx_distance_list.length > 3){
            for(var i = 0 ; i < idx_ip_list.length ; i++) {
                if (idx_ip_list[i] == player.serverSitNum) {
                    idx_ip_list.splice(i,1);
                }
            }
            for(var i = 0 ; i < idx_distance_list.length ; i++) {
                if (idx_distance_list[i] == player.serverSitNum) {
                    idx_distance_list.splice(i,1);
                }
            }
        }
        for(let i = 0 ; i < idx_ip_list.length ; i++){
            cutil.loadPortraitTexture(playerInfoList[idx_ip_list[i]]["head_icon"], playerInfoList[idx_ip_list[i]]["sex"], function(img){
                if(h1global.curUIMgr.gps_ui && h1global.curUIMgr.gps_ui.is_show){
                    // self.gps_panel.getChildByName("portrait_sprite_ip_"+ i.toString()).setVisible(true);
                    var portrait_sprite  = new cc.Sprite(img);
                    portrait_sprite.setName("portrait_sprite_ip_"+ i.toString());
                    // portrait_sprite.setScale(50/portrait_sprite.getContentSize().width);
                    portrait_sprite.setScale(0.001);
                    portrait_sprite.x = self.gps_panel.getContentSize().width * (0.19 + 0.15 * i + idx_ip_list.length % 3 * 0.05);
                    portrait_sprite.y = self.gps_panel.getContentSize().height * 0.39;
                    portrait_sprite.setVisible(true);
                    self.gps_panel.addChild(portrait_sprite);
                    portrait_sprite.runAction(cc.Sequence.create(
                        cc.DelayTime.create(0.1 * i),
                        // cc.ScaleTo.create(0.5,50/portrait_sprite.getContentSize().width),
                        cc.EaseIn.create(cc.scaleTo(0.5, 50/portrait_sprite.getContentSize().width), 0.3),
                        cc.CallFunc.create(function () {
                            cc.log("portrait_sprite  true!");
                        })
                    ));
                }
            });
            self.gps_panel.getChildByName("ip_label").setVisible(true);
        }

        for(var i = 0 ; i < idx_distance_list.length ; i++){
            cutil.loadPortraitTexture(playerInfoList[idx_distance_list[i]]["head_icon"], playerInfoList[idx_distance_list[i]]["sex"], function(img){
                if(h1global.curUIMgr.gps_ui && h1global.curUIMgr.gps_ui.is_show){
                    // self.gps_panel.getChildByName("portrait_sprite_ip_"+ i.toString()).setVisible(true);
                    var portrait_sprite  = new cc.Sprite(img);
                    portrait_sprite.setName("portrait_sprite_dt_"+ i.toString());
                    // portrait_sprite.setScale(50/portrait_sprite.getContentSize().width);
                    portrait_sprite.setScale(0.001);
                    portrait_sprite.x = self.gps_panel.getContentSize().width * (0.19 + 0.15 * i + idx_distance_list.length % 3 * 0.05);
                    portrait_sprite.y = self.gps_panel.getContentSize().height * 0.23;
                    portrait_sprite.setVisible(true);
                    self.gps_panel.addChild(portrait_sprite);
                    portrait_sprite.runAction(cc.Sequence.create(
                        cc.DelayTime.create(0.1 * i + 0.1),
                        // cc.ScaleTo.create(0.5,50/portrait_sprite.getContentSize().width),
                        cc.EaseIn.create(cc.scaleTo(0.5, 50/portrait_sprite.getContentSize().width), 0.3),
                        cc.CallFunc.create(function () {
                            cc.log("portrait_sprite  true!");
                        })
                    ));
                }
            });
            self.gps_panel.getChildByName("distance_label").setVisible(true);
        }
    }
});