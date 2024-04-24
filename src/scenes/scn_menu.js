// WELCOME TO THE JUNGLE 🌴🌴🌴

import { k } from "../engine.js";

k.scene("menu", () => {
    let selectedButton = 0;
    let timer = 0;

    const backgroundMusic = play("music", { loop: true, volume: 0.6 });

    add([
        sprite("menu_bg"),
        pos(0, 0),
        "bg",
    ]);

    add([
        sprite("menu_bg"),
        pos(0, 0),
        k.anchor("center"),
        "bg",
    ]);

    const logo = add([
        sprite("logo"),
        pos(32, 15),
        k.anchor("center"),
    ]);

    const buttons = [
        add([
            sprite("play_button"),
            color(255, 236, 227),
            pos(32, 40),
            k.anchor("center"),
            "btn",
            {
                scene: "game",
                forTwo: true,
                mania: false,
            },
        ]),
        add([
            sprite("play_button_2"),
            color(255, 236, 227),
            pos(32, 48),
            k.anchor("center"),
            "btn",
            {
                scene: "game",
                forTwo: false,
                mania: false,
            },
        ]),
        // add([
        //     sprite("mania_button"),
        //     color(255, 36, 36),
        //     pos(32, 56),
        //     k.anchor("center"),
        //     "btn",
        //     {
        //         scene: "game",
        //         forTwo: false,
        //         mania: true,
        //     },
        // ])
    ];

    const arrow = add([
        sprite("arrow"),
        color(255, 46, 46),
        pos(buttons[0].pos.sub(18, 0)),
        k.anchor("center"),
    ]);

    onUpdate("bg", (bg) => {
        if (bg.pos.x > width() && bg.pos.y > height()) bg.pos = vec2(0, 0);

        bg.move(5, 5);
    });

    onUpdate(() => {
        if (isKeyPressed("enter") || isKeyPressed("space")) {
            backgroundMusic.stop();

            closeDoors();

            go(buttons[selectedButton].scene, buttons[selectedButton].forTwo);
        }

        if (isKeyPressed("up")) {
            selectedButton -= 1;

            if (selectedButton < 0) selectedButton = buttons.length - 1;

            arrow.pos.y = buttons[selectedButton].pos.y;
        }

        if (isKeyPressed("down")) {
            selectedButton += 1;

            if (selectedButton > buttons.length - 1) selectedButton = 0;

            arrow.pos.y = buttons[selectedButton].pos.y;
        }

        if (isKeyPressed("1")) every("bg", (obj) => obj.use(color(255, 255, 255)));
        if (isKeyPressed("2")) every("bg", (obj) => obj.use(color(239, 61, 255)));
        if (isKeyPressed("3")) every("bg", (obj) => obj.use(color(48, 255, 193)));
        if (isKeyPressed("4")) every("bg", (obj) => obj.use(color(155, 255, 48)));
        if (isKeyPressed("5")) every("bg", (obj) => obj.use(color(207, 183, 0)));

        // const t = time() * 10;

        // maniaButton.color = rgb(
        //     wave(0, 255, t),
        //     wave(0, 255, t + 2),
        //     wave(0, 255, t + 4)
        // );

        timer += dt();
        logo.angle = wave(-9, 9, timer * 4);
    });
});
