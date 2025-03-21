<script setup>
import {
  ref,
  reactive,
  nextTick,
  onMounted,
  computed,
  watch,
  watchEffect,
  useTemplateRef,
} from 'vue';
import { Button, Input } from 'ant-design-vue';
// 注册组件
import Tabel from './tabel.vue';

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
const handleCount = async () => {
  count.value++;
  await nextTick();
  console.log('现在 DOM 已经更新了');
};

//  reactive vs ref
const student = {
  name: 'John',
  age: 20,
  class: 'Student',
  parent: {
    name: 'hha',
    age: 45,
    parent: {
      name: 'what',
      age: 65,
    },
  },
};
const refStudent = ref(student);
let reactiveStudent = reactive(student);
// reactiveStudent = reactive({ name: 'lilin' });
const { age } = reactiveStudent;
console.log('解构', age);
console.log('ref vs reactive', refStudent, reactiveStudent);
const handleRef = () => {
  refStudent.value.parent.parent = {
    name: 'nihao',
    age: 70,
  };
};
const handleReactive = () => {
  refStudent.value.parent.parent = {
    name: 'nihao2',
    age: 71,
  };
};
// 直接会warn
const reactiveStr = reactive('');
const handleStr = () => {
  reactiveStr.value = 'haha2';
};

// 计算属性
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery',
  ],
});
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No';
});
console.log('publishedBooksMessage', publishedBooksMessage);

// 可写的计算属性
const firstName = ref('John');
const lastName = ref('Doe');

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  // setter
  set(newValue) {
    console.log('newValue', newValue);
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ');
  },
});
const handleChangeFullName = () => {
  fullName.value = 'John Haha';
};

// 绑定class
const isActive = ref(true);
const classObject = computed(() => ({
  active: isActive.value,
  'text-danger': true,
}));
const error = ref(null);
const classObject2 = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal',
}));
const activeClass = ref('active');
const errorClass = ref('text-danger');

// 绑定style
const activeColor = ref('red');
const fontSize = ref(15);
const styleObject = reactive({
  color: 'red',
  fontSize: '15px',
});
const styleObject2 = reactive({
  backgroundColor: '#000000',
});

// v-if
const chart = ref('');
// v-show
const show = ref(false);
const handleChangeShow = () => {
  show.value = !show.value;
};
// v-for
const arrayList = ref([
  { id: 1, name: 'lilin' },
  { id: 2, name: 'lilin2' },
  { id: 3, name: 'lilin3' },
]);

// 事件
const sendMessage = (msg) => {
  console.log('sendMessage', msg);
};
const message = ref('');

// watch
const question = ref('');
const answer = ref('Questions usually contain a question mark. ;-)');
const loading = ref(false);

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true;
    answer.value = 'Thinking...';
    try {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            answer: 'yes',
          });
        }, 500);
      });
      answer.value = res.answer;
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error;
    } finally {
      loading.value = false;
    }
  }
});
const obj1 = reactive({ count: 0 });
watch(obj1, (count) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
  // 此时默认就是一个深层监听，
});

// 错误，因为 watch() 得到的参数是一个 number
// watch(obj1.count, (count) => {
//   console.log(`Count is: ${count}`);
// });
// 应该是这种getter函数
watch(
  () => obj1.count,
  (count) => {
    // 此时默认只有当obj1.count变化，才能被监听到
    console.log(`Count is: ${count}`);
  },
  // 显式地加上 deep 选项，强制转成深层侦听器
  { deep: true }
);
const x = ref(0);
const y = ref(0);
// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});

// watchEffect
const watchEffectCount = ref(0);
const watchEffectShow = ref(null);
watchEffect(() => {
  const params = {
    watchEffectCount: watchEffectCount.value,
  };
  watchEffectShow.value = watchEffectCount.value;
  console.log(params, 'params');
});

