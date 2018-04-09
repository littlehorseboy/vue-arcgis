<template>
  <div>

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active">
        <a href="#Road" aria-controls="home" role="tab" data-toggle="tab">道路</a>
      </li>
      <li role="presentation">
        <a href="#HN" aria-controls="profile" role="tab" data-toggle="tab">門牌</a>
      </li>
      <li role="presentation">
        <a href="#Coordinate" aria-controls="messages" role="tab" data-toggle="tab">座標</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="Road">
        <div class="form-group">
          <label>行政區</label>
          <select class="form-control" v-model="town">
            <option v-for="(option, index) in townOptions" :key="index" :value="option.value">
              {{ option.value }} {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>道路</label>
          <select class="form-control" v-model="road">
            <option v-for="(option, index) in roadOptions" :key="index" :value="option.value">
              {{ option.value }} {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>段名</label>
          <select class="form-control" v-model="roadSect">
            <option v-for="(option, index) in roadSectOptions" :key="index" :value="option.value">
              {{ option.value }} {{ option.text }}
            </option>
          </select>
          <p class="help-block">非必填</p>
        </div>
        <button class="btn btn-default">查詢</button>
      </div>

      <div role="tabpanel" class="tab-pane" id="HN">

      </div>

      <div role="tabpanel" class="tab-pane" id="Coordinate">

      </div>
    </div>

  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
// import { ArcGISServiceUrl } from '../../assets/js/setUrl';
import { TransCoord } from '../../assets/js/mapTool';

export default {
  name: 'LayerControl',
  data() {
    return {
      map: null,

      town: null,
      townOptions: [],
      road: null,
      roadOptions: [],
      roadSect: null,
      roadSectOptions: [],
    };
  },
  props: {

  },
  methods: {

  },
  created() {
    const vm = this;
    this.$bus.$on('map', (event) => {
      vm.map = event;

      loadModules([

      ])
        .then((

        ) => {

          const httpRequest = new XMLHttpRequest();

          if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
          }
          httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if (httpRequest.status === 200) {
                const result = JSON.parse(httpRequest.responseText);
                result.forEach((data) => {
                  vm.townOptions.push({name: data.roadname, value: data.roadname});
                });
                console.log(httpRequest.responseText);
              } else {
                console.log('There was a problem with the request.');
              }
            }
          };
          httpRequest.open('GET', 'http://webapplication120170215025150.azurewebsites.net/XinyiQuery1.ashx?ListRoadname=1');
          httpRequest.send();

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
  .tab-pane {
    padding-top: 0.5rem;
  }
</style>
