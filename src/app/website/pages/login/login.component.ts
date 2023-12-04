import { AuthService } from '@/services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordVisible = false;
  userInputs = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private $router: Router
  ) {}

  togglePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }

  handleSubmitLogin() {
    this.authService
      .loginAndGetProfile({
        email: this.userInputs.email,
        password: this.userInputs.password,
      })
      .subscribe({
        next: () => {
          this.$router.navigate(['home']);
        },
        error: (_error: HttpResponseBase) => {
          const status = _error.status;
          if (status === 401) {
            alert('Ups! no pudo iniciar sesión');
          }
        },
      });
  }
}