onMounted((age) => {
  age = '我改，但是不影响reactiveStudent';
  console.log('解构的age不具有响应性', age);
  const input = useTemplateRef('my-input');
  const input2 = ref(null);
  console.log('ref', input, input2);
});
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
        <ul>
          <li>1. ref 在 script 中使用，需要 .value</li>
          <li>2. ref 在 template 中使用，不需要 .value</li>
          <li>
            3. ref
            之所以可以具备响应性，是因为，vue针对变量拦截了get、set方法；当然你把ref变量传递给函数，它依旧保留了响应性
          </li>
          <li>
            4. Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript
            内置的数据结构，比如 Map。非原始值将通过 reactive()
            转换为响应式代理。
          </li>
          <li>
            5. 当你修改了响应式状态时，DOM 会被自动更新，DOM 更新不是同步的，Vue
            会在“next tick”更新周期中缓冲所有状态的修改。
          </li>
        </ul>
        <p>------</p>
        <div>2、reactive：返回一个proxy对象</div>
        <ul>
          <li>1. reactive 是proxy对象，ref 是内置的一个对象；</li>
          <div>
            <div style="color: blueviolet">
              下面例子是把同一个对象student分别用ref和reactive包裹。可以看出来，指向的是同一个引用，并且ref是可以使嵌套的对象具备深层的响应式的
            </div>
            <Button @click="handleRef">refStudent</Button>
            <div>{{ refStudent }}</div>
            <Button @click="handleReactive">reactiveStudent</Button>
            <div>{{ reactiveStudent }}</div>
          </div>
          <li>
            2. reactive 它只能用于对象类型 (对象、数组和如 Map、Set
            这样的集合类型)。它不能持有如 string、number 或 boolean
            这样的原始类型。
          </li>
          <div>
            <Button @click="handleStr">修改字符串</Button
            >{{ reactiveStr }}控制台报错
          </div>
          <li>
            3. 不能替换整个对象：由于 Vue
            的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：
          </li>
          <div>替换整个对象 {{ reactiveStudent }}</div>
          <li>
            4.
            对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接
          </li>
        </ul>
      </div>
    </div>
    <div class="card">
      <h4>计算属性</h4>
      <div class="card__content">
        <div>1. 计算属性 {{ publishedBooksMessage }}</div>
        <ul>
          <li>可以通过publishedBooksMessage.value 访问计算结果</li>
          <li>
            computed 包裹的函数会返回一个 ComputedRefImpl的对象，也就是ref
          </li>
        </ul>
        <p>------</p>
        <div>2. 计算属性 vs 方法</div>
        <ul>
          <li>
            一个计算属性仅会在其响应式依赖更新时才重新计算。只要 author.books
            不改变，无论多少次访问 publishedBooksMessage
            都会立即返回先前的计算结果，而不用重复执行 getter 函数。
          </li>
          <li>方法调用总是会在重渲染发生时再次执行函数。</li>
        </ul>
        <p>------</p>
        <div>3. 可写的计算属性</div>
        <div>{{ firstName }} {{ lastName }}</div>
        <Button @click="handleChangeFullName">点击修改</Button>
      </div>
    </div>
    <div class="card">
      <h4>类与样式绑定</h4>
      <div class="card__content">
        <div>1. 绑定class</div>
        <ul>
          <li class="static" :class="{ active: isActive }">
            class 和 动态class绑定
          </li>
          <li :class="classObject">绑定一个对象</li>
          <li :class="classObject2">绑定一个计算属性</li>
          <li :class="[activeClass, errorClass]">绑定一个数组</li>
          <li :class="[isActive ? activeClass : '', errorClass]">
            绑定一个三元表达式
          </li>
          <li>子组件会继承父组件的class</li>
          <li>
            如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个
            class。你可以通过组件的 $attrs 属性来指定接收的元素
          </li>
        </ul>
        <p>------</p>
        <div>2. 内联样式</div>
        <ul>
          <li :style="{ color: activeColor, fontSize: fontSize + 'px' }">
            单个绑定
          </li>
          <li :style="styleObject">绑定对象</li>
          <li :style="[styleObject, styleObject2]">绑定数组</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <h4>条件渲染</h4>
      <div class="card__content">
        <div>1、v-if</div>
        <div>
          <Input v-model:value="chart" style="width: calc(100% - 200px)" />
          <template v-if="chart">
            <div>v-if可以写在template上哦</div>
            <div v-if="chart === 'A'">输入框输入了A</div>
            <div v-else-if="chart === 'B'">输入框输入了B</div>
            <div v-else>输入框输入了任意字母</div>
          </template>
        </div>
        <p>------</p>
        <div>2、v-show</div>
        <div>
          <div>
            v-show
            不能用在template上，它切换的是dom的display属性，假值dom会有display:none;
            真值移除
          </div>
          <div>
            <Button @click="handleChangeShow">切换</Button>
            <div v-show="show">{{ show }}</div>
          </div>
        </div>
        <p>------</p>
        <div>
          总结一下：v-if会对dom进行销毁和重建，因此有更大的切换开销；v-show只是切换display，因此会有更大的渲染开销；
        </div>
      </div>
    </div>
    <div class="card">
      <h4>列表渲染</h4>
      <div class="card__content">
        <div>1、v-for</div>
        <div>
          <div>这里in、of 都可以哦</div>
          <div v-for="item in arrayList" :key="item.id">{{ item.name }}</div>
          <div v-for="item of arrayList">{{ item.name }}</div>
          <div>
            如果使用v-for 遍历对象，参数有
            value、key、index。对象将会被Object.values
          </div>
          <div>
            Vue
            能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新:push()
            pop() shift() unshift() splice() sort() reverse()
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <h4>事件处理</h4>
      <div class="card__content">
        <div>1. 监听事件</div>
        <div>
          <div>内联处理器中调用方法: sendMessage是不会被触发的哦</div>
          <Button @click="sendMessage('haha')">send</Button>
          <Button @click="(event) => sendMessage(event)">send event</Button>
          <Button @click="sendMessage($event)">send $event</Button>
        </div>
        <p>------</p>
        <div>2. 修饰符？？？</div>
        <div>v-on 的修饰符：.stop .prevent .self .capture .once .passive</div>
        <!-- 单击事件将停止传递 -->
        <!-- <a @click.stop="doThis"></a> -->
        <!-- 提交事件将不再重新加载页面 -->
        <!-- <form @submit.prevent="onSubmit"></form> -->
        <!-- 修饰语可以使用链式书写 -->
        <!-- <a @click.stop.prevent="doThat"></a> -->
        <!-- 也可以只有修饰符 -->
        <!-- <form @submit.prevent></form> -->
        <!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
        <!-- 例如：事件处理器不来自子元素 -->
        <!-- <div @click.self="doThat">...</div> -->
        <!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
        <!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
        <!-- <div @click.capture="doThis">...</div> -->

        <!-- 点击事件最多被触发一次 -->
        <!-- <a @click.once="doThis"></a> -->

        <!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
        <!-- 以防其中包含 `event.preventDefault()` -->
        <!-- <div @scroll.passive="onScroll">...</div> -->
        <p>------</p>
        <!-- <div>keyup 按键的修饰符：</div> -->
        <!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
        <!-- <Input @keyup.enter="submit" /> -->
        <!-- <Input @keyup.page-down="onPageDown" /> -->
        <div>
          Vue 为一些常用的按键提供了别名： .enter .tab .delete
          (捕获“Delete”和“Backspace”两个按键) .esc .space .up .down .left .right
        </div>
        <div>
          你可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。
          .ctrl .alt .shift .meta
        </div>
        <p>------</p>
        <div>
          <div>.exact 修饰符允许精确控制触发事件所需的系统修饰符的组合。</div>
          <!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
          <!-- <button @click.ctrl="onClick">A</button> -->

          <!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
          <!-- <button @click.ctrl.exact="onCtrlClick">A</button> -->

          <!-- 仅当没有按下任何系统按键时触发 -->
          <!-- <button @click.exact="onClick">A</button> -->
        </div>
        <p>------</p>
        <div>鼠标按键修饰符​ .left .right .middle</div>
      </div>
    </div>
    <div class="card">
      <h4>表单输入绑定</h4>
      <div class="card__content">
        <div>1、普通绑定：输入框、单选、复选、文本域、等..</div>
        <p>Message is: {{ message }}</p>
        <Input
          v-model="message"
          placeholder="edit me"
          @input="(event) => (message = event.target.value)"
        />
        <div>
          v-model 会忽略任何表单元素上初始的 value、checked 或 selected
          attribute
        </div>
        <p>------</p>
        <div>
          <div>2、修饰符</div>
          <ul>
            <li>
              v-model.lazy：默认input事件后更新数据，lazy会在每次 change
              事件后更新数据
            </li>
            <li>
              v-model.number: 让用户输入自动转换为数字;如果该值无法被
              parseFloat() 处理，那么将返回原始值。特别是当输入为空时
              (例如用户清空输入字段之后)，会返回一个空字符串。number
              修饰符会在输入框有 type="number" 时自动启用
            </li>
            <li>v-model.trim：默认自动去除用户输入内容中两端的空格</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card">
      <h4>生命周期</h4>
      <div class="card__content">
        <div>1、生命周期</div>
        <ul>
          <li>setup：组合式api</li>
          <li>beforeCreate：开始初始化</li>
          <li>created：初始化api之后</li>
          <li>beforeMount：初始化渲染前</li>
          <li>mounted：在组件完成初始渲染并创建DOM 节点</li>
          <li>beforeUpdate：数据发生变化</li>
          <li>updated：数据变更</li>
          <li>beforeUnMount：组件被取消挂载</li>
          <li>unmounted：取消挂载</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <h4>侦听器</h4>
      <div class="card__content">
        <div>1、watch：我们可以在每次响应式状态发生变化时触发回调函数</div>
        <div>
          watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref
          (包括计算属性)、一个响应式对象、一个 getter
          函数、或多个数据源组成的数组
        </div>
        <p>
          1. 第一个参数是ref： Ask a yes/no question:
          <input v-model="question" :disabled="loading" />
        </p>
        <p>{{ answer }}</p>
        <p>监听输入的question，回调中发现新question中包含?，回答yes</p>
        <p>2. 第一个参数是getter函数：</p>
        <p>3. 第一个参数是多个来源组成的数组：</p>
        <p>------</p>
        <div>
          <div>2、深层监听器</div>
          <ul>
            <li>1. 如果第一个参数是ref、reactive、计算属性，默认就是深层的</li>
            <li>2. getter函数，只有改到对应的，才能监听到</li>
            <li>3. 可以显示传递{deep: true}变成深层的</li>
          </ul>
        </div>
        <p>------</p>
        <div>3、immediate: true 创建监听器是立刻被执行</div>
        <p>------</p>
        <div>4、once: true 一次性侦听器</div>
        <p>------</p>
        <div>5、watchEffect()</div>
        <div>
          <Button @click="watchEffectCount++">watchEffectCount+1</Button>
          点击按钮：
          {{ watchEffectShow }}
        </div>
        <div>watchEffect会立即触发执行；自动跟踪回调的响应式依赖；</div>
        <p>------</p>
        <div>6、watchEffect vs watch</div>
        <ul>
          <li>
            watch：只追踪明确侦听的数据，不会关心回调里的，我们可以精确的控制回调的触发时机
          </li>
          <li>watchEffect：自动追踪所有能访问到的响应式属性</li>
        </ul>
        <p>------</p>
        <div>7、副作用清理</div>
        <div>
          这里先强调一下，什么是副作用：当你watch了一个id的变更，进行axios请求时。如果id变了，过时的id发起的请求我们不期望关心了。因此需要放弃过时的请求
        </div>
        <div>
          onWatcherCleanup：当watch/watchEffect失效并重新运行时调用（vue3.5+支持）
        </div>
        <div>
          onCleanup：作为watch/watchEffect回调函数的第三个参数使用（低版本）
        </div>
        <p>------</p>
        <div>8、回调的触发时机</div>
        <ul>
          <li>默认：watch回调会在父组件更新后，子组件更新前触发。</li>
          <li>flush: 'post'：后置刷新，能访问到子组件更新后的dom</li>
          <li>
            flush: 'sync'/watchSyncEffect()：同步刷新， Vue 进行任何更新之前触发
          </li>
        </ul>
        <p>------</p>
        <div>9、停止侦听器</div>
        <div>
          一个同步的监听器，是会跟着组件卸载一起停止的；但是异步的监听器（也就是在setTimeout中的），需要手动停止，以防内存泄漏
        </div>
        <div>
          要手动停止一个侦听器，直接调用 watch 或 watchEffect 返回的函数
        </div>
      </div>
    </div>
    <div class="card">
      <h4>模版引用(获取dom) useTemplateRef与ref与$refs</h4>
      <div class="card__content">
        <div>3.5版本前后两种写法：</div>
        <div>const input = useTemplateRef('my-input')</div>
        <input ref="my-input" />
        <div>const input = ref(null)</div>
        <input ref="input" />
        <div>2.7以下版本写法：</div>
        <div>this.$refs.input.focus()</div>
        <input ref="input" />
        <p>------</p>
        <div>
          如果一个子组件使用的是选项式 API 或没有使用 script
          setup，被引用的组件实例和该子组件的 this
          完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。
        </div>
        <div>
          script setup的组件是默认私有的：一个父组件无法访问到一个使用了 script
          setup 的子组件中的任何东西，除非子组件在其中通过 defineExpose
          宏显式暴露
        </div>
      </div>
    </div>
    <div class="card">
      <h4>组件基础</h4>
      <div class="card__content">
        <div>这是一个表单组件</div>
        <Tabel />
        <p>------</p>
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
