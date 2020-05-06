<template>
    <v-card>
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
            <v-btn @click="sendRequest">Отправить</v-btn>
        </v-card-actions>
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
                    url: 'http://localhost:8000/sendUnauthorizedRequest',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data: {
                        text: this.text,
                        type: this.type,
                        name: this.name,
                        phone: this.phone,
                        email: this.email
                    },
                }).then((response) => (console.log(response)))
                    .catch((error) => (console.log(error)));
            }
        },
        data() {
            return {
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
                phone: '',
                email: '',
                text: '',
                type: '',
            }
        },
    }
</script>
