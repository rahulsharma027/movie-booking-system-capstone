import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('CineNow');

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const theme = this.authService.getTheme();
    this.authService.applyTheme(theme);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
