import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../models/user.model';
import { USERS } from '../data/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | null = null;

  constructor(){
    this.currentUser = this.getCurrentUser();
  }

  login(
    username: string,
    password: string,
    role: string
  ): Observable<User | null> {

    const user = USERS.find(
      u =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    this.currentUser = user || null;

    console.log(user);

    if (user) {
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );
    }

    return of(user || null).pipe(
      delay(2000)
    );
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {

    const user =
      localStorage.getItem('user');

    if (!user) return null;

    return JSON.parse(user);
  }
}