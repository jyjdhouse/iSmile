const path = require('path');
const fs = require('fs');

module.exports = function () {
    const file= require('./staticDB/countryCodes');
    return file;
}