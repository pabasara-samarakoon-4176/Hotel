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
    }
}
