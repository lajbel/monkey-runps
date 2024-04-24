import kaboom from "kaboom";
import { kiboom } from "kiboom";
import doorsPlugin from "./plugins/doors";
import newgroundsPlugin from "./plugins/newgrounds";

export const k = kaboom({
    width: 64,
    height: 64,
    scale: 8,
    stretch: true,
    letterbox: true,
    debug: false,
    font: "sinko",
    background: [0, 0, 0],
    plugins: [
        newgroundsPlugin,
        doorsPlugin,
        kiboom,
    ],
});
