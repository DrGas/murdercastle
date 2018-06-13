// The first level, JS object literal notation
// global variable for the playAgain button
var button;
// variable to control the feedback message display
var update = true;

//from the tutorial
var platforms02;
var bg;
var ground02;
var bags;
var ledge;
var player;
var hhh;
var doors;
var score = 0;
var scoreText;
var cursors;
var width;
var killer;


var level2 = {

	create: function () {
		
		//BACKGROUND AND LEDGES
		
 //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'bg02');


    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground02');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground02'); //bottom right

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground02'); //left

    ledge.body.immovable = true;		
		
	ledge = platforms.create(600, 200, 'ground02');
	
	ledge.body.immovable = true;		

	
	ledge = platforms.create(-300, 100, 'ground02');


	ledge.body.immovable = true;		
	

	//platform.scale.setTo(5.5);
		

		//game.add.image(0, 0, 'bg');
		// button needs to be created here, but is hidden as default
		button = game.add.button(game.world.centerX - 150, 150, 'playAgain', this.actionOnClick, this, 2, 1, 0);
		button.visible = false;

		this.scoreTxt = game.add.text(10, 10, score.toString(), {
			font: "30px Shadows Into Light",
			fill: "#779597"
		});
		
		this.scoreTxt.font = 'Shadows Into Light';

		// Create a custom timer (global variable countDown + format function in game.js)
		this.timer = game.time.create();

		// Create a delayed event 1m and 30s from now
		this.timerEvent = this.timer.add(Phaser.Timer.SECOND * countDown, this.endTimer, this);

		// Start the timer
		this.timer.start();

		// Display the timer
		this.txtTimer = game.add.text(740, 10, formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), {
			font: "40px Shadows Into Light",
			fill: "#779597"
		});
		
		this.txtTimer.font = 'Shadows Into Light';
		
		
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
		
		
		
		//CLUES - BAGS
		
		 bags = game.add.group();

    	bags.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var bag = bags.create(i * 70, 0, 'bag');

        //  Let gravity do its thing
        bag.body.gravity.y = 200;

        //  This just gives each star a slightly random bounce value
        bag.body.bounce.y = 0.2 + Math.random() * 0.2;
    }
    
		//DOOR
		var doors = platforms.create(200, 460, 'door');
		doors.body.immovable = true;

		//MOVEMENT
		cursors = game.input.keyboard.createCursorKeys();
		
		//SOUND
		bgSound = game.add.audio('bgSound');
		bgSound.play();
		bgSound.loopFull;

		

		
		//HHHOLMES
	/*	hhh = game.add.sprite(400, game.world.height - 350, 'hhh');
		game.physics.enable(hhh);
		game.physics.arcade.enableBody(hhh); 
		
		hhh.body.bounce.y = 0.2;
    	hhh.body.gravity.y = 300;
    	hhh.body.collideWorldBounds = true;*/
		
		
	/*	
		this.hhh = game.add.sprite(400, game.world.height - 350, 'hhh');
		this.hhh.anchor.setTo(-3, -2);
		game.physics.enable(this.hhh);
		game.physics.arcade.enableBody(this.hhh); // important for velocity (movement) + collision detection
		this.hhh.body.collideWorldBounds = true; //cannot leave the world
		this.hhh.body.velocity.setTo(-100, 0);
		this.hhh.body.bounce.set(1, 1);
		//this.hhh.body.blocked.left(400);*/
		
		
		this.hhh = game.add.group();
		game.physics.arcade.enable(this.hhh);
		//  We will enable physics for any object that is created in this group
		this.hhh.enableBody = true;
		this.killer = this.hhh.create(400, 340, 'hhh');
	
		//tween to move the jellyfishs
		game.add.tween(this.hhh).to(
			{x: 300}, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true)

				
	},

	update: function () {
	
		//  Collide the player and the object with the platforms
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(bags, platforms);

		game.physics.arcade.overlap(player, bags, this.collectItem, null, this);
		game.physics.arcade.overlap(player, this.hhh, this.hitHHH, null, this);


		
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
		if (score === 12) {
			this.win();
		}
		

		
	},
	
	
	collectItem: function (player, bag) {
    // Removes the star from the screen
	score++;
	level2.scoreTxt.setText(score.toString());
    bag.destroy();
		
		

},
	


	endTimer: function () {
		// Stop the timer when the delayed event triggers
		this.timer.stop();
	},
	// winning, loosing
	win: function () {
		update = false;
		player.kill();
		this.hhh.kill();
		this.timer.stop();
		bgSound.stop();
		this.winSound = game.add.audio('winSound');
		this.winSound.play();
		txtGameOver = game.add.text(game.world.centerX, -100, "CONGRATULATIONS \nYOU SURVIVED \nTHE MURDER CASTLE!", {
			font: "50px Shadows Into Light",
			fill: "#FFF"
		});
		txtGameOver.anchor.set(0.5);
		tween = game.add.tween(txtGameOver).to({
			y: game.world.centerY
		}, 1500, Phaser.Easing.Bounce.Out, true);
		//RESET GLOBAL SCORE
		score = 0;


	},

	loose: function () {

		bags.destroy();
		//bgSound.stop();
		player.kill();
		this.hhh.kill();
		this.timer.stop();
		
		
		/*
		Difference between Kill and Destroy

		Kill is supposed to halt rendering, but the object still exists. It is good if you want to make a reusable object. You could create the object again without the cost of actually creating the object again.

		Destroy should remove the object and everything related to it. You use this when you want to send the object to the garbage collector.
		*/
		txtGameOver = game.add.text(game.world.centerX, -100, "GAME OVER - YOU LOST", {
			font: "50px Shadows Into Light",
			fill: "#FFF"
		});
		txtGameOver.anchor.set(0.5);
		// text animation
		tween = game.add.tween(txtGameOver).to({
			y: game.world.centerY-200
		}, 1500, Phaser.Easing.Bounce.Out, true);
		// revealing the playAgain button
		button.visible = true;
	},

	actionOnClick: function () {
		score = 0;
		// resetting update when replaying the level
		update = true;
		// launching level 1 again
		game.state.start('level2');
	},	
	
	hitHHH: function() {
		console.log("hitted");
		this.hhh.kill();
		player.kill();
		
		txtGameOver = game.add.text(game.world.centerX, -100, "GAME OVER - YOU LOST", {
			font: "50px Shadows Into Light",
			fill: "#FFF"
		});
		txtGameOver.anchor.set(0.5);
		// text animation
		tween = game.add.tween(txtGameOver).to({
			y: game.world.centerY-200
		}, 1500, Phaser.Easing.Bounce.Out, true);
		// revealing the playAgain button
		button.visible = true;
		
	}
	
	};

/*function hitHHH (player, hhh) {
   console.log("dieeee");
		player.kill();
		hhh.kill();*/
		
	
	