import { LevelAsset } from '../../model/level-asset';
import { Feature } from '../../model/feature';

export const DESERT: LevelAsset = {
    path: 'assets/levels/level_2_bg.png',
    name: 'Level.Desert',
    feature: Feature.LEVEL_DESERT,
    price: 100,
    behaviours: [
        {
            layer: 2,
            preload: function () {
                this.load.image('cactus1', '/assets/environment/kaktus_1.png');
            },
            create: function () {
                return this.game.add.image(this.game.scale.width * 0.8, this.game.scale.height * 0.3, 'cactus1');
            },
            update: function () {
            }
        },
        {
            layer: 4,
            preload: function () {
                this.load.image('cactus2', '/assets/environment/kaktus_2.png');
            },
            create: function () {
                return this.game.add.image(50, this.game.scale.height * 0.4, 'cactus2');
            },
            update: function () {
            }
        },
        {
            preload: function () {
                this.load.spritesheet('bird', '/assets/environment/bird_sprite.png', 28, 26, 20);
            },
            create: function () {
                const bird = this.game.add.sprite(this.game.scale.width + 130, 50, 'bird');
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
            layer: 5,
            preload: function () {
                this.load.spritesheet('bison', '/assets/environment/bison_sprite.png', 42, 25, 20);
            },
            create: function () {
                const bison = this.game.add.sprite(this.game.scale.width + 130, this.game.scale.height - 35, 'bison');
                bison.scale.set(2.35);
                bison.anchor.setTo(0, 1);
                bison.animations.add('walk');
                bison.animations.play('walk', 22, true);
                return bison;
            },
            update: function (bison) {
                if (bison.x > -100) bison.x -= 0.225;
                else bison.x = this.game.scale.width + 250;
            }
        },
        {
            layer: 2,
            preload: function () {
                this.load.spritesheet('tumbleweed', '/assets/environment/tumbleweed_sprite.png', 78.4, 82, 5);
            },
            create: function () {
                const bush = this.game.add.sprite(-100, this.game.scale.height - 130, 'tumbleweed');
                bush.scale.set(0.75);
                bush.animations.add('tumble_around');
                bush.animations.play('tumble_around', 2, true);
                return bush;
            },
            update: function (bush) {
                if (bush.x < this.game.scale.width + 100) bush.x += 0.2;
                else bush.x = -100;
            }
        }
    ]
};
