<template>
    <v-card>
        <v-data-table
                v-bind:key="req"
                :items="req"
                v-for="req in requests"
                :headers="headers"
        >
        </v-data-table>
    </v-card>
</template>

<script>
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    Vue.use(VueCookies)
    const axios = require('axios');
    export default {
        name: "ClientInterface",
        data() {
            return {
                requests: '',
                headers: [
                    {
                        text: 'Номер заявки',
                        value: 'id',
                    },
                    {
                        text: 'Название',
                        value: 'text',
                    },
                    {text: 'Тип', value: 'type'},
                    {text: 'Статус', value: 'status'},
                    {text: 'Дата и Время', value: 'timeStamp'},
                ],
            }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: 'http://localhost:8000/requests/0',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                this.requests = response.data
            })
                .catch((error) => (console.log(error)));
        }
    }
</script>
