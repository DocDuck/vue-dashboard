<template>
    <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" route="/dashboard">Home</el-menu-item>
        <el-menu-item index="2" route="/another">Another</el-menu-item>
    </el-menu>
</template>

<script>

export default {
    name: 'appHeader',
    components: {
    },
    data () {
        return {
            activeIndex: '1'
        };
    }
}
</script>

<style lang="styl"/>
