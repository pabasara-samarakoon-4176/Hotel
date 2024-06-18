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
                sh 'docker build -t api-image:v1.$BUILD_ID ./api'
                sh 'docker tag api-image:v1.$BUILD_ID ${DOCKER_REGISTRY}/api-image:v1.$BUILD_ID'
                sh 'docker tag api-image:v1.$BUILD_ID ${DOCKER_REGISTRY}/api-image:latest'

                sh 'docker build -t hotel-image:v1.$BUILD_ID ./hotel'
                sh 'docker tag hotel-image:v1.$BUILD_ID ${DOCKER_REGISTRY}/hotel-image:v1.$BUILD_ID'
                sh 'docker tag hotel-image:v1.$BUILD_ID ${DOCKER_REGISTRY}/hotel-image:latest'
            }
        }
        stage('Push Docker Images') {
            steps {
               withCredentials([usernamePassword(credentialsId: 'docker-login', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
                    sh 'docker push ${DOCKER_REGISTRY}/api-image:v1.$BUILD_ID'
                    sh 'docker push ${DOCKER_REGISTRY}/api-image:latest'
                    sh 'docker image rmi api-image:v1.$BUILD_ID ${DOCKER_REGISTRY}/api-image:v1.$BUILD_ID ${DOCKER_REGISTRY}/api-image:latest'

                    sh 'docker push ${DOCKER_REGISTRY}/hotel-image:v1.$BUILD_ID'
                    sh 'docker push ${DOCKER_REGISTRY}/hotel-image:latest'
                    sh 'docker image rmi hotel-image:v1.$BUILD_ID ${DOCKER_REGISTRY}/hotel-image:v1.$BUILD_ID ${DOCKER_REGISTRY}/hotel-image:latest'
                }
            }
        }
        stage('Deploy with Ansible') {
            steps {
                sshagent(['ansible-ssh-key']) {
                    sh 'ssh -o StrictHostKeyChecking=no root@172.31.0.29 "ansible-playbook -i /ansible/inventory.ini /ansible/playbook1.yml"'
                }
            }
        }
    }
}
