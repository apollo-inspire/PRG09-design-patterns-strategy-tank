import { Enemy }        from "./classes/enemy"
import { GameObject }   from "./classes/gameobject"
import { Tank }         from "./classes/tank"
import { Vector }       from "./classes/vector"
import { Ammo }   from "./classes/ammo/ammo"
import { BulletStrategy }   from "./classes/projectiles/BulletStrategy"
import { RocketStrategy }   from "./classes/projectiles/RocketStrategy"
import { MissileStrategy }   from "./classes/projectiles/MissileStrategy"
// import { MissileAmmo } from "./classes/ammo/missileammo"
// import { BulletAmmo }   from "./classes/ammo/bulletammo"
// import { RocketAmmo }   from "./classes/ammo/rocketammo"
// import { MissileAmmo }  from "./classes/ammo/missileammo"

export class Game {

    // Fields 
    public gameObjects: GameObject[] = []

    constructor() {
        this.gameObjects.push(new Ammo("ammo-bullet", new Vector(500, 500), new BulletStrategy()));
        this.gameObjects.push(new Ammo("ammo-rocket", new Vector(200, 200), new RocketStrategy()));
        this.gameObjects.push(new Ammo("ammo-missile",new Vector(100, 100), new MissileStrategy()))
        
        let tank = new Tank(this)
        this.gameObjects.push(tank)
        
        this.gameObjects.push(new Enemy(this, "enemy-light", new Vector(50, 50), tank))
        this.gameObjects.push(new Enemy(this, "enemy-medium", new Vector(visualViewport.width - 50, visualViewport.height - 50), tank))
        this.gameObjects.push(new Enemy(this, "enemy-heavy", new Vector(0, visualViewport.height - 50), tank))
        
        this.gameLoop()
    }

    private gameLoop(): void {
        // Update all game objects
        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }
        // After update check for collisions
        for (const gameObject of this.gameObjects) {
            this.checkCollision(gameObject)
        }

        requestAnimationFrame(() => this.gameLoop())
    }

    /**
     * Checks the collision of the givin game object against all other game objects.
     * If a collision occurs, the onCollision of the given game object is called
     * @param gameObject1 The game object to check
     */
    private checkCollision(gameObject1 : GameObject) {
        for (const gameobject2 of this.gameObjects) {
            if(gameObject1 != gameobject2 && gameObject1.hasCollision(gameobject2)) {
                gameObject1.onCollision(gameobject2)
            }
        }
    }
}

window.addEventListener("DOMContentLoaded", () => new Game())