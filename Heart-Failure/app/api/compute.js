const client = require('./client');

const endpointCompute = '/compute';

const computeData = (data) => (
    client.post(endpointCompute, data)
);

module.exports = {
    computeData,
};