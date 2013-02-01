function reviewFunc3() {
	var review = ig.game.getEntitiesByType("EntityReview")[0];
	var linebreak = "\n";

	function question0() {
		var id = self.setInterval(function () {
			if (review.currentAnswerCorrect) {
				review.currentAnswerCorrect = false;
				review.currentQuestion++;
				clearInterval(id);
				sandbox.model.evaluate(":log Correct! Let's try another Question...");
				question1();
			}
		}, 500);
	}

	function question1() {
		review.message = review.wordWrapper.wrapMessage(ig.game.scriptManager.reviews.level3.question1.msg);
		var id = self.setInterval(function () {
			if (review.currentAnswerCorrect) {
				review.currentAnswerCorrect = false;
				review.currentQuestion++;
				clearInterval(id);
				sandbox.model.evaluate(":log Correct! Let's try another Question...");
				question2();
			}
		}, 500);
	}
	
	function question2() {
		review.message = review.wordWrapper.wrapMessage(ig.game.scriptManager.reviews.level3.question2.msg);
		var id = self.setInterval(function () {
			if (review.currentAnswerCorrect) {
				review.currentAnswerCorrect = false;
				review.currentQuestion++;
				clearInterval(id);
				sandbox.model.evaluate(":log Correct! Let's try another Question...");
				question3();
			}
		}, 500);
	}
	
	function question3() {
		review.message = review.wordWrapper.wrapMessage(ig.game.scriptManager.reviews.level3.question3.msg);
		var id = self.setInterval(function () {
			if (review.currentAnswerCorrect) {
				review.currentAnswerCorrect = false;
				review.currentQuestion++;
				clearInterval(id);
				sandbox.model.evaluate(":log Correct! Let's try another Question...");
				question4();
			}
		}, 500);
	}

	function question4() {
		review.message = review.wordWrapper.wrapMessage(ig.game.scriptManager.reviews.level3.question4.msg);
		var id = self.setInterval(function () {
			if (review.currentAnswerCorrect) {
				clearInterval(id);	
				sandbox.model.evaluate(":log Correct! Get ready for a new level...");
				review.kill();
				ig.game.overlayText = "Now Loading Level: " + (ig.game.currentLevel + 1).toString();
				ig.game.player.data.goalsAccomplished.review = true;
			}
		}, 500);
	}
	
	
	question0();
	return;
}