ig.module('game.plugins.ScriptManager').requires('impact.impact').defines(function () {
	ScriptManager = ig.Class.extend({
		story: null,
		powerups: null,
		reviews: null,
		init: function () {
			this.getScripts();
			this.story = story;
			this.powerups = powerups;
			this.reviews = reviews;
		},
		getScripts: function () {
			$.ajaxSetup({
				async: false
			});
			$.getScript("../../../story/story.js");
			$.getScript("../../../story/powerups.js");
			$.getScript("../../../story/reviews.js");
			$.ajaxSetup({
				async: true
			});
		},
		getLevelStory: function (levelNum) {
			var level = "level" + levelNum.toString();
			for (var key in levels) {
				if (key === level) {
					return levels[key];
				}
			}
			return false;
		},
		getCheckpoint: function (data) {
			var checkpoint = "checkpoint" + data.num.toString();
			for (var key in data.level) {
				if (key === checkpoint) {
					return data.level[key];
				}
			}
			return false;
		}
	});
});