import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['General User', Validators.required]
    });
  }

    onSubmit() {

  if (this.loginForm.invalid) return;

  this.loading = true;
  this.errorMessage = '';

  const { username, password, role } =
    this.loginForm.value;

  this.authService
    .login(username, password, role)
    .subscribe({
      next: (user) => {

        if (user !== null) {

          if (user.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }

        } else {

          this.errorMessage =
            'Invalid Credentials';
          this.cdr.detectChanges();
        }

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: () => {

        this.errorMessage =
          'Something went wrong';

        this.loading = false;
      }
    });
}
}