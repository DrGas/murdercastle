// The first level, JS object literal notation
// global variable for the playAgain button
var button;
// variable to control the feedback message display
var update = true;

//from the tutorial
var platforms;
var sky;
var ground;
var stars;
var ledge;
var player;
var score = 0;
var scoreText;
var cursors;



var level1 = {

	create: function () {
		
		//BACKGROUND AND LEDGES
		
 //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;		
		
		

		//game.add.image(0, 0, 'bg');
		// button needs to be created here, but is hidden as default
		button = game.add.button(game.world.centerX - 150, 450, 'playAgain', this.actionOnClick, this, 2, 1, 0);
		button.visible = false;

		this.scoreTxt = game.add.text(10, 10, score.toString(), {
			font: "30px Arial",
			fill: "#ff0"
		});
		
		this.scoreTxt.font = 'Chewy';

		// Create a custom timer (global variable countDown + format function in game.js)
		this.timer = game.time.create();

		// Create a delayed event 1m and 30s from now
		this.timerEvent = this.timer.add(Phaser.Timer.SECOND * countDown, this.endTimer, this);

		// Start the timer
		this.timer.start();

		// Display the timer
		this.txtTimer = game.add.text(740, 10, formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), {
			font: "40px Arial",
			fill: "#ff0044"
		});
		
		this.txtTimer.font = 'Chewy';
		
		
		//code from the tutorial
		//  We're going to be using physics, so enable the Arcade Physics system

		player = game.add.sprite(32, game.world.height - 150, 'dude');
		game.physics.enable(player);
		game.physics.arcade.enableBody(player); 
		
		player.body.bounce.y = 0.2;
    	player.body.gravity.y = 300;
    	player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    	player.animations.add('left', [0, 1, 2, 3], 10, true);
    	player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		
		
		//STARS
		
		 stars = game.add.group();

    	stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 200;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.2 + Math.random() * 0.2;
    }
    
		cursors = game.input.keyboard.createCursorKeys();


		
		

	},

	update: function () {
	
		
		//from tutorial
		//  Collide the player and the stars with the platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(stars, platforms);
		
		game.physics.arcade.overlap(player, stars, this.collectItem, null, this);

		
		 //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
		
		// the countdown
		this.tmp = formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));

		if (this.timer.running && this.tmp >= 0) {
			this.txtTimer.text = formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
		} else if (score < 10 && update === true) {
			// calling the function handling a "loose" scenario
			this.loose();
			// update is used to prevent the Phaser update loop calling this function indefinitely
			update = false;
		}

		// winning
		if (score === 10) {
			this.win();
		}
		

		
	},
	
	
	collectItem: function (player, star) {
    // Removes the star from the screen
	score++;
	level1.scoreTxt.setText(score.toString());
    star.destroy();

},

/*	catHitHandler: function () {
		// playing the catch animation
		level1.catcher.animations.play('catch');
		
		this.catcherSound = game.add.audio('woosh');
		this.catcherSound.play();

		this.catSound = game.add.audio('cat');
		this.catSound.volume = 0.5;
		this.catSound.play();

		level1.cat.x = Math.random() * game.width;
		level1.cat.y = Math.random() * game.height;
		score++;
		level1.scoreTxt.setText(score.toString());
		
	},*/

	endTimer: function () {
		// Stop the timer when the delayed event triggers
		this.timer.stop();
	},
	// winning, loosing
	win: function () {
		this.cat.destroy();
		bgSound.stop();
		this.catcher.kill();
		this.timer.stop();
		// resetting the global score
		score = 0;
		game.state.start('splash2');
	},

	loose: function () {

		this.catcher.kill();
		this.cat.kill();
		this.timer.stop();
		/*
		Difference between Kill and Destroy

		Kill is supposed to halt rendering, but the object still exists. It is good if you want to make a reusable object. You could create the object again without the cost of actually creating the object again.

		Destroy should remove the object and everything related to it. You use this when you want to send the object to the garbage collector.
		*/
		txtGameOver = game.add.text(game.world.centerX, -100, "GAME OVER - YOU LOST :-(", {
			font: "50px Luckiest Guy",
			fill: "#ff0044"
		});
		txtGameOver.anchor.set(0.5);
		// text animation
		tween = game.add.tween(txtGameOver).to({
			y: game.world.centerY
		}, 1500, Phaser.Easing.Bounce.Out, true);
		// revealing the playAgain button
		button.visible = true;
	},

	actionOnClick: function () {
		score = 0;
		// resetting update when replaying the level
		update = true;
		// launching level 1 again
		game.state.start('level1');
	}
}