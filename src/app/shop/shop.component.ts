import { Component, OnInit } from '@angular/core';
import { MoneyTransaction, PersistenceService } from '../service/persistence.service';
import { FeatureAsset, FenceAsset, LevelAsset } from '../service/game-loader.service';
import { FeatureService } from '../service/feature.service';

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
        this.featureService.loadLevels(resolvedLevels => this.lockedLevels = resolvedLevels);
        this.featureService.loadFences(resolvedFences => this.lockedFences = resolvedFences);
    }
}
