// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
var CommunicateUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/CommunicateUI.json";
		this.needReload = false;
		this.setLocalZOrder(const_val.CommunicateZOrder)
	},

	initUI:function(){
		this.communicate_panel = this.rootUINode.getChildByName("communicate_panel");
		this.adapterIME();
		var player = h1global.player();
		var self = this;
		this.rootUINode.getChildByName("bg_panel").addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				self.hide();
			}
		});

		var btn_list = [this.communicate_panel.getChildByName("emot_btn"), this.communicate_panel.getChildByName("voice_btn")];
		var panel_list = [this.communicate_panel.getChildByName("emot_scroll"), this.communicate_panel.getChildByName("voice_scroll")];

		this.cur_tab = UICommonWidget.create_tab(btn_list, panel_list);
        this.communicate_panel.getChildByName("send_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                self.update_send_msg();
                self.hide();
            }
        });
		// 表情
		cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA4444;
        var cache = cc.spriteFrameCache;
        var plist_path = "res/effect/biaoqing.plist";
        var png_path = "res/effect/biaoqing.png";
        cache.addSpriteFrames(plist_path, png_path);
    	cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA8888;

		UICommonWidget.update_scroll_items(panel_list[0], 
			[
				[ 1,  2,  3],
				[ 4,  5,  6],
				[ 7,  8,  9]
			], 
			function(curItem, itemInfo){
				for(var i = 0; i < 3; i++){
					var emot_img = curItem.getChildByName("emot_img" + i.toString());
					if(itemInfo[i]){
						emot_img.setVisible(true);
						emot_img.addTouchEventListener(function(sender, eventType){
							if(eventType == ccui.Widget.TOUCH_ENDED){
								// 发送表情
								player.sendEmotion(sender.num);
								self.hide();
							}
						});
						emot_img.num = itemInfo[i];
						emot_img.loadTexture("Emot/biaoqing_" + itemInfo[i].toString() + "_1.png", ccui.Widget.PLIST_TEXTURE);
					} else {
						emot_img.setVisible(false);
					}
				}
			}
		);
		// 语音文字
		UICommonWidget.update_scroll_items(panel_list[1], 
			const_val.MESSAGE_LIST, 
			function(curItem, itemInfo, idx){
				var bg_img = curItem.getChildByName("bg_img");
				var content_label = curItem.getChildByName("content_label");
				if(idx + 1 < 10){
					content_label.setString(" " + (idx + 1).toString() + "." +itemInfo);
				} else {
					content_label.setString((idx + 1).toString() + "." +itemInfo);
				}
				bg_img.num = idx;
				bg_img.addTouchEventListener(function(sender, eventType){
					if(eventType == ccui.Widget.TOUCH_ENDED){
						// 发送语音文字
						player.sendMsg(sender.num);
						self.hide();
					}
				});
			}
		);
	},

    update_send_msg:function () {
        var player = h1global.player();
        var msg_tf = this.communicate_panel.getChildByName("msg_tf");
        player.sendMsg(-1, msg_tf.getString());
        msg_tf.setString("");
	},
	
	adapterIME: function () {
		if (!(cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)) {
			return;
		}
		if (!cc.sys.isObjectValid(this.communicate_panel)) {
			return;
		}
		this.communicate_panel.getChildByName("msg_tf").addEventListener(function (target, event) {
			if (ccui.TextField.EVENT_DETACH_WITH_IME === event) {
				if (h1global.curUIMgr.communicate_ui && h1global.curUIMgr.communicate_ui.is_show) {
					UICommonWidget.resetToOriginPosition(h1global.curUIMgr.communicate_ui.rootUINode)
				}
			} else if (ccui.TextField.EVENT_ATTACH_WITH_IME === event) {
				if (h1global.curUIMgr.communicate_ui && h1global.curUIMgr.communicate_ui.is_show) {
					UICommonWidget.addOriginPosition(h1global.curUIMgr.communicate_ui.rootUINode, 0, cc.winSize.height * 0.5)
				}
			}
		});
	},

	onShow: function(){
		UICommonWidget.resetToOriginPosition(h1global.curUIMgr.communicate_ui.rootUINode);
	}
});