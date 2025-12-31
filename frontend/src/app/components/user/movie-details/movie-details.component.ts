import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../../services/api.service';
import { Movie, Show } from '../../../models/models';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  shows: Show[] = [];
  selectedShow: Show | null = null;
  bookingSeats = 1;
  loading = false;
  safeTrailerUrl: SafeResourceUrl | null = null;
  selectedCity: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Get selected city from localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCity = localStorage.getItem('selectedCity') || '';
    }
    
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovie(+movieId);
      this.loadShows(+movieId);
    }
  }

  loadMovie(id: number) {
    this.loading = true;
    this.apiService.getMovie(id).subscribe({
      next: (data: any) => {
        this.movie = data;
        if (data.trailerUrl) {
          this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.trailerUrl);
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading movie:', err);
        this.loading = false;
      }
    });
  }

  loadShows(movieId: number) {
    this.apiService.getShowsByMovie(movieId).subscribe({
      next: (data: any) => {
        // Filter shows by selected city
        if (this.selectedCity) {
          this.shows = data.filter((show: Show) => 
            show.theater?.city === this.selectedCity
          );
        } else {
          this.shows = data;
        }
      },
      error: (err: any) => {
        console.error('Error loading shows:', err);
      }
    });
  }

  selectShow(show: Show) {
    this.selectedShow = show;
    this.bookingSeats = 1;
  }

  bookTicket() {
    if (!this.selectedShow) {
      alert('Please select a show');
      return;
    }

    if (this.bookingSeats < 1 || this.bookingSeats > this.selectedShow.availableSeats) {
      alert(`Please select between 1 and ${this.selectedShow.availableSeats} seats`);
      return;
    }

    const bookingData = {
      showId: this.selectedShow.id,
      numberOfSeats: this.bookingSeats
    };

    this.apiService.createBooking(bookingData).subscribe({
      next: (response: any) => {
        alert(`Booking successful! Your booking reference is: ${response.bookingReference}`);
        this.router.navigate(['/my-bookings']);
      },
      error: (err: any) => {
        alert(err.error?.message || 'Booking failed. Please try again.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/movies']);
  }
}
