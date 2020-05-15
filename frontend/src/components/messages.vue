<template>
    <v-card
            flat
            width="70%">
        <v-card-title>Сообщения <v-spacer></v-spacer>
            <v-dialog
                    v-model="dialog"
                    width="500"
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                            :elevation=0
                            v-on="on"
                    >
                        Написать Сообщение
                    </v-btn>
                </template>

                <v-card class="pa-5 mx-auto">
                    <v-card-title
                            primary-title
                    >
                        Новое сообщение
                    </v-card-title>
                    <v-card-text>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-select
                            v-model="select"
                            :items="items"
                            label="Получатель"
                    ></v-select>
                    <v-textarea v-model="messageText"></v-textarea>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                :disabled="isButtonDisabled ||  isButtonDisabled1"
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
        <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
        >
            {{ textSnack }}
            <v-btn
                    color="blue"
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "messages",
        data() {
            return {
                snackbar: false,
                textSnack: '',
                timeout: 2000,
                isButtonDisabled: true,
                canSend: false,
                isButtonDisabled1: true,
                canSend1: false,
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
                  url: 'api/sendMessage',
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
              this.textSnack='Сообщение отправлено'
              this.snackbar=true;
          }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: 'api/SendMessages',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
            }).then((response) => {
                this.messages = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            axios({
                method: 'GET',
                url: 'api/ReceivedMessages',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
            }).then((response) => {
                this.messagesR = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            axios({
                method: 'GET',
                url: 'api/Users',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                let result = []
                for(let id in response.data[0]) {var v = response.data[0][id]; result.push(v.login);}
                this.items = result
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            setInterval(() => {
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'GET',
                    url: 'api/SendMessages',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
                }).then((response) => {
                    let a=0, b=0
                    for(let i in this.messages[0]) a=i
                    for(let i in response.data[0]) b=i
                    if(a==b) return;
                    else{
                        for(let i = 0; i<b-a; i++) this.messages[0].unshift(response.data[0][i])
                    }
                })
                    .catch((error) => (console.log(error)));
                axios({
                    method: 'GET',
                    url: 'api/ReceivedMessages',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
                }).then((response) => {
                    let a, b
                    for(let i in this.messagesR[0]) a=i
                    for(let i in response.data[0]) b=i
                    if(a==b) return;
                    else{
                        for(let i = 0; i<b-a; i++) this.messagesR[0].unshift(response.data[0][i])
                    }
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));
                axios({
                    method: 'GET',
                    url: 'api/Users',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
                }).then((response) => {
                    let result = []
                    for(let id in response.data[0]) {var v = response.data[0][id]; result.push(v.login);}
                    this.items = result
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));
            }, 1000)
        },
        watch: {
            messageText: function() {
                this.canSend = this.messageText.length >= 2;
                this.isButtonDisabled = !this.canSend;
            },
            select: function () {
                this.canSend1 = this.select.length >= 2;
                this.isButtonDisabled1 = !this.canSend1;
            },
            dialog: function () {
                this.messageText=''
                this.select=''
            }
            }
    }
</script>
