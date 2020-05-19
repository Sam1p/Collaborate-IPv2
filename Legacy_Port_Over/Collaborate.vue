<template>
  <v-container>
    <v-content>
      <v-card dark color="blue">
        <v-card-title>The Problem with IP Collaboration</v-card-title>
        <v-card-text>
          Joint ownership under Canadian copyright laws does not exist. You want to collaborate on a joint-development project to tackle COVID-19 and other social projects for social good, but who owns what you both create? We propose a simple approach:
          <ul>
            <li>We'll ask you a few simple questions</li>
            <li>We'll automatically generates Collaboration Agreement that clearly sets out who owns what (no more disputes!)</li>
            <li>We'll provide you with a simple framework for how you can collaobrate</li>
            <li>We'll even automatically Set Up GitHUB Account, designed for collaboration and aligned with our agreements.t</li>
          </ul>
          <p></p>
          <p>
            <span style="font-weight: bold; text-decoration: underline">That's it!</span>
          </p>
        </v-card-text>
      </v-card>
      <!-- GITHUB will contain 
        - License File
        - a README.MD mark-down
        - Folder for Background IP of Party A
        - Folder for Background IP of Party B
        - Folder for Forground IP
        - Copy of Template Agreements
      -->
      <p></p>

      <v-card dark color="orange">
        <v-card-title>Step 1: Simple Questions</v-card-title>
        <!-- reminder: you can't use {{ }} within attributes 
          But Vue.js actually supports the full power of JavaScript expressions inside all data bindings:
          see: https://vuejs.org/v2/guide/syntax.html#Using-JavaScript-Expressions
        -->
        <v-switch
          v-model="UserResponse.OpenSource"
          :label="'Open Source Project: '  + UserResponse.OpenSource.toString()"
        ></v-switch>
        <v-switch
          v-model="UserResponse.BackgroundIP"
          :label="'Each Party Bringing Background IP: ' + UserResponse.BackgroundIP.toString()"
        ></v-switch>
      </v-card>

      <p></p>

      <v-card dark color="pink">
        <v-card-title>Step 2: The Agreements</v-card-title>
        <v-card-text>Download these agreements and use them.</v-card-text>
        <v-container>
          <v-btn color="info">Download Collaboration Agreement</v-btn>
        </v-container>
        <v-container>
          <v-btn color="info">Download Open Source License</v-btn>
        </v-container>
      </v-card>

      <p></p>

      <v-card dark color="green">
        <v-card-title>Step 3: Automatically Set Up GitHub</v-card-title>
        <form>
          <v-text-field
            v-model="UserResponse.GitHubUserName"
            :error-messages="nameErrors"
            :counter="10"
            label="GitHub User Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="UserResponse.GitHubPassword"
            :error-messages="emailErrors"
            label="GitHub Password"
            required
          ></v-text-field>
          <v-text-field
            v-model="UserResponse.GitHubFolderName"
            :error-messages="emailErrors"
            label="GitHub Folder Name"
            required
          ></v-text-field>
          <v-checkbox
            v-model="UserResponse.GitHubConsent"
            :error-messages="checkboxErrors"
            label="Do you agree to let us set up your GitHub?"
            required
          ></v-checkbox>

          <v-btn class="mr-4" @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Collaborate",
  data: () => ({
    UserResponse: {
      OpenSource: true,
      BackgroundIP: true,
      GitHubUserName: "foo",
      GitHubPassword: "bar",
      GitHubFolderName: "Collaborate1234",
      GitHubConsent: false
    },
    axiosPostBody: {
      name: ""
    }
  }),
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
        .get("https://httpbin.org/basic-auth/foo/bar ", {
          auth: {
            username: 'foo',
            password: 'bar'
          }
        })
        .then(res => {
          console.log ("res.data: " + JSON.stringify(res.data));
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
      //this.$v.$reset();
      this.UserResponse.GitHubUserName = "";
      this.UserResponse.GitHubPassword = "";
      this.UserResponse.GitHubFolderName = "";
      this.UserResponse.GitHubConsent = false;
    }
  }
};
</script>
