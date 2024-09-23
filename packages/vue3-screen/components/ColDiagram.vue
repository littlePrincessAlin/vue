<script setup>
// 柱形图
import { ref, onMounted } from 'vue'
import { init } from 'echarts'
const props = defineProps({
  index: String
})
const option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};

onMounted(() => {
  const myChart = init(document.getElementById('colDiagram' + props.index));
  myChart.setOption(option);
})
</script>

<template>
  <div class="colDiagram" :id="'colDiagram' + props.index"></div>
</template>

<style scoped>
.colDiagram {
  width: 100%;
  height: 100%;
}
</style>
