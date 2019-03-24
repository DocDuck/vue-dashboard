<template>
    <el-table class="table"
              border
              :data="tableData">
        <el-table-column
                align="center"
                class="cell"
                label="№"
                type="index"
                min-width="40">

        </el-table-column>
        <el-table-column
                align="center"
                label="Сервис"
                min-width="140">
            <template slot-scope="item">
                <div class="cell">
                    {{ item.row.name }}
                </div>
                <!--font-ico-ready font-ico-expire font-ico-outlaw-->
            </template>
        </el-table-column>

        <el-table-column :label="date" :prop="JSON.stringify({date, property:'attending'})" :formatter="cellFormatter" align="center" v-for="date in unicFinDates" :key="date">

        </el-table-column>

    </el-table>
</template>

<script>
import {formatMoney, formatDate} from '@/helpers/format'

export default {
    name: "BeeTable",
    props: ['tableData', 'unicFinDates'],
    methods: {
        formatDate,
        formatMoney,
        // фильтрует  массив с событиямя и кладет в ячейку соответствующий ключу (дате)
        cellFormatter (row, col) {
            let key = JSON.parse(col.property)
            let d = row.finEvents.find(r => {
                let fDate = this.formatDate(r.date)
                return fDate === key.date
            })
            if (d && d[key.property]) {
                return d[key.property]
            }
            return '0 '
        }

    },
    computed: {

    }

}
</script>

<style scoped>

</style>