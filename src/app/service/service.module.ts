import { NgModule } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { IonicStorageModule } from '@ionic/storage';
import { GameLoaderService } from './game-loader.service';
import { FeatureService } from './feature.service';


@NgModule({
    imports: [IonicStorageModule.forRoot({
        name: '__zaunsimulator'
    })],
    providers: [FeatureService, GameLoaderService, PersistenceService]
})
export class ServiceModule {}
