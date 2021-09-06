const k = kaboom({
	global: true,
	width: 64, 
	height: 64,
	scale: 8,
	debug: true,
    font: "sinko",
	// scaleMode: "stretch",
	clearColor: [226, 120, 44]
});

// Load assets 

loadSound("music", "./sounds/music.ogg")
loadSound("trr", "./sounds/trr.wav");
loadSound("sc", "./sounds/sc.wav");
loadSound("bum", "./sounds/bum.wav")
loadSound("count", "./sounds/count.wav");
loadSprite("logo", "./sprites/logo.png");
loadSprite("banana", "./sprites/banana.png");
loadSprite("v", "./sprites/v.png");
loadSprite("jump_bg", "./sprites/jump_bg.png");
loadSprite("kario_face", "./sprites/kario_face.png");
loadSprite("kaka_face", "./sprites/kaka_face.png");
loadSprite("kario_rock", "./sprites/kario_rock.png");
loadSprite("kaka_rock", "./sprites/kaka_rock.png");
loadSprite("kario_paper", "./sprites/kario_paper.png");
loadSprite("kaka_paper", "./sprites/kaka_paper.png");
loadSprite("kario_scissors", "./sprites/kario_scissors.png");
loadSprite("kaka_scissors", "./sprites/kaka_scissors.png");
loadSprite("kario", "./sprites/kario.png", {
	sliceX: 2,
	sliceY: 1,
	animSpeed: 0.8,
	anims: {
		idle: {
			from: 0, 
			to: 0
		},
		run: {
			from: 0,
			to: 1
		},
		jump: {
			from: 1,
			to: 1,
		}
	}
});
loadSprite("kaka", "./sprites/kaka.png", {
	sliceX: 2,
	sliceY: 1,
	animSpeed: 0.8,
	anims: {
		idle: {
			from: 0, 
			to: 0
		},
		run: {
			from: 0,
			to: 1
		},
		jump: {
			from: 1,
			to: 1,
		}
	}
});

// Scenes

