import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';     // Changed from email to username
  password = '';     
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Clear previous error
    this.errorMsg = '';

    // Validate inputs
    if (!this.username || !this.password) {
      this.errorMsg = 'Please enter both username and password';
      return;
    }

    const loginData = {
      username: this.username,  // Changed from email to username
      password: this.password,
    };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        // Store token and expiration
      localStorage.setItem('token', res.token);
        localStorage.setItem('tokenExpiration', res.expiration);
        
        // Navigate to play page
        this.router.navigate(['/play']);
      },
      error: (err) => {
        console.error('Login error:', err);
        // Handle different error types
        if (err.status === 401) {
          this.errorMsg = 'Invalid username or password';
        } else if (err.status === 0) {
          this.errorMsg = 'Unable to connect to server';
        } else {
          this.errorMsg = 'Login failed. Please try again.';
        }
      },
    });
  }
}