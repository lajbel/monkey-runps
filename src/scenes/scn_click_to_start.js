import { k } from "../engine.js";

k.scene("cts", () => {
    k.add(k.makeBg({
        color: "#000000",
    }));

    k.add(k.makeText({
        pos: k.center(),
        text: "PRESS ANY KEY",
        textSize: 4,
        textFont: "unscii",
        color: "#ffffff",
    }));

    k.onUpdate(() => {
        if (k.isKeyPressed() || k.isMousePressed()) {
            k.go("menu");
        }
    });
});
