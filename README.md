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

For support, email your.email@example.com or create an issue in the GitHub repository.
