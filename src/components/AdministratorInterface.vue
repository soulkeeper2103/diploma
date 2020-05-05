<template>
    <v-card>
    <Register></Register>
    <requestsAll></requestsAll>
        <messages></messages>
        <change-request-status></change-request-status>
    </v-card>
</template>

<script>
    import Register from "./Register";
    import RequestsAll from "./requestsAll";
    import ChangeRequestStatus from "./changeRequestStatus";
    import Messages from "./messages";
    export default {
        name: "AdministratorInterface",
        components: {Messages, ChangeRequestStatus, RequestsAll, Register}
    }
</script>
