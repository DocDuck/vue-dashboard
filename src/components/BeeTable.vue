<template>

    <el-table class="table"
              border
              show-summary
              :data="tableData.filter(data => !search || data[variableID].toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
        <el-table-column
                sortable
                :prop="variableID"
                align="center"
                label="ID"
                min-width="100">
        </el-table-column>
        <el-table-column
                sortable
                prop="in_requests"
                align="center"
                label="В запросе"
                min-width="100">
            <!--<template slot-scope="item">-->
                <!--{{ item.row.in_requests }}-->
            <!--</template>-->
        </el-table-column>
        <el-table-column
                sortable
                prop="from_gsm_ip"
                align="center"
                label="из GSM"
                min-width="100">
            <!--<template slot-scope="item">-->
                <!--{{ item.row.from_gsm_ip }}-->
            <!--</template>-->
        </el-table-column>
        <el-table-column
                sortable
                prop="subs_attempt"
                align="center"
                label="Всего попыток"
                min-width="100">
            <!--<template slot-scope="item">-->
                <!--{{ item.row.subs_attempt }}-->
            <!--</template>-->
        </el-table-column>
        <el-table-column
                sortable
                prop="subs_error"
                align="center"
                label="Ошибка"
                min-width="100">
            <!--<template slot-scope="item">-->
                <!--{{ item.row.subs_error }}-->
            <!--</template>-->
        </el-table-column>
        <el-table-column
                sortable
                prop="subs_ok"
                align="center"
                label="Успешно"
                min-width="100">
            <!--<template slot-scope="item">-->
                <!--{{ item.row.subs_ok }}-->
            <!--</template>-->
        </el-table-column>



        <!--Генератор колонок из подмассива-->
        <!--<el-table-column sortable :label="date" :prop="JSON.stringify({date, property:'attending'})" :formatter="cellFormatter" align="center" v-for="date in unicFinDates" :key="date">-->
        <!--</el-table-column>-->

    </el-table>

</template>

<script>
import {formatMoney, formatDate} from '@/helpers/format'

export default {
    name: "BeeTable",
    props: ['tableData', 'search'],
    methods: {
        formatDate,
        formatMoney,
        // фильтрует  массив с событиямя и кладет в ячейку соответствующий ключу (дате)
        // cellFormatter (row, col) {
        //     let key = JSON.parse(col.property)
        //     let d = row.finEvents.find(r => {
        //         let fDate = this.formatDate(r.date)
        //         return fDate === key.date
        //     })
        //     if (d && d[key.property]) {
        //         return Number(d[key.property])
        //     }
        //     return 0
        // }

    },
    computed: {
        variableID () {
            let id = ''
            if (this.tableData[0]) {
                let isService = this.tableData[0].hasOwnProperty("service_id")
                id = isService ? "service_id" : "partner_id"
            }
            return id
        },
        filteredList: function(){
            let inputData = this.inputData;
            return this.phones.filter((elem) => {
                if(inputData==='') return true;
                else return elem.company.indexOf(inputData) > -1;
            })
        }
    }

}
</script>

<style scoped>

</style>