export default {
    data () {
        return {
            currentState: null
        }
    },
    methods: {
        asyncSetState (state) {
            this.currentState = state
            return this.asyncSetTumbler(state)
        },
        asyncSetTumbler (tumbler) {
            return new Promise((resolve, reject) => {
                this.tumbler = Object.assign(this.tumbler, tumbler)
                setTimeout(resolve, 100) // время стандартного transition + 300 ms (иначе fit не успевает)
            })
        }

    }
}
