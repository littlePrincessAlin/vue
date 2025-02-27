import Vue from './init/index.js';

// 在实际使用中
const vm = new Vue({
    router: {}, 
    render: () => ({})
});

// 挂载
// vm.$mount('#app')

console.log(vm);