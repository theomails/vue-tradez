import Vue from 'vue'
import App from './App.vue'
import VueNotification from '@mathieustan/vue-notification';

Vue.use(VueNotification, {
  theme: {
    colors: {
      info: '#aaa',
      darkenInfo: '#777'
    },
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  }
});
Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')

