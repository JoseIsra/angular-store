import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Product } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products: Product[] = [];

  // inyección de dependencias
  constructor(
    private title: Title,
    private meta: Meta // private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    // console.log('hay token?', this.tokenService.userToken);
    this.title.setTitle('IsraStore');
    this.meta.updateTag({
      name: 'description',
      content: 'The drugstore with cheapiest products',
    });
  }
}
