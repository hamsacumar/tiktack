import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Make sure this is imported

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterModule,CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';        // Changed from Gmail to email
  userName = '';     // Changed from Username to userName
  password = '';     // Changed from Password to password
  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Clear previous messages
    this.errorMsg = '';
    this.successMsg = '';

    // Validate inputs
    if (!this.email || !this.userName || !this.password) {
      this.errorMsg = 'Please fill in all fields';
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMsg = 'Please enter a valid email address';
      return;
    }

    const userData = {
      email: this.email,
      userName: this.userName,
      password: this.password,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.successMsg = 'Registered successfully! Redirecting to login...';
        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Registration error:', err);
        
        // Handle different error types
        if (err.status === 400 && err.error) {
          // Handle validation errors from backend
          if (Array.isArray(err.error)) {
            this.errorMsg = err.error.map((e: any) => e.description).join(', ');
          } else {
            this.errorMsg = 'Registration failed. Please check your information.';
          }
        } else if (err.status === 0) {
          this.errorMsg = 'Unable to connect to server';
        } else {
          this.errorMsg = 'Registration Successfull.';
        }
      },
    });
  }
}