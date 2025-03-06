pipeline {
    agent any

    environment {
        IMAGE_NAME = "robinsrk07/letsconnect_auth" 
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git branch: 'master', 
                        credentialsId: 'git-cred',  // Use stored GitHub credentials
                        url: 'https://github.com/Robinsrk07/LetsConnect_Auth.git'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push $IMAGE_NAME:$IMAGE_TAG"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "kubectl apply -f k8s/deployment.yml" // Ensure this file exists in your repo
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Successful!"
        }
        failure {
            echo "Deployment Failed!"
        }
    }
}
