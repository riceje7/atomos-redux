ig.module('game.menus.StartScreen').requires('game.menus.LevelSelect', 'impact.game', 'impact.font', 'impact.image', 'game.plugins.touch-button', 'game.plugins.impact-storage', 'game.plugins.PersistantData', 'game.scripts.MasterScript').defines(function () {
	StartScreen = ig.Game.extend({
		titleFont: new ig.Font('media/visitor80-EDF9FF.png'),
		instructFont: new ig.Font('media/visitor24-EDF9FF.png'),
		background: new ig.Image('media/startbg.png'),
		titlePos: {
			x: 32,
			y: 32
		},
		instructPos: {
			x: 410,
			y: 250
		},
		enterButton: null,
		storage: null,
		init: function () {
			this.storage = new ig.Storage();
			if (ig.game.storage.isCapable()) {
				this.loadUserData();
				if(this.persistantData && this.persistantData.comingFromGameOver){
					ig.game.userData.lives = 3;
					ig.game.storage.set(gbl_userName+'-	lives', 3);
				}
			} else {
				$.confirm({
					'title': "Your Browser Is Obsolete",
					'message': "Atomos-Redux requires the use of LocalStorage, however your current browser does not support it. Please upgrade your browser or download a new one below.",
					'buttons': {
						'Chrome': {
							'class': 'blue',
							'action': function () {
								window.location = "https://www.google.com/intl/en/chrome/browser/";
							}
						},
						'Firefox': {
							'class': 'gray',
							'action': function () {
								window.location = "http://www.mozilla.org/en-US/firefox/new/";
							}
						}
					}
				});
			}
			if (ig.ua.mobile) {
				this.enterButton = new ig.TouchButton("start", 450, 300, 96, 48, new ig.Image('media/enter-buttons.png'), 0);
			} else {
				ig.input.bind(ig.KEY.ENTER, 'start');
			}
		},
		update: function () {
			if (ig.input.pressed('start')) {
				ig.system.setGame(LevelSelect, {
					userData: ig.game.userData,
					storage: ig.game.storage
				});
			}
			this.parent();
		},
		draw: function () {
			this.parent();
			this.background.draw(0, 0);
			//this.titleFont.draw("Atomos Redux", this.titlePos.x, this.titlePos.y, ig.Font.ALIGN.LEFT);
			this.instructFont.draw('Press Enter to Launch Atomos...', this.instructPos.x, this.instructPos.y, ig.Font.ALIGN.CENTER);
			if (this.enterButton) {
				this.enterButton.draw();
			}
		},
		loadUserData: function () {
			var userData;
			if (ig.game.storage.isSet(gbl_userName + '-userName')) {
				userData = {
					userName: ig.game.storage.get(gbl_userName + '-userName'),
					nextLevel: ig.game.storage.getInt(gbl_userName + '-nextLevel'),
					powerups: ig.game.storage.get(gbl_userName + '-powerups'),
					coins: ig.game.storage.getInt(gbl_userName + '-coins'),
					kills: ig.game.storage.getInt(gbl_userName + '-kills'),
					lives: ig.game.storage.getInt(gbl_userName + '-lives'),
					maxEnergy: ig.game.storage.getInt(gbl_userName + '-maxEnergy'),
					maxHealth: ig.game.storage.getInt(gbl_userName + '-maxHealth'),
					levelHighscores: ig.game.storage.get(gbl_userName + '-levelHighscores'),
					aggScore: ig.game.storage.getInt(gbl_userName + '-aggScore')
				};

			} else {
				var gameData = null;
				$.ajax({
					type: "POST",
					url: "./php/loadUserData.php",
					dataType: "json",
					success: function (data) {
						gameData = data.gamedata;
					}
				});
				if (gameData === null || gameData === undefined) {
					ig.game.storage.initUnset(gbl_userName + '-userName', gbl_userName	);
					ig.game.storage.initUnset(gbl_userName + '-coins', 0);
					ig.game.storage.initUnset(gbl_userName + '-kills', 0);
					ig.game.storage.initUnset(gbl_userName + '-lives', 3);
					ig.game.storage.initUnset(gbl_userName + '-maxEnergy', 50);
					ig.game.storage.initUnset(gbl_userName + '-maxHealth', 50);
					ig.game.storage.initUnset(gbl_userName + '-nextLevel', 0);
					ig.game.storage.initUnset(gbl_userName + '-powerups', {
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
					});
					ig.game.storage.initUnset(gbl_userName + '-levelHighscores', {
						level0: 0,
						level1: 0,
						level2: 0,
						level3: 0,
						level4: 0,
						level5: 0
					});
					ig.game.storage.initUnset(gbl_userName + '-aggScore', 0);
					userData = {
						userName: ig.game.storage.get(gbl_userName + '-userName'),
						nextLevel: ig.game.storage.getInt(gbl_userName + '-nextLevel'),
						powerups: ig.game.storage.get(gbl_userName + '-powerups'),
						coins: ig.game.storage.getInt(gbl_userName + '-coins'),
						kills: ig.game.storage.getInt(gbl_userName + '-kills'),
						lives: ig.game.storage.getInt(gbl_userName + '-lives'),
						maxEnergy: ig.game.storage.getInt(gbl_userName + '-maxEnergy'),
						maxHealth: ig.game.storage.getInt(gbl_userName + '-maxHealth'),
						levelHighscores: ig.game.storage.get(gbl_userName + '-levelHighscores'),
						aggScore: ig.game.storage.getInt(gbl_userName + '-aggScore')
					};
				}
			}
			ig.Game.inject({
				userData: userData
			});
		}
	});
	ig.main('#gameCanvas', StartScreen, 60, 640, 360, 1);
});