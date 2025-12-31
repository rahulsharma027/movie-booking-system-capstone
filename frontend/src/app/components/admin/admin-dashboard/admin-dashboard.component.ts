import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalMovies: 0,
    totalTheaters: 0,
    totalShows: 0,
    totalBookings: 0
  };
  recentBookings: any[] = [];
  loading = false;
  
  // Income Analytics
  incomeData = {
    today: 0,
    weekly: 0,
    monthly: 0
  };
  
  // Filter options
  filterType: 'movie' | 'theater' | 'city' = 'movie';
  selectedCity: string = 'all';
  selectedTheater: string = 'all';
  
  // Rankings
  topMovies: any[] = [];
  topTheaters: any[] = [];
  topCities: any[] = [];
  
  // Data for filtering
  cities: any[] = [];
  theaters: any[] = [];
  allBookings: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    
    // Load all movies
    this.apiService.getMovies().subscribe({
      next: (movies: any) => {
        this.stats.totalMovies = movies.length;
      }
    });

    // Load all theaters
    this.apiService.getTheaters().subscribe({
      next: (theaters: any) => {
        this.stats.totalTheaters = theaters.length;
        this.theaters = theaters;
      }
    });

    // Load all shows
    this.apiService.getShows().subscribe({
      next: (shows) => {
        this.stats.totalShows = shows.length;
      }
    });
    
    // Load cities
    this.apiService.getAllCities().subscribe({
      next: (cities: any) => {
        this.cities = cities;
      }
    });

    // Load all bookings and calculate analytics
    this.apiService.getAllBookings().subscribe({
      next: (bookings) => {
        this.allBookings = bookings;
        this.stats.totalBookings = bookings.length;
        this.recentBookings = bookings.slice(0, 10).reverse();
        this.calculateIncomeAnalytics();
        this.calculateRankings();
        this.loading = false;
      }
    });
  }
  
  calculateIncomeAnalytics() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    this.incomeData.today = 0;
    this.incomeData.weekly = 0;
    this.incomeData.monthly = 0;
    
    this.allBookings.forEach((booking: any) => {
      if (booking.status === 'CONFIRMED') {
        // Use bookingDate field from the Booking model
        const bookingDateStr = booking.bookingDate || booking.bookingTime || booking.createdAt;
        if (!bookingDateStr) {
          return;
        }
        
        const bookingDate = new Date(bookingDateStr);
        const amount = parseFloat(booking.totalAmount) || 0;
        
        if (bookingDate >= today) {
          this.incomeData.today += amount;
        }
        if (bookingDate >= weekAgo) {
          this.incomeData.weekly += amount;
        }
        if (bookingDate >= monthAgo) {
          this.incomeData.monthly += amount;
        }
      }
    });
  }
  
  calculateRankings() {
    const movieEarnings = new Map<string, {name: string, amount: number, ticketsSold: number}>();
    const theaterEarnings = new Map<string, {name: string, amount: number, ticketsSold: number}>();
    const cityEarnings = new Map<string, {name: string, amount: number, ticketsSold: number}>();
    
    this.allBookings.forEach((booking: any) => {
      if (booking.status === 'CONFIRMED') {
        const amount = booking.totalAmount || 0;
        const tickets = booking.seatsBooked || 1;
        
        // Movie earnings
        const movieKey = booking.show?.movie?.id || 'unknown';
        const movieName = booking.show?.movie?.title || 'Unknown';
        if (!movieEarnings.has(movieKey)) {
          movieEarnings.set(movieKey, {name: movieName, amount: 0, ticketsSold: 0});
        }
        const movieData = movieEarnings.get(movieKey)!;
        movieData.amount += amount;
        movieData.ticketsSold += tickets;
        
        // Theater earnings
        const theaterKey = booking.show?.theater?.id || 'unknown';
        const theaterName = booking.show?.theater?.name || 'Unknown';
        if (!theaterEarnings.has(theaterKey)) {
          theaterEarnings.set(theaterKey, {name: theaterName, amount: 0, ticketsSold: 0});
        }
        const theaterData = theaterEarnings.get(theaterKey)!;
        theaterData.amount += amount;
        theaterData.ticketsSold += tickets;
        
        // City earnings
        const cityName = booking.show?.theater?.city || 'Unknown';
        if (!cityEarnings.has(cityName)) {
          cityEarnings.set(cityName, {name: cityName, amount: 0, ticketsSold: 0});
        }
        const cityData = cityEarnings.get(cityName)!;
        cityData.amount += amount;
        cityData.ticketsSold += tickets;
      }
    });
    
    // Convert to arrays and sort
    this.topMovies = Array.from(movieEarnings.values())
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
      
    this.topTheaters = Array.from(theaterEarnings.values())
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
      
    this.topCities = Array.from(cityEarnings.values())
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }
  
  onFilterChange() {
    this.calculateFilteredRankings();
  }
  
  calculateFilteredRankings() {
    let filteredBookings = this.allBookings.filter(b => b.status === 'CONFIRMED');
    
    // Apply city filter
    if (this.selectedCity !== 'all') {
      filteredBookings = filteredBookings.filter(b => 
        b.show?.theater?.city === this.selectedCity
      );
    }
    
    // Apply theater filter
    if (this.selectedTheater !== 'all') {
      filteredBookings = filteredBookings.filter(b => 
        b.show?.theater?.id?.toString() === this.selectedTheater
      );
    }
    
    // Calculate based on filter type
    if (this.filterType === 'movie') {
      const movieEarnings = new Map<string, {name: string, amount: number, ticketsSold: number}>();
      filteredBookings.forEach(booking => {
        const movieKey = booking.show?.movie?.id || 'unknown';
        const movieName = booking.show?.movie?.title || 'Unknown';
        if (!movieEarnings.has(movieKey)) {
          movieEarnings.set(movieKey, {name: movieName, amount: 0, ticketsSold: 0});
        }
        const data = movieEarnings.get(movieKey)!;
        data.amount += booking.totalAmount || 0;
        data.ticketsSold += booking.seatsBooked || 1;
      });
      this.topMovies = Array.from(movieEarnings.values())
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    } else if (this.filterType === 'theater') {
      const theaterEarnings = new Map<string, {name: string, amount: number, ticketsSold: number}>();
      filteredBookings.forEach(booking => {
        const theaterKey = booking.show?.theater?.id || 'unknown';
        const theaterName = booking.show?.theater?.name || 'Unknown';
        if (!theaterEarnings.has(theaterKey)) {
          theaterEarnings.set(theaterKey, {name: theaterName, amount: 0, ticketsSold: 0});
        }
        const data = theaterEarnings.get(theaterKey)!;
        data.amount += booking.totalAmount || 0;
        data.ticketsSold += booking.seatsBooked || 1;
      });
      this.topTheaters = Array.from(theaterEarnings.values())
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    } else {
      const cityEarnings = new Map<string, {name: string, amount: number, ticketsSold: number}>();
      filteredBookings.forEach(booking => {
        const cityName = booking.show?.theater?.city || 'Unknown';
        if (!cityEarnings.has(cityName)) {
          cityEarnings.set(cityName, {name: cityName, amount: 0, ticketsSold: 0});
        }
        const data = cityEarnings.get(cityName)!;
        data.amount += booking.totalAmount || 0;
        data.ticketsSold += booking.seatsBooked || 1;
      });
      this.topCities = Array.from(cityEarnings.values())
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    }
  }

  getStatusClass(status: string): string {
    return status === 'CONFIRMED' ? 'badge-success' : 'badge-danger';
  }
}
