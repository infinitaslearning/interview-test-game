/**
 * @classdesc
 * The object that handles all of the individual enemy logic
 *
 * @class Enemy
 * @memberof Phaser.GameObjects.Sprite
 * @constructor
 */
export class Enemy extends Phaser.GameObjects.Sprite {

    public dragonTween: Phaser.Tweens.Tween;
    public body: Phaser.Physics.Arcade.Body;

    public fireball: Phaser.GameObjects.Sprite;
    public fireballSpeed = 1.25;
    public isSpewing: boolean;

    private currentScene: Phaser.Scene;

    private minSpeed: number = 14;
    private maxSpeed: number = 8;
    private minY: number = 180;
    private maxY: number = 535;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame);

        this.registerAnimationEventHelper();

        this.currentScene = scene;

        this.currentScene.physics.world.enable(this);
        this.body.setCircle(125);
        this.body.setOffset(30);

        this.flipX = true;

        // Create a fireball and position it hidden on screen
        this.fireball = this.currentScene.add.sprite(this.x, this.y, "atlas", "FireBall/Normal01")
            .setDepth(3)
            .play("FireBall/Normal");

        this.fireball.visible = false;

        // Configure physics
        this.currentScene.physics.world.enable(this.fireball);
        (this.fireball.body as Phaser.Physics.Arcade.Body).setCircle(20).setOffset(23, 27);

        // Create an event that checks if the dragon needs to spew fire
        this.currentScene.time.addEvent({
            callback: this.shouldSpewFire,
            callbackScope: this,
            delay: Phaser.Math.Between(2000, 5000),
            repeat: -1
        });

        // Makes the dragon go up and down
        this.dragonTween = this.createMovementTween();

        // Play the flapping wings animation
        this.play("Dragon/Idle");

        // Registers the spewFire once the fire animation completes
        this.on("animationcomplete_Dragon/Shoot", this.spewFire, this);

        // Add this enemy to the current scene
        this.currentScene.add.existing(this);
    }

    public update(): void {
        // Check if we need to change the fireball position
        if (this.isSpewing) {

            // Hide the fireball after it's moved offscreen. Don't destroy the
            // fireball. In games re-use is king.
            if (this.fireball.x < -50) {
                this.fireball.visible = false;
                this.isSpewing = false;
            }
        }
    }

    /**
     * Creates a tween animation that moves the dragon up and down.
     *
     * @method Enemy#createMovementTween
     *
     */
    private createMovementTween() {

        this.y = this.minY;

        const tween = this.currentScene.tweens.add({
            delay: Phaser.Math.Between(0, 800),
            duration: Phaser.Math.Between(this.minSpeed, this.maxSpeed) * 100,
            repeat: -1,
            targets: this,
            y: this.maxY,
            yoyo: true
        });

        return tween;
    }

    /**
     * If an animation completes a generic event `animationcomplete` is raised. This helper
     * function extracts what animation completed and raises an event for it so we can
     * subscribe to completion of a specific animation.
     *
     * @method Enemy#registerAnimationEventHelper
     *
     */
    private registerAnimationEventHelper() {
        // If an animation is done a event is raised. This isn't animation specific though.
        // This construction makes it so.
        this.on("animationcomplete", (anim, frame) => {
            this.emit(`animationcomplete_${anim.key}`, anim, frame);
        }, this);
    }

    /**
     * Pulls a random number and if it matches a certain outcome will start the spewing of
     * fire from the dragon.
     *
     * @method Enemy#shouldSpewFire
     *
     */
    private shouldSpewFire() {
        if (!this.isSpewing && Phaser.Math.Between(0, 10) > 5) {

            this.toggleDragonMovement();

            // Pause the dragon for 250 ms before starting the fire animation
            this.currentScene.time.addEvent({
                callback: () => this.play("Dragon/Shoot"),
                callbackScope: this,
                delay: 250
            });
        }
    }

    /**
     * When  the `dragonFire` event has run we need to position the actual fireball
     * that was created in the constructor and make it visible. After that we wait
     * 500ms before the dragon starts moving again.
     *
     * @method Enemy#spewFire
     *
     */
    private spewFire() {
        this.isSpewing = true;
        this.fireball.setPosition(this.x - 75, this.y).visible = true;

        (this.fireball.body as Phaser.Physics.Arcade.Body).setVelocityX(-100);

        this.currentScene.time.addEvent({
            callback: this.toggleDragonMovement,
            callbackScope: this,
            delay: 500
        });
    }

    /**
     * Stops the dragon if it's moving and vice versa.
     *
     * @method Enemy#toggleDragonMovement
     *
     */
    private toggleDragonMovement() {
        this.play("Dragon/Idle", true);
        this.dragonTween.isPaused() ? this.dragonTween.resume() : this.dragonTween.pause();
    }
}
