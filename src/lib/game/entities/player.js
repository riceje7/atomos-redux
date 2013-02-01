ig.module('game.entities.player').requires('impact.entity', 'impact.font', 'game.plugins.PlayerCommands').defines(function () {
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/atomos-ss.png', 46, 74),
		size: {
			x: 40,
			y: 74
		},
		offset: {
			x: 3,
			y: 0
		},
		maxVel: {
			x: 250,
			y: 300
		},
		friction: {
			x: 500,
			y: 50
		},
		energy: null,
		health: null,
		flip: false,
		accelGround: 500,
		accelAir: 250,
		jump: 425,
		activeWeapon: "EntityBoltBall",
		weaponEnergy: 10,
		weapon: 0,
		totalWeapons: 2,
		startPos: null,
		regenRate: 1,
		invincible: true,
		invincibleDelay: 1,
		invincibleTimer: null,
		hud: null,
		data: {},
		regenCounter: 0,
		killOnce: null,
		alwaysStanding: false,
		commands: new PlayerCommands(),
		sound_coin: new ig.Sound('media/sound_coin.wav'),
		sound_hit: new ig.Sound('media/sound_hit.wav'),
		sound_jump: new ig.Sound('media/sound_jump.wav'),
		sound_shoot: new ig.Sound('media/sound_shoot.wav'),
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.LITE,
		init: function (x, y, settings) {
			if (this.startPos) {
				this.parent(this.startPos.x, this.startPos.y, settings);
			} else {
				this.parent(x, y, settings);
				this.startPos = {
					x: x,
					y: y
				};
			}
			this.sound_coin.volume = .6;
			this.sound_hit.volume = .6;
			this.sound_jump.volume = .6;
			this.sound_shoot.volume = .6;
			this.killOnce = false;
			if (settings.data) {
				this.data = settings.data;
			} else {
				this.data = {
					goalsAccomplished: ig.game.StartingGoals,
					goalsData: ig.game.StartingGoalsData,
					score: 0,
					coins: 0,
					kills: 0,
					lives: 3,
					maxEnergy: 50,
					maxHealth: 50,
					powerups: {
						arrayPU: false,
						arraylistPU: false,
						booleanPU: false,
						classesPU: false,
						consolePU: false,
						constantsPU: false,
						forPU: false,
						functionsPU: false,
						ifPU: false,
						nanPU: false,
						nullPU: false,
						numberPU: false,
						objectPU: false,
						parametersPU: false,
						stringPU: false,
						syntaxPU: false,
						undefinedPU: false,
						variablesPU: false,
						whilePU: false
					},
					levelHighscores: {
						level0: 0,
						level1: 0,
						level2: 0,
						level3: 0,
						level4: 0,
						level5: 0
					},
					aggScore: 0
				};
			};
			this.health = this.data.maxHealth;
			this.energy = this.data.maxEnergy;
			this.addAnim('idle', 1, [1]);
			this.addAnim('run', 0.083, [1, 0, 1, 2]);
			this.addAnim('jump', 1, [0]);
			this.invincibleTimer = new ig.Timer();
			this.makeInvincible();
		},
		ready: function () {
			if (this.data.goalsData.checkpointsTotal === undefined || this.data.goalsData.powerupsTotal === undefined) {
				this.data.goalsData = {
					checkpointsReached: this.data.goalsData.checkpointsReached,
					checkpointsTotal: ig.game.CheckpointsPerLevel[ig.game.currentLevel],
					powerupsObtained: this.data.goalsData.powerupsObtained,
					powerupsTotal: ig.game.PowerupsPerLevel[ig.game.currentLevel]
				};
			}
		},
		update: function () {
			if (this.alwaysStanding) {
				this.standing = true;
			}
			this.regen(this.regenRate);
			var accel = this.standing ? this.accelGround : this.accelAir;
			if (ig.input.state('left')) {
				this.accel.x = -accel;
				this.flip = true;
			} else if (ig.input.state('right')) {
				this.accel.x = accel;
				this.flip = false;
			} else {
				this.accel.x = 0;
			}
			if (this.standing && ig.input.pressed('jump')) {
				ig.game.spawnEntity("EntityJumpSmoke", this.pos.x, this.pos.y, {
					zIndex: this.zIndex - 100
				});
				this.gravityFactor = 1;
				this.alwaysStanding = false;
				this.currentAnim = this.anims.jump;
				this.sound_jump.play();
				this.vel.y = -this.jump;
			}
			if (ig.input.pressed('swapWeapon')) {
				this.weapon++;
				if (this.weapon >= this.totalWeapons) {
					this.weapon = 0;
				}
				switch (this.weapon) {
				case (0):
					this.activeWeapon = "EntityBoltBall";
					this.weaponEnergy = 10;
					break;
				case (1):
					this.activeWeapon = "EntityBoltStrike";
					this.weaponEnergy = 25;
					break;
				}
			}
			if (ig.input.pressed('shoot') && this.energy > 0 && this.energy >= this.weaponEnergy) {
				this.sound_shoot.play();
				ig.game.spawnEntity(this.activeWeapon, this.pos.x, this.pos.y, {
					flip: this.flip
				});
				this.energy -= this.weaponEnergy;
			}
			if (this.vel.y < 0) {
				this.currentAnim = this.anims.jump;
			}
			if (this.vel.x !== 0) {
				this.currentAnim = this.anims.run;
			} else {
				this.currentAnim = this.anims.idle;
			}
			this.currentAnim.flip.x = this.flip;
			if (this.invincibleTimer.delta() > this.invincibleDelay) {
				this.invincible = false;
				this.currentAnim.alpha = 1;
			}
			this.parent();
		},
		draw: function () {
			if (this.invincible) {
				this.currentAnim.alpha = this.invincibleTimer.delta() / this.invincibleDelay * 1 + 0.25;
			}
			this.parent();
		},
		kill: function () {
			if (this.data.lives > 0 && !this.killOnce) {
				this.data.lives -= 1;
				var tempData = this.data;
				var tempPos = this.startPos;
				this.parent();
				setTimeout(function () {
					ig.game.overlayText = "Respawning...";
				}, 500);
				setTimeout(function () {
					ig.game.player = ig.game.spawnEntity(EntityPlayer, tempPos.x, tempPos.y, {
						data: tempData
					});
					ig.game.overlayText = null;
				}, 3000);
				this.killOnce = true;
			} else if (this.data.lives <= 0) {
				this.data.lives = 3;
				setTimeout(function () {
					ig.game.overlayText = "GAME OVER!";
				}, 500);
				setTimeout(function () {
					ig.game.overlayText = null;
					ig.system.setGame(StartScreen, {
						comingFromGameOver: true,
					});
				}, 3000);
			}
		},
		receiveDamage: function (amount, from) {
			if (this.invincible) return;
			this.makeInvincible();
			this.sound_hit.play();
			this.parent(amount, from);
		},
		makeInvincible: function () {
			this.invincible = true;
			this.invincibleTimer.reset();
		},
		addCoin: function (c) {
			this.sound_coin.play();
			this.data.coins += c;
		},
		absorbEnergy: function (e) {
			this.energy += e;
			if (this.energy > this.data.maxEnergy) {
				this.energy = this.data.maxEnergy;
			}
		},
		absorbHealth: function (h) {
			this.health += h;
			if (this.health > this.data.maxHealth) {
				this.health = this.data.maxHealth;
			}
		},
		regen: function (count) {
			if (this.regenCounter >= 250) {
				this.absorbEnergy(10);
				this.regenCounter = 0;
			} else {
				this.regenCounter += count;
			}
		},
		addPoints: function (points) {
			this.data.score += points;
		}
	});
	EntityBoltBall = ig.Entity.extend({
		size: {
			x: 32,
			y: 32
		},
		offset: {
			x: 16,
			y: 0
		},
		animSheet: new ig.AnimationSheet('media/boltball-ss.png', 48, 32),
		maxVel: {
			x: 500,
			y: 0
		},
		life: new ig.Timer(),
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,
		init: function (x, y, settings) {
			this.life.set(1);
			this.parent(x + (settings.flip ? -16 : 16), y + 32, settings);
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.addAnim('shoot', 0.083, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
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
			other.receiveDamage(10, this);
			this.kill();
		}
	});
	EntityBoltStrike = ig.Entity.extend({
		size: {
			x: 256,
			y: 32
		},
		once: false,
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('media/boltstrike-ss.png', 256, 48),
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,
		init: function (x, y, settings) {
			this.parent(x + (settings.flip ? -256 : 16), y + 16, settings);
			this.addAnim('shoot', 0.083, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);
			this.currentAnim.flip.x = settings.flip;
		},
		update: function () {
			if (this.currentAnim.frame === 9) {
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
			other.receiveDamage(25, this);
			if (this.currentAnim.frame === 9) {
				this.kill();
			}
		}
	});
	EntityJumpSmoke = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/jumpsmoke-ss.png', 128, 96),
		size: {
			x: 128,
			y: 96
		},
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,
		init: function (x, y, settings) {
			this.parent(x - (this.size.x - 46) / 2, y - (this.size.y - 74), settings);
			this.zIndex = settings.zIndex;
			ig.game.sortEntitiesDeferred();
			this.addAnim('jump', .083, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);
		},
		update: function () {
			if (this.currentAnim.frame === 9) {
				this.kill();
			} else {
				this.parent();
			}
		}
	});
});