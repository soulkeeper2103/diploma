<template>
    <v-card>
        <v-data-table
                v-bind:key="req"
                :items="req"
                v-for="req in requests"
                :headers="headers"
        >
        </v-data-table>
        <get-request-status></get-request-status>
        <send-request></send-request>
    </v-card>
</template>

<script>
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    import GetRequestStatus from "./getRequestStatus";
    import SendRequest from "./sendRequest";
    Vue.use(VueCookies)
    const axios = require('axios');
    export default {
        name: "ClientInterface",
        components: {SendRequest, GetRequestStatus},
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
                url: 'http://localhost:8000/requests/'+this.$root.login,
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                this.requests = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
        }
    }
</script>
