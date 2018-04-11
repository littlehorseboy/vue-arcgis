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
      <!-- 道路查詢 -->
      <div role="tabpanel" class="tab-pane active" id="Road">
        <div class="form-group">
          <label>行政區</label>
          <select class="form-control" v-model="town">
            <option v-for="(option, index) in townOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>道路</label>
          <select class="form-control" v-model="road">
            <option v-for="(option, index) in roadOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>段名</label>
          <select class="form-control" v-model="roadSect">
            <option v-for="(option, index) in roadSectOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
          <p class="help-block">非必填</p>
        </div>
        <button class="btn btn-default" @click="roadSearch">查詢</button>
      </div>
      <!-- end 道路查詢 -->

      <!-- 門牌查詢 -->
      <div role="tabpanel" class="tab-pane" id="HN">
        <div class="form-group">
          <label>行政區</label>
          <select class="form-control" v-model="HNtown">
            <option v-for="(option, index) in HNtownOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>道路名篩選</label>
          <input class="form-control" v-model="HNroadFilter">
        </div>
        <div class="form-group">
          <label>道路</label>
          <select class="form-control" v-model="HNroad" @change="HNroadSectBuildFunc">
            <option v-for="(option, index) in HNroadOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>段名</label>
          <select class="form-control" v-model="HNroadSect" @change="HNlaneBuildFunc">
            <option v-for="(option, index) in HNroadSectOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
          <p class="help-block">非必填</p>
        </div>
        <div class="form-group">
          <label>巷</label>
          <select class="form-control" v-model="HNlane" @change="HNalleyBuildFunc">
            <option v-for="(option, index) in HNlaneOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>弄</label>
          <select class="form-control" v-model="HNalley" @change="HNBuildFunc">
            <option v-for="(option, index) in HNalleyOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>號</label>
          <select class="form-control" v-model="HN">
            <option v-for="(option, index) in HNOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <button class="btn btn-default" @click="HNSearch">查詢</button>
      </div>
      <!-- end 門牌查詢 -->

      <!-- 座標查詢 -->
      <div role="tabpanel" class="tab-pane" id="Coordinate">

      </div>
      <!-- end 座標查詢 -->
    </div>

  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import { WKTtoArcGISOBJ } from '../../assets/js/mapTool/mapTool';

let loadWKTtoExtent;
let loadWKTtoDraw;
let applySymbolToGraphic;

