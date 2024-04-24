import { k } from "../engine";

k.scene("win", (winner, score) => {
    let antiSpam = true;

    function padZ(num) {
        let s = `${num}`;

        while (s.length < 9) s = `0${s}`;

        return s;
    }

    add([sprite("menu_bg"), pos(0, 0), "bg"]);

    add([
        sprite(winner, winner === "mania" ? {} : { anim: "run" }),
        pos(width() / 2, 30),
        k.anchor("center"),
    ]);

    if (winner !== "mania") {
        add([sprite("winner"), pos(width() / 2, 18), k.anchor("center")]);
    } else {
        add([
            text(padZ(score), { size: 4 }),
            pos(width() / 2, 50),
            k.anchor("center"),
        ]);
    }

    onKeyPress(() => {
        if (!antiSpam) go("menu");

        antiSpam = false;
    });
});
