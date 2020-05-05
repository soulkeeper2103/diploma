<template>
    <v-card>
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
        <v-card-actions><v-btn @click="sendFeedback">Отправить</v-btn></v-card-actions>
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
            }
        },
        methods:{
            sendFeedback(){
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'POST',
                    url: 'http://localhost:8000/sendFeedback',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
                    data: {
                        token: token,
                        text: this.text,
                        rating: this.rating
                    },
                }).then((response) => (console.log(response)))
                    .catch((error) => (console.log(error)));
            }
        },
    }
</script>
