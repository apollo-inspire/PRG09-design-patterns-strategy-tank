import { GameObject }       from "../gameobject";
import { Vector }           from "../vector";
import { Ammunition }       from "./ammunition";

export class MissileAmmo extends Ammunition {
    constructor(position: Vector) {
        super("ammo-missile", position)
    }

    public onCollision(target: GameObject): void {
        
    }
}