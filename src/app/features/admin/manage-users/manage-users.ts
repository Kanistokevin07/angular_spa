import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user-service';
import { User } from '../../../core/models/user.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css',
})
export class ManageUsers implements OnInit {
  users = signal<User[]>([]);
  loading = signal(false);
  selectedUser = signal<User | null>(null);
  
  // New UI Signal for Popups
  toast = signal<{ message: string; type: 'success' | 'danger' | 'warning' } | null>(null);

  newUser = signal<Omit<User, 'id'>>({
    username: '',
    email: '',
    password: '',
    role: 'General User'
  });

  constructor(
  private userService: UserService,
  private authService: AuthService,
  private router: Router
) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private showToast(message: string, type: 'success' | 'danger' | 'warning' = 'success') {
    this.toast.set({ message, type });
    setTimeout(() => this.toast.set(null), 3000);
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
        this.showToast('User added successfully!', 'success');
      }
    });
  }

  deleteUser(id: number): void {
    if(!confirm('Are you sure you want to delete this user?')) return;
    this.userService.deleteUser(id, 500).subscribe({
      next: (updated) => {
        this.users.set([...updated]);
        this.showToast('User deleted permanently', 'danger');
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
        this.showToast('Identity updated successfully!', 'warning');
      }
    });
  }

  logout(): void {
  this.authService.logout();
  this.router.navigate(['/']);
}
}