/**
 * @classdesc
 * The PreBoot scene is launched before the BootScene. We can load some initial graphics here hat
 * we can use during loading, such as a logo. After the pre-loading is completed the game advances
 * to the BootScene where we can use the loaded logo for the progress screen.
 *
 * @class PreBootScene
 * @memberof Phaser.Scene
 * @constructor
 *
 */
export class PreBootScene extends Phaser.Scene {

    constructor() {
        super({ key: "PreBootScene" });
    }

    public preload(): void {
        this.load.image("logo", "assets/images/logo.png");
    }

    public create(): void {
        this.scene.start("BootScene");
    }
}
