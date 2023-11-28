import { HomeComponent } from '@/pages/home/home.component';
import { LoginComponent } from '@/pages/login/login.component';
import { CategoryComponent } from '@/pages/category/category.component';

import { Routes } from '@angular/router';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';

export const routes: Routes = [
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
    path: 'category/:id',
    component: CategoryComponent,
  },
];
