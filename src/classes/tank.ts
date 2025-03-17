import { ProjectileStrategy } from "./projectiles/ProjectileStrategy";
import { BulletStrategy } from "./projectiles/BulletStrategy";
import { Bullet }           from "./projectiles/bullet";
import { Game }             from "../game";
import { GameObject }       from "./gameobject";
import { Turret }           from "./turret";
import { Vector }           from "./vector";

export class Tank extends GameObject {
    private currentProjectileStrategy: ProjectileStrategy;

    private readonly FRICTION       : number    = 0.001  
    private readonly ACCELERATION   : number    = 0.1  

    // Fields 
    private turnLeft        : boolean   = false
    private turnRight       : boolean   = false
    private accelerate      : boolean   = false
    private backaccelerate  : boolean   = false
    private canFire         : boolean   = true
    private previousState   : boolean   = false
    private rotationSpeed   : number    = 1
    private turret          : Turret
    private game            : Game
    private fireRate        : number    = 100
    
    protected speed         : Vector    = new Vector(0, 0)

    // Properties
    public get Speed()  : Vector { return this.speed }
    public get Turret() : Turret { return this.turret }
    
    constructor(game:Game) {
        super("tank-body")
        this.currentProjectileStrategy = new BulletStrategy(); // Start met Bullet

        this.game       = game
        this.position.x = visualViewport.width / 2
        this.position.y = visualViewport.height / 2 
        this.speed      = new Vector(0, 0)

        this.rotation   = 0
        
        this.turret = new Turret(this)

        window.addEventListener("keydown",  (e : KeyboardEvent) => this.handleKeyDown(e))
        window.addEventListener("keyup",    (e : KeyboardEvent) => this.handleKeyUp(e))
    }

    public update() {
        this.turret.update()

        // console.log(this.backaccelerate)
        // console.log(this.speed.x, this.speed.y)

        // handle rotation if active
        if(this.turnLeft)       this.rotation -= this.rotationSpeed
        else if(this.turnRight) this.rotation += this.rotationSpeed

        // Handle forward movement
        if (this.accelerate) {
            if (this.speed.x < 3) this.speed.x +=  this.ACCELERATION;
            if (this.speed.y < 3) this.speed.y +=  this.ACCELERATION;
        } else if (!this.backaccelerate) {
        // } else {
            // Apply friction when not accelerating
            if (this.speed.x > 0) this.speed.x -= this.FRICTION;
            if (this.speed.y > 0) this.speed.y -= this.FRICTION;
            if (this.speed.x < 0.05) this.speed.x = 0;
            if (this.speed.y < 0.05) this.speed.y = 0;
        }
     

        // Handle backward movement
        if (this.backaccelerate) {
            if (this.speed.x > -3) this.speed.x -= this.ACCELERATION;
            if (this.speed.y > -3) this.speed.y -= this.ACCELERATION;
        } else if (!this.accelerate) {
        //     // Apply friction when not reversing
            if (this.speed.x < 0) this.speed.x += this.FRICTION;
            if (this.speed.y < 0) this.speed.y += this.FRICTION;
            if (this.speed.x > -0.05) this.speed.x = 0;
            if (this.speed.y > -0.05) this.speed.y = 0;
        }

        if (this.speed.x == 0) this.speed.x = 0
        if (this.speed.y == 0) this.speed.y = 0
                    
        this.position.x += Math.cos(this.degToRad(this.rotation)) * this.speed.x
        this.position.y += Math.sin(this.degToRad(this.rotation)) * this.speed.y

        this.keepInWindow()    
        
        super.update()
    }

    private handleKeyDown(e : KeyboardEvent) {
        if(e.key == "ArrowLeft" || e.key == "a")        this.turnLeft   = true
        else if (e.key == "ArrowRight"|| e.key == "d") this.turnRight  = true
        
        
        if(e.key == "ArrowUp" || e.key === "w")          this.accelerate = true
        if(e.key == "ArrowDown" || e.key === "s")          this.backaccelerate = true

        if(e.key == " " || e.key === "Enter")                this.fire()
    }
    
    private handleKeyUp(e : KeyboardEvent) {
        if(e.key == "ArrowLeft" || e.key == "a")        this.turnLeft   = false
        else if (e.key == "ArrowRight" || e.key == "d") this.turnRight  = false

        if(e.key == "ArrowUp" || e.key == "w")          this.accelerate = false
        if(e.key == "ArrowDown" || e.key == "s")          this.backaccelerate = false

        if(e.key == " " || e.key == "Enter")                this.previousState = false    
    }

    private fire() {
        if (this.canFire) {
            let projectile = this.currentProjectileStrategy.fire(this);
            
            if (projectile) {  
                this.game.gameObjects.push(projectile);
            }
    
            this.canFire = false;
            setTimeout(() => { this.canFire = true }, this.fireRate);
        }
    }

    public changeAmmo(strategy: ProjectileStrategy) {
        this.currentProjectileStrategy = strategy;
    }

    onCollision(target: GameObject): void {
        // throw new Error("Method not implemented.");
    }

    private keepInWindow() {
        if(this.position.x + this.width < 0)        this.position.x = window.innerWidth
        if(this.position.y + this.height< 0)        this.position.y = window.innerHeight
        if(this.position.x > window.innerWidth)     this.position.x = -this.width
        if(this.position.y > window.innerHeight)    this.position.y = -this.height
    }

    /**
     * Converts angle from degrees to radians
     * @param degrees angle in degrees
     */
     protected degToRad(degrees : number) {
        return degrees * Math.PI / 180
    }
}