import { Tank } from "../tank";
import { ProjectileStrategy } from "./ProjectileStrategy";
import { Rocket } from "./rocket";

export class RocketStrategy extends ProjectileStrategy {
    protected fireRate: number = 2000; // Medium fire rate
    protected speed: number = 8; 

    protected createProjectile(tank: Tank): Rocket {
        return new Rocket(tank, this.speed);
    }
}