export default {
  name: 'SearchControl',
  data() {
    return {
      map: null,
      // 道路查詢
      town: '信義區',
      townOptions: [
        { text: '信義區', value: '信義區' },
      ],
      road: null,
      roadOptions: [],
      roadSect: null,
      roadSectOptions: [],
      // 門牌查詢
      HNtown: '信義區',
      HNtownOptions: [
        { text: '信義區', value: '信義區' },
      ],
      HNroadFilter: '',
      HNroad: 'NULL',
      HNroadOptions: [],
      HNroadSect: 'NULL',
      HNroadSectOptions: [],
      HNlane: 'NULL',
      HNlaneOptions: [],
      HNalley: 'NULL',
      HNalleyOptions: [],
      HN: 'NULL',
      HNOptions: [],
    };
  },
  props: {

  },
  created() {
    const vm = this;

    this.$bus.$on('map', (event) => {
      vm.map = event;
    });
  },
  mounted() {
    const vm = this;

    // [ loadWKTtoExtent, loadWKTtoDraw ] function build
    loadModules([
      'esri/graphic',
      'esri/Color',
      'esri/layers/GraphicsLayer',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/symbols/SimpleFillSymbol',
      'esri/geometry/Point',
    ])
      .then(([
        Graphic,
        Color,
        GraphicsLayer,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        SimpleFillSymbol,
        Point,
      ]) => {
        // 讀取 WKT 字串後 setExtent
        loadWKTtoExtent = (wktString) => {
          const obj = WKTtoArcGISOBJ(wktString); // Make an object

          if (obj.type === 'point') {
            vm.map.centerAndZoom(new Point(obj.x, obj.y, 3826));
            vm.map.setScale(1000);
          } else {
            const ext = obj.getExtent();
            vm.map.setExtent(ext);
          }
        };

        // 讀取WKT字串
        loadWKTtoDraw = (wktString) => {
          const obj = WKTtoArcGISOBJ(wktString); // Make an object
          let symbol;

          switch (obj.type) {
            case 'point':
              symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE,
                10,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, Color([255, 0, 0]), 1),
                Color([0, 255, 0, 0.25]));
              break;
            case 'polyline': //
              symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                Color([0, 255, 0, 0.5]),
                5);
              break;
            case 'polygon':
              symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, Color([255, 0, 0]), 2),
                Color([255, 255, 0, 0.25]));
              break;
            case 'extent':
              symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, Color([255, 0, 0]), 2),
                Color([255, 255, 0, 0.25]));
              break;
            case 'multipoint':
              symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND,
                20,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, Color([0, 0, 0]), 1),
                Color([255, 255, 0, 0.5]));
              break;
            default:
              break;
          }

          const graphic = new Graphic(obj, symbol);
          let generalGraphicsLayer;

          if (vm.map.getLayer('generalGraphicsLayer') === undefined) {
            generalGraphicsLayer = new GraphicsLayer({ id: 'generalGraphicsLayer' });
            generalGraphicsLayer.spatialReference.wkid = 3826;
            vm.map.addLayer(generalGraphicsLayer);
          } else {
            generalGraphicsLayer = vm.map.getLayer('generalGraphicsLayer');
          }

          generalGraphicsLayer.add(graphic);
        };

        // 查詢完坐標繪製中心點
        applySymbolToGraphic = (obj) => {
          const xyPoint = new Point(obj.x, obj.y, obj.spatialReference);
          vm.map.graphics.clear();
          let geom;

          const markerSymbol = new SimpleMarkerSymbol();
          markerSymbol.setPath('M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z');
          markerSymbol.setSize('18');
          markerSymbol.setColor(new Color('#ed362e'));

          if (markerSymbol.type.indexOf('markersymbol') > -1) {
            geom = xyPoint; // vm.map.extent.getCenter();
          }

          // if (symbol.type.indexOf('fillsymbol') > -1) {
          //    geom = Polygon.fromExtent(vm.map.extent);
          // }

          // if (symbol.type.indexOf('linesymbol') > -1) {
          //    geom = new Polyline({
          //        paths: Polygon.fromExtent(vm.map.extent).rings,
          //        spatialReference: vm.map.spatialReference
          //    });
          // }

          vm.map.graphics.add(new Graphic(geom, markerSymbol));
        };
      })
      .catch((err) => {
        console.error(err);
      });
    // end [ loadWKTtoExtent, loadWKTtoDraw ] function build

    // road select option add
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          const result = JSON.parse(httpRequest.responseText);
          let first = true;
          result.forEach((data) => {
            vm.roadOptions.push({ text: data.roadname, value: data.roadname }); // option add
            if (first) {
              vm.road = data.roadname; // selected value
              first = false;
            }
          });
          // console.log(httpRequest.responseText);
        } else {
          console.log('There was a problem with the request.');
        }
      }
    };

    const param = '?ListRoadname=1';

    httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQuery1.ashx${param}`);
    httpRequest.send();

    // HN select option add
    this.HNroadBuildFunc();
  },
  watch: {
    road(val) {
      const vm = this;

      // road Sect select option add
      const httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const result = JSON.parse(httpRequest.responseText);
            let first = true;
            vm.roadSectOptions = []; // clear array
            result.forEach((data) => {
              const address = data.address2.replace(data.roadname, '');
              vm.roadSectOptions.push({ text: address, value: address }); // option add
              if (first) {
                vm.roadSect = address; // selected value
                first = false;
              }
            });
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?roadname=${val}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQuery1.ashx${param}`);
      httpRequest.send();
    },
    HNroadFilter() {
      this.HNroadBuildFunc();
    },
  },
  methods: {
    roadSearch() {
      const vm = this;
      // search Request
      const httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const result = JSON.parse(httpRequest.responseText);

            for (let i = 0; i < result.length; i += 1) {
              if (i === 0) {
                try { vm.map.getLayer('generalGraphicsLayer').clear(); } catch (err) { }
              }

              if (result[i].address2 === (vm.road ? vm.road : '') + (vm.roadSect ? vm.roadSect : '')) {
                loadWKTtoExtent(result[i].GEOMETRY);
                loadWKTtoDraw(result[i].GEOMETRY);
              }
            }
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?address=${(vm.road ? vm.road : '') + (vm.roadSect ? vm.roadSect : '')}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQuery1.ashx${param}`);
      httpRequest.send();
    },
    HNroadBuildFunc() {
      const vm = this;

      // HNroad select option add
      const httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const result = JSON.parse(httpRequest.responseText);
            let first = true;
            vm.HNroadOptions = []; // clear array
            vm.HNroadSectOptions = [];
            vm.HNlaneOptions = [];
            vm.HNalleyOptions = [];
            vm.HNOptions = [];
            result.forEach((data) => {
              vm.HNroadOptions.push({ text: data.street, value: data.street }); // option add
              if (first) {
                vm.HNroad = data.street; // selected value
                first = false;
              }
            });
            this.HNroadSectBuildFunc();
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&StreetNameFilter=${this.HNroadFilter}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNroadSectBuildFunc() {
      const vm = this;

      // HN road Sect select option add
      const httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const result = JSON.parse(httpRequest.responseText);
            let first = true;
            vm.HNroadSectOptions = []; // clear array
            vm.HNlaneOptions = [];
            vm.HNalleyOptions = [];
            vm.HNOptions = [];
            result.forEach((data) => {
              vm.HNroadSectOptions.push({ text: data.sect, value: data.sect ? data.sect : 'NULL' }); // option add
              if (first) {
                vm.HNroadSect = data.sect ? data.sect : 'NULL'; // selected value
                first = false;
              }
            });
            this.HNlaneBuildFunc();
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${this.HNroad}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNlaneBuildFunc() {
      const vm = this;

      // HNlane select option add
      const httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const result = JSON.parse(httpRequest.responseText);
            let first = true;
            vm.HNlaneOptions = []; // clear array
            vm.HNalleyOptions = [];
            vm.HNOptions = [];
            result.forEach((data) => {
              vm.HNlaneOptions.push({ text: data.lane, value: data.lane ? data.lane : 'NULL' }); // option add
              if (first) {
                vm.HNlane = data.lane ? data.lane : 'NULL'; // selected value
                first = false;
              }
            });
            this.HNalleyBuildFunc();
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${this.HNroad}&sect=${this.HNroadSect}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNalleyBuildFunc() {
      const vm = this;

      // HN alley select option add
      const httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const result = JSON.parse(httpRequest.responseText);
            let first = true;
            vm.HNalleyOptions = []; // clear array
            vm.HNOptions = [];
            result.forEach((data) => {
              vm.HNalleyOptions.push({ text: data.alley, value: data.alley ? data.alley : 'NULL' }); // option add
              if (first) {
                vm.HNalley = data.alley ? data.alley : 'NULL'; // selected value
                first = false;
              }
            });
            this.HNBuildFunc();
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${this.HNroad}&sect=${this.HNroadSect}&lane=${this.HNlane}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNBuildFunc() {
      const vm = this;

      // HN alley select option add
      const httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const result = JSON.parse(httpRequest.responseText);
            let first = true;
            vm.HNOptions = []; // clear array
            result.forEach((data) => {
              vm.HNOptions.push({ text: data.house_no, value: data.house_no }); // option add
              if (first) {
                vm.HN = data.house_no; // selected value
                first = false;
              }
            });
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${this.HNroad}&sect=${this.HNroadSect}&lane=${this.HNlane}&alley=${this.HNalley}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNSearch() {
      const vm = this;

      // HN
      const httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            const result = JSON.parse(httpRequest.responseText);

            for (let i = 0; i < result.length; i += 1) {
              if (i === 0) {
                try { vm.map.getLayer('generalGraphicsLayer').clear(); } catch (err) { }
              }

              loadWKTtoExtent(result[i].POINT);
              const obj = WKTtoArcGISOBJ(result[i].POINT);
              applySymbolToGraphic(obj);
            }
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${this.HNroad}&sect=${this.HNroadSect}
&lane=${this.HNlane}&alley=${this.HNalley}&house_no=${this.HN}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
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
