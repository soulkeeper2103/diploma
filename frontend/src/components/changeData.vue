<template>
    <v-card flat>
        <v-card-title>Личные данные<v-spacer></v-spacer></v-card-title>
        <v-text-field
                :rules="[rules.required, rules.lengthP, rules.loginlat]"
                v-model="login"
                label="Логин"
                outlined
                maxlength="24"
                placeholder="Логин"
        ></v-text-field>
        <v-text-field
                :rules="[rules.required]"
                v-model="name"
                label="Имя"
                maxlength="90"
                placeholder="Имя"
                outlined
        ></v-text-field>
        <v-text-field
                :rules="[rules.required, rules.phone]"
                v-model="phone"
                label="Телефон"
                outlined
                placeholder="+7##########"
                maxlength="12"
        ></v-text-field>
        <v-text-field
                :rules="[rules.required, rules.email]"
                v-model="email"
                label="Почта"
                maxlength="30"
                placeholder="Электронная почта"
                outlined
        ></v-text-field>
        <v-text-field
                :rules="[rules.required, rules.lengthP]"
                v-model="oldPassword"
                label="Старый пароль"
                outlined
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
        ></v-text-field>
            <v-btn :disabled="isButtonDisabled ||  isButtonDisabled1 ||  isButtonDisabled2 ||  isButtonDisabled3 ||  isButtonDisabled4"
                   :elevation=0
                   @click="changeData">Сохранить изменения</v-btn>
        <v-spacer></v-spacer>
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on }">
                <v-btn
                        :elevation=0
                        v-on="on"
                >
                    Сменить пароль
                </v-btn>
            </template>

            <v-card class="pa-5 mx-auto">
                <v-card-title
                        primary-title
                >
                    Смена пароля
                </v-card-title>
                <v-text-field
                        :rules="[rules.required, rules.lengthP]"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        v-model="oldPasswordForNew"
                        label="Старый пароль"
                        outlined
                ></v-text-field>
                <v-text-field
                        :rules="[rules.required, rules.lengthP]"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        @click:append="show2 = !show2"
                        v-model="password"
                        label="Новый пароль"
                        outlined
                ></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            :elevation=0
                            :disabled="isButtonDisabled5 ||  isButtonDisabled6"
                            @click="changePassword"
                    >
                        Отправить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
        name: "changeData",
        data(){
            return{
                show: false,
                show1: false,
                show2: false,
                dialog: false,
                snackbar: false,
                textSnack: '',
                timeout: 2000,
                isChange: false,
                login: '',
                name: '',
                phone: '+7',
                email: '',
                password: '',
                oldPassword: '',
                oldPasswordForNew: '',
                isButtonDisabled: true,
                canSend: false,
                isButtonDisabled1: true,
                canSend1: false,
                isButtonDisabled2: true,
                canSend2: false,
                isButtonDisabled3: true,
                canSend3: false,
                isButtonDisabled4: true,
                canSend4: false,
                isButtonDisabled5: true,
                canSend5: false,
                isButtonDisabled6: true,
                canSend6: false,
                rules: {
                    required: value => !!value || 'Обязательно для заполнения',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@А-я"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Неверный e-mail'

                    },
                    phone: value => {
                        const pattern=/^([+])([7])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])?$/
                        return pattern.test(value) || 'Неверный номер телефона'
                    },
                    lengthP: value => value.length>=12 || 'Минимум 12 символов',
                    loginlat: value => {
                        const pattern = /[A-z0-9_]/
                        return pattern.test(value) || 'В логине присутствуют запрещенные символы'
                    }
                },
            }
        },
        methods:{
            changePassword(){
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'POST',
                    url: this.$root.url +'api/changePassword',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data: {
                        token: token,
                        newPassword: this.password,
                        oldPassword: this.oldPasswordForNew
                    },
                }).then((response) => {
                    if(response.data[0].res==1){
                        this.textSnack='Неверный пароль! Изменения не сохранены'
                        this.snackbar=true}
                    else{
                        this.textSnack='Пароль изменен'
                        this.snackbar=true}
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));
                this.dialog = false;
            },
            changeData(){
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'POST',
                    url: this.$root.url +'api/changeData',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data: {
                        token: token,
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        login: this.login,
                        password: this.oldPassword
                    },
                }).then((response) => {
                    if(response.data[0].res==0){
                        this.$cookies.set("userToken", response.data[1], "30D")
                        this.textSnack='Изменения успешно сохранены'
                        this.snackbar=true}
                    if(response.data[0].res==1){
                        this.textSnack='Неверный пароль! Изменения не сохранены'
                        this.snackbar=true}
                    if(response.data[0].res==2){
                        this.textSnack='Телефон, email или логин уже есть в системе! Изменения не сохранены'
                        this.snackbar=true}
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));
            }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: this.$root.url +'api/user',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
                data: {
                },
            }).then((response) => {
                console.log(response)
                this.name=response.data[0].name
                this.login=response.data[0].login
                this.phone=response.data[0].phone
                this.email=response.data[0].email
            })
                .catch((error) => (console.log(error)));
        },
        watch: {
            name: function() {
                this.canSend = this.name.length >= 2;
                this.isButtonDisabled = !this.canSend;
            },
            email: function () {
                const pattern = /^(([^<>()[\]\\.,;:\s@А-я"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                this.canSend1 = pattern.test(this.email)
                this.isButtonDisabled1 = !this.canSend1;
            },
            phone: function () {
                const pattern=/^([+])([7])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])?$/
                this.canSend2 = pattern.test(this.phone)
                this.isButtonDisabled2 = !this.canSend2;
            },
            oldPassword: function() {
                this.canSend3 = this.oldPassword.length >= 12;
                this.isButtonDisabled3 = !this.canSend3;
            },
            login: function() {
                const pattern = /[A-z0-9_]/
                this.canSend4 = pattern.test(this.login)
                this.isButtonDisabled4 = !this.canSend4;
            },
            oldPasswordForNew: function() {
                this.canSend5 = this.oldPasswordForNew.length >= 12;
                this.isButtonDisabled5 = !this.canSend5;
            },
            password: function() {
                this.canSend6 = this.password.length >= 12;
                this.isButtonDisabled6 = !this.canSend6;
            },
            dialog: function () {
                this.password=''
                this.oldPasswordForNew=''
            }
        }
    }
</script>
