const fs = require('fs');
const $ = require('cheerio');

const getData = (url) => {
    return new Promise((resolve, reject) => {
        const html = fs.readFileSync(url, "utf8");
        const product = $("#productTitle", html).text().trim();
        const inStock = $("#availability span", html).text().trim();
        resolve({
            title : product,
            inStock : inStock
        });
    })
}

module.exports.getAmazonData = getData;