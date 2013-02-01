ig.module('game.entities.overlay').requires('impact.entity', 'impact.font', 'game.plugins.WordWrapper').defines(function () {
	EntityOverlay = ig.Entity.extend({
		overlay: null,
		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.NEVER,
		active: false,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.overlay = new ig.Animation(new ig.AnimationSheet('media/overlay.png', 640, 360), 1, [0]);
			this.overlay.alpha = .4;
		},
		update: function () {
			if (ig.input.pressed('pageleft')) {
				ig.game.prevmsg();
			} else if (ig.input.pressed('pageright')) {
				ig.game.nextmsg();
			} else if (ig.input.pressed('esc')) {
				ig.game.player.commands.dismiss();
			}
			this.parent();
		},
		kill: function () {
			this.disablePageControls();
			ig.game.unfreezeEnemies();
			ig.game.enableControls();
			this.parent();
		},
		draw: function () {
			this.overlay.draw(0, 0);
		},
		enablePageControls: function () {
			if (!ig.ua.mobile) {
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'pageright');
				ig.input.bind(ig.KEY.LEFT_ARROW, 'pageleft');
				ig.input.bind(ig.KEY.ESC, 'esc');
			} else {
				ig.game.mobileControls.buttons[ig.game.ControlOrder.LEFT].action = ig.game.ControlActions.LEFT;
				ig.game.mobileControls.buttons[ig.game.ControlOrder.RIGHT].action = ig.game.ControlActions.RIGHT;
				ig.game.mobileControls.buttons[ig.game.ControlOrder.SHOOT].action = ig.game.ControlActions.SHOOT;
				ig.game.mobileControls.buttons[ig.game.ControlOrder.JUMP].action = ig.game.ControlActions.JUMP;
			}
		},
		disablePageControls: function () {
			if (!ig.ua.mobile) {
				ig.input.unbindAll();
			} else {
				ig.game.mobileControls.buttons[ig.game.ControlOrder.LEFT].action = "undefined";
				ig.game.mobileControls.buttons[ig.game.ControlOrder.RIGHT].action = "undefined";
				ig.game.mobileControls.buttons[ig.game.ControlOrder.SHOOT].action = "undefined";
				ig.game.mobileControls.buttons[ig.game.ControlOrder.JUMP].action = "undefined";
			}
		}
	});
});