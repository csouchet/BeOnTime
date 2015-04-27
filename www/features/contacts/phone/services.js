/**
 * Copyright 2015 Souchet Céline
 */

angular.module('org.beontime.features.contacts.services', [])

    .factory('BeOnTimeContactsFactory', function ($window) {

        var contacts = [];
        //var currentContact = null;

        // Open the connection on the database
        function openDatabase() {
            return $window.openDatabase("BeOnTime", "1.0", "BeOnTime", 200000);
        }

        // Initiate the database
        function initQueryDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS CONTACTS (id UNIQUE, familyName, givenName, photo, phoneNumber, email, state, stateTime, isFavorite)');
        }

        // Get all contacts
        function allQueryDB(tx) {
            tx.executeSql('SELECT * FROM CONTACTS', [], allSuccess, errorCB);
        }

        // Transaction success callback when get all contacts
        function allSuccess(tx, results) {
            var len = results.rows.length;
            console.log("CONTACTS table: " + len + " rows found.");

            contacts = [];
            for (var i = 0; i < len; i++) {
                var contact = results.rows.item(i);
                contacts.push({
                    id: contact.id,
                    familyName: contact.familyName,
                    givenName: contact.givenName,
                    photo: contact.photo,
                    phoneNumber: contact.phoneNumber,
                    email: contact.email,
                    state: contact.state,
                    stateTime: contact.stateTime,
                    isFavorite: contact.isFavorite
                });
            }
        }

        // Update a contact
        function updateQueryDB(tx) {
            tx.executeSql('UPDATE CONTACTS SET familyName ="' + currentContact.familyName +
            '", givenName= "' + currentContact.givenName +
            '", photo= "' + currentContact.photo +
            '", phoneNumber= "' + currentContact.phoneNumber +
            '", email= "' + currentContact.email +
            '", state= "' + currentContact.state +
            '", stateTime= "' + currentContact.stateTime +
            '", isFavorite= "' + currentContact.isFavorite +
            '" WHERE id = ' + currentContact.id);
        }

        // Delete a contact
        function deleteQueryDB(tx) {
            tx.executeSql('DELETE FROM CONTACTS WHERE id = ?', [currentContact.id], function () {}, errorCB);
        }

        // Create a new contact
        function createQueryDB(tx) {
            tx.executeSql('INSERT INTO CONTACTS (id, familyName, givenName, photo, phoneNumber, email, state, stateTime, isFavorite) VALUES(?,?,?,?,?,?,?,?)', [currentContact.id, currentContact.familyName,
                currentContact.givenName, currentContact.photo, currentContact.phoneNumber, currentContact.email, currentContact.state, currentContact.stateTime, currentContact.isFavorite], function () {
            }, errorCB);
        }

        // Transaction error callback
        function errorCB(err) {
            alert("Error processing SQL: " + err);
        }

        return {
            initDB: function () {
                var db = openDatabase();
                db.transaction(initQueryDB, errorCB);
            },
            create: function (contact) {
                currentContact = contact;
                var db = openDatabase();
                db.transaction(createQueryDB, errorCB);
                currentContact = null;
            },
            update: function (contact) {
                currentContact = contact;
                var db = openDatabase();
                db.transaction(updateQueryDB, errorCB);
                currentContact = null;
            },
            remove: function (contact) {
                currentContact = contact;
                var db = openDatabase();
                db.transaction(deleteQueryDB, errorCB);
                contacts.splice(contacts.indexOf(currentContact), 1);
                currentContact = null;
                return contacts;
            },
            all: function () {
                var db = openDatabase();
                db.transaction(allQueryDB, errorCB);
                return contacts;
            },
            get: function (contactId) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id === parseInt(contactId)) {
                        return contacts[i];
                    }
                }
                return null;
            }
        };
    })

    .factory("PhoneContactsFactory", ['$rootScope', '$q', function ($rootScope, $q) {
        var deferred;

        // onSuccess: Get a snapshot of the current contacts
        function onSuccess(contacts) {
            $rootScope.$apply(function () {
                console.log("PhoneContactsFactory OnSuccess, contacts = " + contacts);
                deferred.resolve(contacts);
            });
        }

        // onError: Failed to get the contacts
        function onError(error) {
            $rootScope.$apply(function () {

                console.log("PhoneContactsFactory OnError");
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

                console.log("deferred.promise = " + deferred.promise);
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
