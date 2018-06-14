// The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    // 'active' means all requested fonts have finished loading
    // We set a 1 second delay before calling the dummy function 'createText'.
    // For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, this.createText); },

    // The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Open Sans', 'Shadows Into Light']
    },
	
	createText: function () {
		// dummy function to render Google web fonts
	}

};

// Boot screen, JS object literal notation
var boot = {

	preload: function () {
		"use strict";

		// Add the loadingbar to the scene:
		var loadingBar = game.add.sprite(game.world.centerX - (387 / 2), 400, 'loading');

		this.load.setPreloadSprite(loadingBar);
		
		// Load the Google WebFont Loader script
    	game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		
		// preloading animation sprites
		game.load.spritesheet('button', 'images/button-sprite02.png', 300, 75, 3);
		game.load.spritesheet('playAgain', 'images/button_again_sprite02.png', 300, 75, 3);
		
		
		game.load.audio('click', 'audio/click02.mp3');
		game.load.audio('bgSound', 'audio/hunting.mp3');
		game.load.audio('hauntedhouse', 'audio/hauntedhouse.mp3');
		game.load.audio('winSound', 'audio/TaDa.mp3');



		// preloading all images files

		game.load.image('loading-bg', 'images/loading-bg.png');

		game.load.image('bg', 'images/bg04.png');
		game.load.image('bg02', 'images/bg05.png');
		game.load.image('bgwin', 'images/bg-win.png');

    	game.load.image('ground', 'images/platform.png');
		game.load.image('ground02', 'images/platform02.png');

		game.load.image('clue', 'images/mg.png');
		game.load.image('door', 'images/door.png');
    	game.load.spritesheet('dude', 'images/policeman-sprite.png', 40, 50);
    	//game.load.spritesheet('holmes', 'images/policeman-sprite.png', 40, 50);
		
		game.load.image('bag', 'images/bag.png');
		game.load.image('hhh', 'images/hhholmes.png');



	},

	create: function () {
		"use strict";
		game.add.image(0, 0, 'loading-bg');
			
		
		var titleShadow = game.add.text(game.world.centerX + 3, 53, 'THE MURDER CASTLE', {
			font: "75px Shadows Into Light",
			fill: "#000"
		});
		
		titleShadow.anchor.set(0.5);
		
		var title = game.add.text(game.world.centerX, 50, 'THE MURDER CASTLE', {
			font: "75px Shadows Into Light",
			fill: "#fff"
		});
		
		title.anchor.set(0.5);
		
		var subTitle = game.add.text(game.world.centerX, 230, 'Phaser 2/CE EXAM DEMO, 2 levels', {
			font: "25px Shadows Into Light",
			fill: "#fff"
		});
		
		subTitle.anchor.set(0.5);

		var button = game.add.button(game.world.centerX - 150, 250, 'button', this.actionOnClick, this, 2, 1, 0);

		this.dude = game.add.sprite(game.width / 2, 100, 'dude');
		this.dude.anchor.setTo(0.5, 0);
		game.physics.enable(this.dude);
		game.physics.arcade.enableBody(this.dude); // important for velocity (movement) + collision detection
		this.dude.body.collideWorldBounds = true; // catcher cannot leave the world ;-)
		this.dude.body.velocity.setTo(-100, 0);
		this.dude.body.bounce.set(1, 1);
		
		
	},

	update: function () {
		"use strict";
		if (this.dude.body.blocked.left) {
			this.dude.scale.x = -1;
		} else if (this.dude.body.blocked.right) {
			this.dude.scale.x = 1;
		}

	},

	actionOnClick: function () {
		// launching level 1 splash screen
		//game.state.start('splash1');
		game.state.start('splash1');
	}

}