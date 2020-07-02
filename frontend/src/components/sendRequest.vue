<template>
    <v-card
            flat
    >
        <v-card-text>
            <v-card-title>Отправить заявку</v-card-title>
            Комментарий к заявке
            <v-text-field
                    v-model="text">
            </v-text-field>
            <v-select
                    v-model="type"
                    :items="items"
                    label="Тип заявки"
            ></v-select>
        </v-card-text>
        <v-card-actions>
            <v-card-text>Нажимая кнопку отправить, вы подтверждаете свое <a target="_blank" :href=this.urlAgreement>согласие на обработку персональных данных</a> и <a target="_blank" :href=this.urlLicense>соглашаетесь с лицензионным соглашением</a></v-card-text>
            <v-btn
                    :elevation=0
                    :disabled="isButtonDisabled ||  isButtonDisabled1"
                    @click="sendRequest">Отправить
            </v-btn>
        </v-card-actions>
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
        name: "sendRequest",
        data() {
            return {
                items: ['Архивная обработка', 'Дезинфекция', 'Переплет', 'Электронный архив', 'Хранение', 'Уничтожение', 'Сканирование'],
                text: '',
                type: '',
                snackbar: false,
                textSnack: '',
                timeout: 2000,
                isButtonDisabled: true,
                canSend: false,
                isButtonDisabled1: true,
                canSend1: false,
                urlLicense: this.$root.url + "api/License",
                urlAgreement: this.$root.url + "api/agreement",
            }
        },
        methods:
            {
                sendRequest() {
                    let token = this.$cookies.get('userToken')
                    axios({
                        method: 'POST',
                        url: this.$root.url + 'api/sendRequest',
                        headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                        data: {
                            token: token,
                            text: this.text,
                            type: this.type
                        },
                    }).then(() => {
                        this.textSnack = 'Заявка успешно отправлена'
                        this.snackbar = true
                    })
                        .catch((error) => (console.log(error)));
                }
            },
        watch: {
            type: function () {
                this.canSend = this.type.length >= 2;
                this.isButtonDisabled = !this.canSend;
            },
            text: function () {
                this.canSend1 = this.text.length >= 2;
                this.isButtonDisabled1 = !this.canSend1;
            },
        }
    }
</script>