<template>
    <v-card
            flat
            width="70%">
        <v-card-title>Оставить отзыв</v-card-title>
        <v-textarea v-model="text" label="Отзыв" placeholder="Напишите отзыв здесь"></v-textarea>
        <v-card-text>
            Оценка
            <v-btn text @click="rating=1"><v-icon v-if="rating>=1">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon></v-btn>
            <v-btn text @click="rating=2"><v-icon v-if="rating>=2">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon></v-btn>
            <v-btn text @click="rating=3"><v-icon v-if="rating>=3">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon></v-btn>
            <v-btn text @click="rating=4"><v-icon v-if="rating>=4">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon></v-btn>
            <v-btn text @click="rating=5"><v-icon v-if="rating>=5">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon></v-btn>

        </v-card-text>
        <v-card-actions><v-btn :elevation=0 @click="sendFeedback">Отправить</v-btn></v-card-actions>
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
        name: "sendFeedbacks",
        data() {
            return{
                rating: 1,
                text: '',
                snackbar: false,
                textSnack: '',
                timeout: 2000

            }
        },
        methods:{
            sendFeedback(){
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'POST',
                    url: 'api/sendFeedback',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data: {
                        token: token,
                        text: this.text,
                        rating: this.rating
                    },
                }).then((response) => {
                    this.textSnack=response
                    this.textSnack='Отзыв успешно отправлен'
                    this.snackbar=true;})
                    .catch((error) => (console.log(error)));
            }
        },
        beforeMount() {
            let token = this.$cookies.get('userToken')
            axios({
                method: 'POST',
                url: 'api/getFeedbackByLogin',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                data: {
                    token: token,
                },
            }).then((response) => {
                this.text=response.data[0].feedbackText
                this.rating=response.data[0].rating
            })
                .catch((error) => (console.log(error)));
        }
    }
</script>
