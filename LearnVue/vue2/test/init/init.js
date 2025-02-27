import { mergeOptions } from 'LearnVue/vue2/node_modules/vue/src/core/util/options.ts';
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        console.log('配置', options)
        const vm = this;
        // 合并配置--mergeOptions
        vm.$options = mergeOptions({}, options, vm)
        vm._renderProxy = vm
        // 初始化生命周期
        initLifecycle(vm)
        // 初始化事件中心
        initEvents(vm)
        // 初始化渲染
        initRender(vm)
        // beforeCreate钩子
        callHook(vm, 'beforeCreate', undefined, false /* setContext */)
        initInjections(vm) // resolve injections before data/props
        // 初始化 data、props、computed、watcher
        initState(vm)
        initProvide(vm) // resolve provide after data/props
        callHook(vm, 'created')

        // 如果传入了el，那么挂载上去
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}