<template>
    <v-card
            flat
            width="50%">
        <v-card-title>Заявки</v-card-title>
        <v-data-table
                show-expand
                :single-expand="true"
                :expanded.sync="expanded"
                v-bind:key="req"
                :items="req"
                v-for="req in requests"
                :headers="headers"
        >
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-card-title>Клиент</v-card-title>
                    <v-card-text>
                        Логин: {{item.login}}<br>
                        Имя: {{item.name}}<br>
                    Телефон: {{item.phone}}<br>
                    email: {{item.email}}</v-card-text>
                </td>
            </template>
            <template v-slot:item.status="props">
                <v-edit-dialog
                        :return-value.sync="props.item.status"
                        persistent
                        large
                        :save-text="'Изменить'"
                        :cancel-text="'Отменить'"
                        @save="save(props.item)"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                > {{ props.item.status }}
                    <template v-slot:input>
                        <v-combobox
                                v-model="props.item.status"
                                :items="statuses"
                                label="Статус заявки">
                        </v-combobox>
                    </template>
                </v-edit-dialog>
            </template>
        </v-data-table>
        <v-snackbar
                v-model="snack"
                :timeout="timeout"
        >
            {{ snackText }}
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
        name: "requestsAll",
        data() {
            return {
                statuses: ['На рассмотрении', 'Выполняется', 'Завершена'],
                snack: false,
                snackText: '',
                timeout: 2000,
                expanded: [],
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
        methods: {
            save (req) {
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'POST',
                    url: 'http://localhost/api/changeRequestStatus/',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data:{
                       token : token,
                        id: req.id,
                        status: req.status
                    }
                }).then((response) => {
                    console.log(response)
                    this.snack = true
                    this.snackText = 'Статус заявки изменен'
                })
                    .catch((error) => (console.log(error)));
            },
            cancel () {
                this.snack = true
                this.snackText = 'Изменения не сохранены'
            },
            open () {
            },
            close () {
                console.log('Dialog closed')
            },
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'GET',
                url: 'http://localhost/api/requestsAll/',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
            }).then((response) => {
                this.requests = response.data
                console.log(response)
            })
                .catch((error) => (console.log(error)));
        }
    }
</script>

<style scoped>

</style>