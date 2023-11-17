import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  @Output() closeDetail = new EventEmitter();
  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
  @Input() price = 0;
  @Input() category = '';

  handleCloseDetail() {
    this.closeDetail.emit();
  }
}
