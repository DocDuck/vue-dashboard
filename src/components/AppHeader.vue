<template>
    <div class="header">
        <el-menu router :default-active="pageName" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="services" route="/services">Срез по сервисам</el-menu-item>
            <el-menu-item index="partners" route="/partners">Срез по партнерам</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'appHeader',
    components: {
    },
    computed: {
        ...mapState(['currentPage']),
        pageName () {
            return this.$route.params.routerState
        }
    },
    data () {
        return {
            activeIndex: '1'
        };
    }
}
</script>

<style scoped lang="styl">

</style>

