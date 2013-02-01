ig.module('game.entities.shadow').requires('impact.entity', 'game.entities.enemy').defines(function () {
	EntityShadow = EntityEnemy.extend({
		animSheet: new ig.AnimationSheet('media/shadow-ss.png', 32, 56),
		size: {
			x: 28,
			y: 52
		},
		offset: {
			x: 2,
			y: 2
		},
		flip: false,
		friction: {
			x: 150,
			y: 0
		},
		speed: 200,
		health: 50,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('run', .083, [0, 1, 2, 3, 4, 5, 6, 7]);
		},
		update: function () {
			if (!ig.game.collisionMap.getTile(this.pos.x + (this.flip ? + 4 : this.size.x - 4), this.pos.y + this.size.y + 1)) {
				this.flip = !this.flip;
			}
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir;
			this.currentAnim.flip.x = this.flip;
			this.parent();
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