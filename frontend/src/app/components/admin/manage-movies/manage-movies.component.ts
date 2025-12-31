import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../../services/api.service';
import { Movie } from '../../../models/models';

@Component({
  selector: 'app-manage-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-movies.component.html',
  styleUrl: './manage-movies.component.css'
})
export class ManageMoviesComponent implements OnInit {
  movies: Movie[] = [];
  showModal = false;
  editMode = false;
  currentMovie: any = this.getEmptyMovie();

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.apiService.getMovies().subscribe({
      next: (data: any) => {
        this.movies = data;
      },
      error: (err) => {
        alert('Failed to load movies');
      }
    });
  }

  getEmptyMovie() {
    return {
      title: '',
      description: '',
      genre: '',
      duration: 0,
      language: '',
      releaseDate: '',
      rating: 0,
      posterUrl: '',
      trailerUrl: '',
      imdbUrl: ''
    };
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openAddModal() {
    this.currentMovie = this.getEmptyMovie();
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(movie: Movie) {
    this.currentMovie = { ...movie };
    this.editMode = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentMovie = this.getEmptyMovie();
  }

  saveMovie() {
    if (this.editMode && this.currentMovie.id) {
      this.apiService.updateMovie(this.currentMovie.id, this.currentMovie).subscribe({
        next: () => {
          this.loadMovies();
          this.closeModal();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to update movie');
        }
      });
    } else {
      this.apiService.createMovie(this.currentMovie).subscribe({
        next: () => {
          this.loadMovies();
          this.closeModal();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to create movie');
        }
      });
    }
  }

  deleteMovie(id: number | undefined) {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this movie?')) {
      this.apiService.deleteMovie(id).subscribe({
        next: () => {
          this.loadMovies();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to delete movie');
        }
      });
    }
  }
}
