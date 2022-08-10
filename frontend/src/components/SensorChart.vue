<template>
    <div :class="`Chart Chart-${type}`">
        <h1>{{ sensor }}</h1>
    </div>
</template>

<script>
import { chartMargin, chartWidth, chartHeight } from '../config'
import store from '../store'
import * as d3 from 'd3'
import { onMounted, computed } from 'vue'
const timeFormat = d3.timeFormat("%H:%M")

export default {
    name: 'SensorChart',
    props: {
        type: String,
        text: String
    },
    setup(props) {
        let svg, xScale, yScale, xAxis, yAxis, line, tooltip, circle, area

        const type = computed(() => props.type)
        const sensors = computed(() => store.getters['sensors'])
        const sensor = computed(() => store.getters['sensor'][type.value])

    }
}
</script>