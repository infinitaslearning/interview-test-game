export class Treasure extends Phaser.GameObjects.Sprite {

    public body: Phaser.Physics.Arcade.Body;
    private currentScene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame);

        this.currentScene = scene;

        this.currentScene.physics.world.enable(this, Phaser.Physics.Arcade.STATIC_BODY);
        this.body.setOffset(25, 30);
        this.body.setSize(80, 75, true);
        this.setScale(0.6);

        this.currentScene.add.existing(this);
    }
}
