import { Injectable } from '@angular/core';
import { Product, User } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  shoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  // creamos un subscriptor
  myCart$ = this.myCart.asObservable();
  // user: User | null =
  //   JSON.parse(localStorage.getItem('user') as string) || null;

  addProduct(product: Product) {
    this.shoppingCart.push(product);
    this.myCart.next(this.shoppingCart);
  }

  getTotal() {
    return this.shoppingCart.reduce((acc, pr) => acc + pr.price, 0);
  }

  // setUserData(data: User) {
  //   this.user = data;
  //   localStorage.setItem('user', JSON.stringify(data));
  // }

  // removeUserData() {
  //   this.user = null;
  //   localStorage.removeItem('user');
  // }
}
