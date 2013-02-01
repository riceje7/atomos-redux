function reviewFunc0() {
	var review = ig.game.getEntitiesByType("EntityReview")[0];
	var linebreak = "\n";

	function question0() {
		ig.game.promptUser();
		var id = self.setInterval(function () {
			if (review.currentAnswerCorrect) {
				review.currentAnswerCorrect = false;
				review.currentQuestion++;
				clearInterval(id);
				sandbox.model.evaluate(":log Correct! Let's try another question...");
				question1();
			}
		}, 500);
	}

	function question1() {
		review.message = review.wordWrapper.wrapMessage(ig.game.scriptManager.reviews.level0.question1.msg);
		ig.game.promptUser();
		var id = self.setInterval(function () {
			if (review.currentAnswerCorrect) {
				clearInterval(id);
				review.currentAnswerCorrect = false;
				review.currentQuestion++;
				sandbox.model.evaluate(":log Correct! Let's try another question...");
				question2();
			}
		}, 500);
	}

	function question2() {
		review.message = review.wordWrapper.wrapMessage(ig.game.scriptManager.reviews.level0.question2.msg);
		var id = self.setInterval(function () {
			if (review.currentAnswerCorrect) {
				clearInterval(id);	
				sandbox.model.evaluate(":log Correct! Get ready for a new level...");
				ig.game.getEntitiesByType("EntityReview")[0].kill();
				ig.game.overlayText = "Now Loading Level: " + (ig.game.currentLevel + 1).toString();
				ig.game.player.data.goalsAccomplished.review = true;
			}
		}, 500);
	}

	question0();
	return;
}