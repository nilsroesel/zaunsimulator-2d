import { Injectable } from '@angular/core';
import { MEADOW } from '../home/levels/';
import { NORMAL_FENCE } from '../home/fences/normal.fence';
import { Feature } from './index';

@Injectable()
export class GameLoaderService {
    private levelAsset: LevelAsset;
    private fenceAsset: FenceAsset;
    private characterName: string;

    setLevelAsset( asset: LevelAsset ) {
        this.levelAsset = asset;
    }

    setFenceAsset( asset: FenceAsset ) {
        this.fenceAsset = asset;
    }

    setCharacterName( name: string ) {
        this.characterName = name;
    }

    getLevelAsset(): LevelAsset { return this.levelAsset || MEADOW; }

    getFenceAsset(): FenceAsset { return this.fenceAsset || NORMAL_FENCE; }

    getCharacterName(): string { return this.characterName; }

}

export interface FenceAsset extends Asset, FeatureAsset {}

export interface Asset {
    readonly path: string;
    readonly name: string;
}

export interface LevelAsset extends Asset, FeatureAsset {
    readonly behaviours: Array<BehaviourObject>;
}

export interface FeatureAsset {
    readonly isEnabled?: boolean;
    readonly price?: number;
    readonly feature: Feature;
}

export class JukeBox {

    static readonly MASCHENDRAHT_ZAUN = new JukeBox('/assets/music/maschendrahtzaun.mp3', 'Maschendrahtzaun');

    constructor( path: string, name: string ) {
        this.path = path;
        this.name = name;
    }

    readonly path: string;
    readonly name: string;
}


export interface BehaviourObject {
    /* 1 directly before background <--- Layer 3 Fence --> 5 nearest foreground */
    layer?: 1 | 2 | 3 | 4 | 5;
    preload: () => any;
    create: () => any;
    update: (obj) => any;
}

export function createFrameArray(beginning: number, ending: number): Array<number> {
    const ret: Array<number> = [];
    for (let i = beginning; i <= ending; i++) ret.push(i);
    return ret;
}
