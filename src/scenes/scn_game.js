import { k } from "../engine.js";

k.scene("game", (isTwoPlayers) => {
    const backgroundMusic = play("music", {
        loop: true,
        volume: 0.3,
        speed: 1.0,
    });

    let canSelect = true;

    add([
        sprite("jump_bg"),
        pos(0, 0),
        z(1),
        "background",
    ]);

    add([
        sprite("jump_bg"),
        pos(width(), 0),
        z(1),
        "background",
    ]);

    // The FRAME GUI or idk

    const frame = add([
        pos(width() / 2, 42),
        z(4),
    ]);

    frame.add([
        sprite(isTwoPlayers ? "frame" : "frame_1p"),
        k.anchor("top"),
    ]);

    /// Kario Things

    frame.add([
        sprite("kario_rock"),
        pos(-14, 4),
        k.anchor("center"),
        "kario_rock",
    ]);

    frame.add([
        sprite("kario_paper"),
        pos(-14, 11),
        k.anchor("center"),
        "kario_paper",
    ]);

    frame.add([
        sprite("kario_scissors"),
        pos(-14, 18),
        k.anchor("center"),
        "kario_scissors",
    ]);

    frame.add([
        sprite("kario_faces", { anim: "normal" }),
        pos(-31, 2),
        "kario_face",
    ]);

    /// Kaka Things

    frame.add([
        sprite("kaka_rock"),
        pos(14, 4),
        k.anchor("center"),
        "kaka_rock",
    ]);

    frame.add([
        sprite("kaka_paper"),
        pos(14, 11),
        k.anchor("center"),
        "kaka_paper",
    ]);

    frame.add([
        sprite("kaka_scissors"),
        pos(14, 18),
        k.anchor("center"),
        "kaka_scissors",
    ]);

    frame.add([
        sprite("kaka_faces", { anim: "normal" }),
        pos(31, 2),
        k.anchor("topright"),
        "kaka_face",
    ]);

    /// Bananos

    frame.add([
        sprite("banana"),
        pos(-31, 13),
        "kario_banana",
    ]);

    frame.add([
        sprite("banana"),
        pos(-27, 13),
        "kario_banana",
    ]);

    frame.add([
        sprite("banana"),
        pos(-23, 13),
        "kario_banana",
    ]);

    frame.add([
        sprite("banana", { flipX: true }),
        pos(31, 13),
        k.anchor("topright"),
        "kaka_banana",
    ]);

    frame.add([
        sprite("banana", { flipX: true }),
        pos(27, 13),
        k.anchor("topright"),
        "kaka_banana",
    ]);

    frame.add([
        sprite("banana", { flipX: true }),
        pos(23, 13),
        k.anchor("topright"),
        "kaka_banana",
    ]);

    const stateText = frame.add([
        pos(0, 11),
        k.anchor("center"),
        fixed(),
        {
            counter: 3,
        },
    ]);

    // The mein monkeys

    const kario = add([
        sprite("kario", { anim: "run" }),
        pos(25, 7),
        z(3),
        "kario",
        {
            selection: "",
            bananas: frame.get("kario_banana"),
            face: frame.get("kario_face")[0],
        },
    ]);

    const kaka = add([
        sprite("kaka", { anim: "run" }),
        pos(25, 23),
        z(3),
        "kaka",
        {
            selection: "",
            bananas: frame.get("kaka_banana"),
            face: frame.get("kaka_face")[0],
        },
    ]);

    // Updates and events

    onUpdate(() => {
        if (!canSelect) return;

        if (isKeyPressed("a")) kario.selection = "rock";
        else if (isKeyPressed("s")) kario.selection = "paper";
        else if (isKeyPressed("d")) kario.selection = "scissors";

        if (!isTwoPlayers) {
            const s = get(`kario_${kario.selection}`)[0];
            if (s) s.color = rgb(222, 54, 244);
        }

        if (isTwoPlayers) {
            if (isKeyPressed("left")) kaka.selection = "rock";
            else if (isKeyPressed("down")) kaka.selection = "paper";
            else if (isKeyPressed("right")) kaka.selection = "scissors";
        } else kaka.selection = choose(["rock", "paper", "scissors"]);
    });

    /// Input

    onUpdate(() => {
        if (isKeyPressed("escape")) {
            backgroundMusic.stop();

            go("menu");
        }
        if (isKeyPressed("m")) backgroundMusic.mute();
    });

    onUpdate("background", (bg) => {
        if (bg.pos.x <= -width()) bg.pos.x += width() * 2;

        bg.move(-30, 0);
    });

    wait(1, startBattle);

    // The functions of the BATTLE
    // this code is trash. IK

    function startBattle() {
        const cancelCount = loop(1, () => {
            if (stateText.counter === 0) return;

            stateText.use(sprite(stateText.counter.toString()));
            stateText.counter--;

            play("count", { volume: 0.2 });
        });

        wait(3, () => {
            cancelCount();
            canSelect = false;

            stateText.unuse("sprite");
            stateText.counter = 3;

            endBattle(kario.selection, kaka.selection);
        });
    }

    function endBattle(sel, sel2) {
        const s1 = frame.get(`kario_${sel}`)[0];
        const s2 = frame.get(`kaka_${sel2}`)[0];

        const s1Pos = s1?.pos?.clone();
        const s2Pos = s2?.pos?.clone();

        const cancelMoveSelections = onUpdate(() => {
            if (s1) s1.moveTo(-4, 11, 30);
            if (s2) s2.moveTo(4, 11, 30);
        });

        if (s1 && s2) play("sc");
        wait(0.7, () => shake(0.5));

        wait(1.5, () => {
            if (kario.selection === "rock" && kaka.selection === "scissors") loose(kaka);
            else if (kario.selection === "paper" && kaka.selection === "rock") loose(kaka);
            else if (kario.selection === "scissors" && kaka.selection === "paper") loose(kaka);
            else if (!kario.selection && kaka.selection) loose(kario);
            else if (kaka.selection === "rock" && kario.selection === "scissors") loose(kario);
            else if (kaka.selection === "paper" && kario.selection === "rock") loose(kario);
            else if (kaka.selection === "scissors" && kario.selection === "paper") loose(kario);
            else if (!kaka.selection && kario.selection) loose(kaka);

            const cancelBackSelections = onUpdate(() => {
                if (s1) s1.moveTo(s1Pos, 30);
                if (s2) s2.moveTo(s2Pos, 30);
            });

            cancelMoveSelections();
            canSelect = true;

            wait(1.5, () => {
                cancelBackSelections();

                kario.selection = "";
                kaka.selection = "";

                wait(1, startBattle);
            });
        });
    }

    function dead(ch) {
        play("trr");
        shake(3);

        const cancelMove = onUpdate(() => {
            if (ch.pos.x < 25) ch.move(25, 0);
            else cancelMove();
        });

        const bananaToDelete = ch.bananas.pop();
        bananaToDelete.hidden = true;

        if (ch.bananas.length === 0) {
            backgroundMusic.stop();

            go("win", ch.is("kaka") ? "kario" : "kaka");
        }
    }

    function loose(ch) {
        let alt;

        play("bum", { volume: 0.5 });
        shake(1);

        if (ch.is("kario")) alt = kaka;
        else alt = kario;

        ch.face.play("cry");
        alt.face.play("happy");

        const destroyLoose = onUpdate(() => {
            ch.move(-10, 0);
        });

        wait(1.5, () => {
            destroyLoose();

            ch.face.play("normal");
            alt.face.play("normal");

            if (ch.pos.x + 4 < 0) dead(ch);
        });
    }
});
