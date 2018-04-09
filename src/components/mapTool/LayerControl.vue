<template>
  <div>
    <div v-for="(item, index) in baseLayer" :key="index">
      <input type="checkbox" :checked="item.layerSetting.visible"
        @click="toggleLayerV(item.layerSetting.id, item.layerSetting.visible);
          item.layerSetting.visible = !item.layerSetting.visible;">
      {{ item }}
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'LayerControl',
  data() {
    return {
      map: null,
    };
  },
  props: {
    baseLayer: {
      type: Array,
    },
  },
  methods: {
    toggleLayerV(id, visible) {
      if (visible) {
        this.map.getLayer(id).hide();
      } else {
        this.map.getLayer(id).show();
      }
    },
  },
  created() {
    const vm = this;
    this.$bus.$on('map', (event) => {
      vm.map = event;

      loadModules([

      ])
        .then((

        ) => {

        })
        .catch((err) => {
          console.error(err);
        });
    });
  },
  beforeDestroy() {
    this.$bus.$off('map');
  },
};
</script>

<style>

</style>
