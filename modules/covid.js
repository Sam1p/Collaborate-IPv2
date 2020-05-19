const request = require('request-promise');

const getData = (url, embed) => {
    return new Promise((resolve, reject) => {
        request(url).then((response) => {
            var data = JSON.parse(response);
            data = data.data[0];
            resolve({
                region: data.location,
                confirmed: data.confirmed,
                severity : data.confirmed > 50000 ? "HIGH" : (data.confirmed > 10000 ? "MODERATE" : "LOW"),
                embed : embed
            });
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports.getCoviddata = getData;