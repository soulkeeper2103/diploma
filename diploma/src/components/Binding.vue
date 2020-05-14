<template>
    <v-card flat width="70%" class="mx-auto">
        <v-card-title>
            Переплетные работы
        </v-card-title>
        <v-card-text>
            Сформированные в результате архивной обработки дела подлежат переплету.
            <br><br>
            Наши специалисты выполнят эти работы в полном соответствии с требованиями Государственного Архива РФ. В результате Вы получите дела, с которыми легко работать:
            они имеют наклейку с информацией на корешке, обложке.
            Они занимают гораздо меньше места, чем дела, хранящиеся в папках.
            Документы из переплетенного дела легко копировать, ведь дело разворачивается на 180 градусов. Кроме того, переплет обеспечит сохранность документации при использовании.
            <br><br>
            <b>Переплетные работы, выполняемые, нашими специалистами включают:</b>
            <v-list>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Составной стандартный переплет документов или дел формата А4 в жесткую картонную обложку с тканевой оклейкой корешка.</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Составной переплет нестандартных документов или дел в жесткую картонную обложку с тканевой оклейкой корешка.</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Составной переплет в жесткую обложку с оклейкой сторон папки в ледерин, ремонтом и наращиванием листов до 30% от общего объема листажа в деле.</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Составной переплет в жесткую обложку с оклейкой сторон папки в ледерин, ремонтом и наращиванием листов свыше 50% от общего объема листажа в деле.</v-list-item>
            </v-list>
            В соответствии с требованиями архивного законодательства, наши специалисты могут выполнить переплет любой сложности стандартной и нестандартной документации следующими методами:
            <v-list>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Брошюровка методом шнуровки</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Ручной переплет</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Переплет дел в жесткую картонную обложку с тканевым корешком</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Переплет дел с оклейкой сторон папки в ледерин</v-list-item>
            </v-list>
            Так же мы рады предложить Вам индивидуальный переплет диссертаций, удостоверений, годовых отчетов и других важных для Вас документов. Мы предлагаем широкий спектр материалов.
        </v-card-text>
        <v-row>
            <v-col>
                <v-card flat>
                    <v-card-title>Рассчитать стоимость</v-card-title>
                    <v-card-text>
                        <v-text-field
                                v-model="number"
                                min="0"
                                type="number"
                                label="Количество дел"
                        ></v-text-field>
                        <v-row>
                            <v-col>
                                Метод переплетения
                        <v-radio-group v-model="method" :mandatory="false">
                            <v-radio label="Шнуровка (70 рублей за дело)" value="70"></v-radio>
                            <v-radio label="Ручной переплет (100 рублей за дело)" value="100"></v-radio>
                            <v-radio label="Жесткая картонная обложка (110 рублей за дело)" value="110"></v-radio>
                            <v-radio label="Оклейка сторон папки в ледерин (150 рублей за дело)" value="150"></v-radio>
                        </v-radio-group>
                            </v-col>
                            <v-col>
                                Формат листов
                                <v-radio-group v-model="format" :mandatory="false">
                                    <v-radio label="A4" value="1"></v-radio>
                                    <v-radio label="A3" value="1.5"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-card-text>
                        <v-card-text class="headline mb-1">{{result}}</v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <send-unauthorized-request class="mx-auto"  type="Переплет"></send-unauthorized-request>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import SendUnauthorizedRequest from "./sendUnauthorizedRequest";
    export default {
        name: "Binding",
        components: {SendUnauthorizedRequest},
        data(){
            return{
                number: '',
                method: '70',
                result: '',
                format: '1.5'
            }
        },
        watch:{
            number:function () {
                this.result = "ИТОГО: " + this.number * this.method * this.format + " руб.";
            },
            method:function () {
                this.result = "ИТОГО: " + this.number * this.method * this.format + " руб.";
            },
            format:function () {
                this.result = "ИТОГО: " + this.number * this.method * this.format + " руб.";
            }

        }
    }
</script>
