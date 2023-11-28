import { ProductsService } from '@/services/products.service';
import { Product } from '@/types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(limit = 10, offset = 0) {
    this.productService
      .getProductByPage({
        limit,
        offset: offset * 10,
      })
      .subscribe((data) => {
        this.products = data;
      });
  }

  onPageChanged(page: number) {
    this.loadProducts(10, page);
  }
}
