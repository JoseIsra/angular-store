import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, InputCreateUser } from '@/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`users`);
  }

  createUser(input: InputCreateUser) {
    return this.http.post<User>(`users`, input);
  }
}
