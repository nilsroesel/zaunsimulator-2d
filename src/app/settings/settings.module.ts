import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: SettingsComponent
            }
        ]),
        TranslateModule
    ],
    declarations: [SettingsComponent]
})
export class SettingsModule {}
