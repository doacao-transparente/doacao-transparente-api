app.config(function($stateProvider, $urlRouterProvider) {
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	.state('home', {
		url: '/home',
		views: {
			'content': {
				templateUrl: 'templates/home.html',
				controller: 'HomeController'
			}
		}
	})
	.state('ngo', {
		url: '/ngo',
		views: {
			'content': {
				templateUrl: 'templates/ngo.html',
				controller: 'NGOController'
			}
		}
	})
	.state('cityhall', {
		url: '/cityhall',
		views: {
			'content': {
				templateUrl: 'templates/cityhall.html',
				controller: 'CityHallController'
			}
		}
	});

	$urlRouterProvider.otherwise('/home');
})
