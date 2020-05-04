<template>
      <v-card flat
      width="33%">
          <v-card-text
                  class="headline
                            text-center"
                  v-text="'Регистрация'"
          />
          <v-text-field
                  v-model="login"
                  label="Логин"
                  outlined
                  clearable
                  :rules="[rules.required]"
                  maxlength="24"
                  placeholder="Ваш Логин"
          />
          <v-text-field
                  v-model="password"
                  label="Пароль"
                  outlined
                  clearable
                  :rules="[rules.required]"
                  maxlength="99"
                  placeholder="Ваш пароль"
          />
          <v-text-field
                  v-model="name"
                  label="Имя"
                  outlined
                  clearable
                  :rules="[rules.required]"
                  maxlength="90"
                  placeholder="Ваше имя"
          />
          <v-text-field
                  v-model="email"
                  label="E-Mail"
                  :rules="[rules.required, rules.email]"
                  outlined
                  clearable
                  maxlength="30"
                  placeholder="Ваша электронная почта"
          />
          <v-text-field
                  v-model="phone"
                  label="Телефон"
                  outlined
                  clearable
                  placeholder="+7##########"
                  maxlength="12"
                  :rules="[rules.required, rules.phone]"
          />
          <v-card-text>Тип пользователя</v-card-text>
          <v-radio-group v-model="type" :mandatory="false">
              <v-radio label="Клиент" value="client"></v-radio>
              <v-radio label="Администратор" value="administrator"></v-radio>
          </v-radio-group>
          <v-card-actions>
              <v-btn
              @click="registerNewUser">Зарегистрировать</v-btn></v-card-actions>
      </v-card>
</template>

<script>
    const axios = require('axios');
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    Vue.use(VueCookies)
export default {
    name: 'Register',
    components: {},
    data() {
        return {
            rules: {
                required: value => !!value || 'Обязательно для заполнения',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Неверный e-mail'

                },
                phone: value => {
                   const pattern=/^([+])([7])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])?$/
                    return pattern.test(value) || 'Неверный номер телефона'
                }
            },
            login: '',
            password: '',
            name: '',
            phone: '',
            email: '',
            type: '',

        }
    },
    methods: {
        registerNewUser() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'POST',
                url: 'http://localhost:8000/registerNewUser',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                data: {
                    token: token,
                    login: this.login,
                    password: this.password,
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    type: this.type
                },
            }).then((response) => (console.log(response)))
                .catch((error) => (console.log(error)));
        }
    }
}
</script>
