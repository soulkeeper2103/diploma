<template  v-slot:extension>
    <v-tabs
            dark
            background-color="rgba(235,215,174,.8)"
            centered
            fixed-tabs
            slider-color="white"
    >
        <v-tab>
            Главная
        </v-tab>
        <v-tab-item>
            <Main></Main>
        </v-tab-item>
        <v-tab>
            Архивная обработка
        </v-tab>
        <v-tab-item>
            <ArchiveProcessing></ArchiveProcessing>
        </v-tab-item>
        <v-tab>
            Переплет
        </v-tab>
        <v-tab-item>
            <Binding></Binding>
        </v-tab-item>
        <v-tab>
            Уничтожение
        </v-tab>
        <v-tab-item>
            <Destruct></Destruct>
        </v-tab-item>
        <v-tab>
            Хранение
        </v-tab>
        <v-tab-item>
            <Storage></Storage>
        </v-tab-item>
        <v-tab>
            Электронный архив
        </v-tab>
        <v-tab-item>
            <ElectronicArchive></ElectronicArchive>
        </v-tab-item>
        <v-tab>
            Контакты
        </v-tab>
        <v-tab-item ><Contacts></Contacts></v-tab-item>

    </v-tabs>
</template>

<script>
    import Contacts from "./Contacts";
    import ArchiveProcessing from "./ArchiveProcessing";
    import Binding from "./Binding";
    import Destruct from "./Destruct";
    import Storage from "./Storage";
    import Main from "./Main";
    import ElectronicArchive from "./ElectronicArchive";

    export default {
        name: "Tabs",
        components: {
            ElectronicArchive,
            Main,
            Storage,
            Destruct,
            Binding,
            ArchiveProcessing,
            Contacts

        },
    }
</script>
