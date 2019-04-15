"use strict";
/*-----------------------------------------------------------------------------------------
												interface
-----------------------------------------------------------------------------------------*/
var impBase = impAchievement.extend({
	__init__ : function()
	{
		this._super();

		this.gameRecordList = [];
	    KBEngine.DEBUG_MSG("Create impBase")
  	},

	updateClientNewEvent: function(event, value){
		
	},

	updateUserInfo: function(){
		var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var location = cutil.get_location_geo() || "";
        var lat = cutil.get_location_lat() || "";
        var lng = cutil.get_location_lng() || "";
		this.baseCall("updateUserInfo",
			{	
				"head_icon": info_dict["headimgurl"],
				"nickname": info_dict["nickname"],
				"sex": info_dict["sex"],
                "isAgent": info_dict["isAgent"] || 0,
				"location": location,
				"lat": lat,
				"lng": lng
			}
		);
	},

	pushGameRecordList: function(gameRecordList){
		// cc.log("pushGameRecordList")
		// cc.log(gameRecordList)
		// gameRecordList = [[	{"date":"2016-10-11", "time":"23:50", "round_record":[{"nickname":"ABC", "score": 999}, {"nickname":"DEF", "score": -999}, {"nickname":"GHI", "score": 999}, {"nickname":"JKL", "score": -999}]},
		// 					{"date":"2016-10-11", "time":"23:50", "round_record":[{"nickname":"ABC", "score": 999}, {"nickname":"DEF", "score": -999}, {"nickname":"GHI", "score": 999}, {"nickname":"JKL", "score": -999}]},
		// 					{"date":"2016-10-11", "time":"23:50", "round_record":[{"nickname":"ABC", "score": 999}, {"nickname":"DEF", "score": -999}, {"nickname":"GHI", "score": 999}, {"nickname":"JKL", "score": -999}]},
		// 					{"date":"2016-10-11", "time":"23:50", "round_record":[{"nickname":"ABC", "score": 999}, {"nickname":"DEF", "score": -999}, {"nickname":"GHI", "score": 999}, {"nickname":"JKL", "score": -999}]},
		// 					{"date":"2016-10-11", "time":"23:50", "round_record":[{"nickname":"ABC", "score": 999}, {"nickname":"DEF", "score": -999}, {"nickname":"GHI", "score": 999}, {"nickname":"JKL", "score": -999}]}]]
		this.gameRecordList = this.gameRecordList.concat(gameRecordList);
		if(this.gameRecordList.length > const_val.GAME_RECORD_MAX){
			this.gameRecordList.splice(0, this.gameRecordList.length - const_val.GAME_RECORD_MAX);
		}
	},

	pushRoundRecord: function(roundRecord){
		// cc.log("pushRoundRecord")
		// cc.log(roundRecord)
		if(this.gameRecordList.length > 0){
			this.gameRecordList[this.gameRecordList.length - 1].push(roundRecord);
		}
	},

	pushRoomCard: function(roomCardNum){
		this.cards = roomCardNum;
		if(h1global.curUIMgr.gamehall_ui && h1global.curUIMgr.gamehall_ui.is_show){
			h1global.curUIMgr.gamehall_ui.update_roomcard(this.cards);
		}
	},

	showTip: function(content){
		if(h1global.globalUIMgr.info_ui){
			h1global.globalUIMgr.info_ui.show_by_info(content);
		}
	},

	recvWorldNotice: function(msg, times){
		h1global.globalUIMgr.broadcast_ui.show_broadcast(msg, times);
	},
});
