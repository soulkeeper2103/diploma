<template>
    <v-card>
        <requests></requests>
        <documents></documents>
        <messages></messages>
        <get-request-status></get-request-status>
        <send-request></send-request>
        <send-feedbacks></send-feedbacks>
    </v-card>
</template>

<script>
    import GetRequestStatus from "./getRequestStatus";
    import SendRequest from "./sendRequest";
    import Documents from "./documents";
    import Requests from "./requests";
    import Messages from "./messages";
    import SendFeedbacks from "./sendFeedbacks";
    export default {
        name: "ClientInterface",
        components: {SendFeedbacks, Messages, Requests, Documents, SendRequest, GetRequestStatus},
    }
</script>
