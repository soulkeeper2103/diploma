<template>
  <v-app>
      <v-card>
      <v-app-bar
              prominent
              dark
              src="./assets/arch.jpeg">
          <v-toolbar-title>Архив Альда</v-toolbar-title>
          <template v-slot:img="{ props }">
              <v-img
                      v-bind="props"
                      gradient="to top right, rgba(199,165,104,.5), rgba(235,215,174,.8)"
              ></v-img>
          </template>
      </v-app-bar>
      </v-card>
      <tabs></tabs>
      <v-footer>2020</v-footer>
  </v-app>
</template>

<script>

import Tabs from "./components/Tabs";
export default {
  name: 'App',
    components: {Tabs},
    data () {
    return {
    }

    //
  }
};
</script>
