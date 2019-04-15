"use strict";
var BasicDialogUI = UIBase.extend({

    onShow: function () {
        let self = this;
        BasicDialogUI.addColorMask(this.rootUINode, 0.5, function () {
            self.hide()
        });
        BasicDialogUI.applyShowEffect(this);
    },

});

BasicDialogUI.applyShowEffect = function (node, time, scaleFrom, scaleTo) {
    scaleFrom = scaleFrom || 0.7;
    scaleTo = scaleTo || 1;
    time = time || 0.2;
    if (cc.sys.isObjectValid(node._showEffectAction)) {
        node.stopAction(node._showEffectAction);
    }
    node.setScale(scaleFrom);
    // let action = cc.EaseBounceOut.create(cc.scaleTo(time, scaleTo));
    let action = cc.EaseIn.create(cc.scaleTo(time, scaleTo), 0.3);
    node.runAction(action);
    node._showEffectAction = action;
};

BasicDialogUI.addColorMask = function (node, scale, close_func, color) {
    if (node.getChildByName("show_color_layer")) {
        return;
    }
    scale = scale || 0.5;
    color = color || cc.color(0, 0, 0, 178);
    let w = cc.winSize.width / scale;
    let h = cc.winSize.height / scale;

    let colorLayer = new ccui.Layout(w, h);
    colorLayer.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
    colorLayer.setContentSize(w, h);
    colorLayer.setBackGroundColor(color);
    colorLayer.setBackGroundColorOpacity(color.a);
    // colorLayer.setAnchorPoint(0.5, 0.5);
    colorLayer.setName("show_color_layer");
    colorLayer.setPosition(-cc.winSize.width / 2, -cc.winSize.height / 2);
    colorLayer.setTouchEnabled(true);
    node.addChild(colorLayer, -100);

    if (close_func) {
        colorLayer.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                close_func();
            }
        });
    }

};