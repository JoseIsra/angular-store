import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Category, InputCreateProduct, Product } from '../types';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { checkTime } from '@/interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>('products');
  }

  getProductById(id: string) {
    return this.http.get<Product>(`products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.BadRequest) {
          return throwError('Algo falló en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe o no fue encontrado');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas autorizado carnal');
        }
        return throwError('Uy!! cagaste u.u');
      })
    );
  }

  createProduct(input: InputCreateProduct) {
    return this.http.post<Product>('products', input);
  }

  updateProduct({ id, input }: { id: number; input: Partial<Product> }) {
    return this.http.put<Product>(`products/${id}`, input);
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(`products/${id}`);
  }

  getProductByPage({ limit, offset }: { limit: number; offset: number }) {
    return this.http
      .get<Product[]>('products', {
        params: { limit, offset },
        context: checkTime(),
      })
      .pipe(
        retry(2),
        map((products) =>
          products.map((item) => ({
            ...item,
            taxes: 0.19 * item.price,
          }))
        )
      );
  }

  getProductsByCategory(categoryId: number) {
    return this.http.get<Product[]>(`categories/${categoryId}/products`);
  }

  getCategories() {
    return this.http.get<Category[]>('categories');
  }
}
