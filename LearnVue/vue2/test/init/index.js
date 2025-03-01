import { initMixin, lifecycleMixin } from './init.js';

function Vue(options) {
    // 初始化vm
    this._init(options)
}
// 初始化vue。注册Vue.prototype._init
initMixin(Vue)
// 注册Vue.prototype._update、$forceUpdate、$destroy、
lifecycleMixin(Vue)

export default Vue