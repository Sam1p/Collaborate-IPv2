const parseStringPromise = require('xml2js').parseStringPromise;
const request = require('request-promise');

const getWHOFeed = () => {
    return new Promise((resolve, reject) => {
        request('https://www.who.int/rss-feeds/news-english.xml').then((res) => {
            parseStringPromise(res).then((data) => {
                const items = data.rss.channel[0].item;
                const whoNews = [];

                for (let i = 0; i < 3; i++) {
                    //console.log(items[i].description[0]);
                    const endTag = "</" + items[i].description[0].substr(1, items[i].description[0].indexOf(">"));

                    whoNews.push({
                        title: items[i].title[0],
                        author: 'World Health Organization',
                        content: items[i].description[0],
                        description: items[i].description[0].slice(0, 200) + "..." + endTag,
                        publishedAt: items[i].pubDate[0],
                        source: {
                            id: null,
                            name: 'World Health Organization'
                        },
                        url: items[i].link[0],
                        urlToImage: 'https://www.iapb.org/wp-content/uploads/who_logo.gif'
                    })
                }

                resolve(whoNews);
            });
        });
    });
}

module.exports.getWHOFeed = getWHOFeed;