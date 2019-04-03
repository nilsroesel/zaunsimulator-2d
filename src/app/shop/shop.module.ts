import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from '../util/util.module';


@NgModule({
    imports: [
        UtilModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ShopComponent
            }
        ]),
        TranslateModule
    ],
    declarations: [ShopComponent, ShopCardComponent]
})
export class ShopModule {}
