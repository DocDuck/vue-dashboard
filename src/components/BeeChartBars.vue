<script>
import {Bar, mixins} from 'vue-chartjs' // We specify what type of chart we want from vue-chartjs and the mixins module

export default {
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: ['chartData'],
    data () {
        return {
            // chartFakeData: {
            //     labels: ['Сервис 1', 'Сервис 2'],
            //     datasets: [{
            //         label: 'subs_error',
            //         data: [12, 19],
            //         backgroundColor: [
            //             'rgba(255, 99, 132, 0.2)',
            //             'rgba(255, 99, 132, 0.2)'
            //         ],
            //         borderColor: [
            //             'rgba(255, 99, 132, 1)',
            //             'rgba(255, 99, 132, 1)'
            //         ],
            //         borderWidth: 1
            //     },
            //         {
            //             label: 'subs_ok',
            //             data: [8, 55],
            //             backgroundColor: [
            //                 'rgba(54, 162, 235, 0.2)',
            //                 'rgba(54, 162, 235, 0.2)'
            //             ],
            //             borderColor: [
            //                 'rgba(54, 162, 235, 1)',
            //                 'rgba(54, 162, 235, 1)'
            //             ],
            //             borderWidth: 1
            //         }]
            // },
            options: {
                title: {
                    display: true,
                    text: 'График среза по сервисам'
                    // TODO сделать динамичный заголовок
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            display: true
                        }
                    }]
                }
            }
        }
    },
    mounted () {
        // this.chartData is created in the mixin
        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style>

</style>