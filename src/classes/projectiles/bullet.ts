import { Tank }         from "../tank";
import { Projectile }   from "./projectile";


export class Bullet extends Projectile {
    constructor(tank : Tank) {
        super("bullet", tank)
    }
}