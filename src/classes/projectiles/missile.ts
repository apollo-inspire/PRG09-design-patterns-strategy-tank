import { Tank } from "../tank";
import { Projectile } from "./projectile";

export class Missile extends Projectile {
    constructor(tank: Tank, speed: number) {
        super("missile", tank, speed);
    }
}