// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
"use strict";
var CreateRoomUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/CreateRoomUI.json";
        var self = this;
        this.containUISnippets = {
            "CreateRoomSnippet" : new CreateRoomSnippet(function(){return self.rootUINode;})
        };
	},

	initUI:function() {
		this.createroom_panel = this.rootUINode.getChildByName("createroom_panel");
		this.gamename_panel = this.createroom_panel.getChildByName("gamename_panel");
		var self = this;
        var return_btn = this.createroom_panel.getChildByName("return_btn");
        return_btn.hitTest = function (pt) {
        	var size = this.getContentSize();
			var bb = cc.rect(-size.width, -size.height * 0.3, size.width * 3, size.height * 2);
			return cc.rectContainsPoint(bb, this.convertToNodeSpace(pt));
		};
        function return_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.hide();
            }
        }
        return_btn.addTouchEventListener(return_btn_event);
        this.initCreateFunction()
	},

    initCreateFunction:function(){
		var self = this;
		var create_btn = this.gamename_panel.getChildByName("create_btn");

		function create_btn_event(sender, eventType){
			if (eventType == ccui.Widget.TOUCH_ENDED) {
				cutil.lock_ui();

                var parameters = self.containUISnippets["CreateRoomSnippet"].getParameters();
				parameters['room_type'] = const_val.NORMAL_ROOM;
				cc.log("CreateRoom args: ", parameters);
                h1global.player().createRoom(parameters);
                self.hide();
			}
		}
		create_btn.addTouchEventListener(create_btn_event);
	},

	onShow:function () {
    	var self = this;
		self.containUISnippets["CreateRoomSnippet"].updateRoomType(const_val.NORMAL_ROOM);
	}
});