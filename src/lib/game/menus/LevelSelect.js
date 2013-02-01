ig.module('game.menus.LevelSelect').requires('impact.game', 'impact.font', 'impact.image', 'impact.input', 'game.AtomosRedux', 'game.plugins.Button', 'game.plugins.PersistantData').defines(function () {
	LevelSelect = ig.Game.extend({
		userData: null,
		storage: null,
		buttons: [],
		iconLocs: [{
			x: 50,
			y: 10
		}, {
			x: 250,
			y: 10
		}, {
			x: 450,
			y: 10
		}, {
			x: 50,
			y: 190
		}, {
			x: 250,
			y: 190
		}, {
			x: 450,
			y: 190
		}],
		init: function () {
			this.userData = this.persistantData.userData;
			this.storage = this.persistantData.storage;
			ig.input.bind(ig.KEY.MOUSE1, 'click');
			for (var i = 0; i < Object.size(this.userData.levelHighscores); i++) {
				var active = (i <= this.userData.nextLevel) ? true : false;
				var button = ig.game.spawnEntity(Button, this.iconLocs[i].x, this.iconLocs[i].y, {
					level: i,
					animSheet: new ig.AnimationSheet('media/levelselecticons.png', 140, 160),
					size: {
						x: 140,
						y: 160
					},
					pressedUp: function () {
						ig.system.setGame(AtomosRedux, {
							userData: ig.game.userData,
							level: this.level,
							storage: this.storage
						})
					}
				});
				if (!active) {
					button.setState('deactive');
				}
				this.buttons.push(button);
			}
		},
		update: function () {
			this.parent();
		}
	});
});