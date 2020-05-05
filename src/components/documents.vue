<template>
    <v-card>
        <v-card-title>Ваши документы</v-card-title>
    <v-data-table
            v-bind:key="doc"
            :items="doc"
            v-for="doc in documents"
            :headers="headers"
    >
    </v-data-table>
    </v-card>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "documents",
        data() {
            return {
                documents: '',
                headers: [
                    {
                        text: 'Номер заявки',
                        value: 'id',
                    },
                    {
                        text: 'Название',
                        value: 'name',
                    },
                ],
            }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: 'http://localhost:8000/documents',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                this.documents = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
        }
    }
</script>

<style scoped>

</style>