import { Tank }         from "../tank";
import { Projectile }   from "./projectile";


export class Rocket extends Projectile {
    constructor(tank : Tank) {
        super("rocket", tank)
    }
}