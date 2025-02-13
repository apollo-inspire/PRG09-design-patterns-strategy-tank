import { Tank }         from "../tank";
import { Projectile }   from "./projectile";


export class Missile extends Projectile {
    constructor(tank : Tank) {
        super("missile", tank)
    }
}