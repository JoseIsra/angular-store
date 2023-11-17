import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { InputCreateProduct, Product } from '../types';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.API_URL);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.API_URL}/${id}`).pipe(
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
    return this.http.post<Product>(this.API_URL, input);
  }

  updateProduct({ id, input }: { id: number; input: Partial<Product> }) {
    return this.http.put<Product>(`${this.API_URL}/${id}`, input);
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.API_URL}/${id}`);
  }

  getProductByPage({ limit, offset }: { limit: number; offset: number }) {
    return this.http
      .get<Product[]>(this.API_URL, {
        params: { limit, offset },
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
}
