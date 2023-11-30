import { ProductsService } from '@/services/products.service';
import { Category } from '@/types';
import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss'],
})
export class StoreHeaderComponent implements OnInit {
  counter = 0;
  categories: Category[] = [];
  constructor(
    public storeService: StoreService,
    private productService: ProductsService,
    private $router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((data) => {
      this.counter = data.length;
    });

    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  handleCategorySelected(category: Category) {
    this.$router.navigate([`/category/${category.id}`]);
  }
}
