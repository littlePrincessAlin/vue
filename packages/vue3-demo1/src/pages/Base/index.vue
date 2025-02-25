<script setup>
import { ref, reactive } from 'vue';
import { Button } from 'ant-design-vue';

const str = '这是一个双大括号包裹的普通文本插值';
const rawHtml = '<span style="color: red">This should be red.</span>';
const id = ref(1);
const name = ref(null); // null、undefined
const obj = reactive({
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green',
});

const html = '<form @submit.prevent="onSubmit">...</form>';

// reg
const count = ref(0);
const handleCount = () => {
  count.value++;
};
</script>

<template>
  <div class="base">
    <div class="card">
      <h4>模版语法</h4>
      <div class="card__content">
        <div>1、{{ str }}</div>
        <p>2、文本是: {{ rawHtml }}</p>
        <p>使用 v-html : <span v-html="rawHtml"></span></p>
        <p>
          v-html非常容易造成 XSS 漏洞，请仅在内容安全可信时再使用
          v-html，并且永远不要使用用户提供的 HTML 内容。
        </p>
        <div>
          3、动态绑定：
          <div :str="name">值为null、undefined时，dom没有属性名哦～</div>
          <div :id>同名简写绑定，请看控制台这个dom哦～</div>
          <div v-bind="obj">使用 v-bind="obj" 绑定多个值</div>
        </div>
        <p>4、使用js表达式</p>
        <div>
          5、vue指令
          <ul>
            <li>v-if</li>
            <li>v-on</li>
            <li>v-bind</li>
            <li>v-html</li>
            <li>v-for</li>
            <li>v-slot</li>
            <li>v-show</li>
            <li>
              <a
                target="_blank"
                href="https://cn.vuejs.org/api/built-in-directives"
              >
                等等....
              </a>
            </li>
          </ul>
        </div>
        <div>6、修饰符 {{ html }}，事件处理的时候再讲，此处先了解</div>
      </div>
    </div>
    <div class="card">
      <h4>响应式基础</h4>
      <div class="card__content">
        <div>1、声明响应式状态 ref()</div>
        <div>const count = ref(0)</div>
        <div>count：{{ count }}</div>
        <Button @click="handleCount">count.value++</Button>
        <p>------</p>
        <div>2、reactive</div>
        <p>------</p>
        <div>3、区别</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base {
  padding: 0 20px;
}
.card {
  &__content {
    background-color: #ffffff;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 15px;
  }
}
</style>
