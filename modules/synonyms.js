const WordNet = require('node-wordnet');

(async function a() {
    var wordnet = new WordNet();
    var results = await wordnet.lookupAsync('City');
    var dict = {};
    results.forEach(function(result) {
        result.synonyms.forEach(x => {
            dict[x] = true;
        });
    });
    var keys = Object.keys(dict);
    console.log(keys);
})();