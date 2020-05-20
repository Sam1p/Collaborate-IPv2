var request = require ('request');
var options = {
    'method': 'GET',
    'url' : 'https://api.github.com/user/repos',
    'headers' : {
        'Authorization': 'Basic ' + Buffer.from("Sam1p:WelcomeEvery1").toString('base64'),
        'User-Agent': 'PostmanRuntime/7.24.1'
    }
}

request (options, function (error, response) {
    if(error) throw new Error(error);
    console.log(response.body);
});

console.log (options);
console.log("Done Get");