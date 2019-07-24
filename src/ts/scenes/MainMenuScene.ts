/**
 * @classdesc
 * The MainMenuScene contains the first interaction point of the user to, for instance
 * start a new game or change settings. This scene could also be used to unlock audio
 * on mobile devices where user interaction is often needed before audio can be played.
 *
 * @class MainMenuScene
 * @memberof Phaser.Scene
 * @constructor
 */
export class MainMenuScene extends Phaser.Scene {

    constructor() {
        super({ key: "MainMenuScene" });
    }

    public create() {

        // We could show a fancy menu, but in this case we only require you to
        // press the space bar when you are on a mobile device and audio can't
        // be played due to mobile browser security settings.
        if (this.sound.locked) {

            // Create a text object
            const textObject = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "Press space to start!");

            // The default origin of text is 0,0 (top left)
            textObject.setOrigin(0.5, 0.5);

            // Register that we want to be notified if the space is pressed
            this.input.keyboard.on("keydown_SPACE", this.handleStart, this);

        } else {
            this.scene.start("GameScene");
        }
    }

    /**
     * Starts the GameScene
     *
     * @method MainMenuScene#handleStart
     *
     */
    private handleStart() {
        this.scene.start("GameScene");
    }
}
