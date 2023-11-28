import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userRoutes } from '@/routes/user/user.routes';
import { productRoutes } from '@/routes/product/product.routes';
import { routes } from './routes/app.routes';

@NgModule({
  imports: [RouterModule.forRoot(routes.concat(userRoutes, productRoutes))],
  exports: [RouterModule],
})
export class AppRoutingModule {}
