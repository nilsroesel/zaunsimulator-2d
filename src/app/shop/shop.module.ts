import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ShopComponent
            }
        ])
    ],
    declarations: [ShopComponent, ShopCardComponent]
})
export class ShopModule {}
