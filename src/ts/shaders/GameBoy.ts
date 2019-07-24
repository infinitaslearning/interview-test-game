/* tslint:disable */
import * as GameBoyFrag from "./GameBoy.frag";

// @ts-ignore
export const GameBoy = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

        function GameBoy(game) {
            Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
                fragShader: GameBoyFrag,
                game,
                renderer: game.renderer,
            });
        }
});
