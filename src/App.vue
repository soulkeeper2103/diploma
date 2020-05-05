<template>
    <v-app>
        <appbar></appbar>
        <Auth v-if="!this.$root.showData"/>
        <v-content v-else>
            <AdministratorInterface v-if="this.$root.type=='Администратор'"></AdministratorInterface>
            <ClientInterface v-else-if="this.$root.type=='Клиент'"></ClientInterface>
        </v-content>
        <v-spacer></v-spacer>
    </v-app>
</template>

<script>
    import Auth from "./components/Auth";
    import AdministratorInterface from "./components/AdministratorInterface";
    import ClientInterface from "./components/ClientInterface";
    import Appbar from "./components/appbar";
    export default {
        name: "App",
        components: {Appbar, ClientInterface, AdministratorInterface, Auth},
        data(){
            return{}
        },
        beforeMount()
        {

        }
    }
</script>
