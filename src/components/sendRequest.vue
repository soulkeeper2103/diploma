<template>
    <v-card>
        <v-card-text>
            <v-card-title>Отправить заявку</v-card-title>
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
            <v-btn @click="sendRequest">Проверить статус</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    Vue.use(VueCookies)
    const axios = require('axios');
    export default {
        name: "sendRequest",
        data(){
            return{
                items: ['archiveProcessing', 'disinfection', 'binding', 'electricArchive', 'save', 'destroy', 'scan'],
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