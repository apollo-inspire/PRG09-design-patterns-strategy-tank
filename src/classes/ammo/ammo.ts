import { Vector } from "../vector";
import { Ammunition } from "./ammunition";
import { ProjectileStrategy } from "../projectiles/ProjectileStrategy";
import { GameObject }   from "../gameobject"
import { Tank }         from "../tank"

export class Ammo extends Ammunition {
    private strategy: ProjectileStrategy;

    constructor(type: string, position: Vector, strategy: ProjectileStrategy) {
        super(type, position);
        this.strategy = strategy;
    }

    public onCollision(target: GameObject): void {
        if (target instanceof Tank) {
            target.changeAmmo(this.strategy);
        }
    }
}