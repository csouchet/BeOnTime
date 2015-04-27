/**
 * Copyright 2015 Souchet Céline
 */

// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module (also set in a <body> attribute in index.html)
// 			The 2nd parameter is an array of 'requires'
// 'org.beontime.features' is found in features.js
angular.module('starter', ['ionic', 'org.beontime.features'])

    .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
    }])
    
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });