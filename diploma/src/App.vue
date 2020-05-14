<template>
  <v-app>
      <v-content>
      <v-card flat>
      <v-app-bar
              flat
              extended
              dark
              src="./assets/arch.jpeg">
          <v-toolbar-title>Архив Кнопка</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog
                  width="50%"
                  v-model="dialogS"
          >
              <template v-slot:activator="{ on }">
                  <v-btn
                          v-on="on"
                          light
                  >
                      Оставить заявку
                  </v-btn>
              </template>
              <send-unauthorized-request class="mx-auto"></send-unauthorized-request>
          </v-dialog>
          <v-dialog
                  width="50%"
                  v-model="dialogR"
          >
              <template v-slot:activator="{ on }">
                  <v-btn
                          v-on="on"
                          light
                  >
                      Проверить статус заявки
                  </v-btn>
              </template>
              <get-request-status width="50%" class="mx-auto"></get-request-status>
          </v-dialog>
          <v-btn light @click="open" >Личный кабинет</v-btn>
          <template v-slot:img="{ props }">
              <v-img
                      v-bind="props"
                      gradient="to top right, rgba(199,165,104,.5), rgba(235,215,174,.8)"
              ></v-img>
          </template>
          <template v-slot:extension>
          <v-tabs
                  v-model="tab"
                  fixed-tabs
          >
              <v-tab>
                  О нас
              </v-tab>
              <v-tab>
                  Архивная обработка
              </v-tab>
              <v-tab>
                  Переплет
              </v-tab>
              <v-tab>
                  Уничтожение
              </v-tab>
              <v-tab>
                  Электронный архив
              </v-tab>
              <v-tab>
                  Хранение
              </v-tab>
              <v-tab>
                  Отзывы
              </v-tab>
              <v-tab>
                  Контакты
              </v-tab>
          </v-tabs>
    </template>
      </v-app-bar>

      </v-card>
      <v-card flat>
      <v-tabs-items v-model="tab">
          <v-tab-item>
              <Main></Main>
          </v-tab-item>
          <v-tab-item>
              <ArchiveProcessing></ArchiveProcessing>
          </v-tab-item>
          <v-tab-item>
              <Binding></Binding>
          </v-tab-item>
          <v-tab-item>
              <Destruct></Destruct>
          </v-tab-item>
          <v-tab-item>
              <ElectronicArchive></ElectronicArchive>
          </v-tab-item>
          <v-tab-item>
              <Storage></Storage>
          </v-tab-item>
          <v-tab-item>
              <feedbacks></feedbacks>
          </v-tab-item>
          <v-tab-item>
              <Contacts></Contacts>
          </v-tab-item>
      </v-tabs-items>
      </v-card>
      </v-content>
      <v-footer>2020</v-footer>
  </v-app>
</template>

<script>
import ArchiveProcessing from "./components/ArchiveProcessing";
import Binding from "./components/Binding";
import Destruct from "./components/Destruct";
import ElectronicArchive from "./components/ElectronicArchive";
import Main from "./components/Main";
import Storage from "./components/Storage";
import Contacts from "./components/Contacts";
import SendUnauthorizedRequest from "./components/sendUnauthorizedRequest";
import getRequestStatus from "./components/getRequestStatus";
import Feedbacks from "./components/feedbacks";
export default {
  name: 'App',
    components: {
        Feedbacks,
        SendUnauthorizedRequest,
        Storage, Main, ElectronicArchive, Destruct, Binding, ArchiveProcessing, Contacts, getRequestStatus},
    data () {
    return {
        dialogS: false,
        dialogR: false,
        tab: null,
    }
  },
    methods:{
      open()
      {
          window.open('/lk')
      }
    }
};
</script>
