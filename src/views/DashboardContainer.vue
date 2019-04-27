<template>
    <div class="content">
        <template v-if="false">
            <div class="chart-container">
                <bee-lines-chart :chartData="prepareDataToChart(this.exampleData)"></bee-lines-chart>
            </div>
        </template>
        <div class="chart-container">
            <bee-bars-chart :tumbler="tumbler" :chartData="prepareDataToChart(resolveDataSource())"></bee-bars-chart>
        </div>

        <el-row>
            <el-col :span="5"><el-input placeholder="Фильтр по ID" class="table-filter" v-model="search"></el-input></el-col>
            <el-col :span="25"><bee-date-picker
                    :chosenDateInterval="chosenDateInterval"
                    @updateData="updateData"
            ></bee-date-picker></el-col>
        </el-row>

        <bee-table :tableData="resolveDataSource()"
                   :search="search"
        ></bee-table>
    </div>
</template>

<script>
// mixins
import mixinStateContainer from '@/mixins/stateContainer'

// helpers
import {formatDate} from '@/helpers/format'
import {mapState, mapActions} from 'vuex'

// Компонты
import BeeLinesChart from '@/components/BeeChartLines.vue'
import BeeBarsChart from '@/components/BeeChartBars.vue'
import BeeDatePicker from '@/components/BeeDatePicker.vue'
import BeeTable from '@/components/BeeTable.vue'

export default {
    mixins: [
        mixinStateContainer
    ],
    components: {
        BeeLinesChart,
        BeeBarsChart,
        BeeDatePicker,
        BeeTable
    },
    props: {routerState: null},
    data () {
        return {
            // состояния проекта
            tumbler: {
                services: true,
                partners: false
            },
            stateList: {
                services: {
                    services: true,
                    partners: false
                },
                partners: {
                    services: false,
                    partners: true
                },
            },
            search: '',
            error: {}
        }
    },
    methods: {
        ...mapActions(['loadServicesData', 'loadPartnersData']),
        formatDate,
        prepareDataToChart (inputData) {
            let dataSetError = {
                label: 'Error',
                data: [],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }
            let dataSetOk = {
                label: 'OK',
                data: [],
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }

            let chartTemplate = {}

            chartTemplate.labels = []
            // для среза по датам: chartTemplate.labels = this.unicFinDates
            inputData.forEach((service, key) => {
                chartTemplate.labels.push(service.service_id ? service.service_id : service.partner_id)
                dataSetError.data.push(service.subs_error)
                dataSetError.backgroundColor.push(dataSetError.backgroundColor[key])
                dataSetError.borderColor.push(dataSetError.borderColor[key])
                dataSetOk.data.push(service.subs_ok)
                dataSetOk.backgroundColor.push(dataSetOk.backgroundColor[key])
                dataSetOk.borderColor.push(dataSetOk.borderColor[key])
            })
            chartTemplate.datasets = [dataSetError, dataSetOk]
            return chartTemplate
        },
        updateData () {
            if (this.tumbler.services) {
                this.loadServicesData(this.chosenDateInterval)
            }
            else if (this.tumbler.partners) {
                this.loadPartnersData(this.chosenDateInterval)
            }
        },
        resolveDataSource () {
            if (this.tumbler.services) {
                return this.apiServicesData
            }
            if (this.tumbler.partners) {
                return this.apiPartnersData
            }
        }
    },
    computed: {
        ...mapState(['apiServicesData', 'apiPartnersData', 'exampleData', 'chosenDateInterval']),
        // возвращает массив с уникальными датами финансовых событий, отсортированный по возрастанию и приведенный к виду dd.mm.yyyy
        // unicFinDates () {
        //     let finEventDates = {}
        //     let formatDates = []
        //     this.tableData.forEach(row => {
        //         row.finEvents.forEach(finEvent => {
        //             finEventDates[finEvent.date] = 1
        //         })
        //     })
        //     let sortedDates = Object.keys(finEventDates).sort(function(a, b){
        //         let dateA = Date.parse(a), dateB = Date.parse(b)
        //         return dateA - dateB //сортировка по возрастающей дате
        //     })
        //     sortedDates.forEach( (date) => {formatDates.push( this.formatDate(date) )})
        //     return formatDates
        // }
    },
    created () {
        console.log(process.env.VUE_APP_TITLE)
        this.asyncSetState(this.stateList[this.routerState])
        let params = ''
        this.loadServicesData(params)
    },
    beforeRouteUpdate (to, from, next) {
        let routerState = to.params.routerState
        this.asyncSetState(this.stateList[routerState])
        let params = ''
             if (this.tumbler.services) {
                 this.loadServicesData(params)
             }
             if (this.tumbler.partners) {
                 this.loadPartnersData(params)
             }
        next()
    }
}
</script>

<style>
    .el-row {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }
    .el-col + .el-col {
        margin-left: auto;
    }
    .chart-container {
        margin: 30px auto;
        position: relative;
        max-height: 600px;
        width: 100%;
    }
</style>
