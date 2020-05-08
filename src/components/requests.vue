<template>
    <v-card
            flat
            width="50%">
        <v-card-title>Ваши заявки</v-card-title>
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
    const axios = require('axios');
    export default {
        name: "requests",
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
                    url: 'http://localhost/api/requests/',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
                }).then((response) => {
                    this.requests = response.data
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));

        },
    }
</script>
