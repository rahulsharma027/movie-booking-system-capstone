import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, Theater, Show, Booking, User } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // User Profile
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/profile`, { headers: this.getHeaders() });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/profile`, data, { headers: this.getHeaders() });
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/password`, data, { headers: this.getHeaders() });
  }

  updateTheme(theme: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/theme`, { theme }, { headers: this.getHeaders() });
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/bookings`, { headers: this.getHeaders() });
  }

  // Movies
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }

  searchMovies(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/search?query=${query}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, movie, { headers: this.getHeaders() });
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movies/${id}`, movie, { headers: this.getHeaders() });
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${id}`, { headers: this.getHeaders() });
  }

  // Theaters
  getTheaters(): Observable<Theater[]> {
    return this.http.get<Theater[]>(`${this.apiUrl}/theaters`);
  }

  getTheater(id: number): Observable<Theater> {
    return this.http.get<Theater>(`${this.apiUrl}/theaters/${id}`);
  }

  createTheater(theater: Theater): Observable<Theater> {
    return this.http.post<Theater>(`${this.apiUrl}/theaters`, theater, { headers: this.getHeaders() });
  }

  updateTheater(id: number, theater: Theater): Observable<Theater> {
    return this.http.put<Theater>(`${this.apiUrl}/theaters/${id}`, theater, { headers: this.getHeaders() });
  }

  deleteTheater(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/theaters/${id}`, { headers: this.getHeaders() });
  }

  // Shows
  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/shows`);
  }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/shows/${id}`);
  }

  getShowsByMovie(movieId: number): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/shows/movie/${movieId}`);
  }

  createShow(show: Show): Observable<Show> {
    return this.http.post<Show>(`${this.apiUrl}/shows`, show, { headers: this.getHeaders() });
  }

  updateShow(id: number, show: Show): Observable<Show> {
    return this.http.put<Show>(`${this.apiUrl}/shows/${id}`, show, { headers: this.getHeaders() });
  }

  deleteShow(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/shows/${id}`, { headers: this.getHeaders() });
  }

  // Bookings
  createBooking(data: any): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, data, { headers: this.getHeaders() });
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`, { headers: this.getHeaders() });
  }

  cancelBooking(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/bookings/${id}/cancel`, {}, { headers: this.getHeaders() });
  }

  // Users Management (Admin)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/admin/users`, { headers: this.getHeaders() });
  }

  getUserBookings(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/admin/users/${userId}/bookings`, { headers: this.getHeaders() });
  }

  giftTicket(data: any): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/user/admin/gift-ticket`, data, { headers: this.getHeaders() });
  }

  // Cities
  getAllCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cities`);
  }

  getActiveCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cities/active`);
  }

  createCity(city: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cities`, city, { headers: this.getHeaders() });
  }

  updateCity(id: number, city: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cities/${id}`, city, { headers: this.getHeaders() });
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cities/${id}`, { headers: this.getHeaders() });
  }

  toggleCityStatus(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/cities/${id}/toggle-status`, {}, { headers: this.getHeaders() });
  }
}
