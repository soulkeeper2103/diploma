<template>
    <v-card
            flat>
        <v-card-text>
            <v-card-title>Отправить заявку</v-card-title>
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
            <v-select
                    v-model="type"
                    :items="items"
                    label="Тип заявки"
            ></v-select>
            Комментарий к заявке
            <v-text-field
                    v-model="text">
            </v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn
                    :elevation=0
                    :disabled="isButtonDisabled ||  isButtonDisabled1 ||  isButtonDisabled2 || isButtonDisabled3 || isButtonDisabled4"
                    @click="sendRequest">Отправить</v-btn>
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
        name: "sendUnauthorizedRequest",
        methods:{
            sendRequest()
            {
                axios({
                    method: 'POST',
                    url: 'lk/api/sendUnauthorizedRequest',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data: {
                        text: this.text,
                        type: this.type,
                        name: this.name,
                        phone: this.phone,
                        email: this.email
                    },
                }).then((response) => {
                    if(response.data[0].res==2) {this.textSnack='Комбинация телефона и email в системе не найдена! Заявка не отправлена', this.snackbar=true;}
                    if(response.data[0].res==3) {this.textSnack='Телефон уже зарегистрирован в системе! Заявка не отправлена', this.snackbar=true;}
                    if(response.data[0].res==4) {this.textSnack='Email уже зарегистрирован в системе! Заявка не отправлена', this.snackbar=true;}
                    if(response.data[0].res==1) {
                        this.textSnack='Заявка отправлена. Номер вашей заявки выслан на ваш e-mail'
                        this.snackbar=true
                        this.text = ''
                        this.name = ''
                        this.phone = '+7'
                        this.email = ''
                        this.dialog = false
                    }
                    if(response.data[0].res==0) {
                        this.textSnack='Заявка отправлена. Номер вашей заявки и Ваши учетные данные для доступа к личному кабинету высланы на ваш e-mail'
                        this.snackbar=true
                        this.text = ''
                        this.name = ''
                        this.phone = '+7'
                        this.email = ''
                        this.dialog = false
                    }
                })
                    .catch(() => {this.textSnack='Проблема подключения к серверу', this.snackbar=true;});
            }
        },
        props:{
            type: String
        },
        data() {
            return {
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
                items: ['Архивная обработка', 'Дезинфекция', 'Переплет', 'Электронный архив', 'Хранение', 'Уничтожение', 'Сканирование'],
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
                phone: '+7',
                email: '',
                text: '',
                snackbar: false,
                textSnack: '',
                timeout: 2000,
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
            type: function () {
                this.canSend3 = this.type.length >= 2;
                this.isButtonDisabled3 = !this.canSend3;
            },
            text: function () {
                this.canSend4 = this.text.length >= 2;
                this.isButtonDisabled4 = !this.canSend4;
            },
            phone: function () {
                const pattern=/^([+])([7])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])?$/
                this.canSend1 = pattern.test(this.phone)
                this.isButtonDisabled1 = !this.canSend1;
            }
        },
        mounted() {
            if(this.type != '') {
                this.canSend3 = this.type.length >= 2;
                this.isButtonDisabled3 = !this.canSend3;
            }
        }
    }
</script>
