import { Component, Input } from '@angular/core';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent {

  @Input() path: string;

  @Input() price: number;


  constructor() { }


}
