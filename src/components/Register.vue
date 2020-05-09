<template>
      <v-card
              flat
      width="70%">
          <v-card-text
                  class="headline
                            text-center"
                  v-text="'Регистрация'"
          />
          <v-text-field
                  v-model="name"
                  label="Имя"
                  outlined
                  clearable
                  :rules="[rules.required]"
                  maxlength="90"
                  placeholder="Имя"
          />
          <v-text-field
                  v-model="email"
                  label="E-Mail"
                  :rules="[rules.required, rules.email]"
                  outlined
                  clearable
                  maxlength="30"
                  placeholder="Электронная почта"
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
              <v-radio label="Клиент" value="Клиент"></v-radio>
              <v-radio label="Администратор" value="Администратор"></v-radio>
          </v-radio-group>
          <v-card-actions>
              <v-btn
                      :elevation=0
                      :disabled="isButtonDisabled ||  isButtonDisabled1 ||  isButtonDisabled2 "
              @click="registerNewUser">Зарегистрировать</v-btn></v-card-actions>
          <v-snackbar
                  v-model="snackbar"
                  :timeout="timeout"
          >
              {{ textSnack }}
              <v-btn
                      color="blue"
                      text
                      @click="snackbar = false"
              >
                  Close
              </v-btn>
          </v-snackbar>
      </v-card>
</template>

<script>
    const axios = require('axios');
export default {
    name: 'Register',
    components: {},
    data() {
        return {
            isButtonDisabled: true,
            canSend: false,
            isButtonDisabled1: true,
            canSend1: false,
            isButtonDisabled2: true,
            canSend2: false,
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
            name: '',
            phone: '',
            email: '',
            type: 'Клиент',
            snackbar: false,
            textSnack: '',
            timeout: 2000

        }
    },
    methods: {
        registerNewUser() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'POST',
                url: 'api/registerNewUser',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                data: {
                    token: token,
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    type: this.type
                },
            }).then((response) => {
                if(response.data[0].res==1)
                {
                    this.textSnack='Данный email уже зарегистрирован в системе'
                    this.snackbar=true;
                }
                if(response.data[0].res==2)
                {
                    this.textSnack='Данный телефон уже зарегистрирован в системе'
                    this.snackbar=true;
                }
                if(response.data[0].res==3)
                {
                    this.textSnack='Произошла ошибка регистрации. Пожалуйста, повторите попытку'
                    this.snackbar=true;
                }
            })
                .catch((error) => (console.log(error)));
        }
    },
    watch: {
        name: function() {
            this.canSend = this.name.length >= 2;
            this.isButtonDisabled = !this.canSend;
        },
        email: function () {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            this.canSend2 = pattern.test(this.email)
            this.isButtonDisabled2 = !this.canSend2;
        },
        phone: function () {
            const pattern=/^([+])([7])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])?$/
            this.canSend1 = pattern.test(this.phone)
            this.isButtonDisabled1 = !this.canSend1;
        }
    }
}
</script>
