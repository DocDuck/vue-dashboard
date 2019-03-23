<template>
    <el-table class="table"
              border
              :data="tableData">
        <el-table-column
                class="cell"
                label="№"
                type="index"
                min-width="40">

        </el-table-column>
        <el-table-column
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
    props: ['tableData'],
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
        // возвращает массив с уникальными датами финансовых событий, отсортированный по возрастанию и приведенный к виду dd.mm.yyyy
        unicFinDates () {
            let finEventDates = {}
            let formatDates = []
            this.tableData.forEach(row => {
                row.finEvents.forEach(finEvent => {
                    finEventDates[finEvent.date] = 1
                })
            })
            let sortedDates = Object.keys(finEventDates).sort(function(a, b){
                let dateA = Date.parse(a), dateB = Date.parse(b)
                return dateA - dateB //сортировка по возрастающей дате
            })
            sortedDates.forEach( (date) => {formatDates.push( this.formatDate(date) )})
            return formatDates
        }
    }

}
</script>

<style scoped>

</style>