import { Tank } from "../tank";
import { ProjectileStrategy } from "./ProjectileStrategy";
import { Bullet } from "./bullet";

export class BulletStrategy extends ProjectileStrategy {
    protected fireRate: number = 500;  
    protected speed: number = 15; 

    protected createProjectile(tank: Tank): Bullet {
        return new Bullet(tank, this.speed);
    }
}