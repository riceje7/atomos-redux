ig.module('game.entities.infooverlay').requires('impact.entity', 'impact.font', 'game.plugins.WordWrapper', 'game.entities.overlay').defines(function () {
	EntityInfooverlay = EntityOverlay.extend({
		font: new ig.Font('media/minecraftia12-FFFFFF.png'),
		infobox: null,
		message: null,
		msgCounter: 0,
		wordWrapper: null,
		textbox: null,
		msg: null,
		msgsArr: null,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.textbox = {
				x: 35,
				y: 35,
				w: 560,
				h: 285
			};
			this.wordWrapper = new WordWrapper(this.font, this.textbox);
			this.infobox = new ig.Image('media/infobox.png');
			this.msg = settings.msg;
			this.msgsArr = this.wordWrapper.wrapMessage(this.msg.message);
			this.setMessage({
				status: true,
				message: this.msgsArr[0],
				counterOut: 0
			});
		},
		update: function () {
			if (ig.game.player.standing && !this.active) {
				this.active = true;
				ig.game.freezeEnemies();
				ig.game.disableControls();
				this.enablePageControls();
			}
			if(this.active){
				this.parent();
			}
		},
		kill: function () {
			ig.game.unfreezeEnemies();
			ig.game.enableControls();
			this.parent();
		},
		draw: function () {
			if (this.active) {
				this.parent();
				this.infobox.draw(this.pos.x, this.pos.y);
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