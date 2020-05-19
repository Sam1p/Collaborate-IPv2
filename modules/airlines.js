const fs = require('fs');
const $ = require('cheerio');

const getAirlineDisruptions = () => {
    return new Promise((resolve, reject) => {
        const html = fs.readFileSync('./info/delays.txt', "utf8");
        const body = $(".namerica", html).text().trim();

        var full_body = body.split('\n').filter(x=>x!=='').map(x=>"<p>"+x+"</p>").join('');
        var description = body.split('\n').filter(x=>x!=='').slice(0,3).map(x=>"<p>"+x+"</p>").join('');

        resolve([{
            title: "North American Airline Disruptions",
            description: description,
            content : full_body,
            author : "Billy Jones",
            publishedAt : new Date(),
            source : {
                id : null,
                name : "Airfarewatchdog"
            },
            url : "https://www.airfarewatchdog.com/blog/50105499/covid-19-flight-cancellations-by-region-and-airline/",
            urlToImage : "https://blog.airfarewatchdog.com/uploads/sites/26/2020/04/airline-cancellations-coronavirus-6.png"
        }]);
    });
}

module.exports.getAirlineDisruptions = getAirlineDisruptions;