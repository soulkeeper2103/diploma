<template>
  <v-app>
    <v-card>
      <v-toolbar
              color=#FFCC66
              flat
      >
        <v-toolbar-title>Page title</v-toolbar-title>
        <template v-slot:extension>
          <v-tabs
                  centered
                  fixed-tabs
                  slider-color="black"
          >
            <v-tab>
              Item
            </v-tab>
            <v-tab-item>
              <v-app>
                hfhfhfh
              </v-app>
            </v-tab-item>
            <v-tab>
              Item
            </v-tab>
            <v-tab-item>1wd</v-tab-item>
            <v-tab>
              Item
            </v-tab>
            <v-tab-item>1wd</v-tab-item>
            <v-tab>
              Item
            </v-tab>
            <v-tab-item>1wd</v-tab-item>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-card>
    <v-footer absolute>2020</v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {

  },

  data () {
    return {
    }

    //
  }
};
</script>
