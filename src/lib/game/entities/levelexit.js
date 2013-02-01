ig.module("game.entities.levelexit").requires('impact.entity', 'game.entities.player', 'game.entities.review').defines(function () {
	EntityLevelexit = ig.Entity.extend({
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(250, 25, 25, .75)',
		size: {
			x: 64,
			y: 96
		},
		level: null,
		once: false,
		review: null,
		checkAgainst: ig.Entity.TYPE.A,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.level = settings.level;
		},
		update: function () {
		},
		check: function (other) {
			if (other instanceof EntityPlayer) {
				if (other.data.goalsAccomplished.checkpoints === true && other.data.goalsAccomplished.powerups === true && other.data.goalsAccomplished.review === false) {
					if (!this.review) {
						var levelName = "level" + ig.game.currentLevel.toString();
						for (key in ig.game.scriptManager.reviews) {
							if (key == levelName) {
								this.review = ig.game.spawnEntity(EntityReview, 0, 0, {
									msg: {
										status: true,
										message: ig.game.scriptManager.reviews[key].question0.msg,
										counterOut: 0
									}
								});
							}
						}
					}
					if (!this.review.running) {
						this.review.run();
					}
					if (this.review.running && this.review.finished) {
						ig.game.getEntitiesByType('EntityInfooverlay')[0].kill();
						other.data.goalsAccomplished.review = true;
					}
				}
				this.attemptLevelExit(other);
			}
		},
		attemptLevelExit: function (plyr) {
			if (plyr.data.goalsAccomplished.checkpoints === true && plyr.data.goalsAccomplished.powerups === true && plyr.data.goalsAccomplished.review === true) {
				if (this.level) {
					var lvl = this.level;
					var levelName = "LevelLevel" + this.level.toString();
					if (!this.once) {
						var tempData = plyr.data;
						ig.game.musicManager.changeTrackForLevel(ig.game.currentLevel+1);
						ig.game.overlayText = "Loading Next Level...";
						ig.game.loadLevelDeferred(ig.global[levelName]);
						setTimeout(function () {
							ig.game.overlayText = "";
							ig.game.currentLevel++;
							var player = ig.game.getEntitiesByType('EntityPlayer')[0];
							player.data = tempData;
							player.data.goalsAccomplished = {
								checkpoints: false,
								powerups: false,
								review: false
							};
							player.data.goalsData = {
								checkpointsReached: 0,
								checkpointsTotal: ig.game.CheckpointsPerLevel[ig.game.currentLevel],
								powerupsObtained: 0,
								powerupsTotal: ig.game.PowerupsPerLevel[ig.game.currentLevel]
							};
							var lvlName = "level" + (lvl - 1).toString();
							for (key in player.data.levelHighscores) {
								if (key === lvlName) {
									if (player.data.score > player.data.levelHighscores[key]) {
										player.data.levelHighscores[key] = player.data.score;
									}
								}
							}
							player.data.aggScore += player.data.score;
							player.data.score = 0;
							ig.game.player = player;
							ig.game.saveProgress();
							ig.game.hud.update(ig.game.player.energy, ig.game.player.health, ig.game.player.data.lives, ig.game.player.data.coins, ig.game.player.data.score);
						}, 1000);
						this.once = true;
					}
				}
			}
		}
	});
});