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
const list1 = ref([
  {
    key: '7',
    type: shallowRef(ColDiagram) 
  },
  {
    key: '8',
    type: shallowRef(ColDiagram) 
  },
  {
    key: '9',
    type: shallowRef(ColDiagram) 
  }
])
</script>

<template>
  <div class="home">
    <div class="home__content home__top">
      <div class="home__item" v-for="item in list" :key="item.key" >
        <component
          :is="item.type"
          :index="item.key"
        />
      </div>
    </div>
    <div class="home__tabel">占位</div>
    <div class="home__content home__bottom">
      <div class="home__item home__bitem" v-for="item in list1" :key="item.key" >
        <component
          :is="item.type"
          :index="item.key"
        />
      </div>
    </div>
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
}
.home__content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.home__top {
  height: 50%;
}
.home__item {
  width: 30%;
  height: 50%;
  border: 1px solid rgb(228, 159, 75);
  flex-grow: 1;
}
.home__tabel {
  height: 25%;
  width: 100%;
  background-color: bisque;
}
.home__bottom {
  height: 25%;
}
.home__bitem {
  height: 100%;
}
</style>
