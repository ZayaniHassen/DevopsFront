def getGitBranchName() {
    return scm.branches[0].name
}

def branchName
def targetBranch 

pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "hassenzayani"
        PROD_TAG = "${DOCKERHUB_USERNAME}/front:angular"
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: "${scm.branches[0].name}", description: 'Git branch name')
        string(name: 'CHANGE_ID', defaultValue: '', description: 'Git change ID for merge requests')
        string(name: 'CHANGE_TARGET', defaultValue: '', description: 'Git change ID for the target merge requests')
    }

     stages {
  //       stage('Github') {
  //           steps {
  //               script {
  //                   branchName = params.BRANCH_NAME
  //                   targetBranch = branchName

  //                   git branch: branchName,
  //                       url: 'https://github.com/ZayaniHassen/DevopsFront.git',
  //                       credentialsId: '71b257c7-ecbb-4b16-8294-ddd1f4ac0a5e'
  //               }
  //               echo "Current branch name: ${branchName}"
  //               echo "Current target branch: ${targetBranch}"
  //           }
  //       }

  //       stage('NPM Clean') {
  //           when {
  //               expression { 
  //                   (params.CHANGE_ID != null) && (targetBranch == 'main')
  //               }
  //           }
  //           steps {
  //               sh 'npm cache clean --force'
  //               sh 'rm -rf node_modules package-lock.json'
  //           }
  //       }

  //       stage('NPM INSTALL') {
  //           when {
  //               expression {
  //                   (params.CHANGE_ID != null) && (targetBranch == 'main')
  //               }
  //           }
  //           steps {
  //               sh 'npm install --legacy-peer-deps --verbose'
  //           }
  //       }


  //       stage('Build') {
  //           when {
  //               expression { 
  //                   (params.CHANGE_ID != null) && (targetBranch == 'main')
  //               }
  //           }
  //           steps {
  //               sh 'node --max-old-space-size=5120 ./node_modules/@angular/cli/bin/ng build --output-path=dist'
  //           }
  //       }



  //       stage('Build Docker') {
  //           when {
  //               expression {
  //                   (params.CHANGE_ID != null) && (targetBranch == 'main')
  //               }
  //           }
  //           steps {
  //               script {
  //                   if (targetBranch == 'main') {
  //                       sh "docker build -t ${PROD_TAG} ."
  //                   } 
  //               }
  //           }
  //       }

	 //  stage('Docker Login'){
	 //     when {
  //       expression {
  //         (params.CHANGE_ID != null) && ((targetBranch == 'main'))
  //       }
  //   }
  //           steps{
  //               withCredentials([usernamePassword(credentialsId: '928642c1-11a7-49cf-8d04-e89186dc78a1', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
  //               sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
  //   }
  // }

  //       }

  //       stage('Docker Push') {
  //           when {
  //               expression {
  //                   (params.CHANGE_ID != null) && (targetBranch == 'main')
  //               }
  //           }
  //           steps {
  //               sh 'docker push $DOCKERHUB_USERNAME/front --all-tags'
  //           }
  //       }

  //       stage('Remove Containers') {
  //           when {
  //               expression {
  //                   (params.CHANGE_ID != null) && (targetBranch == 'main')
  //               }
  //           }
  //           steps {
  //               sh '''
  //               container_ids=$(docker ps -q --filter "publish=8089/tcp")
  //               if [ -n "$container_ids" ]; then
  //                   echo "Stopping and removing containers..."
  //                   docker stop $container_ids
  //                   docker rm $container_ids
  //               else
  //                   echo "No containers found using port 8089."
  //               fi
  //               '''
  //           }
  //       }




        stage('Email Notification') {
            steps {
                script {
                    currentBuild.resultIsBetterOrEqualTo('SUCCESS') ? notifySuccess() : notifyFailure()
                }
            }
        }
 
    }
}



def branchName
def targetBranch

def notifySuccess() {
    def imageUrl = 'https://www.weodeo.com/wp-content/uploads/2023/02/DevOps-scaled.webp' // Replace with the actual URL of your image
    def imageWidth = '800px' // Set the desired width in pixels
    def imageHeight = 'auto' // Set 'auto' to maintain the aspect ratio

    // Read the console log file and include its contents in the email body
    def consoleLog = readFile("${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/log")
    
    emailext(
        body: """
            <html>
                <body>
                    <p>YEEEEY, The Jenkins job was successful.</p>
                    <p>You can view the build at: <a href="${BUILD_URL}">${BUILD_URL}</a></p>
                    <p><img src="${imageUrl}" alt="Your Image" width="${imageWidth}" height="${imageHeight}"></p>
                    <p>Console Log:</p>
                    <pre>${consoleLog}</pre>
                </body>
            </html>
        """,
        subject: "Jenkins Job - Success",
        to: 'hassen.zayani@esprit.tn',
        mimeType: 'text/html'
    )
}

