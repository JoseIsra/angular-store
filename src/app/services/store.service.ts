import { Injectable } from '@angular/core';
import { Product } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  shoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  // creamos un subscriptor
  myCart$ = this.myCart.asObservable();

  addProduct(product: Product) {
    this.shoppingCart.push(product);
    this.myCart.next(this.shoppingCart);
  }

  getTotal() {
    return this.shoppingCart.reduce((acc, pr) => acc + pr.price, 0);
  }
}
