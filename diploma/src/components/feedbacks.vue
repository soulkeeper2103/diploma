<template>
    <v-card flat width="70%" class="mx-auto">
    <v-col
            v-for="(feed, i) in feedbacks"
            :key="i">
        <v-card-title>Отзыв</v-card-title>
        <v-card-text>
            Пользователь: {{feed.login}}
            Оценка:
            <v-icon v-if="feed.rating>=1">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon>
            <v-icon v-if="feed.rating>=2">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon>
            <v-icon v-if="feed.rating>=3">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon>
            <v-icon v-if="feed.rating>=4">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon>
            <v-icon v-if="feed.rating>=5">{{'mdi-star'}}</v-icon><v-icon v-else>{{'mdi-star-outline'}}</v-icon>
            Дата: {{feed.date}}
            <v-spacer></v-spacer>
            {{feed.feedbackText}}
        </v-card-text>
        <v-divider></v-divider>
    </v-col>
    </v-card>
</template>

<script>
    const axios = require('axios')
    export default {
        name: "feedbacks",
        data(){
          return{
              feedbacks: [],
          }
        },
        beforeMount() {
            axios({
                method: 'GET',
                url: 'lk/api/feedbacks/',
                headers: {'Content-Type': 'application/json', 'Accept': '*/*', },
            }).then((response) => {
                this.feedbacks = response.data[0]
                console.log(response)
            })
                .catch((error) => (console.log(error)));
        }
    }
</script>
