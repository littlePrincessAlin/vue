<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const dataList = ref([
  {
    name: "模版语法",
    path: "/mustache",
  },
  {
    name: "响应式基础",
    path: "/ref",
  },
]);

const handleClick = (item) => {
  router.push({ path: item.path });
};
</script>

<template>
  <div>
    <h3>基础</h3>
    <div
      v-for="(item, index) in dataList"
      :key="index"
      @click="handleClick(item)"
    >
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped></style>
