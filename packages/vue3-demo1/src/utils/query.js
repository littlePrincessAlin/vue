import { useRoute } from 'vue-router';
/**
 * @description: 处理路径
 */
export const menuKey = () => {
  const route = useRoute();
  const pathArr = route.path.split('/');
  return pathArr[pathArr.length - 1];
};
