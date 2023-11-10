import { colours } from "./colors";
import Entity from "./entity";

export default class World {
    height: number;
    width: number;

    world: string[][];

    enities: Entity[];

    addEntity(entity: Entity) {
        this.enities.push(entity)
    }

    setAllEntityPosition() {
        let worldConstructor: any = [];
        for (let wh = 0; wh <= this.height; wh++) {
            worldConstructor[wh] = []
            for (let ww = this.width; ww >= 0; ww--) {
                worldConstructor[wh][ww] = " ";
            }
        }
        this.enities.forEach((entity) => {
            entity.checkCollision(this);
            worldConstructor[entity.positionY][entity.positionX] = `${entity.spriteColor}${entity.sprite}${colours.reset}`;
        })
        this.world = worldConstructor;
    }

    destroyEntity(entity: Entity) {
        let newEntityList: Entity[] = [];
        this.enities.forEach((data) => {
            if (data != entity) {
                newEntityList.push(data);
            }
        })
        this.enities = newEntityList;
    }

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
        this.enities = [];

        let worldConstructor: any = [];
        for (let wh = 0; wh <= height; wh++) {
            worldConstructor[wh] = []
            for (let ww = width; ww >= 0; ww--) {
                worldConstructor[wh][ww] = " ";
            }
        }
        this.world = worldConstructor;
    }
}
