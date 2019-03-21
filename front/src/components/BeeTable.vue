<template>
    <el-table class="table"
              border
              :data="finData">
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
                        {{ item.row.serviceName }}
                    </div>
                    <!--font-ico-ready font-ico-expire font-ico-outlaw-->
            </template>
        </el-table-column>
        <el-table-column
                min-width="120">
            <template slot-scope="item" v-if="item.row.rn === 0">
                <div class="cell_head"></div>
            </template>
            <template v-else>
                <div class="test">test</div>
            </template>
        </el-table-column>

    </el-table>
</template>

<script>
import {formatMoney, formatDate} from '@/helpers/format'

export default {
    name: "BeeTable",
    props: ['finData'],
    methods: {
        formatDate,
        formatMoney
    }
}
</script>

<style scoped>

</style>