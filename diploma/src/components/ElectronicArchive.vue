<template>
    <v-card flat min-width="360" width="50%" class="mx-auto">
            <v-card-title>
                Электронный архив
            </v-card-title>
            <v-card-text>
                Документы на бумажной основе имеют ограниченный срок хранения. Электронный архив не имеет этого недостатка, он может храниться бесконечно долго без ущерба для составляющих его документов. Кроме того, любой документ теперь найдется за считаные секунды. Итак, мы предлагаем:
                </v-card-text>
                <v-card flat>
                    <v-card-title>Рассчитать стоимость</v-card-title>
                    <v-card-text>
                        <v-text-field
                                v-model="number"
                                min="0"
                                type="number"
                                label="Количество хранимых документов в электронном архиве"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-text class="headline mb-1">{{result}}</v-card-text>
                </v-card>
                <send-unauthorized-request class="mx-auto"  type="Электронный архив"></send-unauthorized-request>
        </v-card>
</template>

<script>
    import SendUnauthorizedRequest from "./sendUnauthorizedRequest";
    export default {
        name: "ElectronicArchive",
        components: {SendUnauthorizedRequest},
        data(){return{
            number: '',
            result: ''
        }},
        watch:{
            number:function () {
                this.result = "ИТОГО: " + (this.number * 36)/12 + " руб. в месяц";
            }}
    }
</script>
