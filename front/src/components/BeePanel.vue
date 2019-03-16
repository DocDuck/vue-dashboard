<template>
    <div id="panel">
        <p>Table</p>
        <bee-tabs></bee-tabs>
        <el-table>
            :data="this.finData"

        </el-table>
    </div>
</template>

<script>
// helpers
import {mapState} from 'vuex'

// Компонты
import BeeTabs from '@/components/BeeTabs.vue'

export default {
    components: {
        BeeTabs
    },
    data () {
        return {

        }
    },
    methods: {

    },
    computed: {
        ...mapState(['finData']),
        finData () {
            return this.store.finData
        }

    },
}
</script>

<style>

</style>
