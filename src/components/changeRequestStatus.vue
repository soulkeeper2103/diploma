<template>
    <v-card  flat
             width="70%">
        <v-card-title>Изменить статус заявки</v-card-title>
        <v-card-text>
    <v-combobox
            v-model="select"
            :items="items"
            label="Номер заявки"
    ></v-combobox>
            <v-combobox
                    v-model="status"
                    :items="statuses"
                    label="Статус заявки">
            </v-combobox>
        </v-card-text>
        <v-btn :disabled="isButtonDisabled ||  isButtonDisabled1"
                @click="changeRequestStatus">Изменить</v-btn>
    </v-card>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "changeRequestStatus",
        data () {
            return {
                isButtonDisabled: true,
                canSend: false,
                isButtonDisabled1: true,
                canSend1: false,
                select: [],
                items: [],
                status: [],
                statuses: ['На рассмотрении', 'Выполняется', 'Завершена'],
            }
        },
        methods:{
            changeRequestStatus()
            {
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'POST',
                    url: 'api/changeRequestStatus/',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data:{
                        token : token,
                        id: this.select,
                        status: this.status
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
                url: 'api/requestsAll/',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                let result = []
                for(let id in response.data[0]) {var v = response.data[0][id]; result.push(v.id);}
                this.items = result
                console.log(response)
            })
                .catch((error) => (console.log(error)));
            setInterval(() => {
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'GET',
                    url: 'api/requestsAll/',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
                }).then((response) => {
                    let result = []
                    for(let id in response.data[0]) {var v = response.data[0][id]; result.push(v.id);}
                    this.items = result
                    console.log(response)
                })
                    .catch((error) => (console.log(error)));
            }, 30000)

    },
        watch: {
            select: function () {
                this.canSend1 = this.select.length !='';
                this.isButtonDisabled1 = !this.canSend1;
            },
            status: function () {
                this.canSend = this.status.length >= 2;
                this.isButtonDisabled = !this.canSend;
            }
        }
    }
</script>

<style scoped>

</style>