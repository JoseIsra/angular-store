import { ProductsService } from '@/services/products.service';
import { Product } from '@/types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  productId: string | null = null;
  constructor(
    private productService: ProductsService,
    private $route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.$route.queryParamMap.subscribe((queries) => {
      console.log(
        '🚀 ~ file: home.component.ts:22 ~ HomeComponent ~ this.$route.queryParamMap.subscribe ~ queries:',
        queries
      );
      this.productId = queries.get('product');
    });
    console.log(
      '🚀 ~ file: home.component.ts:28 ~ HomeComponent ~ this.$route.queryParamMap.subscribe ~ this.$route:',
      this.$route
    );
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
