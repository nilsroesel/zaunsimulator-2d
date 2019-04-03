import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent {

    @Input() path: string;

    @Input() price: number;

    @Input() description: string = '';

    @Input() locked: boolean = true;

    @Input() translate: boolean = true;

    @Input() sprite: {
        width: number;
        height: number;
        frames: number;
        frame: number; // Default 0
        zoomFactor: number; // Default 1
        animationStartFrame: number; // If passed animation is played
        animationEndFrame: number; // Default last
        frameRate: number; // Default 12 fps
    };

    constructor() { }

    createSpriteSettings() { return Object.assign({}, this.sprite, { path: this.path }); }

}
