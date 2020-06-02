const express = require('express');
const fse = require('fse');
const https = require('https');
const path = require('path');
const axios = require('axios').default;
const app = express();
const request = require('request');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/* Lessons Learn 

(1) Callback Hell
(2) ASYNC AWAIT + Promise.Await all

*/
/* How to upload a file *

http://www.simplexanswer.com/2019/05/github-api-how-to-upload-a-file/
curl -i -X PUT -H ‘Authorization: token 98xxxxxxxxxxxxxxxxxxxxxxxe2’ -d
‘{“message”: “uploading a sample pdf”,
“content”:”bXkgbm……………………………..”
}’ https://api.github.com/repos/batman/toys/contents/sample.pdf

Notice: the “content” property needs to be base64 encoded and only then the API will let you upload it to your repo. 
To achieve this, you could just encode it using this tool online https://www.freeformatter.com/base64-encoder.html
Which will give you a long string of characters, after which just copy/paste the string into the “content” property, and ran the above curl command.  and BAM, there you go. You have your pdf file in your repo.

https://www.freeformatter.com/base64-encoder.html

*/

app.post('/api/PostGitHub', async (req, res) => {
    console.log("Received API call: ", JSON.stringify(req.body));
    console.log(req.body);
    console.log("Going to perform a POST to Create Folder or File");

    // folder creation - same, for open source or proprietary

    GitHubFolderCreateRepo(req.body, function (error, response) {
        if (error) {
            console.log(error);
            return res.status(400).send(error);
        }
        var responseBody = JSON.parse(response.body);
        if (responseBody.message === "Bad credentials") {
            console.log(responseBody);
            return res.status(400).send(responseBody);
        }
        console.log(responseBody);
        console.log("GitHubFolderCreateRepo Seems Successful.");

        // Depending on whether Open Source was selected differen toptions
        // Option 1: Open SOurce
        // Option 2: Proprietary

        // NOTE: You're going to have keep nesting
        // call-back hell, so you'll need to elarn to use "ASYNC AWAIT" in the future

        if (req.body.GitHubInstruction === "OpenSource") {
            console.log("Performing Open Source File Structure Creation");
            var data = fse.readFileSync(__dirname + '/documents/LICENSE.TXT');
            var FileContents = data.toString();
            var FileContentsBase64 = Buffer.from(FileContents).toString('base64');

            var dataCharterOpenSource = fse.readFileSync(__dirname + '/documents/CHARTER_OPENSOURCE.TXT');
            var FileContentsCharterOpenSource = dataCharterOpenSource.toString();
            var FileContentsBase64CharterOpenSource = Buffer.from(FileContentsCharterOpenSource).toString('base64');

            GitHubCreateFile(req.body, 'LICENSE.TXT', FileContentsBase64, function (error, response) {
                if (error) {
                    console.log(error);
                    return res.status(400).send(error);
                }
                var responseBody = JSON.parse(response.body);
                if (responseBody.message === "Bad credentials") {
                    console.log(responseBody);
                    return res.status(400).send(responseBody);
                }


                console.log(responseBody);
                console.log("GitHubFolderCreateFile Seems Successful.");

                // Create Open Source Charter
                GitHubCreateFile(req.body, 'CHARTER_OPENSOURCE.TXT', FileContentsBase64CharterOpenSource, function (error, response) {
                    if (error) {
                        console.log(error);
                        return res.status(400).send(error);
                    }
                    var responseBody = JSON.parse(response.body);
                    if (responseBody.message === "Bad credentials") {
                        console.log(responseBody);
                        return res.status(400).send(responseBody);
                    }

                    console.log(responseBody);
                    console.log("GitHub Create CHARTER_OPENSOURCE.TXT Seems Successful.");
                    res.send(responseBody);
                });
            });

        } else { // Non-Open Source
            console.log("Performing Proprietary File Structure Creation");
            var data = fse.readFileSync(__dirname + '/documents/CHARTER.TXT');
            var FileContents = data.toString();
            var FileContentsBase64 = Buffer.from(FileContents).toString('base64');

            var dataPartyA = fse.readFileSync(__dirname + '/documents/Party_A_IP.TXT');
            var FileContentsPartyA = dataPartyA.toString();
            var FileContentsBase64PartyA = Buffer.from(FileContentsPartyA).toString('base64');

            var dataPartyB = fse.readFileSync(__dirname + '/documents/Party_B_IP.TXT');
            var FileContentsPartyB = dataPartyB.toString();
            var FileContentsBase64PartyB = Buffer.from(FileContentsPartyB).toString('base64');

            GitHubCreateFile(req.body, 'CHARTER.TXT', FileContentsBase64, function (error, response) {
                if (error) {
                    console.log(error);
                    return res.status(400).send(error);
                }
                var responseBody = JSON.parse(response.body);
                if (responseBody.message === "Bad credentials") {
                    console.log(responseBody);
                    return res.status(400).send(responseBody);
                }

                console.log(responseBody);
                console.log("GitHub Creating CHARTER.TXT seems Successful.");

                // Create Party A Folder
                GitHubCreateFile(req.body, 'PARTY_A_IP/PARTY_A_IP.TXT', FileContentsBase64PartyA, function (error, response) {
                    if (error) {
                        console.log(error);
                        return res.status(400).send(error);
                    }
                    var responseBody = JSON.parse(response.body);
                    if (responseBody.message === "Bad credentials") {
                        console.log(responseBody);
                        return res.status(400).send(responseBody);
                    }

                    console.log(responseBody);
                    console.log("GitHub Creating PARTY_A_IP/PARTY_A_IP.TXT Seems Successful.");

                    // Now Create Party B Folder
                    GitHubCreateFile(req.body, 'PARTY_B_IP/PARTY_B_IP.TXT', FileContentsBase64PartyB, function (error, response) {
                        if (error) {
                            console.log(error);
                            return res.status(400).send(error);
                        }
                        var responseBody = JSON.parse(response.body);
                        if (responseBody.message === "Bad credentials") {
                            console.log(responseBody);
                            return res.status(400).send(responseBody);
                        }
    
                        console.log(responseBody);
                        console.log("GitHub Creating PARTY_B_IP/PARTY_B_IP.TXT Seems Successful.");
    
                        // Now, in the nested h*** can we send back the res.send.

                        res.send(responseBody);
                    });
                });
            });
        }
    });
});

