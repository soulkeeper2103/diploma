import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
  data:{
    showData: false,
    type: '',
    login: '',
    url: '/'
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
