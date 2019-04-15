var WebViewUI = UIBase.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/WebViewUI.json";
    },

    initUI: function () {
        var self = this;
        var webview_panel = this.rootUINode.getChildByName("webview_panel");
        var return_btn = webview_panel.getChildByName("return_btn");

        return_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.hide();
            }
        });

        var webView = new ccui.WebView();
        webView.setAnchorPoint(0.5, 0);
        webView.setPosition(cc.winSize.width * 0.5, 0);
        webView.setContentSize(cc.winSize.width, cc.winSize.height - 85);
        webView.loadURL("http://www.baidu.com/");
        webview_panel.addChild(webView);
    }
});