"use strict";
var PlaybackControlUI = UIBase.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/PlayBackControlUI.json"
    },

    initUI: function () {
        let self = this;
        let playback_control_panel = this.rootUINode.getChildByName('playback_control_panel');
        playback_control_panel.getChildByName('speed_btn').addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.playbackGame.nextTimeScale();
            }
        });
        playback_control_panel.getChildByName('pause_btn').addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                playback_control_panel.getChildByName('play_btn').setVisible(true);
                playback_control_panel.getChildByName('pause_btn').setVisible(false);
                self.playbackGame.pausePlayback();
            }
        });
        playback_control_panel.getChildByName('play_btn').addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                playback_control_panel.getChildByName('play_btn').setVisible(false);
                playback_control_panel.getChildByName('pause_btn').setVisible(true);
                self.playbackGame.resumePlayback();
            }
        });
        playback_control_panel.getChildByName('replay_btn').addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.playbackGame.replay();
            }
        });
        playback_control_panel.getChildByName('close_btn').addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.playbackGame.quitRoom();
            }
        });
    },

    setPlaybackGameRoom: function (control) {
        this.playbackGame = control;
    },

    resetUI: function () {
        let playback_control_panel = this.rootUINode.getChildByName('playback_control_panel');
        playback_control_panel.getChildByName('play_btn').setVisible(false);
        playback_control_panel.getChildByName('pause_btn').setVisible(true);
    }

});