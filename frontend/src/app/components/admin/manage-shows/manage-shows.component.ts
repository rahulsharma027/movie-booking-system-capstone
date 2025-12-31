import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Show, Movie, Theater } from '../../../models/models';

@Component({
  selector: 'app-manage-shows',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-shows.component.html',
  styleUrl: './manage-shows.component.css'
})
export class ManageShowsComponent implements OnInit {
  shows: Show[] = [];
  movies: Movie[] = [];
  theaters: Theater[] = [];
  showModal = false;
  editMode = false;
  currentShow: any = this.getEmptyShow();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadShows();
    this.loadMovies();
    this.loadTheaters();
  }

  loadShows() {
    this.apiService.getShows().subscribe({
      next: (data: any) => {
        this.shows = data;
      },
      error: (err) => {
        alert('Failed to load shows');
      }
    });
  }

  loadMovies() {
    this.apiService.getMovies().subscribe({
      next: (data: any) => {
        this.movies = data;
      }
    });
  }

  loadTheaters() {
    this.apiService.getTheaters().subscribe({
      next: (data: any) => {
        this.theaters = data;
      }
    });
  }

  getEmptyShow() {
    return {
      movieId: '',
      theaterId: '',
      showDate: '',
      showTime: '',
      price: 0,
      totalSeats: 0,
      availableSeats: 0
    };
  }

  openAddModal() {
    this.currentShow = this.getEmptyShow();
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(show: Show) {
    this.currentShow = {
      id: show.id,
      movieId: show.movie.id,
      theaterId: show.theater.id,
      showDate: show.showDate,
      showTime: show.showTime,
      price: show.price,
      totalSeats: show.totalSeats,
      availableSeats: show.availableSeats
    };
    this.editMode = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentShow = this.getEmptyShow();
  }

  saveShow() {
    const showData: any = {
      movie: { id: this.currentShow.movieId },
      theater: { id: this.currentShow.theaterId },
      showDate: this.currentShow.showDate,
      showTime: this.currentShow.showTime,
      price: this.currentShow.price,
      totalSeats: this.currentShow.totalSeats,
      availableSeats: this.currentShow.availableSeats
    };

    if (this.editMode && this.currentShow.id) {
      this.apiService.updateShow(this.currentShow.id, showData).subscribe({
        next: () => {
          this.loadShows();
          this.closeModal();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to update show');
        }
      });
    } else {
      this.apiService.createShow(showData).subscribe({
        next: () => {
          this.loadShows();
          this.closeModal();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to create show');
        }
      });
    }
  }

  deleteShow(id: number | undefined) {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this show?')) {
      this.apiService.deleteShow(id).subscribe({
        next: () => {
          this.loadShows();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to delete show');
        }
      });
    }
  }
}
