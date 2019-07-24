/**
 * @classdesc
 * The HudScene shows the player statistics like health and amount of coins earned.
 *
 * @class HudScene
 * @memberof Phaser.Scene
 * @constructor
 */
export class HudScene extends Phaser.Scene {

    private maxHearts: number = 10;
    private heartIcons: Phaser.GameObjects.Group;
    private coinIcons: Phaser.GameObjects.Group;

    constructor() {
        super({ key: "HudScene" });
    }

    public create() {

        this.registry.events.on("changedata", this.updateRegistryData, this);

        this.coinIcons = this.add.group();

        if (this.registry.has("level")) {
            this.updateRegistryData(this, "level", this.registry.get("level"));
        }

        this.createHealthBar();

        if (this.registry.has("lives")) {
            this.updateRegistryData(this, "lives", this.registry.get("lives"));
        }
    }

    /**
     * Creates the bar with hearts
     *
     * @method HudScene#createHealthBar
     *
     */
    private createHealthBar() {
        const heartConfig: Phaser.Types.GameObjects.Group.GroupCreateConfig = {
            frame: "Heart",
            key: "atlas",
            repeat: this.maxHearts,
            setScale: {
                x: 0.4,
                y: 0.4
            },
            setXY: {
                stepX: 37,
                x: 50,
                y: 100
            },
            visible: false
        };

        this.heartIcons = this.add.group(heartConfig);
    }

    /**
     * When the global registry changes we get a notification so we can update the HUD.
     * We use this as a weak reference between the GameScene and the HudScene.
     *
     * @method HudScene#updateRegistryData
     *
     */
    private updateRegistryData(parent, key, data) {
        if (key === "lives") {
            let i = 0;

            this.heartIcons.children.each((heartIcon: Phaser.GameObjects.Sprite) => {
                heartIcon.visible = i < data ? true : false;
                i++;
            }, this);
        }

        if (key === "level") {
            const level = data;

            if (level === 0) {
                this.coinIcons.clear();
                return;
            }

            const winCoin = this.add.sprite(605, 350, "atlas", `Coins/0${level}`).setScale(0.4);

            this.tweens.add({
                duration: 1250,
                targets: winCoin,
                x: 45 * level,
                y: 50
            });
        }
    }
}
