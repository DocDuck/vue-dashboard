<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Сервис 1">Сервис 1</el-tab-pane>
        <el-tab-pane label="Сервис 2">Сервис 2</el-tab-pane>
        <el-tab-pane label="Сервис 3">Сервис 3</el-tab-pane>
        <el-tab-pane label="Сервис 4">Сервис 4</el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>