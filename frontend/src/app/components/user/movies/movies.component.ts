import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Movie } from '../../../models/models';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  allMovies: Movie[] = [];
  nowShowingMovies: Movie[] = [];
  comingSoonMovies: Movie[] = [];
  searchQuery = '';
  selectedCity = '';
  availableCities: any[] = [];
  loading = false;
  showCityModal = true;
  showCityInfo = false;
  selectedCityDetails: any = null;
  moviesWithShows: Set<number> = new Set();
  movieCityMap: Map<number, Set<string>> = new Map();

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Check if city is already selected from localStorage (browser only)
    if (isPlatformBrowser(this.platformId)) {
      const savedCity = localStorage.getItem('selectedCity');
      const savedCityDetails = localStorage.getItem('selectedCityDetails');
      if (savedCity) {
        this.selectedCity = savedCity;
        if (savedCityDetails) {
          this.selectedCityDetails = JSON.parse(savedCityDetails);
        }
        this.showCityModal = false;
        this.loadMovies();
        this.loadShows();
      } else {
        this.loadCities();
      }
    } else {
      this.loadCities();
    }
  }

  loadCities() {
    this.apiService.getActiveCities().subscribe({
      next: (data: any) => {
        this.availableCities = data;
      },
      error: (err: any) => {
        console.error('Error loading cities:', err);
      }
    });
  }

  selectCity(city: any) {
    this.selectedCity = city.name;
    this.selectedCityDetails = city;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selectedCity', city.name);
      localStorage.setItem('selectedCityDetails', JSON.stringify(city));
    }
    this.showCityModal = false;
    this.showCityInfo = true;
    
    // Hide city info after 5 seconds
    setTimeout(() => {
      this.showCityInfo = false;
    }, 5000);
    
    this.loadMovies();
    this.loadShows();
  }

  changeCity() {
    this.showCityModal = true;
    this.loadCities();
  }

  closeCityInfo() {
    this.showCityInfo = false;
  }

  loadMovies() {
    this.loading = true;
    this.apiService.getMovies().subscribe({
      next: (data: any) => {
        this.allMovies = data;
        this.categorizeMovies();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading movies:', err);
        this.loading = false;
      }
    });
  }

  loadShows() {
    this.apiService.getShows().subscribe({
      next: (data: any) => {
        const cities = new Set<string>();
        
        // Create a set of movie IDs that have shows and track cities
        data.forEach((show: any) => {
          if (show.movie && show.movie.id) {
            this.moviesWithShows.add(show.movie.id);
            
            // Track which cities have this movie
            if (show.theater && show.theater.city) {
              cities.add(show.theater.city);
              
              if (!this.movieCityMap.has(show.movie.id)) {
                this.movieCityMap.set(show.movie.id, new Set());
              }
              this.movieCityMap.get(show.movie.id)!.add(show.theater.city);
            }
          }
        });
        
        this.availableCities = Array.from(cities).sort();
        this.categorizeMovies();
      },
      error: (err: any) => {
        console.error('Error loading shows:', err);
      }
    });
  }

  categorizeMovies() {
    let filtered = this.allMovies;
    
    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query)
      );
    }
    
    // Apply city filter - always filter by selected city
    if (this.selectedCity) {
      filtered = filtered.filter(movie => {
        const cities = this.movieCityMap.get(movie.id!);
        return cities && cities.has(this.selectedCity);
      });
    }
    
    // Categorize into Now Showing and Coming Soon
    this.nowShowingMovies = filtered.filter(m => {
      // Movie must have shows
      if (!this.moviesWithShows.has(m.id!)) return false;
      
      // Movie must be in selected city
      if (this.selectedCity) {
        const cities = this.movieCityMap.get(m.id!);
        return cities && cities.has(this.selectedCity);
      }
      
      return true;
    });
    
    this.comingSoonMovies = filtered.filter(m => !this.moviesWithShows.has(m.id!));
  }

  onSearch() {
    this.categorizeMovies();
  }

  onCityChange() {
    this.categorizeMovies();
  }

  getHeroBackgroundImage(): string {
    if (this.selectedCityDetails && this.selectedCityDetails.posterUrl) {
      return this.selectedCityDetails.posterUrl;
    }
    return 'https://i.pinimg.com/736x/3c/e7/20/3ce7205d55ce38220fae0852f67f361f.jpg';
  }
}
