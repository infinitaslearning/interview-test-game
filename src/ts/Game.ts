/* tslint:disable:ordered-imports */
import { PreBootScene } from "./scenes/PreBootScene";
import { BootScene } from "./scenes/BootScene";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { GameScene } from "./scenes/GameScene";
import { HudScene } from "./scenes/HudScene";
import { GameOverScene } from "./scenes/GameOverScene";

import { GameBoy } from "./shaders/GameBoy";
import { LowResolution } from "./shaders/LowResolution";
/* tslint:enable:ordered-imports */

// Normally of type GameConfig instead of any, but pixelArt and antialias
// aren't supported by the definition files of phaser at the moment.
const gameConfig: any = {
  antialias: false,
  backgroundColor: "#8abbc1",
  callbacks: {
    postBoot: (game) => {
      game.renderer.addPipeline("GameBoyShader", new GameBoy(game));
      game.renderer.addPipeline("LowResolutionShader", new LowResolution(game));
    }
  },
  height: 768,
  input: {
    gamepad: false,
    keyboard: true,
    mouse: false,
    touch: false
  },
  physics: {
    arcade: {
      // Top down game, so no gravity
      debug: false,
      gravity: {
        y: 0
      }
    },
    default: "arcade"
  },
  pixelArt: true,
  scene: [PreBootScene, BootScene, MainMenuScene, GameScene, HudScene, GameOverScene],
  title: "Dragon Quest",
  type: Phaser.AUTO,
  version: "1.0",
  width: 1024
};

export class Game extends Phaser.Game {

  constructor(config: any) {
    super(config);
  }
}

window.onload = () => {
  const game = new Game(gameConfig);
};
