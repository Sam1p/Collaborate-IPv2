var fs = require("fs");

// Async file read

/*fs.readFile ('../../documents/LICENSE.TXT', function (err, data) {
    if (err) {
        return console.error (err);
    }
    console.log("Asynchronous read: " + data.toString());
});
*/

// Synchronous read
var data = fs.readFileSync('../../documents/LICENSE.TXT');


var FileContents = data.toString();
var FileContentsBase64 = Buffer.from(FileContents).toString('base64');

// console.log ("Synchronous read: " + FileContents);

/*

Buffers can be used for taking a string or piece of data and doing base64 encoding of the result. For example:

> console.log(Buffer.from("Hello World").toString('base64'));
SGVsbG8gV29ybGQ=
> console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
Hello World

*/

console.log ("Doing a Base64 encode now on same file");
console.log (FileContentsBase64);
console.log ("Program Ended");