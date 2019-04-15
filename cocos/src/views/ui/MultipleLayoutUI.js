"use strict";
var MultipleLayoutUI = UIBase.extend({
	ctor: function() {
		this._super();
		this.isOtherLayoutPreloding = false;
		this.hasOtherLayoutLoaded = false;
	},

	// Note: 当存在多个布局同时加载时可能出现问题,调用时需要避免这种情况
	setLayout: function(resourceFilename, callback) {
		if (!this.is_show) return;
		if (resourceFilename == undefined) {
			cc.error("setLayout resourceFilename undefined");
			return;
		}
		if (this.resourceFilename === resourceFilename) {
			cc.warn("setLayout: resourceFilename not change");
			return;
		}
		this.otherLayouts = this.otherLayouts || {};
		if (this.otherLayouts[resourceFilename]) {
			cc.log("use cached layout");
			var rootUINode = this.otherLayouts[resourceFilename];
			this.addChild(rootUINode);
			delete this.otherLayouts[resourceFilename];

			this.otherLayouts[this.resourceFilename] = this.rootUINode;
			this.rootUINode.retain();
			this.rootUINode.removeFromParent(false);

			this.rootUINode = rootUINode;
			this.resourceFilename = resourceFilename;
			this.onLayoutChanged(true);
			if (callback) callback();
			return;
		}

		var self = this;
		this.isOtherLayoutPreloding = true;
		this.hasOtherLayoutLoaded = false;
		cc.loader.load(resourceFilename, function() {
			self.hasOtherLayoutLoaded = true;
			self.isOtherLayoutPreloding = false;

			if (self.is_show === false) {
				cc.log("setLayout: ui is hide");

				if (self.needReload === true) {
					cc.log("setLayout needReload");
					return;
				}
			}

			var rootUINode = ccs.load(resourceFilename).node;

			if (self.is_show === true) {
				self.otherLayouts[self.resourceFilename] = self.rootUINode;
				self.rootUINode.retain();
			}
			self.rootUINode.removeFromParent(false);

			self.resourceFilename = resourceFilename;
			self.rootUINode = rootUINode;
			self.addChild(rootUINode);
			var size = cc.director.getVisibleSize();
			self.rootUINode.setContentSize(size);
			ccui.helper.doLayout(rootUINode);

			cc.log("use layout : ", self.resourceFilename);
			self.onLayoutChanged(false);

			if (callback) callback();
			if (self.otherLayoutPreloadCallback) {
				self.otherLayoutPreloadCallback();
				self.otherLayoutPreloadCallback = undefined;
			}
		});
	},

	onLayoutChanged: function(is_cache) {},

	applyNewLayout: function() {
		if (this.otherLayouts) {
			for (var resourceFilename in this.otherLayouts) {
				this.otherLayouts[resourceFilename].release();
			}
			this.otherLayouts = undefined;
		}
		this.hasOtherLayoutLoaded = false;
		this.isOtherLayoutPreloding = undefined;
	},

	onHide: function() {
		if (this.needReload === true) {
			if (this.otherLayouts) {
				for (var resourceFilename in this.otherLayouts) {
					this.otherLayouts[resourceFilename].release();
				}
				this.otherLayouts = undefined;
			}
			this.hasOtherLayoutLoaded = false;
			this.isOtherLayoutPreloding = undefined;
		}
	}
});
