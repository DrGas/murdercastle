// Splash screen level 1, JS object literal notation

var splashwin = {

	create: function () {

		game.add.image(0, 0, 'bg-win');
		
		introSound = game.add.audio('hauntedhouse');
		introSound.play();
		introSound.loopFull;
		
		// Add the background sound
		bgSound = game.add.audio('wouldn_doo');
		bgSound.play();
		bgSound.loopFull();

		
		
	},

};