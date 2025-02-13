import { GameObject }       from "../gameobject";
import { Vector }           from "../vector";
import { Ammunition }       from "./ammunition";

export class BulletAmmo extends Ammunition {
    constructor(position: Vector) {
        super("ammo-bullet", position)
    }

    public onCollision(target: GameObject): void {
        
    }
}