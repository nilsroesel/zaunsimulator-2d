import { Component, OnInit } from '@angular/core';
import { MoneyTransaction, PersistenceService } from '../service/persistence.service';
import { FeatureAsset, FenceAsset, LevelAsset } from '../service/game-loader.service';
import { LEVELS } from '../home/levels';
import { FENCES } from '../home/fences';

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {


    private money: Promise<number>;

    private lockedLevels: Array<LevelAsset>;

    private lockedFences: Array<FenceAsset>;

    constructor( private persistenceService: PersistenceService ) { }

    ngOnInit() {
        this.money = this.persistenceService.loadMoney();
        this.loadFeatures();
    }

    buyFeature( asset: FeatureAsset ) {
        Promise.all([this.persistenceService.testFeature(asset.feature), this.money] as Array<any>)
            .then((args: [boolean, number]) => {
                const disabled = args[0];
                const money = args[1];
                if ( money >= asset.price && !disabled) {
                    this.persistenceService.transactMoney(asset.price, MoneyTransaction.SUBTRACT).then(() =>
                        this.money = this.persistenceService.loadMoney());
                    this.persistenceService.unlockFeature(asset.feature).then(() => this.loadFeatures());
                }
            });
    }

    loadFeatures() {
        const dbLoadedLevels: Array<Promise<LevelAsset>> = LEVELS.map(e => {
            return new Promise(resolve => {
                this.persistenceService.testFeature(e.feature).then(isEnabled => {
                    resolve(Object.assign({}, e, { isEnabled }));
                });
            });
        });

        Promise.all(dbLoadedLevels).then(resolvedLevels => this.lockedLevels = resolvedLevels);

        const dbLoadedFences: Array<Promise<LevelAsset>> = FENCES.map(e => {
            return new Promise(resolve => {
                this.persistenceService.testFeature(e.feature).then(isEnabled => {
                    resolve(Object.assign({}, e, { isEnabled }));
                });
            });
        });
        Promise.all(dbLoadedFences).then(resolvedFences => this.lockedFences = resolvedFences);
    }
}
