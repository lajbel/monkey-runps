import kaboom from "https://unpkg.com/kaboom@2000.0.0-beta.15/dist/kaboom.mjs";

// Imports //////////////////////////////////////////////////////////////////////////////////////

const k = kaboom({
    global: true,
    width: 64,
    height: 64,
    scale: 8,
    debug: true,
    font: "sinko",
    // scaleMode: "stretch",
    clearColor: [226, 120, 44],
});

// Load assets

k.loadSound("music", "./sounds/music.ogg");
k.loadSound("trr", "./sounds/trr.wav");
k.loadSound("sc", "./sounds/sc.wav");
k.loadSound("bum", "./sounds/bum.wav");
k.loadSound("count", "./sounds/count.wav");

k.loadSprite("logo", "./sprites/logo.png");
k.loadSprite("banana", "./sprites/banana.png");
k.loadSprite("v", "./sprites/v.png");
k.loadSprite("jump_bg", "./sprites/jump_bg.png");
k.loadSprite("kario_face", "./sprites/kario_face.png");
k.loadSprite("kaka_face", "./sprites/kaka_face.png");
k.loadSprite("kario_rock", "./sprites/kario_rock.png");
k.loadSprite("kaka_rock", "./sprites/kaka_rock.png");
k.loadSprite("kario_paper", "./sprites/kario_paper.png");
k.loadSprite("kaka_paper", "./sprites/kaka_paper.png");
k.loadSprite("kario_scissors", "./sprites/kario_scissors.png");
k.loadSprite("kaka_scissors", "./sprites/kaka_scissors.png");

k.loadSprite("kario", "./sprites/kario.png", {
    sliceX: 2,
    sliceY: 1,
    animSpeed: 0.8,
    anims: {
        idle: {
            from: 0,
            to: 0,
            loop: false,
        },
        run: {
            from: 0,
            to: 1,
            loop: true,
        },
        jump: {
            from: 1,
            to: 1,
            loop: false,
        },
    },
});

k.loadSprite("kaka", "./sprites/kaka.png", {
    sliceX: 2,
    sliceY: 1,
    animSpeed: 0.8,
    anims: {
        idle: {
            from: 0,
            to: 0,
            loop: false,
        },
        run: {
            from: 0,
            to: 1,
            loop: true,
        },
        jump: {
            from: 1,
            to: 1,
            loop: false,
        },
    },
});

// Scenes

