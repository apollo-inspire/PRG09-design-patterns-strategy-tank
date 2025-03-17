import { Tank } from "../tank";
import { Projectile } from "./projectile";

export abstract class ProjectileStrategy {
    private lastFired: number = 0;
    protected abstract fireRate: number; 
    protected abstract speed: number;

    protected abstract createProjectile(tank: Tank): Projectile;

    fire(tank: Tank): Projectile | null {
        const now = Date.now();
        if (now - this.lastFired < this.fireRate) {
            return null; // Not enough time passed, don't fire
        }

        this.lastFired = now;
        return this.createProjectile(tank);
    }
}