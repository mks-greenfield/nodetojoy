angular.module('dibs', [
  'ngAnimate', 
  'ui.bootstrap', 
  'ui.router', 
  'dibs.dashboard', 
  'dibs.events',
  'dibs.googlecal'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('dashboard');

    $stateProvider
      .state('signupPage', {
        url: '/signup',
        views: {
          'indexPage': {
            templateUrl: 'views/signup.html'
          }
        }
      })
      .state('dashboardPage', {
        url: '/dashboard',
        views: {
          'indexPage': {
            templateUrl: 'views/dashboard.html',
            controller: 'eventsController'
          }
        }
      })
      .state('dashboardPage.events', {
        url: '/events',
        templateUrl: 'views/eventListEmbedded.html',
        controller: 'eventsController'
      })
      .state('dashboardPage.eventsChart', {
        url: '/eventsChart',
        templateUrl: 'views/eventChart.html',
        controller: 'eventsController'
      });
  })

.run(function($state, $rootScope) {
  //run anything here
});