import { Directive, DoCheck, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[onClassChange]'
})
export class ClassObserveDirective implements DoCheck {

    @Input() onClassChange: (classList: DOMTokenList) => void = () => {};

    constructor( private elRef: ElementRef ) {}

    ngDoCheck() {
        this.onClassChange(this.elRef.nativeElement.classList);
    }
}
