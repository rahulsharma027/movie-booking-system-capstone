import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Booking } from '../../../models/models';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.apiService.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.loading = false;
      }
    });
  }

  cancelBooking(bookingId: number | undefined) {
    if (!bookingId) return;
    
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.apiService.cancelBooking(bookingId).subscribe({
        next: () => {
          this.loadBookings();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to cancel booking');
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMED':
        return 'badge-success';
      case 'CANCELLED':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  }
}
