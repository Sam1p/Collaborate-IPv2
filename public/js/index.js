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
                GitHubFolderName: 'Collaborate1234',
                GitHubConsent: false
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

            axios
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
                .catch(err => console.log(err));

            /*this.axiosPostBody += this.GitHubFolderName;
            // Need to get JSONIFY.. get it to JSON.
            console.log(this.axiosPostBody);
            console.log (JSON.stringify(this.axiosPostBody));
            axios
              .post(`https://api.github.com/user/repos`, {
                body: this.axiosPostBody
              })
              .then(response => {})
              .catch(e => {
                this.errors.push(e);
              });*/

            console.log("done post...");
        },
        clear() {
            this.UserResponse.GitHubUserName = "";
            this.UserResponse.GitHubPassword = "";
            this.UserResponse.GitHubFolderName = "";
            this.UserResponse.GitHubConsent = false;
        }
    }
});