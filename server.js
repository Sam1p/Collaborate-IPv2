const express = require('express');
const fse = require('fse');
const https = require('https');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

var privateKey  = fse.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fse.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.PORT || 3000, function () {
    var host = httpsServer.address().address;
    var port = httpsServer.address().port;

    console.log('Collaborate-IP started at https://%s:%s', host, port);
});