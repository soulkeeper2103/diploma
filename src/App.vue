<template>
  <v-app>
      <v-toolbar
              dark
              src="./assets/arch.jpeg"
      >
        <v-toolbar-title>Архив АльдА</v-toolbar-title>
        <template v-slot:img="{ props }">
          <v-img
                  v-bind="props"
                  gradient="to top right, rgba(199,165,104,.5), rgba(235,215,174,.8)"
          ></v-img>
        </template>
      </v-toolbar>
      <v-tabs
              dark
              background-color="rgba(235,215,174,.8)"
              centered
              fixed-tabs
              slider-color="white"
      >
          <v-tab>
              Архивная обработка
          </v-tab>
          <v-tab-item>
            <ArchiveProcessing></ArchiveProcessing>
          </v-tab-item>
          <v-tab>
             Переплет
          </v-tab>
          <v-tab-item>
              <Binding></Binding>
          </v-tab-item>
          <v-tab>
              Уничтожение
          </v-tab>
          <v-tab-item>
              <Destruct></Destruct>
          </v-tab-item>
        <v-tab>
          О нас
        </v-tab>
        <v-tab-item ><about></about></v-tab-item>

      </v-tabs>
    <v-footer>
         © 2020 ЗАО «Архив АльдА»
    </v-footer>

  </v-app>
</template>

<script>
import About from "./components/About";
import ArchiveProcessing from "./components/ArchiveProcessing";
import Binding from "./components/Binding";
import Destruct from "./components/Destruct";
export default {
  name: 'App',

  components: {
      Destruct,
      Binding,
      ArchiveProcessing,
    About

  },

  data () {
    return {
    }

    //
  }
};
</script>
