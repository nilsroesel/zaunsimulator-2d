import { Injectable } from '@angular/core';

@Injectable()
export class Scorer {
    private seconds = 0;
    private score = 0;
    private isRunning = true;

    private interval;

    getScoreAsString(): string {
        return `Score: ${this.score}`;
    }

    getScore(): number { return this.score; }

    hasLost(): boolean { return !this.isRunning; }

    start( onInterrupt?: () => void, thisArg? ) {
        const callback = onInterrupt || function() {};
        this.seconds = 0;
        this.score = 0;
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.seconds++;
            this.score += Math.floor((Math.random() * this.seconds) + 1);
            if ( this.randomLoose() ) { callback.call(thisArg || {}); }
        }, 1000);
    }

    stop() { clearInterval(this.interval); }

    private randomLoose() {
        const probability = 0.00001 * this.score;
        this.isRunning = probability <= Math.random();
        return this.hasLost();
    }

}
