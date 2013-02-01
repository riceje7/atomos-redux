ig.module("game.entities.item").requires('impact.entity').defines(function() {
	EntityItem = ig.Entity.extend({
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(30, 255, 30, .4)',
		animSheet: new ig.AnimationSheet('media/items-ss.png', 48, 48),
		size: {
			x: 48,
			y: 48
		},
		gravityFactor: 0,
		itemType: null,
		checkAgainst: ig.Entity.TYPE.A,
		init: function(x, y, settings) {
			this.itemType = settings.itemType;
			switch (this.itemType) {
			case ('coin'):
				this.addAnim('item', 1, [0]);
				break;
			case ('energy'):
				this.addAnim('item', 1, [1]);
				break;
			case ('health'):
				this.addAnim('item', 1, [2]);
				break;
			}
			this.parent(x, y, settings);
		},
		update: function() {
			this.parent();
		},
		check: function(other) {
			if (other instanceof EntityPlayer) {
				switch (this.itemType) {
				case ('coin'):
					other.addCoin(1);
					other.addPoints(ig.game.Points.item.coin);
					this.kill();
					break;
				case ('energy'):
					other.absorbEnergy(10);
					other.addPoints(ig.game.Points.item.energy);
					this.kill();
					break;
				case ('health'):
					other.absorbHealth(10);
					other.addPoints(ig.game.Points.item.health);
					this.kill();
					break;
				}
			}
		}
	});
});