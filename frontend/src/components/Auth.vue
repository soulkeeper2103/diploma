<template>
        <v-card flat
                width="50%">
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
                        :elevation=0
                        :disabled="isButtonDisabled || isButtonDisabled1"
                        @click="auth">Вход</v-btn>
                <v-spacer></v-spacer>
                <v-dialog
                        :elevation=0
                        v-model="dialog"
                        width="500"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn
                                :elevation=0
                                v-on="on"
                        >
                            Восстановить пароль
                        </v-btn>
                    </template>

                    <v-card class="pa-5 mx-auto" >
                        <v-card-title
                                primary-title
                        >
                            Восстановление пароля
                        </v-card-title>
                        <v-card-text>
                            Введите email, на который был зарегистрирован ваш аккаунт
                        </v-card-text>
                        <v-text-field
                                :rules="[rules.required, rules.email]"
                                v-model="email"></v-text-field>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    :elevation=0
                                    :disabled="isButtonDisabled2"
                                    @click="restore"
                            >
                                Отправить
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card-actions>
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
        name: "Auth",
        data()
        {
            return{
                show: false,
                rules: {
                    required: value => !!value || 'Обязательно для заполнения',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Неверный e-mail'

                    },
                },
                snackbar: false,
                textSnack: '',
                timeout: 2000,
                login: '',
                password: '',
                dialog: false,
                isButtonDisabled: true,
                canSend: false,
                isButtonDisabled1: true,
                canSend1: false,
                isButtonDisabled2: true,
                canSend3: false,
                email: ''
            }
        },
        methods: {
            auth()
            {
                axios({
                    method: 'POST',
                    url: 'api/auth',
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
                    .catch(() => {
                        this.textSnack='Неверный логин или пароль';
                        this.snackbar=true
                    });
            },
            restore()
            {
                axios({
                    method: 'POST',
                    url: 'api/restorePassword',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data: {
                        email: this.email,
                    },
                }).then((response) => {
                    if(response.data[0].res==1)
                    {
                        this.textSnack='Такой email не зарегистрирован';
                        this.snackbar=true
                    }
                    if(response.data[0].res==0)
                    {
                        this.textSnack='Письмо выслано на почту';
                        this.snackbar=true
                        this.dialog=false;
                    }
                })
                    .catch(() => {
                    });
            }
            },
        watch:{
            login: function () {
                this.canSend = this.login.length >= 1;
                this.isButtonDisabled = !this.canSend;
            },
            password: function () {
                this.canSend1 = this.password.length >= 1;
                this.isButtonDisabled1 = !this.canSend1;
            },
            email: function () {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                this.canSend2 = pattern.test(this.email)
                this.isButtonDisabled2 = !this.canSend2;
            }
        }
        }
</script>
