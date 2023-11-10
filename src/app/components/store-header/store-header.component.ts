import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss'],
})
export class StoreHeaderComponent implements OnInit {
  counter = 0;
  constructor(public storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((data) => {
      console.log('data', data);
      this.counter = data.length;
    });
  }
}
