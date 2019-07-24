/**
 * @classdesc
 * The class that handles all of the player logic
 *
 * @class Player
 * @memberof Phaser.GameObjects.Sprite
 * @constructor
 */
export class Player extends Phaser.GameObjects.Sprite {

    public body: Phaser.Physics.Arcade.Body;

    private currentScene: Phaser.Scene;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private speed: number = 125;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {

        super(scene, x, y, texture, frame);

        this.currentScene = scene;
        this.cursors = this.currentScene.input.keyboard.createCursorKeys();
        this.currentScene.physics.world.enable(this);

        this.body.setOffset(210, 130);
        this.body.setSize(100, 110, false);
        this.setScale(0.40);

        // The player can't move beyond the camera bounds on screen
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;

        this.play("Knight/Idle");

        this.currentScene.add.existing(this);
    }

    public inflictPain() {
        this.play("Knight/Hurt");

        this.currentScene.tweens.add({
            duration: 150,
            targets: this,
            x: "-=75"
        });
    }

    public update(): void {
        this.handleInput();
    }

    private handleInput() {

        // Stop any previous movement from the last frame
        this.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-100);
            this.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(100);
            this.flipX = false;
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(100);
        }

        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            this.play("Knight/Walk", true);
        } else {
            this.play("Knight/Idle", true);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.speed);
    }
}
