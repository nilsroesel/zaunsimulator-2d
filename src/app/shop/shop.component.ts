import { Component, OnInit } from '@angular/core';
import { MoneyTransaction, PersistenceService } from '../service/persistence.service';
import { FeatureAsset, LevelAsset } from '../service/game-loader.service';
import { DESERT, MEADOW } from '../home/levels';

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

    private money: Promise<number>;

    private lockedLevels: Array<LevelAsset>;

    constructor( private persistenceService: PersistenceService ) { }

    ngOnInit() {
        this.money = this.persistenceService.loadMoney();
        const dbLoadedLevels: Array<Promise<LevelAsset>> = [DESERT].map(e => {
            return new Promise(resolve => {
                this.persistenceService.testFeature(e.feature).then(isEnabled => {
                    resolve(Object.assign({}, e, { isEnabled }));
                });
            });
        });

        Promise.all(dbLoadedLevels).then(resolvedLevel => this.lockedLevels = [MEADOW]
                .map(e => Object.assign({}, e, { isEnabled: true }))
                .concat(resolvedLevel)
        );
    }

    buyFeature( asset: FeatureAsset ) {
        Promise.all([this.persistenceService.testFeature(asset.feature), this.money] as Array<any>)
            .then((args: [boolean, number]) => {
                const disabled = args[0];
                const money = args[1];
                if ( money >= asset.price && !disabled) {
                    this.persistenceService.transactMoney(asset.price, MoneyTransaction.SUBTRACT).then(() =>
                        this.money = this.persistenceService.loadMoney());
                    this.persistenceService.unlockFeature(asset.feature);
                }
            });
    }



}
