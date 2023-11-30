import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@/website/pages/home/home.component';
import { LoginComponent } from '@/website/pages/login/login.component';
import { ProductInfoComponent } from '@/website/pages/product-info/product-info.component';
import { LayoutComponent } from '@/website/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        // redirecciona bien bacán al home
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
        data: {
          preload: true,
        },
      },
      {
        path: 'product/:id',
        component: ProductInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
