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
                    {{ item.row.date }}
                </div>
                <!--font-ico-ready font-ico-expire font-ico-outlaw-->
            </template>
        </el-table-column>

        <el-table-column :label="room" :prop="JSON.stringify({room, property:'attending'})" :formatter="cellFormatter" align="center" v-for="room in rooms" :key="room">

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
        cellFormatter (row, col) {
            let key = JSON.parse(col.property)
            let d = row.rooms.find(r => r.name === key.room)
            if (d && d[key.property]) {
                return d[key.property]
            }
            return '0 '
        }

    },
    computed: {
        rooms () {
            let rooms = {}
            this.tableData.forEach(row => {
                row.rooms.forEach(room => {
                    rooms[room.name] = 1
                })
            })
            return Object.keys(rooms)
        }
    }


}
</script>

<style scoped>

</style>