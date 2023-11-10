

export enum EntityEnum {
    player = "0",
    missle = "1",
    baseEnemy = "2",
}

export enum PlayerSprites {
    base = "\u25B2",
    down = "\u25BC",
    left = "\u2770",
    right = "\u2771"
}

export enum EnemySprites {
    base = "\u2623",
    down = "\uFE3A",
    left = "\uFE5D",
    right = "\uFE5E",
};

export enum MissleSprites {
    base = "|",
    horizontal = "-",
}

export type Sprites = PlayerSprites | EnemySprites | MissleSprites

export enum Direction {
    up = 0,
    down = 1,
    left = 2,
    right = 3
}
