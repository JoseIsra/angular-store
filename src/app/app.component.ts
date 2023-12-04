import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Product } from './types';
import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/auth/token.service';

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
    private meta: Meta,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // console.log('hay token?', this.tokenService.userToken);
    this.title.setTitle('IsraStore');
    this.meta.updateTag({
      name: 'description',
      content: 'The drugstore with cheapiest products',
    });

    const token = this.tokenService.userToken;
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }
}
