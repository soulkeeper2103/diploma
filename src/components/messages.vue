<template>
    <v-card>
        <v-card-title>Сообщения <v-spacer></v-spacer>
            <v-dialog
                    v-model="dialog"
                    width="500"
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                            v-on="on"
                    >
                        Написать Сообщение
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title
                            primary-title
                    >
                        Новое сообщение
                    </v-card-title>
                    <v-card-text>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-combobox
                            v-model="select"
                            :items="items"
                            label="Пользователь"
                    ></v-combobox>
                    <v-textarea v-model="messageText"></v-textarea>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                @click="sendMessage"
                        >
                            Отправить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog></v-card-title>
        <v-data-table
                v-bind:key="mes"
                :items="mes"
                v-for="mes in messages"
                :headers="headers"></v-data-table>
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
                messageText: '',
                select: [],
                items: [],
                dialog: false,
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
        methods:{
          sendMessage(){
              let token = this.$cookies.get('userToken')
              axios({
                  method: 'POST',
                  url: 'http://localhost:8000/sendMessage',
                  headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                  data: {
                      token: token,
                      text: this.messageText,
                      logindst: this.select
                  },
              }).then((response) => (console.log(response)))
                  .catch((error) => (console.log(error)));
              this.dialog=false;
              this.messageText = '';
              this.select = [];
          }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: 'http://localhost:8000/SendMessages',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
            }).then((response) => {
                this.messages = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            axios({
                method: 'GET',
                url: 'http://localhost:8000/ReceivedMessages',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
            }).then((response) => {
                this.messagesR = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            axios({
                method: 'GET',
                url: 'http://localhost:8000/Users',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                let result = []
                for(let id in response.data[0]) {var v = response.data[0][id]; result.push(v.login);}
                this.items = result
                console.log(response)
            })
                .catch((error) => (console.log(error)));
        },
    }
</script>
