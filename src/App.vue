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
        <Auth v-if="!this.$cookies.isKey('userToken')" class="py-12 mx-auto"/>
        <v-content v-else>
            <AdministratorInterface v-if="this.$root.type=='Администратор'"></AdministratorInterface>
            <ClientInterface v-else-if="this.$root.type=='Клиент'" ></ClientInterface>
        </v-content>
        <v-spacer></v-spacer>
    </v-app>
</template>

<script>
    const axios = require('axios');
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
                    url: 'http://localhost/api/user',
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
