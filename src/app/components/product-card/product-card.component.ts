import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() price = 0;
  @Input() img = '';
  @Input() title = '';
  @Output() productSelected = new EventEmitter();

  handleSelectProduct() {
    this.productSelected.emit();
  }
}
