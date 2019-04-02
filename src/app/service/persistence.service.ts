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

    getProperty( property: string ) { return this.store.get(property); }

    setProperty( property: string, value: any ) { return this.store.set(property, value); }
}

export enum MoneyTransaction { ADD = 1, SUBTRACT = -1 }
