ig.module('game.plugins.TouchControls').requires('game.plugins.touch-button').defines(function() {
	TouchControls = ig.Class.extend({
		buttons: [],
		buttonImage: null,
		display: false,
		init: function() {
		  var ypos = ig.system.height - 96;
		  var w = 80;
		  var h = 96;
			this.buttonImage = new ig.Image("media/controls.png");
			this.buttons = [
			new ig.TouchButton("left", 0, ypos, w, h, this.buttonImage, 0), new ig.TouchButton("right", 80, ypos, w, h, this.buttonImage, 1), new ig.TouchButton("shoot", ig.system.width - 160, ypos, w, h, this.buttonImage, 4), new ig.TouchButton("jump", ig.system.width - 80, ypos, w, h, this.buttonImage, 6)];
			if(ig.ua.mobile){
				this.display = true;
			}
		},
		draw: function() {
			if (this.display) {
				for (var i = 0; i < this.buttons.length; i++) {
					this.buttons[i].draw();
				}
			}
		}
	});
});