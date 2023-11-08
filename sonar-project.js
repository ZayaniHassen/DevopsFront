const sonarqubeScanner = require ('sonarqube-scanner');

sonarqubeScanner({
    serverUrl : 'http://192.168.162.222:9000/',
    options : {
        'sonar.projectDescription': 'achat-front',
        'sonar.projectName':'achat-front',
        'sonar.projectKey':'achat-front',
        'sonar.login':'sqp_3d2826d7a43568daf93ffc18d06a34512d28f0cd',
        'sonar.projectVersion':'1.0',
        'sonar.language':'js',
        'sonar.sourceEncoding':'UTF-8',
        'sonar.sources':'.',
    }
},()=>{});
