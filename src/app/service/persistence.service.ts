import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class PersistenceService {
    constructor( private store: Storage ) {}

    transactMoney(amount: number, transaction: MoneyTransaction = MoneyTransaction.ADD) {
        return this.store.get('points').then(loadedPoints => {
            let points = loadedPoints;
            if ( Number.isNaN(points) ) points = 0;
            this.store.set('points', points + (amount * transaction));
        }).catch(err => console.log(err));
    }

    loadMoney(): Promise<number> {
        return new Promise<number>(resolve => this.store.get('points')
            .then(points => !!points && typeof points === 'number' ? resolve(points) : resolve(0))
            .catch(() => resolve(0))
        );
    }

    testFeature( feature: Feature ): Promise<boolean> {
        return !!feature ? new Promise<boolean>(resolve => resolve(true)) :
            new Promise<boolean>(resolve => this.store.get(feature)
                .then(dbFeature => resolve(!!dbFeature))
                .catch(() => resolve(false)));
    }

    unlockFeature( feature: Feature ) { return this.store.set(feature, true); }
}

export enum MoneyTransaction { ADD = 1, SUBTRACT = -1 }

export enum Feature {
    LEVEL_DESERT = 'LEVEL_DESERT',

    FENCE_MESH_WIRE = 'FENCE_MESH_WIRE',

    FENCE_LASER = 'FENCE_LASER'
}

