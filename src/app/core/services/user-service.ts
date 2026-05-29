import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_USERS } from '../data/mock-users';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [...MOCK_USERS];

  // READ
  getUsers(apiDelay: number = 800): Observable<User[]> {
    return of([...this.users]).pipe(delay(apiDelay));
  }

  // CREATE
  addUser(user: Omit<User, 'id'>, apiDelay: number = 500): Observable<User[]> {
    const newUser: User = {
      id: Date.now(),
      ...user
    };
    this.users = [...this.users, newUser];
    return of([...this.users]).pipe(delay(apiDelay));
  }

  // UPDATE
  updateUser(updated: User, apiDelay: number = 500): Observable<User[]> {
    this.users = this.users.map(u =>
      u.id === updated.id ? updated : u
    );
    return of([...this.users]).pipe(delay(apiDelay));
  }

  // DELETE
  deleteUser(id: number, apiDelay: number = 500): Observable<User[]> {
    this.users = this.users.filter(u => u.id !== id);
    return of([...this.users]).pipe(delay(apiDelay));
  }

  // GET ONE
  getUserById(id: number, apiDelay: number = 300): Observable<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user).pipe(delay(apiDelay));
  }
}