ig.module('game.entities.MovingPlatform').requires('game.entities.platform').defines(function () {
	EntityMovingPlatform = EntityPlatform.extend({
		animSheet: new ig.AnimationSheet('media/platform.png', 128, 16),
		size: {
			x: 128,
			y: 16
		},
		check: function (other) {
			if (other instanceof EntityPlayer) {
				if (this.platform == "touchandgo") {
					this.route = "500-r|172-d|800-r|72-u|1300-l|100-u";
					this.initRoutes();
				}
				other.alwaysStanding = true;
				other.gravityFactor = 2;
				other.pos.x += (this.pos.x - this.last.x);
			}
		}
	});
});