import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // READ
  loadUsers(): void {
    this.loading = true;

    this.userService.getUsers().subscribe(data => {
      this.users = [...data];   // IMPORTANT: force new reference
      this.loading = false;
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
      this.users = [...updated];   // instant UI update

      // reset form
      this.newUser = {
        username: '',
        email: '',
        password: '',
        role: 'General User'
      };
    });
  }

  // DELETE
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe((updated) => {
      this.users = [...updated];   // NO filter needed here
    });
  }

  // EDIT
  editUser(user: User): void {
    this.editMode = true;
    this.selectedUser = { ...user };
  }

  // UPDATE
  updateUser(): void {
    if (!this.selectedUser) return;

    this.userService.updateUser(this.selectedUser).subscribe((updated) => {
      this.users = [...updated];   // consistent update pattern
      this.editMode = false;
      this.selectedUser = null;
    });
  }
}