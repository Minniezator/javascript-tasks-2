'use strict';

var phoneBook = [];
var maxLengths = [];

module.exports.add = function add(name, phone, email) {
    if (checkExistence(name, phone, email)) {
        console.log('Контакт уже есть в книге.');
        return null;
    }
    var phonePattern = /^((\+)?(\d{1,4}\s)?(\d{3}|(\(\d{3}\)))\s\d{3}((-\d{1}-)|(\s\d{1}\s))\d{3})|(\d{11,14})$/;
    var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Zа-яА-Я0-9-]+(\.[a-zA-Zа-яА-Я0-9-.]+)+$/;
    if (phonePattern.test(phone) && emailPattern.test(email)) {
        phoneBook.push({name: name, phone: phone, email: email});
    } else {
        console.log('Данные введены неверно!');
    }
    return null;
};

function checkExistence(name, phone, email) {
    var isExist = false;
    function tryContact(contact, index, book) {
        if (contact.name === name ||
            contact.phone === phone ||
            contact.email === email) {
            isExist = true;
        }
    }
    phoneBook.forEach(tryContact);
    return isExist;
};

module.exports.find = function find(query) {
    query.replace(/[\+\s()-]/g, '');
    var isFound = false;
    function tryContact(contact, index, book) {
        function printContact(key, index, keys) {
            process.stdout.write(contact[key] + ', ');
        }
        function isInBook(key, index, keys) {
            if ((new RegExp(query, 'i')).test(contact[key].replace(/[\+\s()-]/g, ''))) {
                isFound = true;
                keys.forEach(printContact);
                console.log();
            }
        }
        Object.keys(contact).forEach(isInBook);
    }
    phoneBook.forEach(tryContact);
    return isFound;
};

module.exports.remove = function remove(query) {
    var numOfRemoved = 0;
    for (var i = 0; i < phoneBook.length; ++i) {
        function removeContact(key, index, keys) {
            if ((new RegExp(query, 'i')).test(phoneBook[i][key])) {
                phoneBook.splice(i, 1);
                numOfRemoved++;
                i--;
            }
        }
        Object.keys(phoneBook[i]).forEach(removeContact);
    }
    console.log('Удален ' + numOfRemoved + ' контакт');
    return numOfRemoved;
};

function createMaxLengths() {
    for (var key in phoneBook[0]) {
        maxLengths[key] = phoneBook[0][key].length;
    }
    for (var i = 1; i < phoneBook.length; ++i) {
        for (var key in phoneBook[i]) {
            if (phoneBook[i][key].length > maxLengths[key]) {
                maxLengths[key] = phoneBook[i][key].length;
            }
        }
    }
    var lenghtOfString = 0;
    for (var key in maxLengths) {
        lenghtOfString += maxLengths[key];
    }
    return lenghtOfString;
}

function drawHorizontal(lengthOfString) {
    const CELL_PADDING = 4;
    for (var i = 0; i < lengthOfString + CELL_PADDING * Object.keys(phoneBook[0]).length; ++i) {
        process.stdout.write('─');
    }
    console.log();
    return null;
}

function drawHeader() {
    for (var key in phoneBook[0]) {
        process.stdout.write('| ' + key.toLocaleUpperCase());
        for (var j = 0; j < maxLengths[key] - key.length; ++j) {
            process.stdout.write(' ');
        }
        process.stdout.write(' |');
    }
    console.log();
    return null;
}

module.exports.showTable = function showTable() {
    if (phoneBook.length !== 0) {
        var lengthOfString = createMaxLengths();
        drawHorizontal(lengthOfString);
        drawHeader();
        drawHorizontal(lengthOfString);
        for (var i = 0; i < phoneBook.length; ++i) {
            for (var key in phoneBook[i]) {
                process.stdout.write('│ ' + phoneBook[i][key]);
                for (var j = 0; j < maxLengths[key] - phoneBook[i][key].length; ++j) {
                    process.stdout.write(' ');
                }
                process.stdout.write(' │');
            }
            console.log();
        }
        drawHorizontal(lengthOfString);
    }
};
