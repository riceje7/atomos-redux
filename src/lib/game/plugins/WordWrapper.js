ig.module('game.plugins.WordWrapper').requires('impact.font').defines(function () {
	WordWrapper = ig.Class.extend({
		font: null,
		box: null,
		init: function (f, b) {
			this.font = f;
			this.box = b;
		},
		wrapMessage: function (msg) {
			var maxLineWidth = this.box.w;
			var maxMsgHeight = this.box.h;
			var newMessages = [];
			var lines = [];
			var line = '';
			var words = msg.split(' ');
			for (var i = 0; i < words.length; i++) {
				var space = (i == 0) ? '' : ' ';
				if (this.font.widthForString(line + space + words[i]) <= maxLineWidth) {
					line += space + words[i];
				} else {
					lines.push(line);
					line = words[i];
				}
			}
			if (line != '') {
				lines.push(line);
			}
			var newMessage = '';
			for (var i = 0; i < lines.length; i++) {
				if (i != 0) {
					if (this.font.heightForString(newMessage + "\n") <= maxMsgHeight) {
						newMessage += "\n" + lines[i];
					} else {
						newMessages.push(newMessage);
						newMessage = lines[i];
					}
				} else {
					newMessage = lines[i];
				}
			}
			if (newMessage != '') {
				newMessages.push(newMessage);
			}
			return newMessages;
		}
	});
});