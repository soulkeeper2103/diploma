<template>
        <v-card flat width="70%" class="mx-auto">
                <v-row>
                    <v-col>
            <v-sheet>
            <v-card-title>Контакты</v-card-title>
                    <v-list>
                        <v-list-item><v-icon>{{'mdi-map-marker'}}</v-icon>Санкт Петербург, ул. Курчатова, д.14.</v-list-item>
                        <v-list-item><v-icon>{{'mdi-phone'}}</v-icon>(812) 292-94-94</v-list-item>
                            <v-list-item><v-icon>{{'mdi-phone'}}</v-icon> 971-06-03</v-list-item>
                        <v-list-item><v-icon>{{'mdi-fax'}}</v-icon>(812) 292-94-82</v-list-item>
                        <v-list-item><v-icon>{{'mdi-email'}}</v-icon>info@aldaarhiv.ru</v-list-item>
                    </v-list>
            </v-sheet>
                    </v-col>
                        <v-col>

            <v-sheet style="alignment: center">
                <v-card-title>Мы на карте</v-card-title>
                <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Санкт‑Петербург</a><a href="https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_kurchatova_14/Z0kYdQFlSEAHQFhqfXxxeX9jZg==/?ll=30.366306%2C60.007443&utm_medium=mapframe&utm_source=maps&z=15" style="color:#eee;font-size:12px;position:absolute;top:14px;">Улица Курчатова, 14 — Яндекс.Карты</a><iframe src="https://yandex.ru/map-widget/v1/-/CKqL5Yp4" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
            </v-sheet>
                    </v-col>
                </v-row>
        </v-card>
</template>

<script>
    export default {
        name: "About"
    }
</script>
