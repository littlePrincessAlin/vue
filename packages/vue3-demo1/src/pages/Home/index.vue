<script setup>
import { ref } from 'vue';
import { Layout, Menu } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const { Header, Content } = Layout;
const router = useRouter();

// 顶部菜单
const headMenu = ref([
  {
    key: 'grammar',
    label: 'vue3语法',
    title: 'vue3语法',
  },
]);
const headCurrent = ref(['grammar']);

const handleClickMenu = ({ item }) => {
  router.push({ path: item.key });
};
</script>

<template>
  <Layout>
    <Header>
      <Menu
        mode="horizontal"
        theme="dark"
        :selectedKeys="headCurrent"
        :items="headMenu"
        @click="handleClickMenu"></Menu>
    </Header>
    <Content>
      <router-view></router-view>
    </Content>
  </Layout>
</template>

<style scoped></style>
