// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource', 'starter.controllers','starter.services','starter.apiservices','starter.moments','starter.services.camera'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('moment',{
    url:'/moment',
    abstract: true,
    templateUrl: 'templates/moment.html'
  })

  .state('moment.dash', {
      url: '/dash',
      views: {
        'moment-content': {
          templateUrl: 'templates/moment-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

  .state('moment.post',{
    url: '/post',
    views:{
      'moment-content':{
        templateUrl: 'templates/moment-form.html',
        controller: 'MomentCtrl'
      }
    }
  })
  $urlRouterProvider.otherwise('/moment/dash');
})

