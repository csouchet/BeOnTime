/**
 * Copyright 2015 Souchet Céline
 */

angular.module('org.beontime.features.contacts.appli.service', [])

    .factory('BeOnTimeContactsFactory', ['$window', function ($window) {

        var contacts = [];

        // Open the connection on the database
        function openDatabase() {
            return $window.openDatabase("BeOnTime", "1.0", "BeOnTime", 200000);
        }

        // Initiate the database
        function initQueryDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS CONTACTS (id INTEGER NOT NULL PRIMARY KEY, familyName TEXT, givenName TEXT, ' +
            'photo BLOB, phoneNumber TEXT, email TEXT, state TEXT, stateTime INTEGER, isFavorite Boolean)');
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
        function updateContact(contact) {
            var db = openDatabase();
            db.transaction(function (tx) {
                tx.executeSql('UPDATE CONTACTS SET familyName ="' + contact.familyName +
                '", givenName= "' + contact.givenName +
                '", photo= "' + contact.photo +
                '", phoneNumber= "' + contact.phoneNumber +
                '", email= "' + contact.email +
                '", state= "' + contact.state +
                '", stateTime= "' + contact.stateTime +
                '", isFavorite= "' + contact.isFavorite +
                '" WHERE id = ' + contact.id);
            }, errorCB);
        }

        // Delete a contact
        function deleteContact(contact) {
            var db = openDatabase();
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM CONTACTS WHERE id = ?', [contact.id], function () { }, errorCB);
            }, errorCB);
        }

        // Create a new contact
        function createContact(contact) {
            var db = openDatabase();
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO CONTACTS (id, familyName, givenName, photo, phoneNumber, email, state, stateTime, isFavorite) VALUES(' + "'" + contact.id + "','"
                    + contact.familyName + "','"
                    + contact.givenName + "','"
                    + contact.photo + "','"
                    + contact.phoneNumber + "','"
                    + contact.email + "','"
                    + contact.state + "','"
                    + contact.stateTime + "','"
                    + contact.isFavorite + "')");
            }, errorCB);
        }

        // Transaction error callback
        function errorCB(err) {
            console.log(err.code +" " + err.message);
            alert("Error Code " + err.code + ", Error Message " + err.message);
        }

        return {
            initDB: function () {
                var db = openDatabase();
                db.transaction(initQueryDB, errorCB);
            },
            create: function (contact) {
                createContact(contact);
            },
            update: function (contact) {
                updateContact(contact);
            },
            remove: function (contact) {
                deleteContact(contact);
                contacts.splice(contacts.indexOf(contact), 1);
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
    }])
;
