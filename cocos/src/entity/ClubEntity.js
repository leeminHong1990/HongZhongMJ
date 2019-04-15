"use strict";

var ClubEntity = KBEngine.Entity.extend({
    ctor : function(club_base_info)
    {
        this._super();
        this.club_base_info = club_base_info;

        this.club_id = club_base_info["club_id"];
        this.club_name = club_base_info["club_name"];

        this.owner = club_base_info["owner"];

        this.club_notice = "";
        this.room_type = club_base_info["room_type"];
        this.table_info_list = [0, 0, 0, 0, 0, 0, 0, 0];
        this.members = [];
        KBEngine.DEBUG_MSG("Create ClubEntity")
    },

    update_club_info:function (club_detail_info) {
        this.member_num = club_detail_info["member_num"];
        this.room_type = club_detail_info["room_type"];
        this.club_notice = club_detail_info["club_notice"];
        this.table_info_list = club_detail_info["table_info_list"]
    },

    update_table_list:function (table_info_list) {
        this.table_info_list = table_info_list;
    },

    get_base_info:function () {
        return {
            "club_id" : this.club_id,
            "club_name" : this.club_name,
            "owner" : this.owner,
            // 'room_type': this.room_type,
        }
    },

    is_owner:function (user_id) {
        return user_id === this.owner.userId
    },

    is_member:function (user_id) {
        for (var idx in this.members) {
            var data = this.members[idx];
            if (data['userId'] === user_id) {
                return true;
            }
        }
        return false;
	},

    getRoomCreateDict:function () {
        return this.room_type;
    },
});