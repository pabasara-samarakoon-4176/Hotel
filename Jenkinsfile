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
                sh 'chmod 777 /var/run/docker.sock'
                sh 'docker build -t ${DOCKER_REGISTRY}/${SERVER_IMAGE_NAME} ./server'
            }
        }
        stage('Push Docker Images') {
            steps {
                sh 'docker push ${DOCKER_REGISTRY}/${SERVER_IMAGE_NAME}'
            }
        }
    }
}
