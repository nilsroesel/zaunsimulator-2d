import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { FenceAsset, LevelAsset } from './game-loader.service';
import { LEVELS } from '../home/levels';
import { FENCES } from '../home/fences';


@Injectable()
export class FeatureService {

    constructor( private persistenceService: PersistenceService ) {}

    loadLevels(callback?: (levels: Array<LevelAsset>) => void): Promise<Array<LevelAsset>> {
        const dbLoadedLevels: Array<Promise<LevelAsset>> = LEVELS.map(e => {
            return new Promise<LevelAsset>(resolve => {
                this.persistenceService.testFeature(e.feature).then(isEnabled => {
                    resolve(Object.assign({}, e, { isEnabled }));
                });
            });
        });
        const combinedPromises =  Promise.all(dbLoadedLevels);
        if (!!callback) combinedPromises.then(callback);
        return combinedPromises;
    }

    loadFences(callback?: (levels: Array<FenceAsset>) => void): Promise<Array<FenceAsset>> {
        const dbLoadedFences: Array<Promise<LevelAsset>> = FENCES.map(e => {
            return new Promise(resolve => {
                this.persistenceService.testFeature(e.feature).then(isEnabled => {
                    resolve(Object.assign({}, e, { isEnabled }));
                });
            });
        });
        const combinedPromises =  Promise.all(dbLoadedFences);
        if (!!callback) combinedPromises.then(callback);
        return combinedPromises;
    }
}
