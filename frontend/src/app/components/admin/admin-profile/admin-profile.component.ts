import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {
  currentTheme: string = 'light';
  user: any = null;

  themes = [
    { value: 'light', name: 'Light Theme', icon: '☀️', description: 'Classic bright interface' },
    { value: 'dark', name: 'Dark Theme', icon: '🌙', description: 'Easy on the eyes' },
    { value: 'cinephile', name: 'Cinephile Theme', icon: '🎬', description: 'Premium cinema experience with transformers vibe' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentTheme = this.authService.getTheme();
    this.user = this.authService.getCurrentUser();
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    this.authService.updateTheme(theme as 'light' | 'dark' | 'cinephile');
  }
}
