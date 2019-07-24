/**
 * @classdesc
 * The BootScene is used to load all of the assets that are used by the game and is also responsible
 * for showing the loading progress.
 *
 * @class BootScene
 * @memberof Phaser.Scene
 * @constructor
 */
export class BootScene extends Phaser.Scene {

  constructor() {
    super({ key: "BootScene" });
  }

  public preload(): void {
    this.showProgress();

    // Texture atlas
    this.load.atlas("atlas", "assets/images/atlas.png", "assets/images/atlas.json");

    // Tile maps
    this.load.image("level-tileset", "assets/levels/Grassland@64x64.png");
    this.load.tilemapTiledJSON("level-tilemap", "assets/levels/level.json");

    // Audio
    this.load.audio("background", "assets/audio/music.ogg", {});
    this.load.audio("win", "assets/audio/win.mp3", {});
    this.load.audio("loose", "assets/audio/loose.mp3", {});
  }

  public create(): void {

    this.createAnimations();

    this.scene.start("MainMenuScene");
  }

  /**
   * Creates the animations and adds them to the global animation manager,
   * so they can be re-used in other parts of the game.
   *
   * @method BootScene#createAnimations
   *
   */
  private createAnimations() {

    this.createAnimation("FireBall/Normal", 6, 600, -1);

    this.createAnimation("Dragon/Idle", 3, 600, -1);
    this.createAnimation("Dragon/Shoot", 4, 750);
    this.createAnimation("Treasure/Open", 2, 500);

    this.createAnimation("Knight/Attack", 6, 300);
    this.createAnimation("Knight/Block", 4, 500);
    this.createAnimation("Knight/Cast", 5, 750);
    this.createAnimation("Knight/Crouch", 1, 500);
    this.createAnimation("Knight/Dash", 3, 750);
    this.createAnimation("Knight/Die", 8, 1000);
    this.createAnimation("Knight/Dizzy", 3, 500, -1);
    this.createAnimation("Knight/Hurt", 2, 750);
    this.createAnimation("Knight/Idle", 6, 750, -1);
    this.createAnimation("Knight/Jump", 2, 500);
    this.createAnimation("Knight/JumpAttack", 6, 400);
    this.createAnimation("Knight/Strike", 3, 750);
    this.createAnimation("Knight/Walk", 6, 750, -1);
    this.createAnimation("Knight/Win", 2, 750);
  }

  /**
   * Helper method to generate the animation. All about DRY.
   *
   * @method BootScene#createAnimation
   *
   */
  private createAnimation(name: string, numberOfFrames: number, duration: number, repeat: number = 0, yoyo: boolean = false) {
    const frames = this.anims.generateFrameNames("atlas", { prefix: name, start: 1, end: numberOfFrames, zeroPad: 2 });
    this.anims.create({ key: name, frames, duration, repeat, yoyo });
  }

  /**
   * Creates the progress indicator on the screen
   *
   * @method BootScene#showProgress
   *
   */
  private showProgress() {

    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "logo").setScale(0.5);

    const progress = this.add.graphics();
    const screenWidth = this.sys.canvas.width;

    this.load.on("progress", (value) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, 550, screenWidth * value, 25);
    });

    this.load.on("complete", () => {
      progress.destroy();
    });
  }
}
