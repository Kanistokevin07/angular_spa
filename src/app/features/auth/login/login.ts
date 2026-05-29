import { Component, signal } from '@angular/core';

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

  // SIGNALS
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['General User', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.errorMessage.set('');

    const { username, password, role } =
      this.loginForm.value;

    this.authService
      .login(username, password, role)
      .subscribe({

        next: (user) => {

          this.loading.set(false);

          if (user) {

            if (user.role === 'Admin') {

              this.router.navigate(['/admin']);

            } else {

              this.router.navigate(['/dashboard']);
            }

          } else {

            this.errorMessage.set(
              'Invalid Credentials'
            );
          }
        },

        error: () => {

          this.loading.set(false);

          this.errorMessage.set(
            'Something went wrong'
          );
        }
      });
  }
}