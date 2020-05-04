<template>
        <v-card flat
                width="33%">
            <v-card-text
                    class="headline
                            text-center"
                    v-text="'Вход в систему Архива Кнопка'"
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
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
            />
            <v-card-actions>
                <v-btn
                        @click="auth">Вход</v-btn></v-card-actions>
        </v-card>
</template>

<script>
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    Vue.use(VueCookies)
    const axios = require('axios');
    export default {
        name: "Auth",
        data()
        {
            return{
                show: false,
                rules: {
                    required: value => !!value || 'Обязательно для заполнения',
                },
                login: '',
                password: '',
            }
        },
        methods: {
            auth()
            {
                axios({
                    method: 'POST',
                    url: 'http://localhost:8000/auth',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data: {
                        login: this.login,
                        password: this.password,
                    },
                }).then((response) => {
                    if(response.status==200) {
                        console.log(response)
                        this.$root.type = response.data[0].type;
                        this.$root.login = response.data[0].login;
                        this.$root.showData = true;
                        this.$cookies.set("userToken", response.data[1], "30D")
                    }
                })
                    .catch((error) => (console.log(error)));
            }
            }
        }
</script>
