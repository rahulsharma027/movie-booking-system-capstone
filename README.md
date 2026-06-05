# Movie Ticket Booking System

A comprehensive full-stack web application for booking movie tickets online with support for different genres and languages.

## 🚀 Technology Stack

### Frontend
- **Angular 17** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **CSS3** - Responsive styling

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2** - Application framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database access
- **JWT** - Token-based authentication

### Database
- **MySQL 8.0** - Relational database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Jenkins** - CI/CD pipeline
- **AWS** - Cloud deployment
  - EC2 - Compute instances
  - RDS - Managed database
  - ECR - Container registry
  - ECS - Container orchestration
  - ALB - Load balancing
  - CloudFormation - Infrastructure as Code

### Version Control
- **Git** - Version control system
- **GitHub** - Code repository hosting

## 📋 Features

### User Features
- User registration and authentication
- Browse movies by genre and language
- Search movies
- View movie details (cast, director, rating, etc.)
- View available shows for movies
- Book tickets for shows
- Select seats
- View booking history
- Cancel bookings

### Admin Features ✨
- **Admin Dashboard** - Statistics and quick actions
- **Movie Management** - Full CRUD operations
  - Add new movies
  - Edit existing movies
  - Delete movies
  - View all movies in table
- **Role-Based Access** - Secure admin-only routes
- **Theater Management** (Coming Soon)
- **Show Management** (Coming Soon)
- **Booking Management** (Coming Soon)

### System Features
- JWT-based authentication
- Responsive design for mobile and desktop
- Real-time seat availability
- Secure payment processing (placeholder for integration)
- Email notifications (placeholder for integration)

## 🏗️ Project Structure

```
capstone/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/movieticket/
│   │       │       ├── config/           # Security configuration
│   │       │       ├── controller/       # REST controllers
│   │       │       ├── dto/              # Data Transfer Objects
│   │       │       ├── entity/           # JPA entities
│   │       │       ├── repository/       # Data repositories
│   │       │       ├── security/         # JWT and security
│   │       │       └── service/          # Business logic
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                   # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/           # UI components
│   │   │   │   ├── admin/            # ✨ Admin panel components
│   │   │   │   │   ├── admin-dashboard/
│   │   │   │   │   └── admin-movies/
│   │   │   │   └── ...
│   │   │   ├── guards/               # ✨ Route guards
│   │   │   ├── models/               # TypeScript interfaces
│   │   │   ├── services/             # HTTP services
│   │   │   ├── interceptors/         # HTTP interceptors
│   │   │   └── app.routes.ts         # Routing configuration
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── angular.json
│
├── aws/                        # AWS deployment
│   ├── cloudformation-template.yml
│   ├── deploy.sh
│   └── README.md
│
├── docker-compose.yml          # Local development setup
├── Jenkinsfile                 # CI/CD pipeline
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0
- Docker and Docker Compose
- Maven 3.9+
- Git

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/movie-ticket-booking.git
cd movie-ticket-booking
```

#### 2. Database Setup
```bash
# Start MySQL using Docker
docker run -d \
  --name mysql-movie-booking \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=movie_booking_db \
  -p 3306:3306 \
  mysql:8.0
```

#### 3. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

#### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:4200`

### Docker Deployment

Run the entire application stack with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- MySQL database on port 3306
- Backend API on port 8080
- Frontend on port 80

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/active` - Get active movies
- `GET /api/movies/{id}` - Get movie by ID
- `GET /api/movies/genre/{genre}` - Get movies by genre
- `GET /api/movies/language/{language}` - Get movies by language
- `GET /api/movies/search?query={query}` - Search movies
- `POST /api/movies` - Create movie (Admin)
- `PUT /api/movies/{id}` - Update movie (Admin)
- `DELETE /api/movies/{id}` - Delete movie (Admin)

### Shows
- `GET /api/shows` - Get all shows
- `GET /api/shows/{id}` - Get show by ID
- `GET /api/shows/movie/{movieId}` - Get shows by movie
- `GET /api/shows/upcoming` - Get upcoming shows
- `POST /api/shows` - Create show (Admin)
- `PUT /api/shows/{id}` - Update show (Admin)
- `DELETE /api/shows/{id}` - Delete show (Admin)

### Bookings
- `POST /api/bookings` - Create booking (Authenticated)
- `GET /api/bookings/user` - Get user's bookings (Authenticated)
- `GET /api/bookings/reference/{reference}` - Get booking by reference
- `PUT /api/bookings/{id}/cancel` - Cancel booking (Authenticated)

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```



