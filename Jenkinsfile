pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_DIR = '/home/ec2-user/cinenow'
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                echo 'Building backend Docker image...'
                dir("${BACKEND_DIR}") {
                    script {
                        sh 'docker build -t cinenow-backend:latest .'
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building frontend Docker image...'
                dir("${FRONTEND_DIR}") {
                    script {
                        sh 'docker build -t cinenow-frontend:latest .'
                    }
                }
            }
        }
        
        stage('Stop Old Containers') {
            steps {
                echo 'Stopping old containers...'
                script {
                    sh """
                        docker-compose -f ${DOCKER_COMPOSE_FILE} down || true
                    """
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                script {
                    sh """
                        docker-compose -f ${DOCKER_COMPOSE_FILE} up -d
                    """
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                script {
                    sh """
                        sleep 30
                        docker-compose ps
                        docker-compose logs --tail=50
                    """
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                echo 'Cleaning up unused Docker resources...'
                script {
                    sh """
                        docker system prune -f
                        docker volume prune -f
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
            script {
                sh 'docker-compose ps'
            }
        }
        failure {
            echo 'Deployment failed!'
            script {
                sh 'docker-compose logs --tail=100'
            }
        }
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
