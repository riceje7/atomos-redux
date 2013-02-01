ig.module('game.entities.review').requires('game.entities.infooverlay').defines(function () {
	EntityReview = EntityInfooverlay.extend({
		script: null,
		running: false,
		func: null,
		finished: false,
		currentQuestion: 0,
		currentAnswerCorrect: false,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			$.ajaxSetup({
				async: false
			});
			$.getScript("../../../scripts/review-level-" + ig.game.currentLevel.toString() + ".js");	
			$.ajaxSetup({
				async: true
			});
			this.func = "reviewFunc"+ig.game.currentLevel.toString()+"();";
		},
		run: function () {
			this.running = true;
			$.globalEval(this.func);
		}
	});
});