<template>
  <div>
    <div class="card bg-light mb-3">
      <div class="card-header">地圖操作</div>
      <div class="card-body">
        <button id="panBtn" class="btn btn-sm btn-outline-info btn-block">
          <span class="icon-hand-stop-o" aria-hidden="true"></span>
          平移
        </button>
        <button id="zoominBtn" class="btn btn-sm btn-outline-info btn-block">
          <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
          框選放大
        </button>
        <button id="zoomoutBtn" class="btn btn-sm btn-outline-info btn-block">
          <span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span>
          框選縮小
        </button>
        <button id="zoomfullextBtn" class="btn btn-sm btn-outline-info btn-block">
          <span class="oi oi-globe" aria-hidden="true"></span>
          全圖
        </button>
        <button id="zoomprevBtn" class="btn btn-sm btn-outline-info btn-block">
          <span class="oi oi-action-undo" aria-hidden="true"></span>
          上一步
        </button>
        <button id="zoomnextBtn" class="btn btn-sm btn-outline-info btn-block">
          <span class="oi oi-action-redo" aria-hidden="true"></span>
          下一步
        </button>
        <!--<button id="deactivateBtn" class="btn btn-sm btn-outline-info btn-block">工具取消</button>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapControl',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
