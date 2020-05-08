<template>
    <v-card flat>
        <v-tabs
                v-model="tab"
                fixed-tabs
        >
            <v-tab>
                Заявки
            </v-tab>
            <v-tab>
                Сообщения
            </v-tab>
            <v-tab>
                Документы
            </v-tab>
            <v-tab>
                Узнать статус заявки
            </v-tab>
            <v-tab>
                Отправить заявку
            </v-tab>
            <v-tab>
                Отправить отзыв
            </v-tab>
            <v-tab>
                Личные данные
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <requests class="mx-auto"></requests>
            </v-tab-item>
            <v-tab-item>
                <messages class="mx-auto"></messages>
            </v-tab-item>
            <v-tab-item>
                <documents class="mx-auto"></documents>
            </v-tab-item>
            <v-tab-item>
                <get-request-status class="mx-auto"></get-request-status>
            </v-tab-item>
            <v-tab-item>
                <send-request class="mx-auto"></send-request>
            </v-tab-item>
            <v-tab-item>
                <send-feedbacks class="mx-auto"></send-feedbacks>
            </v-tab-item>
            <v-tab-item>
                <change-data class="mx-auto"></change-data>
            </v-tab-item>
        </v-tabs-items>
            </v-card>
</template>

<script>
    import GetRequestStatus from "./getRequestStatus";
    import SendRequest from "./sendRequest";
    import Documents from "./documents";
    import Requests from "./requests";
    import Messages from "./messages";
    import SendFeedbacks from "./sendFeedbacks";
    import ChangeData from "./changeData";
    export default {
        name: "ClientInterface",
        components: {ChangeData, SendFeedbacks, Messages, Requests, Documents, SendRequest, GetRequestStatus},
        data(){
            return{
                tab: null,
            }
        }
    }
</script>
