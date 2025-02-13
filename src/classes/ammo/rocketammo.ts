import { GameObject }       from "../gameobject";
import { Vector }           from "../vector";
import { Ammunition }       from "./ammunition";

export class RocketAmmo extends Ammunition {
    constructor(position: Vector) {
        super("ammo-rocket", position)
    }

    public onCollision(target: GameObject): void {

    }
}