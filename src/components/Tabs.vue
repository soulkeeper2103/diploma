<template  v-slot:extension>
    <v-tabs
            dark
            background-color="rgba(235,215,174,.8)"
            centered
            fixed-tabs
            slider-color="white"
    >
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
            О нас
        </v-tab>
        <v-tab-item ><about></about></v-tab-item>

    </v-tabs>
</template>

<script>
    import About from "./About";
    import ArchiveProcessing from "./ArchiveProcessing";
    import Binding from "./Binding";
    import Destruct from "./Destruct";
    export default {
        name: "Tabs",
        components: {
            Destruct,
            Binding,
            ArchiveProcessing,
            About

        },
    }
</script>
