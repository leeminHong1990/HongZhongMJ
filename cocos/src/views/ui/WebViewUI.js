var WebViewUI = UIBase.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/WebViewUI.json";
    },

    initUI: function () {
        var self = this;
        this.webview_panel = this.rootUINode.getChildByName("webview_panel");
        var return_btn = this.webview_panel.getChildByName("return_btn");

        return_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.hide();
            }
        });
    },

    show_by_info:function (htmlName) {
        var self = this;
        cutil.lock_ui();
        this.show(function () {
            var webView = new ccui.WebView();
            webView.setAnchorPoint(0.5, 0);
            webView.setPosition(cc.winSize.width * 0.5, 0);
            webView.setContentSize(cc.winSize.width, cc.winSize.height - 80);
            webView.loadURL(htmlName);
            self.webview_panel.addChild(webView);
            cutil.unlock_ui();
        })
    }
});