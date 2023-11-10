
import { colours } from "./colors";
import { Direction, EntityEnum } from "./entityEnums";
import World from "./world";
import Enemy from "./enemy";
import { Character } from "./player";

const process = require('node:process');
const readline = require('readline');

const world = new World(50, 100);

const character = new Character({
    size: 1,
    world,
    positionX: world.width / 2,
    positionY: world.height - 2,
    entityType: EntityEnum.player,
    direction: Direction.up
})
const enemy = new Enemy({
    size: 1,
    world,
    positionY: 2,
    positionX: world.width / 2,
    direction: Direction.down,
    entityType: EntityEnum.baseEnemy,
})
world.addEntity(character);
world.addEntity(enemy);

function main() {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.setRawMode != null) {
        process.stdin.setRawMode(true);
    }

    process.stdin.on('keypress', (str: any, key: any) => {
        str = 'test';
        if (key.ctrl && key.name == "c") {
            process.exit();
        }
        let power = 1;
        if (key.shift) power = 2;
        if (key.name == "w") {
            character.up(power);
        }
        if (key.name == "a") {
            character.left(power);
        }
        if (key.name == "s") {
            character.down(power);
        }
        if (key.name == "d") {
            character.right(power);
        }
        if (key.name == "space") {
            character.shoot();
        }
    });
}

function tick() {
    world.setAllEntityPosition();
    const wall = colours.bg.gray + "||" + colours.reset;
    const length = colours.bg.gray + "=" + colours.reset;
    let space = wall
    for (let wh = 0; wh < world.height; wh++) {
        for (let ww = world.width; ww > 0; ww--) {
            if (wh == 0) {
                space = space + "" + length;
                continue;
            }
            if (ww == world.width) {
                space = space + wall
            }
            if (wh == world.height - 1) {
                space = space + length
                continue;
            }
            space = space + world.world[wh][ww];
        }
        space = space + "" + wall + "\n";
    }
    console.log(space);
}

main();
setInterval(tick, 25);
