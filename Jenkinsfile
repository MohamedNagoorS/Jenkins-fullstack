pipeline {
    agent any
    tools{
        nodejs 'sonarnode'
    }
    
    environment {
        NODE_VERSION = '23'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
         stage('Install') {
            steps {
                dir('frontend/register') { 
                    bat '''npm install'''
                }
            }
        }
        
        stage('Lint') {
            steps {
                dir('frontend/register') {
                    bat '''npm run lint'''
                }
            }
        }
        
        
        stage('Build') {
            steps {
                bat '''npm run build'''
            }
        }
        stage('SonarAnalysis'){
            environment{
                SONAR_TOKEN=credentials('sonarqube-token')
            }
             steps{
                bat '''
                sonar-scanner ^
                -Dsonar.projectKey=Frontend ^
                -Dsonar.sources=. ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.token=sqp_7827e8d5e685b05a296c3e0bb212c61ee905d61d ^
                '''
            }
       
        }}
    
    
    post {
        success{
            echo "DONE SUCCESSFULLY"
        }
        failure{
            echo "SOMETHING IS WRONG"
        }
    }
}

