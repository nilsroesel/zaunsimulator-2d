import { Injectable } from '@angular/core';
import { MEADOW } from '../home/levels/';
import { NORMAL_FENCE } from '../home/fences/normal.fence';
import { FenceAsset } from '../model/fence-asset';
import { LevelAsset } from '../model/level-asset';

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

export class JukeBox {

    static readonly MASCHENDRAHT_ZAUN = new JukeBox('/assets/music/maschendrahtzaun.mp3', 'Maschendrahtzaun');

    constructor( path: string, name: string ) {
        this.path = path;
        this.name = name;
    }

    readonly path: string;
    readonly name: string;
}




export function createFrameArray(beginning: number, ending: number): Array<number> {
    const ret: Array<number> = [];
    for (let i = beginning; i <= ending; i++) ret.push(i);
    return ret;
}
