import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: ''
  };
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.user.username || !this.user.email || !this.user.password || !this.user.fullName) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.signup(this.user).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Signup failed. Please try again.';
      }
    });
  }
}
