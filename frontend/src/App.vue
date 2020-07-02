<template>
    <v-app>
        <v-card flat>
            <v-app-bar
                    src="./assets/arch.jpeg"
                    flat
                    prominent
                    dark
                    color="#c7a568">
                <template v-slot:img="{ props }">
                    <v-img
                            v-bind="props"
                            gradient="to top right, rgba(245,195,125,.8), rgba(201,119,64,.8)"
                    ></v-img>
                </template>
                <v-spacer></v-spacer>
                <v-row align="center" justify="start">
                    <v-col :cols="6">
                        <v-img src="./assets/logo.png" max-width="200" @click="open('..')"></v-img>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col :cols="6">
                        <v-row justify="end">
                            <v-btn text :elevation="0" @click="unlog" v-if="$root.showData">
                                <v-icon>mdi-exit-run</v-icon>
                                Выход
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
                <v-spacer></v-spacer>
            </v-app-bar>
        </v-card>
        <Auth v-if="!this.$cookies.isKey('userToken')" class="py-12 mx-auto"/>
        <v-content v-else>
            <v-card flat class="mx-auto"
                    min-width="360"
                    max-width="50%">
                <v-row>
                    <v-col>
                        <v-tabs
                                color="#c7a568"
                                vertical
                                v-if="$root.type=='Клиент'"
                                v-model="tab"
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
                        <v-tabs
                                color="#c7a568"
                                vertical
                                v-if="$root.type=='Администратор'"
                                v-model="tab"
                        >
                            <v-tab>
                                Регистрация
                            </v-tab>
                            <v-tab>
                                Заявки
                            </v-tab>
                            <v-tab>
                                Сообщения
                            </v-tab>
                            <v-tab>
                                Изменить статус заявки
                            </v-tab>
                            <v-tab>
                                Личные данные
                            </v-tab>
                        </v-tabs>
                    </v-col>
                    <v-col>
                        <v-tabs-items v-model="tab" v-if="$root.type=='Клиент'">
                            <v-tab-item>
                                <requests></requests>
                            </v-tab-item>
                            <v-tab-item>
                                <messages></messages>
                            </v-tab-item>
                            <v-tab-item>
                                <documents></documents>
                            </v-tab-item>
                            <v-tab-item>
                                <get-request-status></get-request-status>
                            </v-tab-item>
                            <v-tab-item>
                                <send-request></send-request>
                            </v-tab-item>
                            <v-tab-item>
                                <send-feedbacks></send-feedbacks>
                            </v-tab-item>
                            <v-tab-item>
                                <change-data></change-data>
                            </v-tab-item>
                        </v-tabs-items>
                        <v-tabs-items v-model="tab" v-if="$root.type=='Администратор'">
                            <v-tab-item>
                                <Register></Register>
                            </v-tab-item>
                            <v-tab-item>
                                <requestsAll></requestsAll>
                            </v-tab-item>
                            <v-tab-item>
                                <messages></messages>
                            </v-tab-item>
                            <v-tab-item>
                                <change-request-status></change-request-status>
                            </v-tab-item>
                            <v-tab-item>
                                <change-data></change-data>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-row>
            </v-card>
        </v-content>
        <v-spacer></v-spacer>
        <v-footer>2020</v-footer>
    </v-app>
</template>

<script>
    import ChangeData from "./components/changeData";

    const axios = require('axios');
    import Auth from "./components/Auth";
    import Messages from "./components/messages";
    import ChangeRequestStatus from "./components/changeRequestStatus";
    import RequestsAll from "./components/requestsAll";
    import Register from "./components/Register";
    import SendFeedbacks from "./components/sendFeedbacks";
    import Requests from "./components/requests";
    import Documents from "./components/documents";
    import SendRequest from "./components/sendRequest";
    import GetRequestStatus from "./components/getRequestStatus";

    export default {
        name: "App",
        components: {
            Auth,
            ChangeData,
            Messages,
            ChangeRequestStatus,
            RequestsAll,
            Register,
            SendFeedbacks,
            Requests,
            Documents,
            SendRequest,
            GetRequestStatus
        },
        data() {
            return {
                tab: null,
            }
        },
        methods: {
            unlog() {
                this.$cookies.remove('userToken')
                this.$root.type = ''
                this.$root.login = ''
                this.$root.showData = false
                document.location.href = "../lk";
            },
            open(url) {
                document.location.href = url;
            }
        },
        beforeMount() {
            if (this.$cookies.isKey('userToken')) {
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'GET',
                    url: this.$root.url + 'api/user',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token': token},
                    data: {},
                }).then((response) => {
                    console.log(response)
                    this.$root.type = response.data[0].type;
                    this.$root.login = response.data[0].login;
                    this.$root.showData = true;
                })
                    .catch(() => {
                        this.$cookies.remove('userToken')
                        this.$root.type = ''
                        this.$root.login = ''
                        this.$root.showData = false
                    });
            }

        },
    }
</script>
