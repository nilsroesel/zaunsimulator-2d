import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SimulatorComponent } from './simulator.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild([
        {
          path: '',
          component: SimulatorComponent
        }
      ])
    ],
    declarations: [SimulatorComponent]
})
export class HomePageModule {}
