
ig.module('game.AtomosRedux').requires('game.plugins.PersistantData', 'impact.game', 'impact.font', 'impact.image', 'impact.sound', 'game.data.data', 'game.plugins.Camera', 'game.plugins.TouchControls', 'game.plugins.HUD', 'game.plugins.ImpactEvents', 'game.plugins.MusicManager', 'game.plugins.perpixel', 'game.levels.level0', 'game.levels.level1', 'game.levels.level2', 'game.levels.level3', 'game.plugins.ScriptManager', 'game.scripts.MasterScript').defines(function () {
	AtomosRedux = ig.Game.extend({
		gravity: 490,
		camera: null,
		hud: null,
		overlayText: null,
		overlayFont: new ig.Font("media/visitorfont.png"),
		paused: false,
		player: null,
		playTimer: null,
		currentLevel: null,
		jqconsole: null,
		mobileControls: undefined,
		activeCheckpoint: null,
		initialized: false,
		scriptManager: new ScriptManager(),
		musicManager: null,
		storage: null,
		userData: null,
		init: function () {
			this.storage = new ig.Storage;
			this.camera = new Camera(ig.system.width / 4, ig.system.height / 3, 5);
			this.camera.trap.size.x = ig.system.width / 10;
			this.camera.trap.size.y = ig.system.height / 3;
			this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width / 6 : ig.system.width / 10;
			this.currentLevel = this.persistantData ? this.persistantData.level : 0;
			var levelName = "LevelLevel" + this.currentLevel.toString();
			ig.game.loadLevel(ig.global[levelName]);
			this.initControls();
			this.player = ig.game.getEntitiesByType('EntityPlayer')[0];
			this.player.data.lives = this.persistantData.userData ? this.persistantData.userData.lives : 3;
			this.player.data.maxEnergy = this.persistantData.userData ? this.persistantData.userData.maxEnergy : 50;
			this.player.data.maxHealth = this.persistantData.userData ? this.persistantData.userData.maxHealth : 50;
			this.player.data.coins = this.persistantData.userData ? this.persistantData.userData.coins : 0;
			this.player.data.levelHighscores = this.persistantData ? this.persistantData.userData.levelHighscores : this.player.data.levelHighscores;
			this.player.data.powerups = this.persistantData ? this.persistantData.userData.powerups : this.player.data.powerups;
			this.player.data.goalsAccomplished = ig.game.StartingGoals;
			this.player.data.goalsData = ig.game.StartingGoalsData;
			this.player.data.goalsData.powerupsTotal = ig.game.PowerupsPerLevel[this.currentLevel];
			this.player.data.goalsData.checkpointsTotal = ig.game.CheckpointsPerLevel[this.currentLevel];
			this.overlayText = "";
			this.musicManager = new MusicManager();
			this.hud = new HUD(this.player.energy, this.player.health, this.player.data.lives, this.player.data.coins, this.player.data.score);
		},
		secondInit: function () {
			this.musicManager.changeVolume(0.85);
			this.musicManager.changeTrackForLevel(this.currentLevel);
			if (!this.storage.isSet('userVars')) {
				this.storage.initUnset("userVars", {});
			}
			if(ig.game.player.data.powerups.consolePU){
					this.loadConsole();
			}
			this.initialized = true;
		},
		loadLevel: function (level) {
			this.parent(level);

			this.player = this.getEntitiesByType(EntityPlayer)[0];

			// Set camera max and reposition trap
			this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
			this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

			this.camera.set(this.player);
		},
		update: function () {
			if (this.initialized) {
				if (this.paused) {
					ig.music.pause();
					ig.system.stopRunLoop();
					ig.game.pauseMenu();
				} else {
					if (!this.player) {
						this.player = ig.game.getEntitiesByType('EntityPlayer')[0];
					} else {
						if (this.player.pos.y > ig.game.getMapByName('land').height * 32) {
							this.player.kill();
						}
						this.camera.follow(this.player);
						this.hud.update(this.player.energy, this.player.health, this.player.data.lives, this.player.data.coins, this.player.data.score);
						if (ig.input.pressed('pause')) {
							this.paused = true;
						}
						this.parent();
					}
				}
			} else {
				this.secondInit();
			}
		},
		draw: function () {
			if (this.initialized) {
				if (!this.paused) {
					this.parent();
					if (this.overlayText) {
						this.overlayFont.draw(this.overlayText, (ig.system.width / 2) - (this.overlayFont.widthForString(this.overlayText) / 2), ig.system.height / 2, ig.Font.ALIGN.LEFT);
					}
					this.hud.draw();
					if (ig.ua.mobile && this.mobileControls) {
						this.mobileControls.draw();
					}
				}
			}
		},
		initControls: function () {
			if (ig.ua.mobile) {
				this.mobileControls = new TouchControls();
				this.mobileControls.buttons[ig.game.ControlOrder.LEFT].action = ig.game.ControlActions.LEFT;
				this.mobileControls.buttons[ig.game.ControlOrder.RIGHT].action = ig.game.ControlActions.RIGHT;
				this.mobileControls.buttons[ig.game.ControlOrder.SHOOT].action = ig.game.ControlActions.SHOOT;
				this.mobileControls.buttons[ig.game.ControlOrder.JUMP].action = ig.game.ControlActions.JUMP;
			} else {
				this.enableControls();
			}
		},
		disableControls: function () {
			if (!ig.ua.mobile) {
				ig.input.unbindAll();
			} else {
				if (this.mobileControls) {
					for (var i = 0; i < this.mobileControls.buttons.length; i++) {
						this.mobileControls.buttons[i].action = 'undefined';
					}
				}
			}
		},
		enableControls: function () {
			if (!ig.ua.mobile) {
				ig.input.bind(ig.KEY.RIGHT_ARROW, ig.game.ControlActions.RIGHT);
				ig.input.bind(ig.KEY.LEFT_ARROW, ig.game.ControlActions.LEFT);
				ig.input.bind(ig.KEY.SPACE, ig.game.ControlActions.JUMP);
				ig.input.bind(ig.KEY.SHIFT, ig.game.ControlActions.SHOOT);
				ig.input.bind(ig.KEY.TAB, ig.game.ControlActions.SWAPWEAPON);
				ig.input.bind(ig.KEY.ESC, ig.game.ControlActions.PAUSE);
				ig.input.bind(ig.KEY.TILDE, ig.game.ControlActions.PROMPT);
			}
		},
		freezeEnemies: function () {
			var arr = this.getEntitiesByType('EntityEnemy');
			for (var i = 0; i < arr.length; i++) {
				arr[i].stop = true;
			}
			this.hud.drawHud = false;
		},
		unfreezeEnemies: function () {
			var arr = this.getEntitiesByType('EntityEnemy');
			for (var i = 0; i < arr.length; i++) {
				arr[i].stop = false;
			}
			this.hud.drawHud = true;
		},
		setActiveCheckpoint: function (num) {
			this.activeCheckpoint = num;
		},
		loadConsole: function () {
			$.get("./html/console.html", function (html) {
				$("#console-wrapper").html(html);
			});
		}
	});
});