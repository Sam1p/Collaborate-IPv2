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
            radioGroup: 1,
            GitHubInstruction: 'Proprietary',
            UserResponse: {
                OpenSource: true,
                BackgroundIP: true,
                GitHubUserName: 'Sam1p',
                GitHubPassword: 'bar',
                GitHubFolderName: 'Tempx',
                GitHubConsent: false
            }
        }
    },
    methods: {
        submit() {
            console.log("Submit Button Clicked.");
            console.log(this.UserResponse.OpenSource);
            console.log(this.GitHubInstruction);
            if (this.UserResponse.OpenSource == true) {
                console.log ("Open Source True");
                this.GitHubInstruction = 'OpenSource';
            } else {
                console.log("Open SOurce False");
                this.GitHubInstruction = 'Proprietary';         
            }

            console.log(this.GitHubInstruction);
            console.log ("About to send to localhost/api/post");
            console.log (JSON.stringify(this.PostBody));
            axios
              .post(`/api/PostGitHub`, {
                    GitHubUserName : this.UserResponse.GitHubUserName,
                    GitHubPassword : this.UserResponse.GitHubPassword,
                    GitHubFolderName : this.UserResponse.GitHubFolderName,
                    GitHubInstruction : this.GitHubInstruction
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