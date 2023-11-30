import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as allBoots from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';

import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { ProductsListComponent } from '../shared/components/products-list/products-list.component';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    ReversePipe,
    HighlightDirective,
    ProductsListComponent,
    ProductCardComponent,
    ProductDetailComponent,
  ],
  imports: [CommonModule, NgIconsModule.withIcons({ ...allBoots })],
  exports: [
    ReversePipe,
    HighlightDirective,
    ProductsListComponent,
    ProductCardComponent,
    ProductDetailComponent,
  ],
})
export class SharedModule {}
