ig.module("game.entities.powerup").requires('impact.entity', 'game.entities.infooverlay').defines(function () {
	EntityPowerup = ig.Entity.extend({
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(25, 25, 250, .4)',
		animSheet: new ig.AnimationSheet('media/powerups-ss.png', 64, 64),
		size: {
			x: 64,
			y: 64
		},
		gravityFactor: 0,
		powerup: null,
		checkAgainst: ig.Entity.TYPE.A,
		init: function (x, y, settings) {
			this.powerup = settings.powerup;
			switch (this.powerup) {
			case ('arrayPU'):
				this.addAnim('powerup', 1, [0]);
				break;
			case ('associativeArrayPU'):
				this.addAnim('powerup', 1, [1]);
				break;
			case ('booleanPU'):
				this.addAnim('powerup', 1, [2]);
				break;
			case ('classesPU'):
				this.addAnim('powerup', 1, [3]);
				break;
			case ('consolePU'):
				this.addAnim('powerup', 1, [4]);
				break;
			case ('constantsPU'):
				this.addAnim('powerup', 1, [5]);
				break;
			case ('forPU'):
				this.addAnim('powerup', 1, [6]);
				break;
			case ('functionsPU'):
				this.addAnim('powerup', 1, [7]);
				break;
			case ('ifPU'):
				this.addAnim('powerup', 1, [8]);
				break;
			case ('nanPU'):
				this.addAnim('powerup', 1, [9]);
				break;
			case ('nullPU'):
				this.addAnim('powerup', 1, [10]);
				break;
			case ('numberPU'):
				this.addAnim('powerup', 1, [11]);
				break;
			case ('objectPU'):
				this.addAnim('powerup', 1, [12]);
				break;
			case ('parametersPU'):
				this.addAnim('powerup', 1, [13]);
				break;
			case ('stringPU'):
				this.addAnim('powerup', 1, [14]);
				break;
			case ('syntaxPU'):
				this.addAnim('powerup', 1, [15]);
				break;
			case ('undefinedPU'):
				this.addAnim('powerup', 1, [16]);
				break;
			case ('variablesPU'):
				this.addAnim('powerup', 1, [17]);
				break;
			case ('whilePU'):
				this.addAnim('powerup', 1, [18]);
				break;
			}
			this.parent(x, y, settings);
		},
		update: function () {
			this.parent();
		},
		check: function (other) {
			if (other instanceof EntityPlayer) {
				other.addPoints(ig.game.Points.powerup);
				other.data.goalsData.powerupsObtained++;
				if (other.data.goalsData.powerupsObtained === other.data.goalsData.powerupsTotal) {
					other.data.goalsAccomplished.powerups = true;
				}
				switch (this.powerup) {
				case ('arrayPU'):
					other.data.powerups.arrayPU = true;
					this.kill();
					break;
				case ('associativeArrayPU'):
					other.data.powerups.arraylistPU = true;
					this.kill();
					break;
				case ('booleanPU'):
					other.data.powerups.booleanPU = true;
					this.kill();
					break;
				case ('classesPU'):
					other.data.powerups.classesPU = true;
					this.kill();
					break;
				case ('consolePU'):
					other.data.powerups.consolePU = true;
					$.get("./html/console.html", function (html) {
						$("#console-wrapper").html(html);
					});
					this.kill();
					break;
				case ('constantsPU'):
					other.data.powerups.constantsPU = true;
					this.kill();
					break;
				case ('forPU'):
					other.data.powerups.forPU = true;
					this.kill();
					break;
				case ('functionsPU'):
					other.data.powerups.functionsPU = true;
					this.kill();
					break;
				case ('ifPU'):
					other.data.powerups.ifPU = true;
					this.kill();
					break;
				case ('nanPU'):
					other.data.powerups.nanPU = true;
					this.kill();
					break;
				case ('nullPU'):
					other.data.powerups.nullPU = true;
					this.kill();
					break;
				case ('numberPU'):
					other.data.powerups.numberPU = true;
					this.kill();
					break;
				case ('objectPU'):
					other.data.powerups.objectPU = true;
					this.kill();
					break;
				case ('parametersPU'):
					other.data.powerups.parametersPU = true;
					this.kill();
					break;
				case ('stringPU'):
					other.data.powerups.stringPU = true;
					this.kill();
					break;
				case ('syntaxPU'):
					other.data.powerups.syntaxPU = true;
					this.kill();
					break;
				case ('undefinedPU'):
					other.data.powerups.undefinedPU = true;
					this.kill();
					break;
				case ('variablesPU'):
					other.data.powerups.variablesPU = true;
					this.kill();
					break;
				case ('whilePU'):
					other.data.powerups.whilePU = true;
					this.kill();
					break;
				}
			}
		},
		kill: function () {
			ig.game.spawnEntity(EntityInfooverlay, 0, 0, {
				msg: {
					status: true,
					message: ig.game.scriptManager.powerups["level" + ig.game.currentLevel.toString()][this.powerup],
					counterOut: 0
				}
			});
			this.parent();
		}
	});
});