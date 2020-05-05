<template>
    <v-card>
        <v-card-title>Сообщения</v-card-title>
        <v-data-table-header>Отправленные</v-data-table-header>
        <v-data-table
                v-bind:key="mes"
                :items="mes"
                v-for="mes in messages"
                :headers="headers"></v-data-table>
        <v-data-table-header>Полученные</v-data-table-header>
        <v-data-table
                v-bind:key="mesR"
                :items="mesR"
                v-for="mesR in messagesR"
                :headers="headersR"></v-data-table>
    </v-card>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "messages",
        data() {
            return {
                messages: '',
                messagesR: '',
                headers: [
                    {
                        text: 'Получатель',
                        value: 'login',
                    },
                    {
                        text: 'Дата',
                        value: 'timeStamp',
                    },
                    {text: 'Сообщение', value: 'messageText'},
                ],
                headersR: [
                    {
                        text: 'Отправитель',
                        value: 'login',
                    },
                    {
                        text: 'Дата',
                        value: 'timeStamp',
                    },
                    {text: 'Сообщение', value: 'messageText'},
                ],
            }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: 'http://localhost:8000/SendMessages/' + this.$root.login,
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
            }).then((response) => {
                this.messages = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            axios({
                method: 'GET',
                url: 'http://localhost:8000/ReceivedMessages/' + this.$root.login,
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
            }).then((response) => {
                this.messagesR = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
        },
    }
</script>
