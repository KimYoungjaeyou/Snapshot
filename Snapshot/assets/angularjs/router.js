angular.module('ss', ['ngRoute'])
 .config(function ($routeProvider) {
    $routeProvider
    .when('/main.html', {
      templateUrl: 'main.html'
    })
    .when('/monitoring.html', {
      templateUrl: 'monitoring1.html'
    })
    .when('/trigger.html', {
      templateUrl: 'trigger1.html'
    })
    .when('/userList', {
      templateUrl: 'views/userList.html', controller: 'userListCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    })
  })
