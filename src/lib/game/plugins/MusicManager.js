ig.module('game.plugins.MusicManager').requires('impact.sound', 'game.plugins.ImpactEvents').defines(function () {
	MusicManager = ig.Class.extend({
		volume: 1.0,
		currentLevel: null,
		init: function () {
			this.addTracks();
			ig.music.loop = true;
		},
		addTracks: function () {
			ig.music.add('media/music-track-01.ogg', "track-00");
			ig.music.add('media/music-track-02.ogg', "track-01");
			ig.music.add('media/music-track-03.ogg', "track-02");
			ig.music.add('media/music-track-04.ogg', "track-03");
		},
		changeTrackForLevel: function (levelNum) {
			var trackName = "track-0"+levelNum.toString();
			ig.music.fadeOut(.25);
			setTimeout(function () {
				ig.music.play(trackName);
			}, 500);
		},
		changeVolume: function (newVol) {
			this.volume = newVol;
			ig.music.volume = this.volume;
		}
	});
});