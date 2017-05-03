// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('novemstat', [
  'ionic',
  'angular-storage'
]);

angular.module('novemstat').run(function($ionicPlatform) {
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
});

angular.module('novemstat').config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('tab.newEvent', {
    url: '/newEvent',
    views: {
      'tab-newEvent': {
        controller: 'newEventCtrl',
        controllerAs: 'newEventCtrl',
        templateUrl: 'templates/newEvent.html'
      }
    }
  })

  .state('tab.eventList', {
    url: '/eventList',
    views: {
      'tab-eventList': {
        controller: 'eventListCtrl',
        controllerAs: 'eventListCtrl',
        templateUrl: 'templates/eventList.html'
      }
    }
  })

  .state('tab.eventDetails', {
    url: '/eventDetails/:eventId',
    views: {
      'tab-eventList': {
        controller: 'eventDetailsCtrl',
        controllerAs: 'eventDetailsCtrl',
        templateUrl: 'templates/eventDetails.html'
      }
    }
  })

  .state('tab.joueurList', {
    url: '/joueurList',
    views: {
      'tab-joueurList': {
        controller: 'joueurListCtrl',
        controllerAs: 'joueurListCtrl',
        templateUrl: 'templates/joueurList.html'
      }
    }
  })

  .state('tab.joueurDetails', {
    url: '/joueurDetails/:joueurId',
    views: {
      'tab-joueurList': {
        controller: 'joueurDetailsCtrl',
        controllerAs: 'joueurDetailsCtrl',
        templateUrl: 'templates/joueurDetails.html'
      }
    }
  })

  .state('tab.live', {
    url: '/live',
    views: {
      'tab-live': {
        controller: 'liveCtrl',
        controllerAs: 'liveCtrl',
        templateUrl: 'templates/live.html'
      }
    }
  })

  // This is the abstract state for the tabs directive.
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  });

  // Define the default state (i.e. the first screen displayed when the app opens).
  $urlRouterProvider.otherwise(function($injector) {
    $injector.get('$state').go('tab.eventList');
  });
});

angular.module('novemstat').run(function($rootScope, $state) {

  // Listen for the $stateChangeStart event of AngularUI Router.
  // This event indicates that we are transitioning to a new state.
  // We have the possibility to cancel the transition in the callback function.
  $rootScope.$on('$stateChangeStart', function(event, toState) {

  });
});
