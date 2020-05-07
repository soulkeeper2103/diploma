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
            <v-btn :disabled="isButtonDisabled ||  isButtonDisabled1"
                    @click="sendRequest">Отправить</v-btn>
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
                isButtonDisabled: true,
                canSend: false,
                isButtonDisabled1: true,
                canSend1: false,
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
                         text: this.text,
                         type: this.type
                     },
                 }).then((response) => (console.log(response)))
                     .catch((error) => (console.log(error)));
             }
            },
        watch:{
            type: function () {
                this.canSend = this.type.length >= 2;
                this.isButtonDisabled = !this.canSend;
            },
            text: function () {
                this.canSend1 = this.text.length >= 2;
                this.isButtonDisabled1 = !this.canSend1;
            },
        }
    }
</script>