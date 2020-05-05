<template>
    <v-card>
        <requests></requests>
        <documents></documents>
        <messages></messages>
        <get-request-status></get-request-status>
        <send-request></send-request>
    </v-card>
</template>

<script>
    import GetRequestStatus from "./getRequestStatus";
    import SendRequest from "./sendRequest";
    import Documents from "./documents";
    import Requests from "./requests";
    import Messages from "./messages";
    export default {
        name: "ClientInterface",
        components: {Messages, Requests, Documents, SendRequest, GetRequestStatus},
    }
</script>
