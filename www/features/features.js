/**
 * Copyright 2015 Souchet Céline
 */

angular.module('org.beontime.features', ['org.beontime.features.contacts'])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "features/tabs.html"
            })

            // Each tab has its own nav history stack:


            .state('tabs.contacts', {
                url: '/contacts',
                views: {
                    'contacts-tab': {
                        templateUrl: 'features/contacts/appli/contacts.html',
                        controller: 'ContactsCtrl'
                    }
                }
            })
            .state('tabs.contact-add', {
                url: '/contacts/add',
                views: {
                    'contacts-tab': {
                        templateUrl: 'features/contacts/phone/add.html',
                        controller: 'PhoneContactsCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/contacts');

    });
