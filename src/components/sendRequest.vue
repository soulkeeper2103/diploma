<template>
    <v-card>
        <v-card-text>
            <v-card-title>Отправить заявку</v-card-title>
            Комментарий к заявке
            <v-text-field
            v-model="text">
            </v-text-field>
            <v-select
                    v-model="type"
                    :items="items"
                    label="Тип заявки"
            ></v-select>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="sendRequest">Отправить</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "sendRequest",
        data(){
            return{
                items: ['Архивная обработка', 'Дезинфекция', 'Переплет', 'Электронный архив', 'Хранение', 'Уничтожение', 'Сканирование'],
                text: '',
                type: '',
            }
        },
        methods:
            {
             sendRequest()
             {
                 let token = this.$cookies.get('userToken')
                 axios({
                     method: 'POST',
                     url: 'http://localhost:8000/sendRequest',
                     headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                     data: {
                         token: token,
                         login: this.$root.login,
                         text: this.text,
                         type: this.type
                     },
                 }).then((response) => (console.log(response)))
                     .catch((error) => (console.log(error)));
             }
            }
    }
</script>