/**
 * Copyright 2015 Souchet Céline
 */

angular.module('org.beontime.features.contacts.phone.service', [])

    .factory("PhoneContactsFactory", ['$rootScope', '$q', function ($rootScope, $q) {
        var deferred;

        // onSuccess: Get a snapshot of the current contacts
        function onSuccess(contacts) {
            $rootScope.$apply(function () {
                deferred.resolve(contacts);
            });
        }

        // onError: Failed to get the contacts
        function onError(error) {
            $rootScope.$apply(function () {
                deferred.reject(error);
            });
        }

        return {
            all: function () {
                deferred = $q.defer(); // asynchronous
                var options = new ContactFindOptions();
                options.multiple = true;
                var fields = ["id", "name", "emails", "phoneNumbers", "photos"];
                navigator.contacts.find(fields, onSuccess, onError, options);

                return deferred.promise;
            },
            getPreferred: function (contactFields) {
                if (contactFields != null) {
                    for (var i = 0; i < contactFields.length; i++) {
                        if (contactFields[i].pref) {
                            return contactFields[i];
                        }
                    }
                }
                return null;
            }
        };
    }
    ])
;
