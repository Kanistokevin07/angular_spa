import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { DataService } from '../../../core/services/data-service';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})



export class Home implements OnInit {

  // SIGNALS
  user = signal<any>(null);
  records = signal<any[]>([]);
  loading = signal(false);
  isAdmin = false;

  // COMPUTED SIGNALS
  totalRecords = computed(() => this.records().length);

  activeUsers = computed(() =>
    this.records().filter(r => r.status === 'Active').length
  );

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Logged user
    this.user.set(this.authService.getCurrentUser());
    

    // Loading start
    this.loading.set(true);

    // Fake async API
    this.dataService.getRecords().subscribe({

      next: (data) => {

        // ROLE BASED FILTERING
        if (this.user()?.role === 'Admin') {
          this.isAdmin = true;
          this.records.set([...data]);
        } else {

          const filtered =
            data.filter(r => r.role === 'User');

          this.records.set([...filtered]);
        }

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}