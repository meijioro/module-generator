console.clear();

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app');

import Vue from 'vue';
import App from './App.vue';
import VueFormulate from '@braid/vue-formulate';
//import VeeValidate from 'vee-validate';

// Vue.use(VueFormulate);
Vue.use(VueFormulate, {
  locales: {
    en: {
      required({ name }) {
        return `Please fill out the ${name} field.`;
      },
    },
  },
});
//Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
