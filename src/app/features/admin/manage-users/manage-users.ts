import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import { UserService } from '../../../core/services/user-service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css',
})
export class ManageUsers implements OnInit {

  users: User[] = [];
  loading = false;

  // CREATE USER
  newUser: Omit<User, 'id'> = {
    username: '',
    email: '',
    password: '',
    role: 'General User'
  };

  // EDIT USER
  selectedUser: User | null = null;
  editMode = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // READ
  loadUsers(): void {
    this.loading = true;

    this.userService.getUsers().subscribe(data => {
      this.users = [...data];
      this.loading = false;

      this.cdr.detectChanges();
    });
  }

  // CREATE
  addUser(): void {
    if (!this.newUser.username || !this.newUser.email) return;

    const userToAdd: User = {
      ...this.newUser,
      id: Date.now()
    };

    this.userService.addUser(userToAdd).subscribe((updated) => {
      this.users = [...updated];

      this.newUser = {
        username: '',
        email: '',
        password: '',
        role: 'General User'
      };

      this.cdr.detectChanges();
    });
  }

  // DELETE
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe((updated) => {
      this.users = [...updated];

      this.cdr.detectChanges();
    });
  }

  // EDIT
  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.editMode = true;

    this.cdr.detectChanges();
  }

  // UPDATE
  updateUser(): void {
    if (!this.selectedUser) return;

    this.userService.updateUser(this.selectedUser).subscribe((updated) => {
      this.users = [...updated];

      this.selectedUser = null;
      this.editMode = false;

      this.cdr.detectChanges();
    });
  }
}