k.scene("menu", () => {
    let selectedButton = 1;
    const bananaSpawnTime = 0.5;

    k.layers(["bananas", "menu"], "menu");

    const title = k.add([
        k.sprite("logo"),
        k.origin("center"),
        k.scale(0.9),
        k.pos(k.width() / 2, 25),
    ]);

    const start = k.add([
        k.text("Any key for play", { size: 2.5 }),
        k.pos(k.width() / 2, 60),
        k.origin("center"),
    ]);

    k.loop(bananaSpawnTime, () => {
        k.add([
            k.sprite("banana"),
            k.pos(-72, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana"),
            k.pos(-59, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana"),
            k.pos(-46, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana"),
            k.pos(-33, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana"),
            k.pos(-20, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana"),
            k.pos(-7, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana"),
            k.pos(3, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana"),
            k.pos(16, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana", { noArea: true }),
            k.pos(29, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana", { noArea: true }),
            k.pos(42, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);

        k.add([
            k.sprite("banana", { noArea: true }),
            k.pos(55, -7),
            k.scale(0.6),
            k.origin("center"),
            k.layer("bananas"),
            "banana",
        ]);
    });

    k.action(() => {
        if (k.keyIsPressed("enter") || k.keyIsPressed("space")) {
            k.go("game");
        }
    });

    k.action("banana", banana => {
        banana.move(10, 10);

        if (banana.pos.y > k.height() + 7) {
            k.destroy(banana);
        }
    });
});

k.scene("game", () => {
    const INITIAL_POS = 25;
    const SELECTION_TIME = 3;

    let BACKGROUND_SPEED = -30;
    let V_SPEED = -15;
    let FRAME_POS = { x: 0, y: 44 };

    const m = k.play("music", { loop: true });

    k.layers(["bakground", "game", "kaka", "ui"], "game");

    k.add([
        k.rect(k.width(), k.height()),
        k.color(k.rgb(0, 0, 0)),
        k.layer("background"),
    ]);

    k.add([
        k.sprite("jump_bg"),
        k.pos(0, 0),
        k.layer("background"),
        "background",
    ]);

    k.add([
        k.sprite("jump_bg"),
        k.pos(k.width(), 0),
        k.layer("background"),
        "background",
    ]);

    k.add([
        k.rect(k.width(), 20),
        k.pos(0, 44),
        k.color(37, 138, 136),
        k.layer("ui"),
    ]);

    const karioRock = k.add([
        k.sprite("kario_rock"),
        k.pos(FRAME_POS.x + 15, FRAME_POS.y + 1),
        k.scale(0.4),
        k.fixed(),
        k.layer("ui"),
    ]);

    const karioPaper = k.add([
        k.sprite("kario_paper"),
        k.pos(FRAME_POS.x + 15, FRAME_POS.y + 7),
        k.scale(0.4),
        k.fixed(),
        k.layer("ui"),
    ]);

    const karioScissors = k.add([
        k.sprite("kario_scissors"),
        k.pos(FRAME_POS.x + 15, FRAME_POS.y + 13),
        k.scale(0.4),
        k.fixed(),
        k.layer("ui"),
    ]);

    const kakaRock = k.add([
        k.sprite("kaka_rock", { flipX: true }),
        k.pos(FRAME_POS.x + 49, FRAME_POS.y + 1),
        k.scale(0.4),
        k.fixed(),
        k.origin("topright"),
        k.layer("ui"),
    ]);

    const kakaPaper = k.add([
        k.sprite("kaka_paper", { flipX: true }),
        k.pos(FRAME_POS.x + 49, FRAME_POS.y + 7),
        k.scale(0.4),
        k.fixed(),
        k.origin("topright"),
        k.layer("ui"),
    ]);

    const kakaScissors = k.add([
        k.sprite("kaka_scissors", { flipX: true }),
        k.pos(FRAME_POS.x + 49, FRAME_POS.y + 13),
        k.scale(0.4),
        k.fixed(),
        k.origin("topright"),
        k.layer("ui"),
    ]);

    k.add([
        k.sprite("kario_face"),
        k.pos(FRAME_POS.x + 1, FRAME_POS.y + 2),
        k.scale(0.8),
        k.fixed(),
        k.layer("ui"),
    ]);

    k.add([
        k.sprite("kaka_face", { flipX: true }),
        k.pos(63, FRAME_POS.y + 2),
        k.scale(0.8),
        k.fixed(),
        k.origin("topright"),
        k.layer("ui"),
    ]);

    const karioBananaOne = k.add([
        k.sprite("banana"),
        k.pos(FRAME_POS.x + 1, FRAME_POS.y + 13),
        k.scale(0.7),
        k.fixed(),
        k.layer("ui"),
    ]);

    const karioBananaTwo = k.add([
        k.sprite("banana"),
        k.pos(FRAME_POS.x + 5, FRAME_POS.y + 13),
        k.scale(0.7),
        k.fixed(),
        k.layer("ui"),
    ]);

    const karioBananaThree = k.add([
        k.sprite("banana"),
        k.pos(FRAME_POS.x + 9, FRAME_POS.y + 13),
        k.scale(0.7),
        k.fixed(),
        k.layer("ui"),
    ]);

    const kakaBananaOne = k.add([
        k.sprite("banana", { flipX: true }),
        k.pos(k.width() - 1, FRAME_POS.y + 13),
        k.scale(0.7),
        k.fixed(),
        k.origin("topright"),
        k.layer("ui"),
    ]);

    const kakaBananaTwo = k.add([
        k.sprite("banana", { flipX: true }),
        k.pos(k.width() - 5, FRAME_POS.y + 13),
        k.scale(0.7),
        k.fixed(),
        k.origin("topright"),
        k.layer("ui"),
    ]);

    const kakaBananaThree = k.add([
        k.sprite("banana", { flipX: true }),
        k.pos(k.width() - 9, FRAME_POS.y + 13),
        k.scale(0.7),
        k.fixed(),
        k.origin("topright"),
        k.layer("ui"),
    ]);

    const stateText = k.add([
        k.text("", 9),
        k.pos(k.width() / 2, k.height() - 8),
        k.origin("center"),
        k.fixed(),
        k.layer("ui"),
        {
            counter: SELECTION_TIME + 1,
        },
    ]);

    const kario = k.add([
        k.sprite("kario"),
        k.pos(INITIAL_POS, 15),
        k.scale(0.7),
        {
            selection: null,
            bananas: [karioBananaOne, karioBananaTwo, karioBananaThree],
        },
    ]);

    const kaka = k.add([
        k.sprite("kaka"),
        k.pos(INITIAL_POS, 27),
        k.scale(0.7),
        k.layer("kaka"),
        {
            selection: null,
            bananas: [kakaBananaOne, kakaBananaTwo, kakaBananaThree],
        },
    ]);

    kario.play("run");
    kaka.play("run");

    // Functions

    function startTime() {
        k.wait(1.5, () => {
            startBattle();
        });
    }

    startTime();

    function startBattle() {
        let cancelSelection = k.action(() => {
            if (k.keyIsPressed("a")) {
                kario.selection = "rock";
            } else if (k.keyIsPressed("s")) {
                kario.selection = "paper";
            } else if (k.keyIsPressed("d")) {
                kario.selection = "scissors";
            }

            if (k.keyIsPressed("left")) {
                kaka.selection = "rock";
            } else if (k.keyIsPressed("down")) {
                kaka.selection = "paper";
            } else if (k.keyIsPressed("right")) {
                kaka.selection = "scissors";
            }
        });

        const cancelCount = k.loop(1, () => {
            stateText.counter--;
            stateText.text = stateText.counter;
            k.play("count");
        });

        k.wait(SELECTION_TIME, () => {
            cancelSelection();
            cancelCount();

            stateText.counter = SELECTION_TIME + 1;
            stateText.text = "";

            let selectionOne;
            let selectionTwo;

            if (!kario.selection)
                kario.selection = k.choose(["rock", "paper", "scissors"]);
            if (!kaka.selection)
                kaka.selection = k.choose(["rock", "paper", "scissors"]);

            if (kario.selection == "rock") {
                selectionOne = karioRock;
            } else if (kario.selection == "paper") {
                selectionOne = karioPaper;
            } else if (kario.selection == "scissors") {
                selectionOne = karioScissors;
            }

            if (kaka.selection == "rock") {
                selectionTwo = kakaRock;
            } else if (kaka.selection == "paper") {
                selectionTwo = kakaPaper;
            } else if (kaka.selection == "scissors") {
                selectionTwo = kakaScissors;
            }

            endBattle(selectionOne, selectionTwo);
        });
    }

    function endBattle(s1, s2) {
        const cancelMoveSelections = k.action(() => {
            if (s1.pos.x < 22) s1.move(25, 0);
            if (s2.pos.x > 42) s2.move(-25, 0);
        });

        k.play("sc");

        k.wait(0.5, () => k.shake(0.5));

        k.wait(1.5, () => {
            cancelMoveSelections();

            const cancelBackSelections = k.action(() => {
                if (s1.pos.x >= 15) s1.move(-25, 0);
                if (s2.pos.x <= 49) s2.move(25, 0);
            });

            k.play("sc");

            if (kario.selection == "rock" && kaka.selection == "scissors")
                kaka.trigger("loose");
            else if (kario.selection == "paper" && kaka.selection == "rock")
                kaka.trigger("loose");
            else if (kario.selection == "scissors" && kaka.selection == "paper")
                kaka.trigger("loose");
            else if (kaka.selection == "rock" && kario.selection == "scissors")
                kario.trigger("loose");
            else if (kaka.selection == "paper" && kario.selection == "rock")
                kario.trigger("loose");
            else if (kaka.selection == "scissors" && kario.selection == "paper")
                kario.trigger("loose");

            k.wait(0.4, () => {
                cancelBackSelections();
                s1.pos.x = 15;
                s2.pos.x = 49;
                kario.selection = null;
                kaka.selection = null;
                startTime();
            });
        });
    }

    // Actions

    k.action("background", bg => {
        bg.move(BACKGROUND_SPEED, 0);

        if (bg.pos.x <= -k.width()) {
            bg.pos.x += k.width() * 2;
        }
    });

    k.action("v", v => {
        v.move(V_SPEED, 0);

        if (v.pos.x <= -10) {
            k.destroy(v);
        }
    });

    // Events

    kario.on("dead", () => {
        k.shake(3);
        k.play("trr");

        const cancelMove = k.action(() => {
            if (kario.pos.x < 25) {
                kario.move(25, 0);
            } else {
                cancelMove();
            }
        });

        const bananaToDelete = kario.bananas.pop();
        bananaToDelete.hidden = true;

        if (kario.bananas.length == 0) {
            m.stop();
            k.go("win", false);
        }
    });

    kaka.on("dead", () => {
        k.shake(3);
        k.play("trr");

        const cancelMove = k.action(() => {
            if (kaka.pos.x < 25) {
                kaka.move(25, 0);
            } else {
                cancelMove();
            }
        });

        const bananaToDelete = kaka.bananas.pop();
        bananaToDelete.hidden = true;

        if (kaka.bananas.length === 0) {
            m.stop();
            k.go("win", true);
        }
    });

    kario.on("loose", () => {
        k.play("bum", { volume: 0.5 });
        k.shake(1);

        const destroyLoose = k.action(() => {
            kario.move(-10, 0);
        });

        k.wait(1.5, () => {
            destroyLoose();
            if (kario.pos.x + 4 < 0) kario.trigger("dead");
        });
    });

    kaka.on("loose", () => {
        k.play("bum", { volume: 0.5 });
        k.shake(1);

        const destroyLoose = k.action(() => {
            kaka.move(-10, 0);
        });

        k.wait(1.5, () => {
            destroyLoose();
            if (kaka.pos.x + 4 < 0) kaka.trigger("dead");
        });
    });

    // Input

    k.action(() => {});
});

k.scene("win", kario => {
    if (kario) {
        k.add([
            k.sprite("kario"),
            k.pos(k.width() / 2, k.height() / 3),
            k.origin("center"),
            k.scale(2),
        ]).play("run");

        k.add([
            k.text("Kario wins!", { size: 3 }),
            k.pos(k.width() / 2, 45),
            k.origin("center"),
        ]);
    } else {
        k.add([
            k.sprite("kaka"),
            k.pos(k.width() / 2, k.height() / 3),
            k.origin("center"),
            k.scale(2),
        ]).play("run");

        k.add([
            k.text("Kaka wins!", { size: 3 }),
            k.pos(k.width() / 2, 45),
            k.origin("center"),
        ]);
    }

    k.add([
        k.text("[space or enter for main menu]", { size: 1.5 }),
        k.pos(k.width() / 2, 55),
        k.origin("center"),
    ]);

    k.action(() => {
        if (k.keyIsPressed("space") || k.keyIsPressed("enter")) {
            k.go("menu");
        }
    });
});

k.go("menu");
