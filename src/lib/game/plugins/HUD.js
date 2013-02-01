ig.module('game.plugins.HUD').requires('impact.game', 'impact.system', 'impact.font').defines(function() {
	HUD = ig.Class.extend({
		images: {
			battery: new ig.Image('media/battery.png'),
			coin: new ig.Image('media/coin.png'),
			health: new ig.Image('media/health.png'),
			life: new ig.Image('media/life.png')
		},
		stats: {
			energy: null,
			health: null,
			lives: null,
			coins: null,
			score: null
		},
		pos: null,
		drawHud: true,
		font: new ig.Font('media/visitor16-FFFFFF.png'),
		init: function(e, h, l, c, s) {
			this.pos = {
				x: 10,
				y: 10
			};
			this.stats.energy = e;
			this.stats.health = h;
			this.stats.lives = l;
			this.stats.coins = c;
			this.stats.score = s;
		},
		draw: function() {
			if (this.drawHud) {
				//life
				this.font.draw('Lives', this.pos.x, this.pos.y);
				this.images.life.draw(this.pos.x, this.pos.y + 15);
				this.font.draw('x ' + this.stats.lives, this.pos.x + this.images.life.width + 10, this.pos.y + 15);
				//health
				this.font.draw('Health', this.pos.x+100, this.pos.y);
				this.images.health.draw(this.pos.x+100, this.pos.y + 15);
				this.font.draw('x ' + this.stats.health, this.pos.x + this.images.health.width + 110, this.pos.y + 15);
				//energy
				this.font.draw('Energy', this.pos.x+200, this.pos.y);
				this.images.battery.draw(this.pos.x+200, this.pos.y + 15);
				this.font.draw('x ' + this.stats.energy, this.pos.x + this.images.battery.width + 210, this.pos.y + 15);
				//coin
				this.font.draw('Coins', this.pos.x + 300, this.pos.y);
				this.images.coin.draw(this.pos.x + 300, this.pos.y + 15);
				this.font.draw('x ' + this.stats.coins, this.pos.x + this.images.coin.width + 310, this.pos.y + 15);
				//points
				this.font.draw('Score', this.pos.x + 400, this.pos.y);
				this.font.draw(': ' + this.stats.score, this.pos.x + 460, this.pos.y);
			}
		},
		update: function(e, h, l, c, s) {
			this.stats.energy = e;
			this.stats.health = h;
			this.stats.lives = l;
			this.stats.coins = c;
			this.stats.score = s;
		}
	});
});