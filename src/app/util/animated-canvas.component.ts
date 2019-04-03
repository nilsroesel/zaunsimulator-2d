import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'animated-canvas',
  template: `<canvas #sprite *ngIf="!!sprite"></canvas>`
})
export class AnimatedCanvasComponent implements AfterViewInit {

    @Input() sprite: {
        path: string;
        width: number;
        height: number;
        frames: number;
        frame: number; // Default 0
        zoomFactor: number; // Default 1
        animationStartFrame: number; // If passed animation is played
        animationEndFrame: number; // Default last
        frameRate: number; // Default 12 fps
    };

    @ViewChild('sprite') canvas: ElementRef;

    private cx: CanvasRenderingContext2D;

    constructor() {}

    ngAfterViewInit() {
        if (!!this.sprite) {
            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            this.cx = canvasEl.getContext('2d');

            const calculatedWidth = ( this.sprite.width / this.sprite.frames ) * ( this.sprite.zoomFactor || 1 );
            const calculatedHeight = this.sprite.height * ( this.sprite.zoomFactor || 1 );
            canvasEl.width = calculatedWidth;
            canvasEl.height = calculatedHeight;

            const spriteFrameStartX = ( this.sprite.width / this.sprite.frames ) * this.sprite.frame;
            const spriteFrameStartY = 0;
            const frameWidth = (this.sprite.width / this.sprite.frames);
            const frameHeight = this.sprite.height;

            const cardImage = new Image();
            cardImage.src = this.sprite.path;
            cardImage.onload = () => {
                this.cx.drawImage(cardImage,
                    spriteFrameStartX,
                    spriteFrameStartY,
                    frameWidth,
                    frameHeight,
                    0,
                    0,
                    calculatedWidth,
                    calculatedHeight);
            };

            if ( this.sprite.animationStartFrame >= 0 ) {
                const startFrameX = (this.sprite.animationStartFrame || 0) * frameWidth;
                const endFrameX = (this.sprite.animationEndFrame || this.sprite.frames) * frameWidth;
                let newSpriteFrameX = startFrameX;
                setInterval(() => {
                    this.cx.clearRect(0, 0, calculatedWidth, calculatedHeight);
                    newSpriteFrameX = (newSpriteFrameX + calculatedWidth) <= endFrameX ?
                        (newSpriteFrameX + frameWidth) : startFrameX;

                    this.cx.drawImage(cardImage,
                        newSpriteFrameX,
                        spriteFrameStartY,
                        frameWidth,
                        frameHeight,
                        0,
                        0,
                        calculatedWidth,
                        calculatedHeight);
                }, 1000 / (this.sprite.frameRate || 12 ));
            }
        }
    }

}
