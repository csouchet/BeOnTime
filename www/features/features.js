angular.module('org.beontime.features', ['org.beontime.features.message',
	'org.beontime.features.favorites',
	'org.beontime.features.contacts'])
	
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
	.state('tab', {
	url: "/tab",
	abstract: true,
	templateUrl: "features/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.message', {
	url: '/message',
	views: {
	  'tab-message': {
		templateUrl: 'features/message/tab-message.html',
		controller: 'MessageCtrl'
	  }
	}
  })

  .state('tab.favorites', {
  	url: '/favorites',
  	views: {
  	  'tab-favorites': {
  		templateUrl: 'features/favorites/tab-favorites.html',
  		controller: 'FavoritesCtrl'
  	  }
  	}
  })

  .state('tab.contacts', {
	  url: '/contacts',
	  views: {
		'tab-contacts': {
		  templateUrl: 'features/contacts/tab-contacts.html',
		  controller: 'ContactsCtrl'
		}
	  }
  })
  .state('tab.contact-detail', {
	  url: '/contacts/:contactId',
	  views: {
		'tab-contacts': {
		  templateUrl: 'features/contacts/contact-detail.html',
		  controller: 'ContactDetailCtrl'
		}
	  }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/message');

});