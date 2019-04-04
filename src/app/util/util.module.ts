import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedCanvasComponent } from './animated-canvas.component';
import { ClassObserveDirective } from './class-observe.directive';

@NgModule({
    imports: [CommonModule],
    exports: [AnimatedCanvasComponent, ClassObserveDirective],
    declarations: [AnimatedCanvasComponent, ClassObserveDirective]
})
export class UtilModule {}
