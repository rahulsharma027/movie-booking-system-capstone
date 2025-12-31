import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  loading = false;
  selectedUser: any = null;
  userBookings: any[] = [];
  showBookingsModal = false;
  showGiftModal = false;
  
  // Gift ticket data
  giftData = {
    userId: 0,
    showId: 0,
    seatsBooked: 1,
    message: ''
  };
  
  availableShows: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadShows();
  }

  loadUsers() {
    this.loading = true;
    this.apiService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        // Load booking count for each user
        this.users.forEach(user => {
          this.loadUserBookingCount(user);
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  loadUserBookingCount(user: any) {
    this.apiService.getUserBookings(user.id).subscribe({
      next: (bookings) => {
        user.bookingCount = bookings.length;
      },
      error: (error) => {
        console.error('Error loading bookings for user:', error);
        user.bookingCount = 0;
      }
    });
  }

  loadShows() {
    this.apiService.getShows().subscribe({
      next: (shows) => {
        // Filter to only future shows with available seats
        const now = new Date();
        this.availableShows = shows.filter(show => {
          const showDate = new Date(show.showDate + 'T' + show.showTime);
          return showDate > now && show.availableSeats > 0;
        });
      }
    });
  }

  viewBookingHistory(user: any) {
    this.selectedUser = user;
    this.loading = true;
    this.apiService.getUserBookings(user.id).subscribe({
      next: (bookings) => {
        this.userBookings = bookings;
        this.showBookingsModal = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user bookings:', error);
        this.loading = false;
      }
    });
  }

  openGiftModal(user: any) {
    this.selectedUser = user;
    this.giftData = {
      userId: user.id,
      showId: 0,
      seatsBooked: 1,
      message: `Complimentary tickets for ${user.username}!`
    };
    this.showGiftModal = true;
  }

  sendGiftTicket() {
    if (!this.giftData.showId) {
      alert('Please select a show');
      return;
    }

    this.loading = true;
    this.apiService.giftTicket(this.giftData).subscribe({
      next: (booking) => {
        alert(`Gift ticket successfully sent to ${this.selectedUser?.username}!`);
        this.closeGiftModal();
        this.loading = false;
      },
      error: (error) => {
        alert('Error sending gift ticket: ' + (error.error?.message || 'Unknown error'));
        this.loading = false;
      }
    });
  }

  contactUser(user: any) {
    const subject = encodeURIComponent('Regarding Your CineNow Account');
    const body = encodeURIComponent(`Hello ${user.username},\n\n`);
    window.location.href = `mailto:${user.email}?subject=${subject}&body=${body}`;
  }

  closeBookingsModal() {
    this.showBookingsModal = false;
    this.selectedUser = null;
    this.userBookings = [];
  }

  closeGiftModal() {
    this.showGiftModal = false;
    this.selectedUser = null;
    this.giftData = {
      userId: 0,
      showId: 0,
      seatsBooked: 1,
      message: ''
    };
  }

  getStatusClass(status: string): string {
    return status === 'CONFIRMED' ? 'badge-success' : 'badge-danger';
  }

  getSelectedShow() {
    return this.availableShows.find(show => show.id === this.giftData.showId);
  }
}
