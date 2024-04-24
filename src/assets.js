import { k } from "./engine";

// ngInit(process.env.NG_APPID, process.env.NG_ENCKEY, false);

k.loadBitmapFont("unscii", "./fonts/unscii.png", 8, 8);

k.loadSound("music", "./sounds/music.ogg");
k.loadSound("trr", "./sounds/trr.wav");
k.loadSound("sc", "./sounds/sc.wav");
k.loadSound("bum", "./sounds/bum.wav");
k.loadSound("count", "./sounds/count.wav");

k.loadSprite("logo", "./sprites/logo.png");
k.loadSprite("menu_bg", "sprites/menu_bg.png");
k.loadSprite("play_button", "sprites/play_button.png");
k.loadSprite("play_button_2", "sprites/play_button_2.png");
k.loadSprite("door", "sprites/door.png");
k.loadSprite("mania_button", "sprites/mania_button.png");
k.loadSprite("about_button", "sprites/about_button.png");
k.loadSprite("arrow", "sprites/arrow.png");

k.loadSprite("banana", "./sprites/banana.png");
k.loadSprite("mania", "./sprites/mania.png");
k.loadSprite("infinite", "sprites/infinite.png");
k.loadSprite("jump_bg", "./sprites/jump_bg.png");
k.loadSprite("mania_bg", "./sprites/mania_bg.png");
k.loadSprite("frame", "sprites/frame.png");
k.loadSprite("frame_1p", "sprites/frame_1p.png");
k.loadSprite("kario_rock", "./sprites/kario_rock.png");
k.loadSprite("kaka_rock", "./sprites/kaka_rock.png");
k.loadSprite("kario_paper", "./sprites/kario_paper.png");
k.loadSprite("kaka_paper", "./sprites/kaka_paper.png");
k.loadSprite("kario_scissors", "./sprites/kario_scissors.png");
k.loadSprite("kaka_scissors", "./sprites/kaka_scissors.png");
k.loadSprite("1", "./sprites/1.png");
k.loadSprite("2", "./sprites/2.png");
k.loadSprite("3", "./sprites/3.png");
k.loadSprite("winner", "sprites/winner.png");

loadSprite("kario", "./sprites/kario.png", {
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

loadSprite("kaka", "./sprites/kaka.png", {
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

loadSprite("kario_faces", "./sprites/kario_faces.png", {
    sliceX: 2,
    sliceY: 3,
    anims: {
        normal: {
            from: 0,
            to: 1,
            loop: true,
            speed: 4,
        },
        happy: {
            from: 2,
            to: 3,
            loop: true,
        },
        cry: {
            from: 4,
            to: 5,
            loop: true,
        },
    },
});

loadSprite("kaka_faces", "./sprites/kaka_faces.png", {
    sliceX: 2,
    sliceY: 3,
    anims: {
        normal: {
            from: 0,
            to: 1,
            loop: true,
            speed: 4,
        },
        happy: {
            from: 2,
            to: 3,
            loop: true,
        },
        cry: {
            from: 4,
            to: 5,
            loop: true,
        },
    },
});
