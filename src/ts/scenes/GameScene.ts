import { Enemy } from "../objects/Enemy";
import { Player } from "../objects/Player";
import { Treasure } from "../objects/Treasure";
import { World } from "../objects/World";

/**
 * @classdesc
 * This is the actual scene where the game runs. Of course we can have multiple
 * different game scenes (like a separate scene if we would have a boss fight).
 *
 * @class GameScene
 * @memberof Phaser.Scene
 * @constructor
 */
export class GameScene extends Phaser.Scene {
  private isTerminating: boolean;
  private isGodMode: boolean;
  private isChangingLevel: boolean;

  private music: Phaser.Sound.BaseSound;
  private winSound: Phaser.Sound.BaseSound;
  private looseSound: Phaser.Sound.BaseSound;

  private player: Player;
  private enemies: Phaser.GameObjects.Group;
  private fireballs: Phaser.GameObjects.Group;
  private treasure: Treasure;

  private currentScreen: number;

  constructor() {
    super({ key: "GameScene" });
  }

  public create(): void {
    // this.cameras.main.setRenderToTexture("GameBoyShader");

    this.isTerminating = false;
    this.isChangingLevel = false;
    this.isGodMode = false;
    this.currentScreen = 0;

    // The registry is a global key/value store that can be accessed from
    // within all scenes. It can be used as a way to communicate state or
    // other sorts of data.
    if (!this.registry.has("level")) {
      this.registry.set("level", 0);
    }

    if (!this.registry.has("lives")) {
      this.registry.set("lives", 3);
    }

    // Multiple scenes can be run at the same time. We do it here for the
    // HUD that contains information like the score. Make sure to RUN the
    // scene and not START the scene as that will navigate away from this
    // GameScene.
    if (!this.scene.isActive("HudScene")) {
      this.scene.run("HudScene");
    }

    // Audio adds a lot of perception to the game!
    this.winSound = this.sound.add("win");
    this.looseSound = this.sound.add("loose");
    this.music = this.sound.add("background");
    this.music.play(undefined, { loop: true });

    // Adding the cast of the game to the screen
    const world = new World(this, this.levelCompleted.bind(this));
    this.enemies = this.createEnemies();
    this.player = new Player(this, 185, 325, "atlas", "Knight/Idle01");
    this.treasure = new Treasure(this, 2655, 340, "atlas", "Treasure/Open01");

    // Collect all the fireballs so we can setup overlap detection
    this.fireballs = this.add.group(this.enemies.getChildren().map((enemy: Enemy) => enemy.fireball));

    // This will watch the player and worldLayer every frame to check for collisions
    this.physics.world.on("worldbounds", this.changeLevel, this);
    this.physics.add.collider(this.player, world.worldLayer);
    this.physics.add.collider(this.player, this.treasure);
    this.physics.add.overlap(this.player, this.enemies, this.dragonOrFireballCollision, null, this);
    this.physics.add.overlap(this.player, this.fireballs, this.dragonOrFireballCollision, null, this);
  }

  public update(): void {
    if (this.isTerminating || this.isChangingLevel) {
      return;
    }

    // Update player location
    this.player.update();

    // Update Enemies
    this.enemies.children.each((enemy: Enemy) => enemy.update(), this);
  }

  /**
   * Changes the level
   *
   * @method GameScene#createEnemies
   *
   */
  private changeLevel(body: Phaser.Physics.Arcade.Body, hitUp: boolean, hitDown: boolean, hitLeft: boolean, hitRight: boolean) {
    // Detect if we are in a transition or at the lower/upper limits
    if (this.isChangingLevel || (hitLeft && this.currentScreen - 1 < 0) || (hitRight && this.currentScreen + 1 > 2)) {
      return;
    }

    this.isChangingLevel = true;
    this.isGodMode = true;

    let xOffset = 0;

    if (hitLeft) {
      this.currentScreen--;
      xOffset = -50;
    } else if (hitRight) {
      this.currentScreen++;
      xOffset = 50;
    }

    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;

    if (this.currentScreen === 2) {
      // TODO: Darken here
    }

    this.cameras.main.pan(
      canvasWidth * this.currentScreen + canvasWidth / 2,
      canvasHeight / 2,
      1000,
      undefined,
      false,
      (camera, progress) => {
        if (progress === 1) {
          this.physics.world.setBounds(canvasWidth * this.currentScreen, 0, canvasWidth, canvasHeight);
          this.player.x += xOffset;
          this.isChangingLevel = false;

          this.time.addEvent({
            callback: () => {
              this.isGodMode = false;
            },
            callbackScope: this,
            delay: 750
          });
        }
      },
      this
    );
  }

  /**
   * Creates a group of enemy dragons
   *
   * @method GameScene#createEnemies
   *
   */
  private createEnemies(): Phaser.GameObjects.Group {
    // Creates a set of enemies and configures them with the values below.
    const enemyConfig: Phaser.Types.GameObjects.Group.GroupCreateConfig = {
      classType: Enemy,
      frame: "Dragon/Idle01",
      key: "atlas",
      repeat: 3,
      setScale: {
        x: 0.4,
        y: 0.4
      },
      setXY: {
        stepX: 192,
        x: 1234,
        y: 180
      }
    };

    return this.add.group(enemyConfig);
  }

  /**
   * Handles the collision of the player with a dragon or its fireballs
   *
   * @method GameScene#dragonOrFireballCollision
   *
   */
  private dragonOrFireballCollision(player, dragon) {
    if (!this.isTerminating && !this.isGodMode) {
      this.isTerminating = true;
      this.music.stop();

      player.body.enable = false;

      this.cameras.main.once("camerashakecomplete", () => {
        this.cameras.main.fade(500);
      });

      this.cameras.main.once("camerafadeoutcomplete", () => {
        // Dead yet?
        if (this.registry.get("lives") === 0) {
          const reachedLevel = this.registry.get("level");
          this.registry.remove("level");
          this.registry.remove("lives");
          this.scene.stop("HudScene");

          this.scene.start("GameOverScene", reachedLevel);
        } else {
          this.scene.restart();
        }
      });

      this.player.inflictPain();
      this.registry.set("lives", --this.registry.values.lives);
      this.looseSound.play();
      this.currentScreen = 0;
      this.cameras.main.shake(300);
    }
  }

  /**
   * Handles what to do if a player is hit or entered the cave
   *
   * @method GameScene#levelCompleted
   *
   */
  private levelCompleted() {
    if (this.isTerminating) {
      return;
    }

    this.isTerminating = true;
    this.music.stop();
    this.player.body.enable = false;
    this.treasure.play("Treasure/Open");

    this.time.addEvent({
      callback: () => {
        this.registry.set("level", ++this.registry.values.level);
        this.winSound.play();
        this.cameras.main.fade(
          1500,
          0,
          0,
          0,
          false,
          (camera, progress) => {
            if (progress === 1) {
              this.scene.restart();
            }
          },
          this
        );
      },
      callbackScope: this,
      delay: 1000
    });
  }
}
