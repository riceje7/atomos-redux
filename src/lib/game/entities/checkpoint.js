ig.module("game.entities.checkpoint").requires('impact.entity', 'game.entities.checkpointoverlay').defines(function () {
	EntityCheckpoint = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/checkpoint-ss.png', 64, 64),
		size: {
			x: 48,
			y: 48
		},
		offset: {
			x: 8,
			y: 8
		},
		once: false,
		gravityFactor: 0,
		checkpoint: null,
		active: false,
		player: null,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		init: function (x, y, settings) {
			this.checkpoint = settings.checkpoint;
			this.addAnim('inactive', 1, [0]);
			this.addAnim('active', 1, [1]);
			this.currentAnim = this.anims.inactive;
			this.parent(x, y, settings);
		},
		update: function () {
			if (this.active && ig.game.player.standing && !this.once) {
				this.activate(this.player);
				this.once = true;
			}
			this.parent();
		},
		draw: function () {
			this.parent();
		},
		check: function (other) {
			if (other instanceof EntityPlayer) {
				this.active = true;
				this.player = other;
			}
			this.parent();
		},
		activate: function (other) {
			if (this.currentAnim === this.anims.inactive && !this.once) {
				other.startPos = { 
					x: this.pos.x,
					y: this.pos.y
				};
				other.addPoints(ig.game.Points.checkpoint);
				ig.game.activeCheckpoint = this.checkpoint;
				this.currentAnim = this.anims.active;
				other.data.goalsData.checkpointsReached++;
				if (other.data.goalsData.checkpointsReached === other.data.goalsData.checkpointsTotal) {
					other.data.goalsAccomplished.checkpoints = true;
				}
				ig.game.spawnEntity(EntityCheckpointoverlay, 0, 0, {
					textbox: {
						x: 330,
						y: 50,
						w: 240,
						h: 250
					},
					msg: {
						status: true,
						message: ig.game.scriptManager.story.levels["level" + ig.game.currentLevel.toString()]["checkpoint" + this.checkpoint.toString()].message,
						counterOut: 0
					}
				});
			}
		}
	});
});