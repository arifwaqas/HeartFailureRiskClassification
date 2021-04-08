const apisauce = require('apisauce');

const base = apisauce.create({
    baseURL: 'http://192.168.1.104'
});

module.exports = base;