import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedCanvasComponent } from './animated-canvas.component';

@NgModule({
    imports: [CommonModule],
    exports: [AnimatedCanvasComponent],
    declarations: [AnimatedCanvasComponent]
})
export class UtilModule {}
