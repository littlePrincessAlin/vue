<script setup>
import { shallowRef, ref } from 'vue'
import ColDiagram from '@components/ColDiagram.vue'
import MapEcharts from '@components/MapEcharts.vue'
const list = ref([
  {
    key: '1',
    type: shallowRef(ColDiagram) 
  },
  {
    key: '2',
    type: shallowRef(ColDiagram) 
  },
  {
    key: '3',
    type: shallowRef(ColDiagram) 
  },
  {
    key: '4',
    type: shallowRef(ColDiagram) 
  },
  {
    key: '5',
    type: shallowRef(MapEcharts)
  },
  {
    key: '6',
    type: shallowRef(ColDiagram) 
  },
])
</script>

<template>
  <div class="home">
    <div class="home__content" v-for="item in list" :key="item.key" >
      <component
        :is="item.type"
        :index="item.key"
      />
    </div>
    <ColDiagram :index="'7'" />
  </div>
</template>

<style scoped>
.home {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.home__item {
  width: 30%;
  flex-grow: 1;
}
</style>
