ig.module('game.data.data').requires('impact.game').defines(function () {
	ig.Game.inject({
		Points: {
			checkpoint: 15,
			item: {
				coin: 5,
				health: 10,
				energy: 10
			},
			powerup: 50,
			enemy: [15, 25, 40, 75, 125, 200, 300]
		},
		StartingGoals: {
			checkpoints: false,
			powerups: false,
			review: false
		},
		StartingGoalsData: {
			checkpointsReached: 0,
			checkpointsTotal: undefined,
			powerupsObtained: 0,
			powerupsTotal: undefined
		},
		ReadyForReview: {
			checkpoints: true,
			powerups: true,
			review: false
		},
		CompletedGoals: {
			checkpoints: true,
			powerups: true,
			review: true
		},
		PowerupsPerLevel: [2, 6, 2, 3, 4, 2, 1],
		CheckpointsPerLevel: [2, 4, 3, 2, 0, 0, 0],
		ControlOrder: {
			LEFT: 0,
			RIGHT: 1,
			SHOOT: 2,
			JUMP: 3
		},
		ControlActions: {
			LEFT: "left",
			RIGHT: "right",
			SHOOT: "shoot",
			JUMP: "jump",
			SWAPWEAPON: 'swapWeapon',
			PAUSE: "pause",
			PROMPT: "prompt"
		}
	});
});