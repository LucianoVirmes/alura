import Vue from 'vue';
import App from './App.vue';

// disponibiliza recursos especializados na realização de requisições assincronas
import VueResource from 'vue-resource';

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
