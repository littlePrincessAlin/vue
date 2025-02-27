import { initMixin } from './init.js';

function Vue(options) {
    // 初始化vm
    this._init(options)
}
// 初始化vue。注册Vue.prototype._init
initMixin(Vue)

export default Vue