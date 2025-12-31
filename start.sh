#!/bin/bash

# Movie Booking System - Quick Start Script
# This script helps you start the complete application

echo "🎬 Movie Booking System - Quick Start"
echo "======================================"
echo ""

# Check if MySQL is running
echo "Checking MySQL..."
if ! pgrep -x "mysqld" > /dev/null; then
    echo "❌ MySQL is not running. Please start MySQL first:"
    echo "   macOS: mysql.server start"
    echo "   Linux: sudo systemctl start mysql"
    exit 1
fi
echo "✅ MySQL is running"
echo ""

# Check if database exists
echo "Checking database..."
DB_EXISTS=$(mysql -u root -padmin123 -e "SHOW DATABASES LIKE 'movie_booking_system';" 2>/dev/null | grep movie_booking_system)

if [ -z "$DB_EXISTS" ]; then
    echo "Database not found. Creating database..."
    mysql -u root -padmin123 < database/schema.sql
    if [ $? -eq 0 ]; then
        echo "✅ Database created successfully"
    else
        echo "❌ Failed to create database. Please check your MySQL password"
        exit 1
    fi
else
    echo "✅ Database exists"
fi
echo ""

# Check if Maven is installed
echo "Checking Maven..."
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven:"
    echo "   macOS: brew install maven"
    echo "   Linux: sudo apt-get install maven"
    exit 1
fi
echo "✅ Maven is installed"
echo ""

# Check if Node.js is installed
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi
echo "✅ Node.js is installed"
echo ""

# Check if Angular CLI is installed
echo "Checking Angular CLI..."
if ! command -v ng &> /dev/null; then
    echo "⚠️  Angular CLI not found. Installing..."
    npm install -g @angular/cli
fi
echo "✅ Angular CLI is ready"
echo ""

echo "🚀 Starting Application..."
echo "======================================"
echo ""

# Start backend
echo "Starting Backend (Spring Boot)..."
cd backend
mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
echo "Backend logs: backend.log"
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 10

# Check if backend is running
if ps -p $BACKEND_PID > /dev/null; then
    echo "✅ Backend is running on http://localhost:8080"
else
    echo "❌ Backend failed to start. Check backend.log"
    exit 1
fi
echo ""

# Start frontend
echo "Starting Frontend (Angular)..."
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

ng serve > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
echo "Frontend logs: frontend.log"
cd ..

echo ""
echo "✅ Application Started Successfully!"
echo "======================================"
echo ""
echo "📝 Access the application:"
echo "   Frontend: http://localhost:4200"
echo "   Backend:  http://localhost:8080"
echo ""
echo "🔑 Default Credentials:"
echo "   Admin:  admin / admin123"
echo "   User:   user / user123"
echo ""
echo "📊 Process IDs:"
echo "   Backend:  $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "To stop the application:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Or press Ctrl+C and run:"
echo "   pkill -f 'spring-boot:run'"
echo "   pkill -f 'ng serve'"
echo ""