scene("menu", () => {
	let selectedButton = 1;
	const bananaSpawnTime = 0.5;

	layers(["bananas", "menu"], "menu");

	const title = add([
		sprite("logo"),
		origin("center"),
		scale(0.9),
		pos(width() / 2, 25)
	]);

	const start = add([
		text("Any key for play", {size: 2.5}),
		pos(width() / 2, 60),
		origin("center")
	]);

	loop(bananaSpawnTime, () => {
		add([
			sprite("banana"),
			pos(-72, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);
		
		add([
			sprite("banana"),
			pos(-59, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);

		add([
			sprite("banana"),
			pos(-46, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);

		add([
			sprite("banana"),
			pos(-33, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);

		add([
			sprite("banana"),
			pos(-20, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);

		add([
			sprite("banana"),
			pos(-7, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);
		
		add([
			sprite("banana"),
			pos(3, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);

		add([
			sprite("banana"),
			pos(16, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);

		add([
			sprite("banana", {noArea: true}),
			pos(29, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);

		add([
			sprite("banana", {noArea: true}),
			pos(42, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);

		add([
			sprite("banana", {noArea: true}),
			pos(55, -7),
			scale(0.6),
			origin("center"),
			layer("bananas"),
			"banana"
		]);
	});

	action(() => {
		if(keyIsPressed("enter") || keyIsPressed("space")) {
			go("game");
		};
	});

	action("banana", (banana) => {
		banana.move(10, 10);

		if(banana.pos.y > height() + 7) {
			destroy(banana);
		};
	});
});

scene("game", () => {
	const m = play("music");
	m.loop();
	
	const INITIAL_POS = 25;
	const SELECTION_TIME = 3;
	let BACKGROUND_SPEED = -30;
	let V_SPEED = -15;
	let FRAME_POS = {x: 0, y: 44};

	layers(["bakground", "game", "kaka", "ui"], "game");

	add([
		rect(width(), height()),
		color(rgb(0, 0, 0)),
		layer("background")
	])

	add([
		sprite("jump_bg"),
		pos(0, 0),
		layer("background"),
		"background"
	]);

	add([
		sprite("jump_bg"),
		pos(width(), 0),
		layer("background"),
		"background"
	]);

	add([
		rect(width(), 20),
		pos(0, 44),
		color(37, 138, 136),
		layer("ui")
	]);

	const karioRock = add([
		sprite("kario_rock"),
		pos(FRAME_POS.x + 15, FRAME_POS.y + 1),
		scale(0.4),
        fixed(),
		layer("ui")
	]);

	const karioPaper = add([
		sprite("kario_paper"),
		pos(FRAME_POS.x + 15, FRAME_POS.y + 7),
		scale(0.4),
        fixed(),
		layer("ui")
	]);

	const karioScissors = add([
		sprite("kario_scissors"),
		pos(FRAME_POS.x + 15, FRAME_POS.y + 13),
		scale(0.4),
        fixed(),
		layer("ui")
	]);

	const kakaRock = add([
		sprite("kaka_rock", {flipX: true}),
		pos(FRAME_POS.x + 49, FRAME_POS.y + 1),
		scale(0.4),
        fixed(),
		origin("topright"),
		layer("ui")
	]);

	const kakaPaper = add([
		sprite("kaka_paper", {flipX: true}),
		pos(FRAME_POS.x + 49, FRAME_POS.y + 7),
		scale(0.4),
        fixed(),
		origin("topright"),
		layer("ui")
	]);

	const kakaScissors = add([
		sprite("kaka_scissors", {flipX: true}),
		pos(FRAME_POS.x + 49, FRAME_POS.y + 13),
		scale(0.4),
        fixed(),
		origin("topright"),
		layer("ui")
	]);

	add([
		sprite("kario_face"),
		pos(FRAME_POS.x + 1, FRAME_POS.y + 2),
		scale(0.8),
        fixed(),
		layer("ui")
	]);

	add([
		sprite("kaka_face", {flipX: true}),
		pos(63, FRAME_POS.y + 2),
		scale(0.8),
        fixed(),
		origin("topright"),
		layer("ui")
	]);
	
	const karioBananaOne = add([
		sprite("banana"),
		pos(FRAME_POS.x + 1, FRAME_POS.y + 13),
		scale(0.7),
        fixed(),
		layer("ui")
	]);

	const karioBananaTwo = add([
		sprite("banana"),
		pos(FRAME_POS.x + 5, FRAME_POS.y + 13),
		scale(0.7),
        fixed(),
		layer("ui")
	]);

	const karioBananaThree = add([
		sprite("banana"),
		pos(FRAME_POS.x + 9, FRAME_POS.y + 13),
		scale(0.7),
        fixed(),
		layer("ui")
	]);

	const kakaBananaOne = add([
		sprite("banana", {flipX: true}),
		pos(width() - 1, FRAME_POS.y + 13),
		scale(0.7),
        fixed(),
		origin("topright"),
		layer("ui")
	]);

	const kakaBananaTwo = add([
		sprite("banana", {flipX: true}),
		pos(width() - 5, FRAME_POS.y + 13),
		scale(0.7),
        fixed(),
		origin("topright"),
		layer("ui")
	]);
	
	const kakaBananaThree = add([
		sprite("banana", {flipX: true}),
		pos(width() - 9, FRAME_POS.y + 13),
		scale(0.7),
        fixed(),
		origin("topright"),
		layer("ui")
	]);
	
	const stateText = add([
		text("", 9),
		pos(width() / 2, height() - 8),
		origin("center"),
        fixed(),
		layer("ui"),
		{
			counter: SELECTION_TIME + 1,
		}
	]);

	const kario = add([
		sprite("kario"),
		pos(INITIAL_POS, 15),
		scale(0.7),
		{
			selection: null,
			bananas: [karioBananaOne, karioBananaTwo, karioBananaThree]
		}
	]);

	const kaka = add([
		sprite("kaka"),
		pos(INITIAL_POS, 27),
		scale(0.7),
		layer("kaka"),
		{
			selection: null,
			bananas: [kakaBananaOne, kakaBananaTwo, kakaBananaThree]
		}
	]);

	kario.play("run");
	kaka.play("run");

	// Functions

	function startTime() {
		wait(1.5, () => {
			startBattle();
		});
	};

	startTime();

	function startBattle() {	
		let cancelSelection = action(() => {
			if(keyIsPressed("a")) {
				kario.selection = "rock";
			}
			else if(keyIsPressed("s")) {
				kario.selection = "paper";
			}
			else if(keyIsPressed("d")) {
				kario.selection = "scissors";
			};

			if(keyIsPressed("left")) {
				kaka.selection = "rock";
			}
			else if(keyIsPressed("down")) {
				kaka.selection = "paper";
			}
			else if(keyIsPressed("right")) {
				kaka.selection = "scissors";
			};
		});
		
		const cancelCount = loop(1, () => {
			stateText.counter--;
			stateText.text = stateText.counter;
			play("count");
		});

		wait(SELECTION_TIME, () => {
			cancelSelection();
			cancelCount();

			stateText.counter = SELECTION_TIME  + 1;
			stateText.text = ""

			let selectionOne;
			let selectionTwo;

			if(!kario.selection) kario.selection = choose(["rock", "paper", "scissors"]);
			if(!kaka.selection) kaka.selection = choose(["rock", "paper", "scissors"]);

			if(kario.selection == "rock") {
				selectionOne = karioRock;
			}
			else if(kario.selection == "paper") {
				selectionOne = karioPaper;
			}
			else if(kario.selection == "scissors") {
				selectionOne = karioScissors;
			};

			if(kaka.selection == "rock") {
				selectionTwo = kakaRock;
			}
			else if(kaka.selection == "paper") {
				selectionTwo = kakaPaper;
			}
			else if(kaka.selection == "scissors") {
				selectionTwo = kakaScissors;
			};
			
			endBattle(selectionOne, selectionTwo);
		});
	};

	function endBattle(s1, s2) {
		const cancelMoveSelections = action(() => {
			if(s1.pos.x < 22) s1.move(25, 0);
			if(s2.pos.x > 42) s2.move(-25, 0);		
		});

		play("sc");

		wait(0.5, () => shake(0.5));
		
		wait(1.5, () => {
			cancelMoveSelections();
			
			const cancelBackSelections = action(() => {
				if(s1.pos.x >= 15) s1.move(-25, 0);
				if(s2.pos.x <= 49) s2.move(25, 0);
			});

			play("sc");

			if(kario.selection == "rock" && kaka.selection == "scissors") kaka.trigger("loose");
			else if(kario.selection == "paper" && kaka.selection == "rock") kaka.trigger("loose");
			else if(kario.selection == "scissors" && kaka.selection == "paper") kaka.trigger("loose");
			else if(kaka.selection == "rock" && kario.selection == "scissors") kario.trigger("loose");
			else if(kaka.selection == "paper" && kario.selection == "rock") kario.trigger("loose");
			else if(kaka.selection == "scissors" && kario.selection == "paper") kario.trigger("loose");

			wait(0.4, () => {
				cancelBackSelections();
				s1.pos.x = 15;
				s2.pos.x = 49;
				kario.selection = null;
				kaka.selection = null;
				startTime();
			});
		});
	};
	
	// Actions	

	action("background", (bg) => {
		bg.move(BACKGROUND_SPEED, 0);

		if(bg.pos.x <= -width()) {
			bg.pos.x += width() * 2;
		};
	});

	action("v", (v) => {
		v.move(V_SPEED, 0);

		if(v.pos.x <= -10) {
			destroy(v)
		};
	});

	// Events

	kario.on("dead", () => {
		shake(3);
		play("trr");
		
		const cancelMove = action(() => {
			if(kario.pos.x < 25) {
				kario.move(25, 0)
			} else {
				cancelMove();
			}
		});

		const bananaToDelete = kario.bananas.pop();
		bananaToDelete.hidden = true;

		if(kario.bananas.length == 0) {
			m.stop()
			go("win", false)
		}
	});

	kaka.on("dead", () => {
		shake(3);
		play("trr");
		
		const cancelMove = action(() => {
			if(kaka.pos.x < 25) {
				kaka.move(25, 0)
			} else {
				cancelMove();
			}
		});

		const bananaToDelete = kaka.bananas.pop();
		bananaToDelete.hidden = true;

		if(kaka.bananas.length === 0) {
			m.stop()
			go("win", true)
		}
	});

	kario.on("loose", () => {
		play("bum", {volume: 0.5})
		shake(1)

		const destroyLoose = action(() => {
			kario.move(-5, 0);
		})

		wait(1.5, () => {
			destroyLoose() 
			if(kario.pos.x + 4 < 0) kario.trigger("dead");
		});
	});

	kaka.on("loose", () => {
		play("bum", {volume: 0.5})
		shake(1)

		const destroyLoose = action(() => {
			kaka.move(-5, 0);
		})

		wait(1.5, () => {
			destroyLoose()
			if(kaka.pos.x + 4 < 0) kaka.trigger("dead");
		});
	});


	// Input

	action(() => {
		
	});
});

scene("win", (kario) => {
	if(kario) {
		add([
			sprite("kario"),
			pos(width() / 2, height() / 3),
			origin("center"),
			scale(2)
		]).play("run")

		add([
			text("Kario wins!", 3),
			pos(width() / 2, 45),
			origin("center")
		]);
	} 
	else {
		add([
			sprite("kaka"),
			pos(width() / 2, height() / 3),
			origin("center"),
			scale(2)
		]).play("run")

		add([
			text("Kaka wins!", 3),
			pos(width() / 2, 45),
			origin("center")
		]);
	};

	add([
		text("[space or enter for main menu]", 1.5),
		pos(width() / 2, 55),
		origin("center")
	]);

	action(() => {
		if(keyIsPressed("space") || keyIsPressed("enter")) {
			go("menu")
		};
	})
});

go("menu");