ig.module('game.entities.rustbug').requires('impact.entity', 'game.entities.enemy').defines(function () {
	EntityRustbug = EntityEnemy.extend({
		animSheet: new ig.AnimationSheet('media/rustbug-ss.png', 48, 36),
		size: {
			x: 44,
			y: 32
		},
		offset: {
			x: 2,
			y: 2
		},
		flip: false,
		friction: {
			x: 300,
			y: 0
		},
		speed: 35,
		health: 30,
		fireCounter: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('run', .083, [0, 1, 2, 3, 4, 5, 6, 7]);
		},
		update: function () {
			if (!this.stop) {
				if (!ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x - 4), this.pos.y + this.size.y + 1)) {
					this.flip = !this.flip;
				}
				var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
				this.currentAnim.flip.x = this.flip;
				if (this.distanceTo(ig.game.player) < 500 && (ig.game.player.pos.x < this.pos.x && this.flip) || (ig.game.player.pos.x > this.pos.x && !this.flip)) {
					var ang = (this.angleTo(ig.game.player)).toDeg();
					if (ang < 0 && ang > -15 || ang < -165 && ang > -180) {
						this.fireCounter++;
						if (this.fireCounter % 75 === 0) {
							ig.game.spawnEntity("EntityFireBall", this.pos.x, this.pos.y, {flip: this.flip});
						}
					}
				}
				this.parent();
			}
		},
		kill: function () {
			ig.game.spawnEntity("EntityDeathAnim", this.pos.x, this.pos.y, {
				size: this.size
			});
			this.parent();
		},
		handleMovementTrace: function (res) {
			this.parent(res);
			if (res.collision.x) {
				this.flip = !this.flip;
			}
		},
		check: function (other) {
			other.receiveDamage(10, this);
		}
	});
});