import { Component, OnInit } from '@angular/core';
import { AuthService } from '@/services/auth/auth.service';
import { User } from '@/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //load the profile
    this.authService.user$.subscribe((data) => {
      this.user = data;
    });
  }
}
