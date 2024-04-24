import { k } from "../engine.js";

const opt = k.makeOptions(() => ({
    vel: 10,
    height: 64,
}));

k.extendMaker(k.makeObject, opt, (opt) => [
    k.children({
        "background_1": () => [
            k.sprite("player"),
            k.pos(0, 0),
        ],
    }),
]);
