// console.log ("Requiring Axios");
// Can't get axios
// const axios = require('axios'); or const axios = require('axios').default doesn't work
//
// try <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

console.log("Vue Starting Instance");


var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: function () {
        return {
            seen: false,
            UserResponse: {
                OpenSource: true,
                BackgroundIP: true,
                GitHubUserName: 'foo',
                GitHubPassword: 'bar',
                GitHubFolderName: 'Tempx',
                GitHubConsent: false
            },
            PostBody: {
                GitHubUserName: 'foo',
                GitHubPassword: 'bar',
                GitHubFolderName: 'Tempx',
                GitHubInstruction: 'CreateFolder'
            }
        }
    },
    methods: {
        submit() {
            console.log("created starting...");

            

            /* https://masteringjs.io/tutorials/axios/basic_auth 
            (1) Tools: https://httpbin.org/basic-auth/foo/bar can be used test simple HTTP request/resp
            to test Basic Authentication and other API request 
            
            Conclusion of Test
            - auth field works; therefore something with GitHub
            - but authentication works on Postman though
            - COULD it be a cross-origin issue?
              Unlikely: Hithub 3 says API supports CORS
            - COULD it be you're making call from http to https? */


            // localhost/api/sfdfdi
            // ... don't go with https just go with "/user/repos""
            // "
           /* axios
                .get("https://api.github.com/user/repos", {
                    auth: {
                        username: this.UserResponse.GitHubUserName,
                        password: this.UserResponse.GitHubPassword
                    },
                    headers: {
                        'User-Agent': 'PostmanRuntime/7.24.1'
                    }
                })
                .then(res => {
                    console.log("res.data: " + JSON.stringify(res.data));
                })
                .catch(err => console.log(err));*/

            /*this.axiosPostBody += this.GitHubFolderName;
            // Need to get JSONIFY.. get it to JSON.
            console.log(this.axiosPostBody);*/
            console.log ("About to send to localhost/api/post");
            console.log (JSON.stringify(this.PostBody));
            axios
              .post(`/api/PostGitHub`, {
                    GitHubUserName : this.UserResponse.GitHubUserName,
                    GitHubPassword : this.UserResponse.GitHubPassword,
                    GitHubFolderName : this.UserResponse.GitHubFolderName,
                    GitHubInstruction : 'OpenSource'
              })
              .then(response => {
                  console.log ("POST DONE!");
              })
              .catch(e => {
                alert("Incorrect Credentials!");
                console.log (e);
              });
        
            console.log("method complete..");
        },
        clear() {
            this.UserResponse.GitHubUserName = "";
            this.UserResponse.GitHubPassword = "";
            this.UserResponse.GitHubFolderName = "";
            this.UserResponse.GitHubConsent = false;
        }
    }
});