angular.module('org.beontime.features.favorites', [])
	.controller('FavoritesCtrl', function($scope) {
	  $scope.settings = {
		enableFriends: true
	  };
	});