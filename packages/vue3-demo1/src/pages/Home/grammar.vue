<script setup>
import { ref, h, onMounted } from 'vue';
import { menuKey } from '@/utils/index';
import { useRouter } from 'vue-router';
import { Layout, Menu } from 'ant-design-vue';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
const { Sider, Content } = Layout;
const router = useRouter();

// 顶部菜单
const sliderMenu = ref([
  {
    key: 'base',
    icon: () => h(MailOutlined),
    label: '基础基础',
    title: '基础基础',
  },
  {
    key: 'component',
    icon: () => h(MailOutlined),
    label: '深入组件与复用',
    title: '深入组件与复用',
  },
  {
    key: 'learn',
    icon: () => h(AppstoreOutlined),
    label: '源码原理',
    title: '源码原理',
    children: [
      {
        key: 'observable',
        label: '响应式原理',
        title: '响应式原理',
      },
    ],
  },
]);
const current = ref(['mustache']);

const handleClick = (item) => {
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
        @click="handleClick"
      ></Menu>
    </Sider>
    <Content class="grammar__content">
      <router-view></router-view>
    </Content>
  </Layout>
</template>

<style scoped lang="scss">
.grammar {
  height: 100%;
  &__sider {
    height: 100%;
    overflow-y: scroll;
  }
  &__content {
    overflow-y: scroll;
  }
}
</style>
