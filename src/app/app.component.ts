import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Product } from './types';
import { StoreService } from './services/store.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products: Product[] = [];

  // inyección de dependencias
  constructor(
    private storeService: StoreService,
    private title: Title,
    private meta: Meta,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('IsraStore');
    this.meta.updateTag({
      name: 'description',
      content: 'The drugstore with cheapiest products',
    });
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onProductSelected(product: Product) {
    this.storeService.addProduct(product);
  }
}
