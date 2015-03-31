angular.module('org.beontime.features.account', [])
	.controller('AccountCtrl', function($scope) {
	  $scope.settings = {
		enableFriends: true
	  };
	});