pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') { 
            steps {
                sh 'npm test' 
            }
        }
        stage('Deliver') { 
            steps {
                sh 'npm start' 
            }
        }
    }
}
