/**
 * @classdesc
 * Manages creation of the world
 *
 * @class World
 * @constructor
 */
export class World {

    public worldLayer: Phaser.Tilemaps.StaticTilemapLayer;

    private currentScene: Phaser.Scene;
    private treasureFoundCallbackFn: () => {};

    constructor(scene: Phaser.Scene, treasureFoundCallbackFn: () => {}) {

        this.currentScene = scene;
        this.treasureFoundCallbackFn = treasureFoundCallbackFn;
        this.createWorld();
    }

    /**
     * Creates a nice world where the player can die
     *
     * @method World#createWorld
     *
     */
    private createWorld() {
        const map = this.currentScene.make.tilemap({ key: "level-tilemap" });
        const tiles = map.addTilesetImage("Grassland", "level-tileset");

        // Create all the layers
        map.createStaticLayer("Ground", tiles, 0, 0);
        map.createStaticLayer("Walls", tiles, 0, 0).setDepth(2); // Puts it above the player
        map.createStaticLayer("Waterfall", tiles, 0, 0).setDepth(2); // Puts it above the player
        map.createStaticLayer("Dressing Bottom", tiles, 0, 0);
        map.createStaticLayer("Trees Bottom", tiles, 0, 0).setDepth(2); // Puts it above the player
        map.createStaticLayer("Trees Top", tiles, 0, 0);
        map.createStaticLayer("Trees Waterfall", tiles, 0, 0).setDepth(2);
        map.createStaticLayer("Dressing Top", tiles, 0, 0).setDepth(3);
        this.worldLayer = map.createStaticLayer("World", tiles, 0, 0);

        // Set the collider based on a configured property in Tiled.
        this.worldLayer.setCollisionByProperty({ collides: true });

        // Configure the callback if the player enters the cave
        map.setTileLocationCallback(41, 5, 1, 1, this.treasureFoundCallbackFn, this);

        if ((this.currentScene.physics.config as any).debug === true) {
            this.renderDebugLayer();
        }
    }

    /**
     * Renders the boundaries of the world
     *
     * @method World#renderDebugLayer
     *
     */
    private renderDebugLayer() {
        // Renders the world collider for debugging. Code can safely be removed if we don't need it anymore.
        // We cast the config to any because of missing typescript definition for the config object.
        const debugGraphics = this.currentScene.add.graphics().setAlpha(0.5);
        this.worldLayer.renderDebug(debugGraphics, {
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
            tileColor: null // Color of non-colliding tiles
        });
    }
}