// Create a Repo on Github
function GitHubFolderCreateRepo(data, callback) {
    var options = {
        'method': 'POST',
        'url': 'https://api.github.com/user/repos',
        'headers': {
            'Authorization': 'Basic ' + Buffer.from(data.GitHubUserName + ":" + data.GitHubPassword).toString('base64'),
            'User-Agent': 'PostmanRuntime/7.24.1',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ name: data.GitHubFolderName })
    }

    request(options, function (error, response) {
        callback(error, response);
    });
}

// https://api.github.com/repos/Sam1p/testrepo/contents/Party_A_IP/contents.txt
// Create a File on a Repo
function GitHubCreateFile(data, FilePathName, FileContentsBase64, callback) {

    var options = {
        'method': 'PUT',
        'url': 'https://api.github.com/repos/' + data.GitHubUserName + "/" + data.GitHubFolderName + "/contents/" + FilePathName,
        'headers': {
            'Authorization': 'Basic ' + Buffer.from(data.GitHubUserName + ":" + data.GitHubPassword).toString('base64'),
            'User-Agent': 'PostmanRuntime/7.24.1',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            'message': 'Collaborate IP File Creation',
            'content': FileContentsBase64
        })
    }

    request(options, function (error, response) {
        callback(error, response);
    });
}

app.get('/api/GetGitHub', async (req, res) => {
    console.log("Received API call: ", JSON.stringify(req.body));
    console.log(req.body);
    console.log("Going to perform the typical GET for now");
    var options = {
        'method': 'GET',
        'url': 'https://api.github.com/user/repos',
        'headers': {
            'Authorization': 'Basic ' + Buffer.from("Sam1p:WelcomeEvery1").toString('base64'),
            'User-Agent': 'PostmanRuntime/7.24.1'
        }
    }

    request(options, function (error, response) {
        if (error) return console.log(error);

        console.log(response.body);
        console.log("Done Get");
        res.send(response.body);
    });
});


var privateKey = fse.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fse.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.PORT || 3000, function () {
    var host = httpsServer.address().address;
    var port = httpsServer.address().port;

    console.log('Collaborate-IP started at https://%s:%s', host, port);
});