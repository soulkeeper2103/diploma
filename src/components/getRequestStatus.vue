<template>
    <v-card>
        <v-card-text>
            <v-card-title>Проверить статус заявки</v-card-title>
            <v-text-field
            v-model="statusId">
            </v-text-field>
            {{status}}
        </v-card-text>
        <v-card-actions>
            <v-btn @click="getStatus">Проверить статус</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    Vue.use(VueCookies)
    const axios = require('axios');
    export default {
        name: "getRequestStatus",
        data() {
            return {
                statusId: '',
                status: '',
            }
        },
        methods:
            {
                getStatus()
                {
                    let token = this.$cookies.get('userToken')
                    axios({
                        method: 'GET',
                        url: 'http://localhost:8000/requestsStatus/' + this.statusId,
                        headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
                    }).then((response) => {
                        console.log(response)
                        this.status = 'СТАТУС:' + response.data[0].status;
                    })
                        .catch((error) => (console.log(error)));
                }
            }
    }
</script>

<style scoped>

</style>