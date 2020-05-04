<template>
    <v-app>
        <Auth v-if="!this.$root.showData"/>
        <v-content v-else>
            <AdministratorInterface v-if="this.$root.type=='administrator'"></AdministratorInterface>
            <ClientInterface v-else></ClientInterface>
        </v-content>
    </v-app>
</template>

<script>
    import Auth from "./components/Auth";
    import AdministratorInterface from "./components/AdministratorInterface";
    import ClientInterface from "./components/ClientInterface";
    export default {
        name: "App",
        components: {ClientInterface, AdministratorInterface, Auth},
        data(){
            return{}
        }
    }
</script>
