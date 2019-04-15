"use strict";
/*-----------------------------------------------------------------------------------------
												entity
-----------------------------------------------------------------------------------------*/
KBEngine.PlayerAvatar = impClubOperation.extend(
{
	__init__ : function()
	{
		this._super();
		this.isAgent = undefined;
		KBEngine.Event.register("set_isAgent", this, "on_set_isAgent");
    	KBEngine.DEBUG_MSG("Create Player Avatar " + this.id)
  	},
  	
	onEnterWorld : function()
	{
		this._super();
	},

	// @RPC
	operationCallback : function(opId, lst)
	{

	},

	// @RPC
	operationFail : function(cid, val)
	{
	    KBEngine.DEBUG_MSG("operationFail: " + cid + "," + val);
	    
	    var content = ""
	    if (cid === const_val.FRIEND_OPERATION) {
	    	if (val == 0) {
	    		content = "好友已满"
	    	} else if (val == 1) {
	    		content = "对方已经是你的好友"
	    	}
	    }
	   
	    h1global.globalUIMgr.toast_ui.show_toast(content)	
	},

	operationAddTokenTips : function(tokenList){ //使用道具 增加代币 提示
		h1global.globalUIMgr.item_tips_ui.show_token_list(tokenList)
	},

	operationItemTips :function(cid, val){
		var content = "";
		// h1global.globalUIMgr.item_tips_ui.show_tips(content)
	},

	// @RPC
	operationSuccess : function(cid, val)
	{
	    KBEngine.DEBUG_MSG("operationSuccess: " + cid + "," + val);
	},


	// @RPC
	// state==0表示进入GameHallScene, state==1表示重连的吧？
	beginGame : function(state)
	{
        cutil.start_location();
		this.updateUserInfo();
		if(switches.TEST_OPTION){
			if(h1global.reconnect){
            	h1global.reconnect = false;
            	h1global.runScene(new GameRoomScene());
            } else {
            	h1global.runScene(new GameHallScene({'from_scene':'LoginScene'}));
            }
		} else {
			if(state === 0){
				cutil.registerGameShowEvent();
				cutil.callEnterRoom();
                if (h1global.curUIMgr && h1global.curUIMgr.result_ui && h1global.curUIMgr.result_ui.finalResultFlag) {
                    cutil.unlock_ui();
                    return
                }
				h1global.runScene(new GameHallScene({'from_scene':'LoginScene'}));
			}
		}
	},

	queryUserInfo:function (userId) {
		this.baseCall("queryUserInfo", userId)
    },

	gotUserInfo:function (userInfo) {
        if(h1global.curUIMgr.clubmember_ui && h1global.curUIMgr.clubmember_ui.is_show){
            h1global.curUIMgr.clubmember_ui.update_user_info(userInfo)
        }
    },


	// @RPC
	pushAvatarInfo: function(avatarInfo){
		this.uuid = avatarInfo["uuid"];
		this.userId = avatarInfo["uid"];
		this.cards = avatarInfo["cards"];
		this.ip = avatarInfo["ip"];
	},
	
	logout : function(){
  		cc.log("logout");
  		// cc.sys.localStorage.removeItem("INFO_JSON");
  		this.baseCall("logout");
  	},

	// @RPC
	closeClient : function()
	{
	    // KBEngine.DEBUG_MSG("closeClient");
	    // h1global.globalUIMgr.hide_all_ui();
	    // h1global.runScene(new LoginScene());
	    cc.loader.load("src" + "/" + "return.js");
	},

	// @RPC
	on_set_isAgent: function (old_value) {
		cc.log("set isAgent old:" + old_value + " ---> " + "new:" + this.isAgent);
	},

	pushPlayerInfoList: function(infoList, plstId)
	{
		if (plstId === 1){
			cc.log("AttentionPlayerInfoList");
			if (h1global.curUIMgr.friend_ui && h1global.curUIMgr.friend_ui.is_show){
				h1global.curUIMgr.friend_ui.updateFriendListScroll(infoList)
			}
		} else if (plstId === 2){
			cc.log("AttentionYouPlayerInfoList");
			if (h1global.curUIMgr.friend_ui && h1global.curUIMgr.friend_ui.is_show){
				h1global.curUIMgr.friend_ui.updaRecommondFriendScroll(infoList)
			}
		} else if (plstId === 3){
			cc.log("GiftPlayerInfoList");
			if (h1global.curUIMgr.friend_ui && h1global.curUIMgr.friend_ui.is_show){
				h1global.curUIMgr.friend_ui.updateFriendGiftScroll(infoList)
			}
		}
	}

});
