import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  editMode = false;
  passwordMode = false;
  passwordData = {
    currentPassword: '',
    newPassword: ''
  };
  successMessage = '';
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.apiService.getProfile().subscribe({
      next: (data) => {
        this.user = { ...data };
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile';
      }
    });
  }

  toggleTheme() {
    const newTheme = this.user.theme === 'light' ? 'dark' : 'light';
    this.apiService.updateTheme(newTheme).subscribe({
      next: () => {
        this.user.theme = newTheme;
        this.authService.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        this.showSuccess('Theme updated successfully');
      },
      error: () => {
        this.showError('Failed to update theme');
      }
    });
  }

  saveProfile() {
    this.apiService.updateProfile({
      fullName: this.user.fullName,
      email: this.user.email,
      phone: this.user.phone
    }).subscribe({
      next: () => {
        this.editMode = false;
        this.showSuccess('Profile updated successfully');
      },
      error: (err) => {
        this.showError(err.error?.message || 'Failed to update profile');
      }
    });
  }

  changePassword() {
    if (!this.passwordData.currentPassword || !this.passwordData.newPassword) {
      this.showError('Please enter both passwords');
      return;
    }

    this.apiService.changePassword(this.passwordData).subscribe({
      next: () => {
        this.passwordMode = false;
        this.passwordData = { currentPassword: '', newPassword: '' };
        this.showSuccess('Password changed successfully');
      },
      error: (err) => {
        this.showError(err.error?.message || 'Failed to change password');
      }
    });
  }

  showSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
    setTimeout(() => this.successMessage = '', 3000);
  }

  showError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    setTimeout(() => this.errorMessage = '', 3000);
  }
}
