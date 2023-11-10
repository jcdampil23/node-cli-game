
import { colours } from "./colors";
import Entity, { EntityTypes } from "./entity"
import { Direction, EnemySprites, EntityEnum } from "./entityEnums";
import { Missle } from "./player";
import World from "./world";

export default class Enemy extends Entity {
    sprite = EnemySprites.base;
    spriteBase = EnemySprites.base;
    spriteDown = EnemySprites.down;
    spriteLeft = EnemySprites.left;
    spriteRight = EnemySprites.right;

    spriteColor = colours.fg.red;

    onCoolDown = false;

    constructor(entity: EntityTypes) {
        super(entity)
        this.spriteDirection = Direction.down;
    }

    checkCollision(world: World) {
    }

    shoot() {
        if (this.onCoolDown) return;
        let x: number;
        let y: number;
        switch (this.spriteDirection) {
            case (Direction.up):
                y = this.positionY - 1;
                x = this.positionX;
                break;
            case (Direction.down):
                y = this.positionY + 1;
                x = this.positionX;
                break;
            case (Direction.left):
                y = this.positionY;
                x = this.positionX + 1;
                break;
            case (Direction.right):
                y = this.positionY;
                x = this.positionX - 1;
                break;
        }

        const missle = new Missle({
            positionX: x,
            positionY: y,
            world: this.world,
            size: 1,
            entityType: EntityEnum.missle,
            direction: this.spriteDirection,
        })
        this.world.addEntity(missle);

    }
}

