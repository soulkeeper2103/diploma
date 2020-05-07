<template>
    <v-card>
        <requests></requests>
        <documents></documents>
        <messages></messages>
        <change-data></change-data>
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
    import ChangeData from "./changeData";
    export default {
        name: "ClientInterface",
        components: {ChangeData, SendFeedbacks, Messages, Requests, Documents, SendRequest, GetRequestStatus},
    }
</script>
