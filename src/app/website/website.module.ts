import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import { StoreHeaderComponent } from './components/store-header/store-header.component';

import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CategoryListComponent } from './components/shared/category-list/category-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import * as allBoots from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { SharedModule } from '@/shared/shared.module';
import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
  declarations: [
    StoreHeaderComponent,
    ProductInfoComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    CategoryListComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    NgIconsModule.withIcons({ ...allBoots }),
    SharedModule,
    QuicklinkModule,
  ],
  exports: [],
})
export class WebsiteModule {}
