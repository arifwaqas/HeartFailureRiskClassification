const apisauce = require('apisauce');

const base = apisauce.create({
    baseURL: 'http://192.168.1.11'
});

module.exports = base;