<template>
    <div class="data-picker__block">
        <!--<span class="data-picker__title">временной<br> интервал</span>-->
        <div class="data-picker__item">
            <el-date-picker
                    v-model="selectedStartDate"
                    type="date"
                    placeholder="Выберите дату"
                    :format="'dd.MM.yyyy'">
            </el-date-picker>
        </div>
        <div class="data-picker__separator">
            —
        </div>
        <div class="data-picker__item">
            <el-date-picker
                    v-model="selectedEndDate"
                    type="date"
                    placeholder="Выберите дату"
                    :format="'dd.MM.yyyy'"
                    :picker-options="pickerOptionsMethod(selectedStartDate)">
            </el-date-picker>
        </div>
        <el-button type="primary" @click="$emit('updateData')">Обновить данные</el-button>
    </div>
</template>

<script>
export default {
    props: ['chosenDateInterval'],
    computed: {
        selectedStartDate: {
            get () {
                return this.chosenDateInterval.start_date
            },
            set (item) {
                this.$set(this.chosenDateInterval, 'start_date', item ? item.format('yyyy-mm-dd') : null)
            }
        },
        selectedEndDate: {
            get () {
                return this.chosenDateInterval.end_date
            },
            set (item) {
                this.$set(this.chosenDateInterval, 'end_date', item ? item.format('yyyy-mm-dd') : null)
            }
        }
    },
    methods: {
        pickerOptionsMethod (endDate) {
            let oneDay = 86400000
            return {
                disabledDate: (time) => {
                    return (time.getTime() + oneDay) < Date.parse(endDate)
                }
            }
        }
    }
};
</script>

<style>
    .data-picker__block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

    }
    .data-picker__item + button {
        margin-left: 20px;
    }
    .el-date-editor .el-range-separator {
        width: 10%;
    }

</style>