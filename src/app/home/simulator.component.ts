import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameLoaderService, JukeBox, PersistenceService } from '../service';
import { Scorer } from './scorer.service';
declare var Phaser;

let this$;

@Component({
    selector: 'simulator',
    templateUrl: 'simulator.component.html',
    styleUrls: ['simulator.component.scss'],
    providers: [Scorer]
})

export class SimulatorComponent implements OnInit, OnDestroy {

    game;
    musicPlayer;
    lostScreen;
    background;
    fence;
    counterLabel;

    sceneObjects;
    scoreReporter;

    constructor( private gameLoaderService: GameLoaderService,
                 private scorer: Scorer,
                 private persistenceService: PersistenceService ) {
        this$ = this;
    }

    ngOnInit() {
        this.scorer.start();
        this.game = new Phaser.Game(812, 340, Phaser.AUTO, 'zaunsimulator',
            { preload: this.preload, create: this.create, update: this.update });
    }

    ngOnDestroy() {
        this.game.sound.stopAll();
        this.scorer.stop();
    }

    preload() {
        this.game.load.image('lost', '/assets/lost.png');
        this.game.load.image('bg_level', this$.gameLoaderService.getLevelAsset().path);
        this.game.load.spritesheet('fence', this$.gameLoaderService.getFenceAsset().path, 200, 100, 6);
        this.game.load.audio('bg_music', [JukeBox.MASCHENDRAHT_ZAUN.path]);

        const that = this;
        this$.gameLoaderService.getLevelAsset().behaviours.forEach(behaviour => behaviour.preload.apply(that));
        this.scoreReporter = () => {
            const achievedPoints = this$.scorer.getScore();
            this$.persistenceService.transactMoney(Math.ceil(achievedPoints / 100));
        };
    }

    create() {
        const that = this;
        this.background = this.game.add.image(0, 0, 'bg_level');
        this.background.smoothed = false;
        this.musicPlayer = this.game.add.audio('bg_music');
        this.musicPlayer.autoplay = true;
        this.musicPlayer.loop = true;
        this.musicPlayer.play();

        /* Load Layer 1 */
        const layer1 = this.game.add.group();
        const layer1Behaviours = this$.gameLoaderService.getLevelAsset().behaviours.map(behaviour => {
            if (behaviour.layer === 1) {
                const createdValue = behaviour.create.apply(that);
                createdValue.parent.remove(createdValue);
                layer1.add(createdValue);
                return { createdValue, behaviour };
            } else return undefined;
        });

        /* Load Layer 2 */
        const layer2 = this.game.add.group();
        const layer2Behaviours = this$.gameLoaderService.getLevelAsset().behaviours.map(behaviour => {
            if (behaviour.layer === 2) {
                const createdValue = behaviour.create.apply(that);
                createdValue.parent.remove(createdValue);
                layer2.add(createdValue);
                return { createdValue, behaviour };
            } else return undefined;
        });

        /* Load Layer 3 */
        const layer3 = this.game.add.group();
        const layer3Behaviours = this$.gameLoaderService.getLevelAsset().behaviours.map(behaviour => {
            if (behaviour.layer === 3) {
                const createdValue = behaviour.create.apply(that);
                createdValue.parent.remove(createdValue);
                layer3.add(createdValue);
                return { createdValue, behaviour };
            } else return undefined;
        });
        this.fence = this.game.add.sprite(this.game.scale.width * 0.5, this.game.scale.height * 0.75, 'fence');
        this.fence.anchor.set(0.5);
        this.fence.scale.set(0.75);
        this.fence.animations.add('fence_idle', [0, 1, 2, 3, 4], 15, true);
        this.fence.animations.play('fence_idle', 10, true);
        this.fence.parent.remove(this.fence);
        layer3.add(this.fence);

        /* Load Layer 4 */
        const layer4 = this.game.add.group();
        const layer4Behaviours = this$.gameLoaderService.getLevelAsset().behaviours.map(behaviour => {
            if (behaviour.layer === 4) {
                const createdValue = behaviour.create.apply(that);
                createdValue.parent.remove(createdValue);
                layer4.add(createdValue);
                return { createdValue, behaviour };
            } else return undefined;
        });

        /* Load Layer 5 */
        const layer5 = this.game.add.group();
        const layer5Behaviours = this$.gameLoaderService.getLevelAsset().behaviours.map(behaviour => {
            if (behaviour.layer === 5 || !behaviour.layer) {
                const createdValue = behaviour.create.apply(that);
                createdValue.parent.remove(createdValue);
                layer5.add(createdValue);
                return { createdValue, behaviour };
            } else return undefined;
        });

        this.sceneObjects = layer1Behaviours
            .concat(layer2Behaviours)
            .concat(layer3Behaviours)
            .concat(layer4Behaviours)
            .concat(layer5Behaviours)
            .filter(v => !!v);

        const textStyle = { font: '24px Arial', fill: '#a0a0a0'};
        this.counterLabel = this.game.add.text(15, 15, 'Points', textStyle);
        this.lostScreen = this.game.add.image(0, 0, 'lost');
        this.lostScreen.visible = false;
    }

    update() {
        if (!this$.scorer.hasLost()) {
            this.counterLabel.text = this$.scorer.getScoreAsString();
        } else {
            this$.scorer.stop();
            this.fence.frame = 5;
            this.lostScreen.visible = true;
            this.scoreReporter = !!this.scoreReporter ? this.scoreReporter() : undefined;
        }
        const that = this;
        (this.sceneObjects || []).forEach(action => action.behaviour.update.call(that, action.createdValue));
    }

}
