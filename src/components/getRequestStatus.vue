<template>
    <v-card
            flat
            width="50%">
        <v-card-text>
            <v-card-title>Проверить статус заявки</v-card-title>
            <v-text-field
                    type="number"
            v-model="statusId">
            </v-text-field>
            {{status}}
        </v-card-text>
        <v-card-actions>
            <v-btn :disabled="isButtonDisabled "
                    @click="getStatus">Проверить статус</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "getRequestStatus",
        data() {
            return {
                statusId: '',
                status: '',
                isButtonDisabled: true,
                canSend: false,
            }
        },
        methods:
            {
                getStatus()
                {
                    let token = this.$cookies.get('userToken')
                    axios({
                        method: 'GET',
                        url: 'http://localhost/api/requestsStatus/' + this.statusId,
                        headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
                    }).then((response) => {
                        if( response.data == ''){this.status = 'Такой заявки не существует'; }
                        else{this.status = 'СТАТУС:' + response.data[0].status}
                    })
                        .catch((error) => (console.log(error)));
                }
            },
        watch: {
            statusId: function () {
                this.canSend = this.statusId.length != '';
                this.isButtonDisabled = !this.canSend;
            }
        }
    }
</script>

<style scoped>

</style>