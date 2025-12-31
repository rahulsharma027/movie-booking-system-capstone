export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  role: string;
  theme: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  theme: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface Movie {
  id?: number;
  title: string;
  description: string;
  genre: string;
  duration: number;
  language: string;
  releaseDate: string;
  rating: number;
  posterUrl: string;
  imdbUrl?: string;
  trailerUrl?: string;
}

export interface Theater {
  id?: number;
  name: string;
  city: string;
  address: string;
  capacity: number;
}

export interface Show {
  id?: number;
  movie: Movie;
  theater: Theater;
  showDate: string;
  showTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
}

export interface Booking {
  id?: number;
  user: User;
  show: Show;
  seatsBooked: number;
  totalAmount: number;
  bookingDate: string;
  bookingReference: string;
  status: string;
}
