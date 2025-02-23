<script setup>
import { ref, h, onMounted } from 'vue';
import { menuKey } from '@/utils/index';
import { useRouter } from 'vue-router';
import { Layout, Menu } from 'ant-design-vue';
import { MailOutlined } from '@ant-design/icons-vue';
const { Sider, Content } = Layout;
const router = useRouter();

// 顶部菜单
const sliderMenu = ref([
  {
    key: 'base',
    icon: () => h(MailOutlined),
    label: '基础基础',
    title: '基础基础',
    children: [
      {
        key: 'mustache',
        label: '模版语法',
        title: '模版语法',
      },
      {
        key: 'ref',
        label: '响应式基础',
        title: '响应式基础',
      },
    ],
  },
]);
const current = ref(['mustache']);

const handleClick = item => {
  router.push({ path: '/grammar/' + item.key });
  current.value[0] = item.key;
};

onMounted(() => {
  current.value[0] = menuKey();
});
</script>

<template>
  <Layout class="grammar">
    <Sider class="grammar__sider">
      <Menu
        mode="inline"
        theme="dark"
        :selectedKeys="current"
        :items="sliderMenu"
        @click="handleClick"></Menu>
    </Sider>
    <Content>
      <router-view></router-view>
    </Content>
  </Layout>
</template>

<style scoped>
.grammar {
  height: calc(100vh - 64px);
}
</style>
