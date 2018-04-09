<template>
  <div>
    <button class="btn btn-sm btn-default btn-block" @click="mapControl('pan')">
      <vue-material-icon name="pan_tool" :size="12"></vue-material-icon>
      平移
    </button>
    <button class="btn btn-sm btn-default btn-block" @click="mapControl('zoomIn')">
      <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
      框選放大
    </button>
    <button class="btn btn-sm btn-default btn-block" @click="mapControl('zoomOut')">
      <span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span>
      框選縮小
    </button>
    <button class="btn btn-sm btn-default btn-block" @click="mapControl('full')">
      <span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
      全圖
    </button>
    <button class="btn btn-sm btn-default btn-block" @click="mapControl('prev')">
      <vue-material-icon name="undo" :size="14"></vue-material-icon>
      上一步
    </button>
      <button class="btn btn-sm btn-default btn-block" @click="mapControl('next')">
      <vue-material-icon name="redo" :size="14"></vue-material-icon>
      下一步
    </button>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'MapControl',
  data() {
    return {
      map: null,
    };
  },
  created() {
    const vm = this;
    this.$bus.$on('map', (event) => {
      vm.map = event;
    });
  },
  methods: {
    mapControl(type) {
      const vm = this;

      loadModules([
        'esri/toolbars/navigation',
      ])
        .then(([
          Navigation,
        ]) => {
          const navToolbar = new Navigation(vm.map);

          switch (type) {
            case 'pan':
              navToolbar.activate(Navigation.PAN);
              break;
            case 'zoomIn':
              navToolbar.activate(Navigation.ZOOM_IN);
              break;
            case 'zoomOut':
              navToolbar.activate(Navigation.ZOOM_OUT);
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  beforeDestroy() {
    this.$bus.$off('map');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
