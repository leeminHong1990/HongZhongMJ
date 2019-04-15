var UserAgreeUI = UIBase.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/UserAgreeUI.json";
    },

    initUI: function () {
        var self = this;
        var help_panel = this.rootUINode.getChildByName("help_panel");
        var close_btn = help_panel.getChildByName("close_btn");
        var rule_scroll = help_panel.getChildByName("rule_scroll");
        rule_scroll.setVisible(true);

        close_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.hide();
            }
        });
    }
});