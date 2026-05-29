import { Component, OnInit, signal } from '@angular/core';
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
  users = signal<User[]>([]);
  loading = signal(false);
  selectedUser = signal<User | null>(null);
  newUser = signal<Omit<User, 'id'>>({
    username: '',
    email: '',
    password: '',
    role: 'General User'
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService.getUsers(1000).subscribe({
      next: (data) => {
        this.users.set([...data]);
        this.loading.set(false);
      }
    });
  }

  addUser(): void {
    if (!this.newUser().username || !this.newUser().email) return;
    this.userService.addUser(this.newUser(), 800).subscribe({
      next: (updated) => {
        this.users.set([...updated]);
        this.newUser.set({ username: '', email: '', password: '', role: 'General User' });
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id, 500).subscribe({
      next: (updated) => {
        this.users.set([...updated]);
      }
    });
  }

  editUser(user: User): void {
    this.selectedUser.set({ ...user });
  }

  updateUser(): void {
    if (!this.selectedUser()) return;
    this.userService.updateUser(this.selectedUser()!, 800).subscribe({
      next: (updated) => {
        this.users.set([...updated]);
        this.selectedUser.set(null);
      }
    });
  }
}