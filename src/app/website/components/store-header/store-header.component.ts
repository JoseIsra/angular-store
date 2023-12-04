import { ProductsService } from '@/services/products.service';
import { Category, User } from '@/types';
import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';
import { AuthService } from '@/services/auth/auth.service';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss'],
})
export class StoreHeaderComponent implements OnInit {
  counter = 0;
  categories: Category[] = [];
  user: User | null = null;

  constructor(
    private storeService: StoreService,
    private productService: ProductsService,
    private $router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((data) => {
      this.counter = data.length;
    });

    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  handleCategorySelected(category: Category) {
    this.$router.navigate([`/category/${category.id}`]);
  }

  handleLogout() {
    this.authService.logout();
  }
}
