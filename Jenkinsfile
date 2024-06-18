pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY='pabasarasamarakoondocker1945'
        SERVER_IMAGE_NAME = 'server_image'
        CLIENT_IMAGE_NAME = 'client_image'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pabasara-samarakoon-4176/Hotel.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t api-image ./api'
                sh 'docker tag api-image:latest ${DOCKER_REGISTRY}/api-image:latest'
            }
        }
        stage('Push Docker Images') {
            steps {
               withCredentials([usernamePassword(credentialsId: 'docker-login', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
                    sh 'docker push ${DOCKER_REGISTRY}/api-image:latest'
                }
            }
        }
    }
}
