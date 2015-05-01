angular.module('org.beontime.features.contacts.appli.controller', ['ionic'])

.controller('ContactsCtrl', ['$scope', 'BeOnTimeContactsFactory', function ($scope, BeOnTimeContactsFactory ) {
	ionic.Platform.ready(function () {
		BeOnTimeContactsFactory.initDB();

		BeOnTimeContactsFactory.all().then(function (contacts) {
			$scope.contacts = contacts;
		}, function (error) {
			console.log("Can't find the contacts in the Database : " + error);
		});
	});

	$scope.remove = function (contact) {
		BeOnTimeContactsFactory.remove(contact);
	}

}]);
