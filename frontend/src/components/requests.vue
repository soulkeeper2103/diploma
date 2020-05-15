<template>
    <v-card
            flat
            width="70%">
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
                        text: 'Комментарий',
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
                url: 'api/requests/',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
            }).then((response) => {
                this.requests = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            setInterval(() => {
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'GET',
                    url: 'api/requests/',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
                }).then((response) => {
                    let a=0, b=0
                    for(let i in this.requests[0]) a=i
                    for(let i in response.data[0]) b=i
                    if(a==b) return;
                    else{
                        for(let i = 0; i<b-a; i++) this.requests[0].unshift(response.data[0][i])
                    }
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));
            }, 1000)


        },
    }
</script>
