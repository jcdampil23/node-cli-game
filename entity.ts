
import { Direction, EntityEnum, Sprites } from "./entityEnums";
import World from "./world";


export type EntityTypes = {
    size: number,
    positionX: number,
    positionY: number,
    entityType: EntityEnum,
    world: World,
    direction: Direction,
}

interface EntityInterface {
    _size: number,
    _positionX: number,
    _positionY: number,
    _entityType: EntityEnum,
    world: World,
    sprite: Sprites,
    up: (power: number) => void,
    down: (power: number) => void,
    left: (power: number) => void,
    right: (power: number) => void,
}

export default abstract class Entity implements EntityInterface {

    world: World;

    _size: number;
    get size() { return this._size };
    set size(value: number) { this._size = value }

    _entityType: EntityEnum;
    get entityType() { return this._entityType }
    set entityType(value: EntityEnum) { this._entityType = value }

    _positionX: number;
    get positionX() { return this._positionX }
    set positionX(value: number) { this._positionX = value }

    _positionY: number;
    get positionY() { return this._positionY }
    set positionY(value: number) { this._positionY = value }

    abstract sprite: Sprites;
    abstract spriteBase: Sprites;
    abstract spriteLeft: Sprites;
    abstract spriteRight: Sprites;
    abstract spriteDown: Sprites;
    abstract spriteColor: string;
    spriteDirection: Direction;

    abstract checkCollision(world: World): void;

    constructor(entity: EntityTypes) {
        this._size = this.size = entity.size;
        this.world = entity.world;
        this._entityType = this.entityType = entity.entityType;
        this._positionX = this.positionX = entity.positionX;
        this._positionY = this.positionY = entity.positionY;
        this.spriteDirection = entity.direction;
    }

    checkYBounds(power: number, direction: Direction): number {
        switch (direction) {
            case Direction.up:
                for (let reduced = power; this.positionY - reduced < 2; reduced--) {
                    power = reduced;
                }
                break;
            case Direction.down:
                for (let reduced = power; this.positionY + reduced >= this.world.height - 2; reduced--) {
                    power = reduced;
                }
                break;
        }
        return power;
    }

    checkXBounds(power: number, direction: Direction): number {
        switch (direction) {
            case Direction.left:
                for (let reduced = power; this.positionX + reduced >= this.world.width - 1; reduced--) {
                    power = reduced;
                }
                break;
            case Direction.right:
                for (let reduced = power; this.positionX - reduced < 2; reduced--) {
                    power = reduced;
                }
                break;
        }
        return power;
    }

    up(power: number) {
        const moveBy = this.checkYBounds(power, Direction.up);
        this.spriteDirection = Direction.up;
        this.sprite = this.spriteBase;
        this.positionY = this.positionY - moveBy;

    };

    down(power: number) {
        this.sprite = this.spriteDown;
        this.spriteDirection = Direction.down;
        const moveBy = this.checkYBounds(power, Direction.down);
        this.positionY = this.positionY + moveBy;
    }

    left(power: number) {
        this.sprite = this.spriteLeft;
        this.spriteDirection = Direction.left;
        const moveBy = this.checkXBounds(power, Direction.left)
        this.positionX = this.positionX + moveBy;
    }

    right(power: number) {
        this.sprite = this.spriteRight;
        this.spriteDirection = Direction.right;
        const moveBy = this.checkXBounds(power, Direction.right)
        this.positionX = this.positionX - moveBy;
    }

}




