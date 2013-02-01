ig.module('game.plugins.PlayerCommands').defines(function () {
	PlayerCommands = ig.Class.extend({
		commandsList: ['help', 'dismiss', 'answer'],
		help: function () {
			var helpText = "\n";
			for (var i = 0; i < ig.game.player.commands.commandsList.length; i++) {
				helpText += "--> " + ig.game.player.commands.commandsList[i] + (i < ig.game.player.commands.commandsList.length-1 ? "\n" : "");
			}
			sandbox.model.addHistory({
				command: ":help",
				result: helpText
			});
		},
		dismiss: function () {
			ig.game.getEntitiesByType("EntityOverlay")[0].kill();
		},
		answer: function (input) {
			var review = ig.game.getEntitiesByType("EntityReview")[0];
			var levelName = "level" + ig.game.currentLevel.toString();
			var question = "question" + review.currentQuestion.toString();
			for (key in ig.game.scriptManager.reviews) {
				if (key === levelName) {
					var level = ig.game.scriptManager.reviews[key];
					for (key2 in level) {
						if (key2 === question) {
							var answer = level[key2].answer;
							if (input === answer || answer.test(input)) {
								review.currentAnswerCorrect = true;
							} else {
								sandbox.model.evaluate(":log Oops, looks like that's not the correct answer. Go ahead and try again...");
							}
						}
					}
				}
			}
		}
	});
});