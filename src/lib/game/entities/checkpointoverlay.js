ig.module('game.entities.checkpointoverlay').requires('impact.entity', 'impact.font', 'game.plugins.WordWrapper', 'game.entities.overlay').defines(function () {
	EntityCheckpointoverlay = EntityOverlay.extend({
		font: new ig.Font('media/visitor16-FFFFFF.png'),
		robot: null,
		bubble: null,
		wordWrapper: null,
		message: null,
		msgCounter: null,
		textbox: null,
		msg: null,
		msgsArr: null,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.textbox = settings.textbox;
			this.wordWrapper = new WordWrapper(this.font, this.textbox);
			this.msg = settings.msg;
			this.msgsArr = this.wordWrapper.wrapMessage(this.msg.message);
			this.setMessage({
				status: true,
				message: this.msgsArr[0],
				counterOut: 0
			});
			this.robot = new ig.Image('media/robot.png');
			this.bubble = new ig.Image('media/talk-bubble.png');
			ig.game.freezeEnemies();
			ig.game.disableControls();
			this.enablePageControls();
		},
		update: function () {
			if (ig.game.player.standing && !this.active) {
				this.active = true;
			}
			if (this.active) {
				this.parent();
			}
		},
		draw: function () {
			if (this.active) {
				this.parent();
				this.robot.draw(this.pos.x + 29, this.pos.y + 30);
				this.bubble.draw(this.pos.x + 200, this.pos.y);
				this.font.draw(this.message, this.pos.x + this.textbox.x, this.pos.y + this.textbox.y, ig.Font.ALIGN.LEFT);
			}
		},
		setMessage: function (msg) {
			if (msg.status) {
				this.message = msg.message;
				this.msgCounter = msg.counterOut;
			}
		}
	});
});