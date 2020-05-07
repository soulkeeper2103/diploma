<template>
    <v-app>
        <v-card flat>
            <v-toolbar
                    flat
            >
                <v-toolbar-title>Система Архива Кнопка</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="unlog" v-if="this.$root.showData">ВЫХОД</v-btn>
            </v-toolbar>
        </v-card>
        <Auth v-if="!this.$root.showData" class="py-12 mx-auto"/>
        <v-content v-else>
            <AdministratorInterface v-if="this.$root.type=='Администратор'"></AdministratorInterface>
            <ClientInterface v-else-if="this.$root.type=='Клиент'" ></ClientInterface>
        </v-content>
        <v-spacer></v-spacer>
    </v-app>
</template>

<script>
    import Auth from "./components/Auth";
    import AdministratorInterface from "./components/AdministratorInterface";
    import ClientInterface from "./components/ClientInterface";
    export default {
        name: "App",
        components: { ClientInterface, AdministratorInterface, Auth},
        data(){
            return{
            }
        },
        methods:{
            unlog()
            {
                this.$root.type=''
                this.$root.login=''
                this.$root.showData=false
            }
        },
        beforeMount()
        {
        },
    }
</script>
