import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_USERS } from '../data/mock-users';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Fake DB (in-memory copy)
  private users: User[] = [...MOCK_USERS];

  // READ - Get all users
  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(800));
  }

  // CREATE - Add new user
  addUser(user: Omit<User, 'id'>): Observable<User[]> {
    const newUser: User = {
      id: Date.now(),
      ...user
    };

    this.users = [...this.users, newUser];

    return of(this.users).pipe(delay(500));
  }

  // UPDATE - Modify existing user
  updateUser(updated: User): Observable<User[]> {
    this.users = this.users.map(user =>
      user.id === updated.id ? updated : user
    );

    return of(this.users).pipe(delay(500));
  }

  // DELETE - Remove user
  deleteUser(id: number): Observable<User[]> {
    this.users = this.users.filter(user => user.id !== id);
    return of(this.users).pipe(delay(500));
  }

  // OPTIONAL: Get single user (bonus for interviews)
  getUserById(id: number): Observable<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user).pipe(delay(300));
  }
}