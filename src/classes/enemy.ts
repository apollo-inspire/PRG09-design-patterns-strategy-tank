import { Game }         from "../game";
import { GameObject }   from "./gameobject";
import { Bullet }       from "./projectiles/bullet";
import { Missile }      from "./projectiles/missile";
import { Rocket }       from "./projectiles/rocket";
import { Tank }         from "./tank";
import { Vector }       from "./vector";

export class Enemy extends GameObject {
    
    // Fields 
    private speed: number = 1
    private game: Game
    private player: Tank
    private type: string

    constructor(game: Game, type: string, position: Vector, player: Tank) {
        super(type)

        this.game       = game
        this.type       = type
        this.player     = player
        this.position   = position
    }

    public update() {
        this.position = this.position.add(this.position.getDirectionToObject(this.player).scale(this.speed))
        this.rotation = this.position.getDirectionToObject(this.player).angle()

        super.update()
    }

    onCollision(target: GameObject): void  {
        if(
            target instanceof Bullet && this.type == "enemy-light" ||
            target instanceof Rocket && this.type == "enemy-medium" ||
            target instanceof Missile && this.type == "enemy-heavy"
            ) 
        {
            let index = this.game.gameObjects.indexOf(this)
            if(index > -1) { 
                this.game.gameObjects.splice(index,1)
            }
            this.div.remove()
        }
    }
}