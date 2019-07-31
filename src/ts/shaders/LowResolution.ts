/* tslint:disable */
import LowResolutionFrag from "./LowResolution.frag";

// @ts-ignore
export const LowResolution = new Phaser.Class({
  Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

  initialize: function LowResolution(game) {
    Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
      fragShader: LowResolutionFrag,
      game,
      renderer: game.renderer
    });
  }
});
