import { Tank } from "../tank";
import { Projectile } from "./projectile";

export class Bullet extends Projectile {
    constructor(tank: Tank, speed: number) {
        super("bullet", tank, speed);
    }
}