// Splash screen level 1, JS object literal notation

var splash2 = {

	create: function () {

		game.add.image(0, 0, 'loading-bg');

		var instructions = game.add.text(game.world.centerX, -50, 'Level 2: \nCollect all the items of missing persons and don’t get caught by the killer!!', {
			font: "25px Verdana",
			fill: "#fff"
		});
		
		instructions.anchor.set(0.5);
		
		tween = game.add.tween(instructions).to({
			y: game.world.centerY-100
		}, 1500, Phaser.Easing.Bounce.Out, true);
		tween.onComplete.add(onComplete, this);
		
		introSound = game.add.audio('hauntedhouse');
		introSound.play();
		introSound.loopFull;
		
		// Add the background sound
		bgSound = game.add.audio('wouldn_doo');
		bgSound.play();
		bgSound.loopFull();

		setTimeout(function () {
			game.state.start("level2");
		}, 5000);
		
		function onComplete() {

    		this.tween = game.add.tween(instructions).to( { y: 700 }, 1000, Phaser.Easing.Exponential.Out, true, 2500);

			}
		
	},

};