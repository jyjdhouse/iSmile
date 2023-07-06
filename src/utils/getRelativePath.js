const url = require('url');
module.exports = function (path) {
    // Obtengo la ultima url donde estuvo  
    let lastURL = url.parse(path);
    return lastURL.pathname;
};