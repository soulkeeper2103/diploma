<template>
    <v-app>
        <v-card flat>
            <v-toolbar
                    extended
                    dark
                    src="./assets/arch.jpeg"
                    flat
            >
                <v-toolbar-title>Система Архива Кнопка</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn light @click="unlog" v-if="$root.showData">ВЫХОД</v-btn>
                <template v-slot:img="{ props }">
                    <v-img
                            v-bind="props"
                            gradient="to top right, rgba(199,165,104,.5), rgba(235,215,174,.8)"
                    ></v-img>
                </template>
            <template v-slot:extension>
            <v-tabs
                    v-if="$root.type=='Клиент'"
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
                <v-tabs
                        v-if="$root.type=='Администратор'"
                        v-model="tab"
                        fixed-tabs
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
            </template>
            </v-toolbar>
        </v-card>
        <Auth v-if="!this.$cookies.isKey('userToken')" class="py-12 mx-auto"/>
        <v-content v-else>
            <v-tabs-items v-model="tab" v-if="$root.type=='Клиент'">
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
            <v-tabs-items v-model="tab" v-if="$root.type=='Администратор'">
                <v-tab-item>
                    <Register class="mx-auto"></Register>
                </v-tab-item>
                <v-tab-item>
                    <requestsAll class="mx-auto"></requestsAll>
                </v-tab-item>
                <v-tab-item>
                    <messages class="mx-auto"></messages>
                </v-tab-item>
                <v-tab-item>
                    <change-request-status class="mx-auto"></change-request-status>
                </v-tab-item>
                <v-tab-item>
                    <change-data class="mx-auto"></change-data>
                </v-tab-item>
            </v-tabs-items>
        </v-content>
        <v-spacer></v-spacer>
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
        components: { Auth, ChangeData, Messages, ChangeRequestStatus, RequestsAll, Register, SendFeedbacks, Requests, Documents, SendRequest, GetRequestStatus},
        data(){
            return{
                tab: null,
            }
        },
        methods:{
            unlog()
            {
                this.$cookies.remove('userToken')
                this.$root.type=''
                this.$root.login=''
                this.$root.showData=false
            }
        },
        beforeMount()
        {
            if(this.$cookies.isKey('userToken')){
                let token = this.$cookies.get('userToken')
                axios({
                    method: 'GET',
                    url: 'api/user',
                    headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Token' : token},
                    data: {
                    },
                }).then((response) => {
                    console.log(response)
                    this.$root.type = response.data[0].type;
                    this.$root.login = response.data[0].login;
                    this.$root.showData = true;
                })
                    .catch((error) => (console.log(error)));
            }

        },
    }
</script>
