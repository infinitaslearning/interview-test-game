/**
 * @classdesc
 * The GameOverScene is shown when the player dies.
 *
 * @class GameOverScene
 * @memberof Phaser.Scene
 * @constructor
 */
export class GameOverScene extends Phaser.Scene {

    constructor() {
        super({ key: "GameOverScene" });
    }

    public create() {

        const canvasWidth = this.sys.canvas.width;
        const canvasHeight = this.sys.canvas.height;

        // Black background
        const progress = this.add.graphics();
        progress.clear();
        progress.fillStyle(0x000000, 1);
        progress.fillRect(0, 0, canvasWidth, canvasHeight);

        // Fallen hero
        this.add.sprite(canvasWidth / 2, (canvasHeight / 2) - 100, "atlas", "Knight/Dizzy01").play("Knight/Dizzy");

        // Text
        this.add.text(canvasWidth / 2, (canvasHeight / 2) + 75, "Game Over", { fontFamily: "Edwardian Script ITC Regular", fontSize: 74, color: "#ffffff" }).setOrigin(0.5, 0.5);
        this.add.text(canvasWidth / 2, (canvasHeight / 2) + 125, "Press space to start again!").setOrigin(0.5, 0.5);

        // Register that we want to be notified if the space is pressed
        this.input.keyboard.on("keydown_SPACE", this.handleStart, this);
    }

    /**
     * Restarts the game. If only we ran adds in our game so we could let them
     * replay AND make some money of 'em
     *
     * @method GameOverScene#handleStart
     *
     */
    private handleStart() {
        this.scene.start("GameScene");
    }
}
