const NewsAPI = require('newsapi');
const who = require('./who');
const airlines = require('./airlines');
const newsapi = new NewsAPI('6939f1a95cc542ab82ef3c012a134030');

const getNewsData = async (region) => {
    if (!region) {
        return {
            airlinenews: [],
            covid19news: [],
            whonews: []
        };
    }

    const today = new Date();
    const last_month = new Date();
    last_month.setMonth(today.getMonth() - 1);

    const params = {
        language: 'en',
        from: last_month.toISOString().slice(0,10),
        to: today.toISOString().slice(0,10),
        sortBy: 'relevancy',
        q: ''
    };

    // transportation news
    const airlinenews = await airlines.getAirlineDisruptions();

    // covid news
    const covid19news = await newsapi.v2.everything({
        ...params,
        q: `${region} covid-19`,
    });

    // government news
    const whonews = await who.getWHOFeed();

    return {
        airlinenews: airlinenews.slice(0, 3),
        covid19news: covid19news.articles.slice(0, 3),
        whonews: whonews.slice(0, 3)
    };
};

module.exports.getNewsData = getNewsData;