import { Injectable } from '@angular/core';
import { Product } from '../types';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  shoppingCart: Product[] = [];

  addProduct(product: Product) {
    this.shoppingCart.push(product);
  }

  getTotal() {
    return this.shoppingCart.reduce((acc, pr) => acc + pr.price, 0);
  }
}
