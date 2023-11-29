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
  @Input() tax = 0;
  @Output() productSelected = new EventEmitter();
  @Output() productDetail = new EventEmitter();
  @Output() showProductPage = new EventEmitter();
  @Output() editProduct = new EventEmitter();
  @Output() deleteProduct = new EventEmitter();

  handleSelectProduct() {
    this.productSelected.emit();
  }

  handleOpenProductDetail() {
    this.productDetail.emit();
  }

  handleEditProduct() {
    this.editProduct.emit();
  }

  handleDeleteProduct() {
    this.deleteProduct.emit();
  }

  handleShowProductPage() {
    this.showProductPage.emit();
  }
}
