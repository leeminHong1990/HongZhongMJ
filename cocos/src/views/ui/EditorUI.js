"use strict";

var EditorUI = UIBase.extend({
   ctor:function () {
       this._super();
       this.resourceFilename = "res/ui/EditorUI.json";
   },

   initUI:function () {

   },

   show_by_info:function (callback_func, prefab_label, max_input) {
       var self = this;
       var prefab_label = prefab_label || "请输入内容";
       // prefab_label += max_input ? "(不超过" + max_input.toString() + "字符)" : "";
       this.show(function () {
            var editor_panel = self.rootUINode.getChildByName("bg_panel").getChildByName("editor_panel");
            var sure_btn = editor_panel.getChildByName("sure_btn");
            var edit_box = editor_panel.getChildByName("edit_box");
            var close_btn = editor_panel.getChildByName("close_btn");
           if(max_input){
               edit_box.setMaxLength(max_input);
               edit_box.setMaxLengthEnabled(true);
           }

           if(prefab_label){
               edit_box.setPlaceHolder(prefab_label);
           }

            function sure_btn_event(sender, eventType) {
                if(eventType === ccui.Widget.TOUCH_ENDED){
                    if(edit_box.getString().length <= 0){
                        // h1global.globalUIMgr.info_ui.show_by_info("给您的茶楼取个名");
                        return;
                    }
                    if(callback_func){
                        callback_func(edit_box.getString());
                    }
                    self.hide();
                }
            }
           sure_btn.addTouchEventListener(sure_btn_event);


           function close_btn_event(sender, eventType) {
               if(eventType === ccui.Widget.TOUCH_ENDED){
                   self.hide();
               }
           }
           close_btn.addTouchEventListener(close_btn_event)
       })
   }
});