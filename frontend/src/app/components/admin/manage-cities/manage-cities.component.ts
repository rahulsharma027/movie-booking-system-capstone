import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

interface City {
  id?: number;
  name: string;
  state: string;
  posterUrl: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
}

@Component({
  selector: 'app-manage-cities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-cities.component.html',
  styleUrls: ['./manage-cities.component.css']
})
export class ManageCitiesComponent implements OnInit {
  cities: City[] = [];
  showModal = false;
  isEditMode = false;
  currentCity: City = this.getEmptyCity();
  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.loading = true;
    this.apiService.getAllCities().subscribe({
      next: (data) => {
        this.cities = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cities:', error);
        this.loading = false;
      }
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentCity = this.getEmptyCity();
    this.showModal = true;
  }

  openEditModal(city: City): void {
    this.isEditMode = true;
    this.currentCity = { ...city };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentCity = this.getEmptyCity();
  }

  saveCity(): void {
    if (!this.currentCity.name || !this.currentCity.state || !this.currentCity.posterUrl) {
      alert('Please fill all required fields (Name, State, and Poster URL)');
      return;
    }

    if (this.isEditMode && this.currentCity.id) {
      this.apiService.updateCity(this.currentCity.id, this.currentCity).subscribe({
        next: () => {
          this.loadCities();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating city:', error);
          alert('Error updating city');
        }
      });
    } else {
      this.apiService.createCity(this.currentCity).subscribe({
        next: () => {
          this.loadCities();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating city:', error);
          alert(error.error?.error || 'Error creating city');
        }
      });
    }
  }

  toggleStatus(city: City): void {
    if (city.id) {
      this.apiService.toggleCityStatus(city.id).subscribe({
        next: () => {
          this.loadCities();
        },
        error: (error) => {
          console.error('Error toggling status:', error);
        }
      });
    }
  }

  deleteCity(city: City): void {
    if (confirm(`Are you sure you want to delete ${city.name}?`)) {
      if (city.id) {
        this.apiService.deleteCity(city.id).subscribe({
          next: () => {
            this.loadCities();
          },
          error: (error) => {
            console.error('Error deleting city:', error);
            alert('Cannot delete city. It may be associated with theaters.');
          }
        });
      }
    }
  }

  getEmptyCity(): City {
    return {
      name: '',
      state: '',
      posterUrl: '',
      description: '',
      isActive: true
    };
  }
}
