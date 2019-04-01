import { NgModule } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { IonicStorageModule } from '@ionic/storage';
import { GameLoaderService } from './game-loader.service';


@NgModule({
    imports: [IonicStorageModule.forRoot({
        name: '__zaunsimulator'
    })],
    providers: [PersistenceService, GameLoaderService]
})
export class ServiceModule {}
