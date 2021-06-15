// 全局配置、公共文件
import './assets/common/index.js';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// 引入全局组件
import components from './components';

// 按需引入 vant 组件库
import {
  Button,
  Swipe, SwipeItem,
  Icon, Empty,
  Overlay, Popup, Dialog, Toast,
  Field
} from 'vant'
Vue.use(Button)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Icon)
Vue.use(Empty)
Vue.use(Overlay)
Vue.use(Popup)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Field)

Toast.allowMultiple();
Toast.setDefaultOptions({ duration: 3000 });
Object.defineProperty(Vue.prototype, '$toast', { value: Toast });

// 绑全局组件
Object.keys(components).forEach(key => Vue.component(key, components[key]));

// 关闭提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
