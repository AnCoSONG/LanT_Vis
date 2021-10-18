import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'styles/index.scss'
import Echarts from 'vue-echarts'
import { use } from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {LineChart, BarChart, RadarChart} from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent} from 'echarts/components'
use([
    CanvasRenderer,
    LineChart,
    BarChart,
    RadarChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
])
const app = createApp(App)
app.component('v-chart', Echarts)
app.use(router).mount('#app')
