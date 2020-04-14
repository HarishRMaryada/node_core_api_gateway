pipeline {
    agent { dockerfile true }
    environment {
        CI = 'true' 
    }
    stages {
        // stage('Build') {
        //     steps {
        //         sh 'npm install'
        //     }
        // }
        stage('Test') {
            steps {
                sh 'node --version'
                // sh 'svn --version'
            }
        }
    }
}
