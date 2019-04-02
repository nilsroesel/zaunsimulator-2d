import { createFrameArray } from '../../service';
import { LevelAsset } from '../../model/level-asset';

export const MEADOW: LevelAsset = {
    path: 'assets/levels/level_1_bg.png',
    name: 'Level.Meadow',
    feature: undefined,
    behaviours: [{
        preload: function () {
            this.load.image('cloud1', '/assets/environment/cloud1.png');
        },
        create: function () {
            return this.game.add.image(this.game.scale.width, 25, 'cloud1');
        },
        update: function (cloud) {
            if (cloud.x > -80) cloud.x -= 0.35;
            else cloud.x = this.game.scale.width + 200;
        }
    },
    {
        preload: function () {
        },
        create: function () {
            const cloud = this.game.add.image(this.game.scale.width + 130, -10, 'cloud1');
            cloud.scale.set(1.5);
            return cloud;
        },
        update: function (cloud) {
            if (cloud.x > -100) cloud.x -= 0.2;
            else cloud.x = this.game.scale.width + 250;
        }
    },
    {
        preload: function () {
            this.load.spritesheet('bird', '/assets/environment/bird_sprite.png', 28, 26, 20);
        },
        create: function () {
            const bird = this.game.add.sprite(this.game.scale.width + 130, 50, 'bird');
            bird.scale.set(2);
            bird.animations.add('fly');
            bird.animations.play('fly', 20, true);
            return bird;
        },
        update: function (bird) {
            if (bird.x > -100) bird.x -= 0.7;
            else bird.x = this.game.scale.width + 250;
        }
    },
    {
        preload: function () {
            this.load.spritesheet('wipf', '/assets/environment/wipf_sprite.png', 24, 18, 144);
        },
        create: function () {
            const wipf = this.game.add.sprite(this.game.scale.width * 0.6, this.game.scale.height - 100, 'wipf');
            wipf.scale.set(2.5);
            wipf.animations.add('move_left', createFrameArray(0, 17), 20, true);
            wipf.animations.add('move_right', createFrameArray(18, 35), 20, true);
            wipf.animations.add('turn_left', createFrameArray(36, 41), 20, false);
            wipf.animations.add('turn_right', createFrameArray(53, 59), 20, false);
            wipf.animations.add('idle', createFrameArray(108, 113), 14, false);
            return wipf;
        },
        update: function (wipf) {
            if (wipf.x < 50) {
                wipf.animations.play('turn_right');
            }
            if (wipf.x > this.game.scale.width - 100) {
                wipf.animations.play('turn_left');
            }
            // Positive to negative all range
            const randomNumber = (Math.floor((Math.random() * 2)) > 0 ? 1 : -1) * Math.floor((Math.random() * 32767));

            if (randomNumber < -2000) {
                wipf.x -= 0.4;
            } else if (randomNumber > 2000) {
                wipf.x += 0.4;
            } else {
                wipf.animations.play('idle');
            }

        }
    }]
};
