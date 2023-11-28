import { ProductInfoComponent } from '@/pages/product-info/product-info.component';
import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: 'product/:id',
    component: ProductInfoComponent,
  },
];
