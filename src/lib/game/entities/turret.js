ig.module('game.entities.turret').requires('impact.entity', 'game.entities.enemy').defines(function () {
	EntityTurret = EntityEnemy.extend({
		animSheet: new ig.AnimationSheet('media/turret-ss.png', 80, 96),
		size: {
			x: 72,
			y: 90
		},
		offset: {
			x: 4,
			y: 3
		},
		flip: true,
		friction: {
			x: 150,
			y: 0
		},
		speed: 40,
		health: 100,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('run', .083, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		},
		update: function () {
			if (!this.stop) {
				if (!ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x - 4), this.pos.y + this.size.y + 1)) {
					this.flip = !this.flip;
				}
				var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
				this.currentAnim.flip.x = !this.flip;
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