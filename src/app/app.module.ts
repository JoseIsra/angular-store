import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import * as allBoots from '@ng-icons/bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { StoreHeaderComponent } from './components/store-header/store-header.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ApiInterceptor } from './interceptors/api/api.interceptor';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CategoryListComponent } from './components/shared/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    StoreHeaderComponent,
    ReversePipe,
    HighlightDirective,
    ProductsListComponent,
    ProductInfoComponent,
    HomeComponent,
    NotFoundComponent,
    CategoryComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    CategoryListComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgIconsModule.withIcons({ ...allBoots }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
