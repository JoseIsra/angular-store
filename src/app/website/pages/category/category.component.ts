import { ProductsService } from '@/services/products.service';
import { Product } from '@/types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    private $route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    // A COOL WAY WITHOUT MAP ALL THE PARAMS IN AN ARRAY
    // this.route.params.subscribe((param) => {
    //   this.categoryId = (param as Params).id;
    // });
    // if (this.categoryId) {
    //   this.productService
    //     .getProductsByCategory(Number(this.categoryId))
    //     .subscribe((products) => {
    //       this.products = products;
    //     });
    // }
    this.$route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productService.getProductsByCategory(
              Number(this.categoryId)
            );
          }
          return [];
        })
      )
      .subscribe((products) => {
        this.products = products;
      });

    this.$route.queryParamMap.subscribe((queries) => {
      console.log(
        '🚀 ~ file: home.component.ts:22 ~ HomeComponent ~ this.$route.queryParamMap.subscribe ~ queries:',
        queries
      );
      this.productId = queries.get('product');
    });
  }
}
