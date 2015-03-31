angular.module('org.beontime.features.contacts.controller', [])

.controller('ContactsCtrl', function($scope, Contacts) {
  $scope.contacts = Contacts.all();
  $scope.remove = function(contact) {
    Contacts.remove(contact);
  }
})

.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
  $scope.contact = Contacts.get($stateParams.contactId);
});
