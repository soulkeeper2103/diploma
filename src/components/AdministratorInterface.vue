<template>
    <v-card flat>
        <v-tabs
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
        <v-tabs-items v-model="tab">
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
    </v-card>
</template>

<script>
    import Register from "./Register";
    import RequestsAll from "./requestsAll";
    import ChangeRequestStatus from "./changeRequestStatus";
    import Messages from "./messages";
    import ChangeData from "./changeData";
    export default {
        name: "AdministratorInterface",
        components: {ChangeData, Messages, ChangeRequestStatus, RequestsAll, Register},
        data(){
            return{
                tab: null,
            }
        }
    }
</script>
