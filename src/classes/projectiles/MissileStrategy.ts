import { Tank } from "../tank";
import { ProjectileStrategy } from "./ProjectileStrategy";
import { Missile } from "./missile";

export class MissileStrategy extends ProjectileStrategy {
    protected fireRate: number = 2000; 
    protected speed: number = 0; 

    protected createProjectile(tank: Tank): Missile {
        return new Missile(tank, this.speed);
    }
}