<template>
  <div>
    <button class="btn btn-sm btn-default btn-block" @click="pan">
      <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
      平移
    </button>
    <button class="btn btn-sm btn-default btn-block" @click="zoomIn">
      <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
      框選放大
    </button>
    <button class="btn btn-sm btn-default btn-block" @click="zoomOut">
      <span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span>
      框選縮小
    </button>
    <button id="zoomfullextBtn" class="btn btn-sm btn-default btn-block">
      <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
      全圖
    </button>
    <button id="zoomprevBtn" class="btn btn-sm btn-default btn-block">
      <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
      上一步
    </button>
      <button id="zoomnextBtn" class="btn btn-sm btn-default btn-block">
      <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
      下一步
    </button>
    <!--<button id="deactivateBtn" class="btn btn-sm btn-default btn-block">工具取消</button>-->

  </div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'MapControl',
  props: {
    map: {
      type: Object,
    },
  },
  data() {
    return {

    };
  },
  mounted() {
    const vm = this;

    loadModules([
      "esri/toolbars/navigation",
    ])
      .then(([
        Navigation
      ]) => {
        vm.navToolbar = new Navigation(vm.map);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    pan() {
      this.navToolbar.zoomToNextExtent();
    },
    zoomIn() {
      debugger;
      this.navToolbar.activate(Navigation.ZOOM_IN);
    },
    zoomOut() {
      this.navToolbar.activate(Navigation.ZOOM_OUT);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
