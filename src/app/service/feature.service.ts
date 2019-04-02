import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { LEVELS } from '../home/levels';
import { FENCES } from '../home/fences';
import { LevelAsset } from '../model/level-asset';
import { FenceAsset } from '../model/fence-asset';
import { Feature } from '../model/feature';


@Injectable()
export class FeatureService {

    constructor( private persistenceService: PersistenceService ) {}

    loadLevels( callback?: (levels: Array<LevelAsset>) => void ): Promise<Array<LevelAsset>> {
        const dbLoadedLevels: Array<Promise<LevelAsset>> = LEVELS.map(e => {
            return new Promise<LevelAsset>(resolve => {
                this.testFeature(e.feature).then(isEnabled => {
                    resolve(Object.assign({}, e, { isEnabled }));
                });
            });
        });
        const combinedPromises =  Promise.all(dbLoadedLevels);
        if ( !!callback ) combinedPromises.then(callback);
        return combinedPromises;
    }

    loadFences( callback?: (levels: Array<FenceAsset>) => void ): Promise<Array<FenceAsset>> {
        const dbLoadedFences: Array<Promise<FenceAsset>> = FENCES.map(e => {
            return new Promise(resolve => {
                this.testFeature(e.feature).then(isEnabled => {
                    resolve(Object.assign({}, e, { isEnabled }));
                });
            });
        });
        const combinedPromises =  Promise.all(dbLoadedFences);
        if ( !!callback ) combinedPromises.then(callback);
        return combinedPromises;
    }

    testFeature( feature: Feature, callback?: (enabled?: boolean) => void ): Promise<boolean> {
        const isEnabledPromise: Promise<boolean> = !feature ? new Promise<boolean>(resolve => resolve(true)) :
            new Promise<boolean>(resolve => this.persistenceService.getProperty(feature)
                .then(dbFeature => resolve(!!dbFeature))
                .catch(() => resolve(false)));
        if (!!callback ) isEnabledPromise.then(callback);
        return isEnabledPromise;
    }

    unlockFeature( feature: Feature, callback?: (val) => void ) {
        const creationPromise: Promise<any> = this.persistenceService.setProperty(feature, true);
        if ( !!callback ) creationPromise.then(callback);
        return creationPromise;
    }

}
