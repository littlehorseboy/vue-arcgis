// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { loadScript } from 'esri-loader';
import App from './App';
import router from './router';
import eventBus from './setup/eventBus';

// preload the ArcGIS API
const options = {
  url: 'https://js.arcgis.com/3.23',
};

loadScript(options);

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
