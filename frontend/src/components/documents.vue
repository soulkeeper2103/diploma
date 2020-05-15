<template>
    <v-card
            flat
            width="70%">
        <v-card-title>Ваши документы</v-card-title>
        <v-text-field
                v-model="search"
                label="Поиск"
                single-line
                hide-details
        ></v-text-field>
    <v-data-table
            v-model="selected"
            show-select
            v-bind:key="doc"
            :items="doc"
            v-for="doc in documents"
            :headers="headers"
            :search="search"
    >
    </v-data-table>
        <v-card-actions><v-btn @click="orderDocuments" :disabled="isButtonDisabled">Заказать документы на email</v-btn></v-card-actions>
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
        name: "documents",
        data() {
            return {
                search: '',
                snackbar: false,
                textSnack: '',
                timeout: 2000,
                isButtonDisabled: true,
                canSend: false,
                selected: [],
                documents: '',
                headers: [
                    {
                        text: 'Номер документа',
                        value: 'id',
                    },
                    {
                        text: 'Название',
                        value: 'name',
                    },
                ],
            }
        },
        methods:{
            orderDocuments(){
                this.isButtonDisabled=true
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'POST',
                    url: 'api/orderDocuments',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data:{
                        token:  token,
                        docs: this.selected,
                    }
                }).then(() => {
                    this.textSnack='Документы высланы на почту';
                    this.snackbar=true
                    this.dialog=false;
                    this.selected=[]

                })
                    .catch((error) => (console.log(error)));
            }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: 'api/documents',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                this.documents = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            setInterval(() => {
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'GET',
                    url: 'api/documents',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
                }).then((response) => {
                    let a=0, b=0
                    for(let i in this.documents[0]) a=i
                    for(let i in response.data[0]) b=i
                    if(a==b) return;
                    else{
                        for(let i = b; i>a; i--) this.documents[0].unshift(response.data[0][i])
                    }
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));
            }, 1000)

        },
        watch: {
               selected: function(){
                   this.canSend = this.selected.length >= 1;
                   this.isButtonDisabled = !this.canSend;
               }
            }
    }
</script>

<style scoped>

</style>