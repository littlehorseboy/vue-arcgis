// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterialIcon from 'vue-material-icon';
import App from './App';
import router from './router';
import eventBus from './setup/eventBus';

Vue.component(VueMaterialIcon.name, VueMaterialIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
      bus: eventBus,
    };
  },
  router,
  components: { App },
  template: '<App/>',
});
