<template>
    <v-card
            flat
            width="50%">
        <v-card-title>Ваши документы</v-card-title>
    <v-data-table
            v-model="selected"
            show-select
            v-bind:key="doc"
            :items="doc"
            v-for="doc in documents"
            :headers="headers"
    >
    </v-data-table>
        <v-card-actions><v-btn @click="orderDocuments" :disabled="isButtonDisabled">Заказать документы на email</v-btn></v-card-actions>
    </v-card>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "documents",
        data() {
            return {
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
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'POST',
                    url: 'http://localhost/api/orderDocuments',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data:{
                        token:  token,
                        docs: this.selected,
                    }
                }).then((response) => {
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));
            }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: 'http://localhost/api/documents',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                this.documents = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
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