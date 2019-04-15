var GameHallSceneUIManager = UIManagerBase.extend({
    onCreate: function () {
        var initUIClassNameList = ["GameHallUI", "CreateRoomUI", "JoinRoomUI", "HelpUI", "FeedBackUI", "InvitationUI",
            "PlayerInfoUI", "RecordUI", "ConfigUI", "AuthentucateUI", "CustomerServiceUI", "ActivityUI", "ShopUI",
            "ShareUI", "CreateAgentRoomUI", "WebViewUI","BroadcastUI", "GameHallShareUI", "AddMineUI",
            "ClubUI", "ClubViewUI", "ClubRecordUI", "ClubMemberUI", "ClubMgrUI", "ClubRoomDetailUI", "ConfirmUI",
            "CreateClubUI", "EditorUI", "JoinClubUI", "CSUI", "ShareCircleUI", "PublicNumUI","ClubConfigUI"];

        for (var uiClassName of initUIClassNameList) {
            this.add_ui(uiClassName.slice(0, uiClassName.length - 2).toLowerCase() + "_ui", [], uiClassName);
        }
    }
});