import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { FeatureService, GameLoaderService, PersistenceService } from './index';


@NgModule({
    imports: [IonicStorageModule.forRoot({
        name: '__zaunsimulator'
    })],
    providers: [FeatureService, GameLoaderService, PersistenceService]
})
export class ServiceModule {}
