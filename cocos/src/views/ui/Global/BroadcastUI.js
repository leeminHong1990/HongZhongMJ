// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
var BroadcastUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/BroadcastUI.json";
		this.defaultContentList = [];
	},

	initUI:function(){
		var broadcast_panel = this.rootUINode.getChildByName("broadcast_panel");
		this.label_panel = broadcast_panel.getChildByName("label_panel");
		this.broadcast_label = this.label_panel.getChildByName("broadcast_label");
	},

	show_default:function(content_list){
		this.hide();
		if(content_list.length > 0){
			this.defaultContentList = content_list;
		}
		if(this.defaultContentList.length > 0){
			var idx = -1;
			var self = this;
			function show_callback(){
				idx = (idx + 1)%self.defaultContentList.length;
				self.show_by_content(self.defaultContentList[idx], show_callback);
			}
			show_callback();
		} else {
			this.hide();
		}
	},

	show_broadcast:function(content, times){
		times = times || 10; // 播放次数，间隔10s
		var self = this;
		function show_callback(){
			if(times > 1 || times < 0){
				times = times < 0?times:times - 1;
				self.show_by_content(content, show_callback);
			} else {
				self.show_default();
			}
		}
		this.show_by_content(content, show_callback);
	},

	show_by_content:function(content, callback){
		this.hide();
		var self = this;
		this.show(function(){
			self.broadcast_label.ignoreContentAdaptWithSize(true);
			self.broadcast_label.setString(content);
			self.broadcast_label.setPositionX(self.label_panel.getContentSize().width);
			self.broadcast_label.stopAllActions();

			var offset = 0 - self.broadcast_label.getContentSize().width;
			// var offset = self.label_panel.getContentSize().width - self.broadcast_label.getContentSize().width;
			self.broadcast_label.runAction(cc.Sequence.create(
				cc.MoveTo.create(-offset * 0.03, cc.p(offset, self.broadcast_label.getPositionY())),
				// cc.DelayTime.create(3.0),
				cc.CallFunc.create(function(){
					self.hide();
					if(callback){
						callback();
					}
				})
			));
		});
	},
});