import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Theater } from '../../../models/models';

@Component({
  selector: 'app-manage-theaters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-theaters.component.html',
  styleUrl: './manage-theaters.component.css'
})
export class ManageTheatersComponent implements OnInit {
  theaters: Theater[] = [];
  cities: any[] = [];
  showModal = false;
  editMode = false;
  currentTheater: any = this.getEmptyTheater();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTheaters();
    this.loadCities();
  }

  loadCities() {
    this.apiService.getActiveCities().subscribe({
      next: (data: any) => {
        this.cities = data;
      },
      error: (err) => {
        console.error('Failed to load cities', err);
      }
    });
  }

  loadTheaters() {
    this.apiService.getTheaters().subscribe({
      next: (data: any) => {
        this.theaters = data;
      },
      error: (err) => {
        alert('Failed to load theaters');
      }
    });
  }

  getEmptyTheater() {
    return {
      name: '',
      city: '',
      address: '',
      capacity: 0
    };
  }

  openAddModal() {
    this.currentTheater = this.getEmptyTheater();
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(theater: Theater) {
    this.currentTheater = { ...theater };
    this.editMode = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentTheater = this.getEmptyTheater();
  }

  saveTheater() {
    if (this.editMode && this.currentTheater.id) {
      this.apiService.updateTheater(this.currentTheater.id, this.currentTheater).subscribe({
        next: () => {
          this.loadTheaters();
          this.closeModal();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to update theater');
        }
      });
    } else {
      this.apiService.createTheater(this.currentTheater).subscribe({
        next: () => {
          this.loadTheaters();
          this.closeModal();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to create theater');
        }
      });
    }
  }

  deleteTheater(id: number | undefined) {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this theater?')) {
      this.apiService.deleteTheater(id).subscribe({
        next: () => {
          this.loadTheaters();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to delete theater');
        }
      });
    }
  }
}
