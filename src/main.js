import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import routes from './router'
import store from './store'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
const router = new VueRouter({
      routes
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
