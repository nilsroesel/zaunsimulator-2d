import { Component, OnInit } from '@angular/core';
import { FeatureService, MoneyTransaction, PersistenceService } from '../service';
import { LevelAsset } from '../model/level-asset';
import { FenceAsset } from '../model/fence-asset';
import { FeatureAsset } from '../model/feature-asset';

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {


    private money: Promise<number>;

    private lockedLevels: Array<LevelAsset>;

    private lockedFences: Array<FenceAsset>;

    constructor( private persistenceService: PersistenceService, private featureService: FeatureService ) { }

    ngOnInit() {
        this.money = this.persistenceService.loadMoney();
        this.loadFeatures();
    }

    buyFeature( asset: FeatureAsset ) {
        Promise.all([this.featureService.testFeature(asset.feature), this.money] as Array<any>)
            .then((args: [boolean, number]) => {
                const disabled = args[0];
                const money = args[1];
                if ( money >= asset.price && !disabled) {
                    this.persistenceService.transactMoney(asset.price, MoneyTransaction.SUBTRACT).then(() =>
                        this.money = this.persistenceService.loadMoney());
                    this.featureService.unlockFeature(asset.feature, () => this.loadFeatures());
                }
            });
    }

    loadFeatures() {
        this.featureService.loadLevels(resolvedLevels => this.lockedLevels = resolvedLevels);
        this.featureService.loadFences(resolvedFences => this.lockedFences = resolvedFences);
    }
}
