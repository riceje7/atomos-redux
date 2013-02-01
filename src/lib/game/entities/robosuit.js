ig.module('game.entities.robosuit').requires('impact.entity', 'game.entities.enemy').defines(function () {
	EntityRobosuit = EntityEnemy.extend({
		animSheet: new ig.AnimationSheet('media/robosuit-ss.png', 80, 128),
		size: {
			x: 80,
			y: 128
		},
		flip: true,
		friction: {
			x: 300,
			y: 0
		},
		speed: 90,
		health: 20,
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