## Screen Shots
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 18 41ΓÇ»PM" src="https://github.com/user-attachments/assets/c4fa0879-b5fa-4e7f-84a7-afd26a9adead" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 59 00ΓÇ»PM" src="https://github.com/user-attachments/assets/fd865142-7503-4a90-a220-ee7f60fc5505" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 58 15ΓÇ»PM" src="https://github.com/user-attachments/assets/d7f4f735-e8ce-486a-bad6-59d9c39612af" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 57 58ΓÇ»PM" src="https://github.com/user-attachments/assets/302e49b2-3f39-4786-9f4d-34ce050bcd2c" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 57 50ΓÇ»PM" src="https://github.com/user-attachments/assets/0d3dfda9-f649-4d7a-b16c-88bd18734b97" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 57 46ΓÇ»PM" src="https://github.com/user-attachments/assets/ddca3a16-07e6-4ac2-85d9-a3d1ad1cebf5" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 57 17ΓÇ»PM" src="https://github.com/user-attachments/assets/f932685d-a21b-441b-a9e4-5fd116838055" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 56 50ΓÇ»PM" src="https://github.com/user-attachments/assets/8011d1e0-5f05-48e4-997b-fe7af7461702" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 56 43ΓÇ»PM" src="https://github.com/user-attachments/assets/cd6cc60e-9017-4fc8-b209-bb81303d1707" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 56 36ΓÇ»PM" src="https://github.com/user-attachments/assets/4df2f2e1-d6e9-4587-9859-c0ed3856351a" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 56 18ΓÇ»PM" src="https://github.com/user-attachments/assets/a355416f-7df1-472a-9e0c-743590a08db9" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 55 42ΓÇ»PM" src="https://github.com/user-attachments/assets/be2b0024-20a4-45e9-b2ea-f49119a3cd7d" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 55 33ΓÇ»PM" src="https://github.com/user-attachments/assets/21cea9e4-863d-4ab0-b97a-6adf05205f63" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 55 24ΓÇ»PM" src="https://github.com/user-attachments/assets/9a58ac24-53a8-4387-97f6-7a72c0d94f2c" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 55 18ΓÇ»PM" src="https://github.com/user-attachments/assets/ef14c812-af06-43d2-bf31-e3e04039cc6a" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 55 02ΓÇ»PM" src="https://github.com/user-attachments/assets/4fd41a37-4f79-476a-9139-4e861a3cbbbb" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 54 55ΓÇ»PM" src="https://github.com/user-attachments/assets/0c29adf4-6299-46dc-b1cb-7040f64162ab" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 54 47ΓÇ»PM" src="https://github.com/user-attachments/assets/30596457-ab39-45b1-9486-b8e67764a32b" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 54 41ΓÇ»PM" src="https://github.com/user-attachments/assets/5ffc0e90-8c0d-4b99-afb8-9f9aeea0466e" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 54 31ΓÇ»PM" src="https://github.com/user-attachments/assets/3a494bd0-c144-4381-9d2b-497d515cdb7d" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 54 24ΓÇ»PM" src="https://github.com/user-attachments/assets/ca70144c-251e-4a11-a140-2ae13adb24f7" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 54 16ΓÇ»PM" src="https://github.com/user-attachments/assets/9118fb40-5eb9-4126-b306-35e3c666649e" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 54 09ΓÇ»PM" src="https://github.com/user-attachments/assets/f1543a5d-c4c4-4c85-a144-49e8703ecc17" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 54 02ΓÇ»PM" src="https://github.com/user-attachments/assets/dd76d3bd-6b1f-4efd-b53c-a5d766023602" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 53 39ΓÇ»PM" src="https://github.com/user-attachments/assets/f56a34d1-b06b-44b5-9488-e19633384687" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 53 28ΓÇ»PM" src="https://github.com/user-attachments/assets/5659f159-b030-4bd8-8d98-b4c5a40674f6" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 53 08ΓÇ»PM" src="https://github.com/user-attachments/assets/b3d5f5b6-3148-4370-a571-0218106eecf5" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 52 06ΓÇ»PM" src="https://github.com/user-attachments/assets/df6d14b0-1bfc-4da4-a84f-affa7d0fd573" />
<img width="1728" height="1117" alt="Screenshot 2026-01-03 at 6 51 43ΓÇ»PM" src="https://github.com/user-attachments/assets/c3224f63-4133-4de0-9fa3-bcb29eb6c7f8" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 28 32ΓÇ»PM" src="https://github.com/user-attachments/assets/57af4f55-b2ea-44b4-95cf-0db6597c1088" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 28 22ΓÇ»PM" src="https://github.com/user-attachments/assets/7612b31b-048a-4ae2-809c-3cc813d8c203" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 28 08ΓÇ»PM" src="https://github.com/user-attachments/assets/a4305f1f-c179-4976-9208-0dc1971d2a03" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 27 39ΓÇ»PM" src="https://github.com/user-attachments/assets/028f1c34-633b-4432-99d2-61d0620fdc51" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 20 19ΓÇ»PM" src="https://github.com/user-attachments/assets/3d7a2814-617d-43ae-947c-5eee939e16cd" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 20 11ΓÇ»PM" src="https://github.com/user-attachments/assets/76a313d4-da09-418a-8e9f-120b2c302363" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 20 02ΓÇ»PM" src="https://github.com/user-attachments/assets/c996b692-8650-4e17-a3f6-12277edb94bb" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 19 52ΓÇ»PM" src="https://github.com/user-attachments/assets/57ed4d30-4740-4808-aeca-0fee17563830" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 19 45ΓÇ»PM" src="https://github.com/user-attachments/assets/52cda30c-5b55-4ebc-922f-e283aaf2a648" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 19 35ΓÇ»PM" src="https://github.com/user-attachments/asse1b21c5c40480" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 19 17ΓÇ»PM" src="https://github.com/user-attachments/assets/ad89b8fe-56c9-4074-8ba6-8998796c8271" />
<img width="1728" height="1117" alt="Screenshot 2025-12-31 at 2 18 53ΓÇ»PM" src="https://github.com/user-attachments/assets/86e37f6c-fa2c-45c4-8243-dcbadb4eb54b" />



