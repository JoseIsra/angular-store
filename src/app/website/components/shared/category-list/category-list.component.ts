import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '@/types';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() categorySelected = new EventEmitter<Category>();
  selectedId = 0;

  handleSelectItem(category: Category) {
    this.selectedId = category.id;
    this.categorySelected.emit(category);
  }
}
