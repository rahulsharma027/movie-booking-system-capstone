import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent), canActivate: [loginGuard] },
  { path: 'signup', loadComponent: () => import('./components/auth/signup/signup.component').then(m => m.SignupComponent), canActivate: [loginGuard] },
  { path: 'movies', loadComponent: () => import('./components/user/movies/movies.component').then(m => m.MoviesComponent) },
  { path: 'movie/:id', loadComponent: () => import('./components/user/movie-details/movie-details.component').then(m => m.MovieDetailsComponent), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./components/user/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
  { path: 'my-bookings', loadComponent: () => import('./components/user/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent), canActivate: [authGuard] },
  { path: 'admin', loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [adminGuard] },
  { path: 'admin/movies', loadComponent: () => import('./components/admin/manage-movies/manage-movies.component').then(m => m.ManageMoviesComponent), canActivate: [adminGuard] },
  { path: 'admin/theaters', loadComponent: () => import('./components/admin/manage-theaters/manage-theaters.component').then(m => m.ManageTheatersComponent), canActivate: [adminGuard] },
  { path: 'admin/shows', loadComponent: () => import('./components/admin/manage-shows/manage-shows.component').then(m => m.ManageShowsComponent), canActivate: [adminGuard] },
  { path: 'admin/cities', loadComponent: () => import('./components/admin/manage-cities/manage-cities.component').then(m => m.ManageCitiesComponent), canActivate: [adminGuard] },
  { path: 'admin/users', loadComponent: () => import('./components/admin/manage-users/manage-users.component').then(m => m.ManageUsersComponent), canActivate: [adminGuard] },
  { path: 'admin/revenue', loadComponent: () => import('./components/admin/revenue-analytics/revenue-analytics.component').then(m => m.RevenueAnalyticsComponent), canActivate: [adminGuard] },
  { path: 'admin/profile', loadComponent: () => import('./components/admin/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent), canActivate: [adminGuard] }
];
