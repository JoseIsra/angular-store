import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from '@/types';
import { ProductsService } from '@/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@/services/store.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
  @Input() price = 0;
  @Input() category = '';
  currentProduct: Product | null = null;
  productId: string | null = null;

  constructor(
    private productService: ProductsService,
    private $route: ActivatedRoute,
    private storeService: StoreService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.$route.params.subscribe((param) => {
      this.productId = (param as { id: string }).id;
    });
    if (this.productId) {
      // load the product with the id
      this.productService
        .getProductById(this.productId)
        .subscribe((product) => (this.currentProduct = product));
    }
  }

  handleAddToCart() {
    if (!this.currentProduct) return;
    this.storeService.addProduct(this.currentProduct);
  }
  handleReturnToHome() {
    this.location.back();
  }
}
