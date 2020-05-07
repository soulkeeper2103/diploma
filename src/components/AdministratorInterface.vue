<template>
    <v-card>
    <Register></Register>
    <requestsAll></requestsAll>
        <messages></messages>
        <change-request-status></change-request-status>
        <change-data></change-data>
    </v-card>
</template>

<script>
    import Register from "./Register";
    import RequestsAll from "./requestsAll";
    import ChangeRequestStatus from "./changeRequestStatus";
    import Messages from "./messages";
    import ChangeData from "./changeData";
    export default {
        name: "AdministratorInterface",
        components: {ChangeData, Messages, ChangeRequestStatus, RequestsAll, Register}
    }
</script>
