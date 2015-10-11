'use strict';

var phoneBook = [];
var arrayOfMaxLengths = [];

module.exports.add = function add(name, phone, email) {
    if (/^((\+)?(\d{1,4}\s)?(\d{3}|(\(\d{3}\)))\s\d{3}((-\d{1}-)|(\s\d{1}\s))\d{3})|(\d{11,14})$/.test(phone) &&
       /^[a-zA-Z0-9_.+-]+@[a-zA-Zа-яА-Я0-9-]+(\.[a-zA-Zа-яА-Я0-9-.]+)+$/.test(email)) {
        phoneBook.push({name: name, phone: phone, email: email});
    }
    //else console.log('Данные введены неверно!');
    return null;
};

module.exports.find = function find(query) {
    for (var i = 0; i < phoneBook.length; ++i) {
        for (var key in phoneBook[i]) {
            if (phoneBook[i][key].indexOf(query) > -1) {
                for (var key in phoneBook[i]) {
                    process.stdout.write(phoneBook[i][key] + ', ');
                }
                console.log();
                break;
            }
        }
    }
    return null;
};

module.exports.remove = function remove(query) {
    var numOfRemoved = 0;
    for (var i = 0; i < phoneBook.length; ++i) {
        for (var key in phoneBook[i]) {
            if (phoneBook[i][key].indexOf(query) > -1) {
                phoneBook.splice(i, 1);
                numOfRemoved++;
                i--;
                break;
            }
        }
    }
    return numOfRemoved;
};

function createArrayOfMaxLengths() {
    for (var key in phoneBook[0]) {
        arrayOfMaxLengths[key] = phoneBook[0][key].length;
    }
    for (var i = 1; i < phoneBook.length; ++i) {
        for (var key in phoneBook[i]) {
            arrayOfMaxLengths[key] = phoneBook[i][key].length > arrayOfMaxLengths[key] ?
                                     phoneBook[i][key].length : arrayOfMaxLengths[key];
        }
    }
    var lenghtOfString = 0;
    for (var key in arrayOfMaxLengths) {
        lenghtOfString += arrayOfMaxLengths[key];
    }
    return lenghtOfString;
}

function drawHorizontal(lengthOfString) {
    for (var i = 0; i < lengthOfString + 4 * Object.keys(phoneBook[0]).length; ++i) {
        process.stdout.write('─');
    }
    console.log();
    return null;
}

function drawHeader() {
    for (var key in phoneBook[0]) {
        process.stdout.write('| ' + key.toLocaleUpperCase());
        for (var j = 0; j < arrayOfMaxLengths[key] - key.length; ++j) {
            process.stdout.write(' ');
        }
        process.stdout.write(' |');
    }
    console.log();
    return null;
}

module.exports.showTable = function showTable() {
    if (phoneBook.length !== 0) {
        var lengthOfString = createArrayOfMaxLengths();
        drawHorizontal(lengthOfString);
        drawHeader();
        drawHorizontal(lengthOfString);
        for (var i = 0; i < phoneBook.length; ++i) {
            for (var key in phoneBook[i]) {
                process.stdout.write('│ ' + phoneBook[i][key]);
                for (var j = 0; j < arrayOfMaxLengths[key] - phoneBook[i][key].length; ++j) {
                    process.stdout.write(' ');
                }
                process.stdout.write(' │');
            }
            console.log();
        }
        drawHorizontal(lengthOfString);
    }
    return null;
};
