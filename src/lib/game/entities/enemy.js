ig.module('game.entities.enemy').requires('impact.entity').defines(function () {
	EntityEnemy = ig.Entity.extend({
		stop: false,
		_wmScalable: true,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
		},
		update: function () {
			if (!this.stop) {
				this.parent();
			}
		},
		kill: function () {
			ig.game.player.addPoints(ig.game.Points.enemy[ig.game.currentLevel] * (ig.game.currentLevel + 1));
			this.parent();
		}
	});
	EntityFireBall = ig.Entity.extend({
		size: {
			x: 32,
			y: 32
		},
		offset: {
			x: 16,
			y: 16
		},
		animSheet: new ig.AnimationSheet('media/fireball-ss.png', 64, 64),
		maxVel: {
			x: 300,
			y: 0
		},
		life: new ig.Timer(),
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		init: function (x, y, settings) {
			this.life.set(1);
			this.parent(x + (settings.flip ? -16 : 16), y, settings);
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.addAnim('shoot', 0.083, [0, 1, 2, 3, 4, 5]);
			this.currentAnim.flip.x = settings.flip;
		},
		update: function () {
			if (this.life.delta() >= 0) {
				this.kill();
			}
			this.parent();
		},
		handleMovementTrace: function (res) {
			this.parent(res);
			if (res.collision.x || res.collision.y) {
				this.kill();
			}
		},
		check: function (other) {
			if (other instanceof EntityPlayer) {
				other.receiveDamage(10, this);
				this.kill();
			}
		}
	});
	EntityDeathAnim = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/death-ss.png', 128, 160),
		size: {
			x: 128,
			y: 160
		},
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,
		init: function (x, y, settings) {
			this.parent(x - (this.size.x - settings.size.x) / 2, y - (this.size.y - settings.size.y), settings);
			this.addAnim('death', .083, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], true);
		},
		update: function () {
			if (this.currentAnim.frame === 11) {
				this.kill();
			} else {
				this.parent();
			}
		}
	});
});