<template>
    <v-card flat>
        <v-toolbar
                flat
        >
            <v-toolbar-title>Система Архива Кнопка</v-toolbar-title>
            <v-spacer></v-spacer>
        <v-btn @click="unlog" v-if="this.$root.showData">ВЫХОД</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    export default {
        name: "appbar",
        methods:{
            unlog()
            {
                this.$root.type=''
                this.$root.login=''
                this.$root.showData=false
            }
        },
    }
</script>
