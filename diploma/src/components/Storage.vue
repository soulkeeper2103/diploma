<template>
    <v-card flat min-width="360" width="50%" class="mx-auto">
        <v-card-title>
            Внеофисное хранение документов
        </v-card-title>
        <v-card-text>
            Различные нормативные акты и корпоративные процедуры предписывают необходимость долгосрочного хранения множества бумажных документов в архиве, например, договоров и финансовых бумаг. Раньше компании инвестировали средства в дорогое офисное пространство для их хранения, не говоря об инфраструктуре и обучении персонала для подготовки документов к архивному хранению и поддержания в них порядка. «Архив АльдА» предлагает компаниям современное альтернативное решение, которое позволяет уменьшить расходы и повысить эффективность – это организация архивного хранения документов.
            <br><br>
            Внеофисное хранение документов – это современный ивысокотехнологичный способ организации архива. Документация передается в профессиональное хранилище, обеспечивающее компактность и безопасность её сохранности.
            <br><br>
            Стоимость внеофисного хранения документов в ООО «Архив КНОПКА» - от 23 руб.
            <br><br>
            <b>Особенности хранения Ваших документов в «Архив Кнопка»</b>

            <v-list>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Архивные дела находятся в обезличенных коробах</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Мы принимаем документы любого формата</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>У нас используются современные системы учета</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Отдел логистики «Архив Кнопка» обеспечит оперативную доставку ваших документов</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>Доступ к документам будет предоставлен строго ограниченному числу ваших специалистов и сотрудников «Архив АльдА»</v-list-item>
                <v-list-item><v-icon>{{'mdi-chevron-right'}}</v-icon>В хранилище реализованы современные системы безопасности</v-list-item>
            </v-list>
            Если вы не знаете какое количество архивных коробов потребуется для хранения ваших документов, вызовите нашего специалиста для точного расчета.
        </v-card-text>
                <v-card flat>
                    <v-card-title>Рассчитать стоимость</v-card-title>
                    <v-card-text>
                        <v-text-field
                                v-model="number"
                                min="0"
                                type="number"
                                label="Количество хранимых коробов"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-text class="headline mb-1">{{result}}</v-card-text>
                </v-card>
                <send-unauthorized-request class="mx-auto"  type="Хранение"></send-unauthorized-request>
        </v-card>
</template>

<script>
    import SendUnauthorizedRequest from "./sendUnauthorizedRequest";
    export default {
        name: "Storage",
        components: {SendUnauthorizedRequest},
        data(){return{
            number: '',
            result: ''
        }},
        watch:{
            number:function () {
                if(this.number>=1000) {
                    let k=23;
                    this.result = "ИТОГО: " + (this.number * 12 * k) / 12 + " руб. в месяц";
                }
                else{
                    let k=30;
                    this.result = "ИТОГО: " + (this.number * 12 * k) / 12 + " руб. в месяц";
                }
            }}
    }
</script>
