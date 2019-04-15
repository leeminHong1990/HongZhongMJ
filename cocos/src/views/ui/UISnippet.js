var UISnippet = cc.Class.extend({
	ctor:function(rootUINodeRet) {
		this.rootUINode = null;
		this.rootUINodeRet = rootUINodeRet;
	},

	loadRootUINode:function(){
		this.rootUINode = this.rootUINodeRet();
	},

	initUI:function() {

	},

	onShow:function(){

	},

	onHide:function(){

	}
});