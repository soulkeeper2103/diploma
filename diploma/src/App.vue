<template>
    <v-app>
        <v-content>
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
                    <v-img src="./assets/logo.png" max-width="200" @click="open('http://localhost')"></v-img>
                        </v-col>
                        <v-spacer></v-spacer>
                    <v-col :cols="6">
                        <v-row justify="end">
                            <v-btn text @click="open('/lk')" :elevation="0">
                                <v-icon> mdi-account</v-icon>
                                Личный кабинет
                            </v-btn>
                        </v-row>
                        <v-row justify="end">
                            <v-dialog
                                    width="50%"
                                    v-model="dialogS"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            text
                                            :elevation="0"
                                            v-on="on"
                                    >
                                        <v-icon>mdi-email-send-outline</v-icon>
                                        Оставить заявку
                                    </v-btn>
                                </template>
                                <send-unauthorized-request class="mx-auto"></send-unauthorized-request>
                            </v-dialog>
                        </v-row>
                        <v-row justify="end">
                            <v-dialog
                                    width="50%"
                                    v-model="dialogR"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            text
                                            :elevation="0"
                                            v-on="on"
                                    >
                                        <v-icon> mdi-clipboard-check-outline</v-icon>
                                        Проверить заявку
                                    </v-btn>
                                </template>
                                <get-request-status width="50%" class="mx-auto"></get-request-status>
                            </v-dialog>
                        </v-row>
                    </v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                    <template v-slot:extension>
                        <v-tabs
                                center-active
                                v-model="tab"
                                show-arrows
                                grow

                        >
                            <v-tab>
                                О нас
                            </v-tab>
                            <v-tab>
                                Архивная обработка
                            </v-tab>
                            <v-tab>
                                Переплет
                            </v-tab>
                            <v-tab>
                                Уничтожение
                            </v-tab>
                            <v-tab>
                                Электронный архив
                            </v-tab>
                            <v-tab>
                                Хранение
                            </v-tab>
                            <v-tab>
                                Отзывы
                            </v-tab>
                            <v-tab>
                                Контакты
                            </v-tab>
                        </v-tabs>
                    </template>
                </v-app-bar>

            </v-card>
            <v-card flat>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <Main></Main>
                    </v-tab-item>
                    <v-tab-item>
                        <ArchiveProcessing></ArchiveProcessing>
                    </v-tab-item>
                    <v-tab-item>
                        <Binding></Binding>
                    </v-tab-item>
                    <v-tab-item>
                        <Destruct></Destruct>
                    </v-tab-item>
                    <v-tab-item>
                        <ElectronicArchive></ElectronicArchive>
                    </v-tab-item>
                    <v-tab-item>
                        <Storage></Storage>
                    </v-tab-item>
                    <v-tab-item>
                        <feedbacks></feedbacks>
                    </v-tab-item>
                    <v-tab-item
                            :value="contacts">
                        <Contacts></Contacts>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-content>

    </v-app>
</template>

<script>
    import ArchiveProcessing from "./components/ArchiveProcessing";
    import Binding from "./components/Binding";
    import Destruct from "./components/Destruct";
    import ElectronicArchive from "./components/ElectronicArchive";
    import Main from "./components/Main";
    import Storage from "./components/Storage";
    import Contacts from "./components/Contacts";
    import SendUnauthorizedRequest from "./components/sendUnauthorizedRequest";
    import getRequestStatus from "./components/getRequestStatus";
    import Feedbacks from "./components/feedbacks";

    export default {
        name: 'App',
        components: {
            Feedbacks,
            SendUnauthorizedRequest,
            Storage, Main, ElectronicArchive, Destruct, Binding, ArchiveProcessing, Contacts, getRequestStatus
        },
        data() {
            return {
                dialogS: false,
                dialogR: false,
                tab: 'contacts',
            }
        },
        methods: {
            open(url) {
                document.location.href = url;
            }
        }
    };
</script>
