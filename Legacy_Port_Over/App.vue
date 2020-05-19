<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="http://tips.slaw.ca/wp-content/uploads/2013/03/collaboration-300x225.jpg"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>COVID-19: Let's Collaborate!</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab>The Problem: Jointly Developed IP</v-tab>
            <v-tab>About</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="800">
          <v-container style="height: 250px;">
              test1
          </v-container>
          <v-container>
              <v-content>
                <Collaborate />
              </v-content>
          </v-container>
      </v-sheet> 
    </v-card>

    <!--  <v-content>
      <HelloWorld />
    </v-content>-->
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import Collaborate from "./components/Collaborate";

export default {
  name: "App",

  components: {
    // HelloWorld,
    Collaborate
  },

  data: () => ({
    //
  })
};
</script>
