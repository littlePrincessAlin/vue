<script setup>
// 地图
import { ref, onMounted } from "vue";
import { init, registerMap } from "echarts";
import neiJson from "@assets/neiJson";
const props = defineProps({
  index: String,
});

onMounted(() => {
  registerMap("nei", neiJson);
  const myChart = init(document.getElementById("mapEcharts" + props.index));
  myChart.setOption(
    {
      // 背景色
      backgroundColor: "#03213D",
      series: [
        {
          name: "地图分布",
          type: 'map', //地图
          map: 'nei',
          roam: true, //是否开启鼠标缩放和平移漫游
          zoom: 1.1, //当前视角的缩放比例
          //   boundingCoords: [
          //     // 定位左上角经纬度
          //     [105, 33],
          //     // 定位右下角经纬度
          //     [180, 50]
          //   ],
        },
      ],
    },
    true
  );
});
</script>

<template>
  <div class="mapEcharts" :id="'mapEcharts' + props.index"></div>
</template>

<style scoped>
.mapEcharts {
  width: 100%;
  height: 100%;
}
</style>
