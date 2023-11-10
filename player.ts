
import { colours } from "./colors";
import Entity, { EntityTypes } from "./entity";
import { Direction, EntityEnum, MissleSprites, PlayerSprites, Sprites } from "./entityEnums";
import World from "./world";

export class Character extends Entity {
    sprite = PlayerSprites.base;
    spriteBase = PlayerSprites.base;
    spriteDown = PlayerSprites.down;
    spriteLeft = PlayerSprites.left;
    spriteRight = PlayerSprites.right;

    spriteColor = colours.fg.green;

    onCoolDown: number = 0;

    constructor(entity: EntityTypes) {
        super(entity)
    }

    checkCollision(world: World) {
        world.enities.forEach((entity) => {
            if (entity.entityType === EntityEnum.baseEnemy) {
                if (entity.positionY == this.positionY && entity.positionX == this.positionX)
                    world.destroyEntity(this);
            }
        })
    }

    shoot() {
        if (new Date().getTime() <= this.onCoolDown) return;
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
        let test = new Date().getTime();
        test = test + 1000;
        this.onCoolDown = test;

    }

}

export class Missle extends Entity {

    sprite = MissleSprites.base;
    spriteBase: Sprites = MissleSprites.base;
    spriteDown: Sprites = MissleSprites.base;
    spriteLeft: Sprites = MissleSprites.horizontal;
    spriteRight: Sprites = MissleSprites.horizontal;
    spriteColor: string = colours.fg.crimson;

    checkCollision(world: World) {
        switch (this.spriteDirection) {
            case (Direction.up): this.up(1); break;
            case (Direction.down): this.down(1); break;
            case (Direction.left): this.left(1); break;
            case (Direction.right): this.right(1); break;
        }

        world.enities.filter((entity) => { return entity.entityType !== EntityEnum.missle })
            .forEach((filteredEntities) => {
                if (filteredEntities.positionX == this.positionX && filteredEntities.positionY == this.positionY) {
                    world.destroyEntity(this);
                    world.destroyEntity(filteredEntities);
                }

            })

        if (this.positionX <= 1 || this.positionX >= world.width - 1
            || this.positionY <= 2 || this.positionY >= world.height - 2) {
            world.destroyEntity(this);
            return;
        }
    }

    constructor(entity: EntityTypes) {
        super(entity)
        switch (entity.direction) {
            case (Direction.up):
            case (Direction.down):
                this.sprite = MissleSprites.base;
                break
            case (Direction.left):
            case (Direction.right):
                this.sprite = MissleSprites.horizontal;
        }
    }
}