## 🚀 Deployment

### Jenkins CI/CD Pipeline

The project includes a Jenkinsfile that automates:
1. Code checkout
2. Backend build and test
3. Frontend build
4. Docker image creation
5. Push to Docker registry
6. Deployment to test environment
7. Health checks

Quick deployment:
```bash
cd aws
chmod +x deploy.sh
./deploy.sh
```

## 🔒 Security

- Passwords are encrypted using BCrypt
- JWT tokens for stateless authentication
- Role-based access control (Admin & User roles)
- Protected admin routes with guards
- CORS configuration for frontend-backend communication
- SQL injection prevention using JPA
- XSS protection in Angular

## 👨‍💼 Admin Panel

### Access Admin Features
1. Login with admin credentials:
   - **Username**: `admin`
   - **Password**: `password`
2. Click "⚙️ Admin" button in navbar
3. Access admin dashboard at `/admin`

### Admin Features
- **Dashboard** - View statistics (movies, theaters, shows, bookings)
- **Movie Management** - Full CRUD operations
- **Theater Management** - Coming soon
- **Show Management** - Coming soon
- **Booking Management** - Coming soon


## 📊 Database Schema

### Tables
- **users** - User accounts
- **movies** - Movie information
- **theaters** - Theater details
- **shows** - Movie showings
- **bookings** - Ticket bookings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

Your Name - [rahulsharma84244@gmail.com](mailto:rahulsharma84244@gmail.com)

## 🙏 Acknowledgments

- Spring Boot documentation
- Angular documentation
- Docker documentation
- AWS documentation

## 📞 Support

For support, email rahulsharma84244@gmail.com or create an issue in the GitHub repository.
