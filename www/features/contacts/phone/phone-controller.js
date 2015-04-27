/**
 * Copyright 2015 Souchet Céline
 */

angular.module('org.beontime.features.contacts.phone-controller', ['ionic'])

.controller('PhoneContactsCtrl', ['$scope', '$ionicHistory', 'BeOnTimeContactsFactory', 'PhoneContactsFactory', function ($scope, $ionicHistory, BeOnTimeContactsFactory, PhoneContactsFactory ) {
	ionic.Platform.ready(function () {
		PhoneContactsFactory.all().then(function (contacts) {
			$scope.phoneContacts = contacts;
		}, function (error) {
			console.log(error);
		});
	});

	$scope.importPhoneContacts = function () {
		for (var i = 0; i < $scope.phoneContacts.length; i++) {
			var phoneContact = $scope.phoneContacts[i];
			var phoneNumber = PhoneContactsFactory.getPreferred(phoneContact.phoneNumbers);
			var photo = PhoneContactsFactory.getPreferred(phoneContact.photos);
			var email = PhoneContactsFactory.getPreferred(phoneContact.emails);
			var contact = {
				id : phoneContact.id,
				familyName : phoneContact.name.familyName,
				givenName : phoneContact.name.givenName,
				photo : photo,
				phoneNumber : phoneNumber,
				email : email,
				state : 'AT_TIME',
				stateTime : 0,
				isFavorite : false
			};
			BeOnTimeContactsFactory.create(contact);
		}

		$scope.contacts = BeOnTimeContactsFactory.all();
		$ionicHistory.goBack();
	}
}]);
