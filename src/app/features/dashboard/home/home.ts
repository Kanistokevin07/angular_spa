import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../core/services/data-service';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  user: any = null;
  records: any[] = [];
  loading = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('HOME COMPONENT LOADED');
    // STEP 1: get logged user
    this.user = this.authService.getCurrentUser();

    // STEP 2: show loading
    this.loading = true;

    // STEP 3: fake API call
    this.dataService.getRecords().subscribe(data => {

      console.log('SUBSCRIBE FIRED');
      console.log('DATA RECEIVED:', data);

      // STEP 4: role-based filtering
      if (this.user?.role === 'Admin') {
        this.records = data;
      } else {
        this.records = data.filter(r => r.role === 'User');
      }

      

      console.log('records:', this.records);

      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}