pipeline {
  agent none
  stages {
    stage('Client Build') {
      agent any
      steps {
        dir(path: 'client') {
          sh 'docker build . -t greenly:latest'
        }

      }
    }

    stage('Server Build') {
      steps {
        dir(path: '../server') {
          sh '''docker build . -t greenly-api
'''
        }

      }
    }

  }
}