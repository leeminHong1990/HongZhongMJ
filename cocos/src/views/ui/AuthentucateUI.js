"use strict";
var AuthentucateUI = BasicDialogUI.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/AuthentucateUI.json";
    },

    initUI:function() {
        var self = this;
        this.authentucate_panel = this.rootUINode.getChildByName("authentucate_panel");
        this.authentucate_panel.getChildByName("close_btn").addTouchEventListener(function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                self.hide();
            }
        });

        this.init_panel = this.authentucate_panel.getChildByName("init_panel");
        this.cellphone_panel = this.authentucate_panel.getChildByName("cellphone_panel");
        this.id_panel = this.authentucate_panel.getChildByName("id_panel");
        this.init_panel.setVisible(true);
        this.cellphone_panel.setVisible(false);
        this.id_panel.setVisible(false);
        this.init_panel.getChildByName("cellphone_btn").addTouchEventListener(function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                self.init_panel.setVisible(false);
                self.cellphone_panel.setVisible(true);
            }
        });

        this.init_panel.getChildByName("identification_btn").addTouchEventListener(function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                self.init_panel.setVisible(false);
                self.id_panel.setVisible(true);
            }
        });

        var phone_num_tf = this.cellphone_panel.getChildByName("phone_num_tf");
        //获取验证码
        this.cellphone_panel.getChildByName("verificate_btn").addTouchEventListener(function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                cc.log("verificate_btn");
                var phone_num = phone_num_tf.getString();
                if(phone_num) {
                    //一个粗略的判断手机号的正则表达式
                    if ((/^1[3|4|5|8]\d{9}$/).test(phone_num)) {
                        h1global.globalUIMgr.info_ui.show_by_info("暂未开放！");
                        phone_num_tf.setTouchEnabled(false);
                    } else {
                        h1global.globalUIMgr.info_ui.show_by_info("手机号码错误！");
                        phone_num_tf.setString("");
                    }
                }else {
                    h1global.globalUIMgr.info_ui.show_by_info("手机号码不能为空！");
                }
            }
        });

        //手机验证提交
        this.cellphone_panel.getChildByName("submit_btn").addTouchEventListener(function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                cc.log("cellphone submit_btn");
                h1global.globalUIMgr.info_ui.show_by_info("请获取验证码！");
            }
        });

        var name_tf = this.id_panel.getChildByName("name_tf");
        var id_num_tf = this.id_panel.getChildByName("id_num_tf");
        //身份证验证提交
        this.id_panel.getChildByName("submit_btn").addTouchEventListener(function(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                cc.log("id submit_btn");
                var id_num = id_num_tf.getString();
                var name = name_tf.getString();
                var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");//判断是否为汉字的正则表达式
                if(name && id_num) {
                    if(reg.test(name)) {
                        //一个粗略的判断身份证号的正则表达式
                        if ((/^[1-9]\d{5}(19|20)\d{2}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/).test(id_num)) {
                            h1global.globalUIMgr.info_ui.show_by_info("暂未开放！");
                        } else {
                            h1global.globalUIMgr.info_ui.show_by_info("请输入正确的身份证号码！");
                        }
                    }else {
                        h1global.globalUIMgr.info_ui.show_by_info("姓名不合法！");
                    }
                }else {
                    h1global.globalUIMgr.info_ui.show_by_info("姓名或身份证号不能为空！");
                }
            }
        });
    },
});