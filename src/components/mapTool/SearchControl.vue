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
          <select class="form-control" v-model="HNroad">
            <option v-for="(option, index) in HNroadOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>段名</label>
          <select class="form-control" v-model="HNroadSect">
            <option v-for="(option, index) in HNroadSectOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
          <p class="help-block">非必填</p>
        </div>
        <div class="form-group">
          <label>巷</label>
          <select class="form-control" v-model="HNlane">
            <option v-for="(option, index) in HNlaneOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>弄</label>
          <select class="form-control" v-model="HNalley">
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
      HNroad: 'null',
      HNroadOptions: [],
      HNroadSect: 'null',
      HNroadSectOptions: [],
      HNlane: 'null',
      HNlaneOptions: [],
      HNalley: 'null',
      HNalleyOptions: [],
      HN: 'null',
      HNOptions: [],
    };
  },
  props: {

  },
  mounted() {
    const vm = this;

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
    this.HNroadFunc();
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
      this.HNroadFunc();
    },
    HNroad(val) {
      const vm = this;

      // HN road Sect select option add
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
            vm.HNroadSectOptions = []; // clear array
            result.forEach((data) => {
              vm.HNroadSectOptions.push({ text: data.sect, value: data.sect }); // option add
              if (first) {
                vm.HNroadSect = data.sect; // selected value
                first = false;
              }
            });
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${val}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNroadSect(val) {
      const vm = this;

      // HN lane select option add
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
            vm.HNlaneOptions = []; // clear array
            result.forEach((data) => {
              vm.HNlaneOptions.push({ text: data.lane, value: data.lane }); // option add
              if (first) {
                vm.HNlane = data.lane; // selected value
                first = false;
              }
            });
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${this.HNroad}&sect=${val}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNLane(val) {
      const vm = this;

      // HN alley select option add
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
            vm.HNalleyOptions = []; // clear array
            result.forEach((data) => {
              vm.HNalleyOptions.push({ text: data.alley, value: data.alley }); // option add
              if (first) {
                vm.HNalley = data.alley; // selected value
                first = false;
              }
            });
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${this.HNroad}&sect=${this.HNroadSect}&lane=${val}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNAlley(val) {
      const vm = this;

      // HN alley select option add
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
            vm.HNOptions = []; // clear array
            result.forEach((data) => {
              debugger;
              vm.HNOptions.push({ text: data.alley, value: data.alley }); // option add
              if (first) {
                vm.HN = data.alley; // selected value
                first = false;
              }
            });
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&street=${this.HNroad}&sect=${this.HNroadSect}&lane=${this.lane}&alley=${val}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
  },
  methods: {
    roadSearch() {
      const vm = this;

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
          const loadWKTtoExtent = (wktString) => {
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
          const loadWKTtoDraw = (wktString) => {
            const obj = WKTtoArcGISOBJ(wktString); // Make an object
            let symbol;

            switch (obj.type) {
              case 'point':
                symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, Color([255, 0, 0]), 1), Color([0, 255, 0, 0.25]));
                break;
              case 'polyline': //
                symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, Color([0, 255, 0, 0.5]), 5);
                break;
              case 'polygon':
                symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, Color([255, 0, 0]), 2), Color([255, 255, 0, 0.25]));
                break;
              case 'extent':
                symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, Color([255, 0, 0]), 2), Color([255, 255, 0, 0.25]));
                break;
              case 'multipoint':
                symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, 20, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, Color([0, 0, 0]), 1), Color([255, 255, 0, 0.5]));
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
        })
        .catch((err) => {
          console.error(err);
        });
    },
    HNroadFunc() {
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
            vm.HNroadOptions = [];
            result.forEach((data) => {
              vm.HNroadOptions.push({ text: data.street, value: data.street }); // option add
              if (first) {
                vm.HNroad = data.street; // selected value
                first = false;
              }
            });
          } else {
            console.log('There was a problem with the request.');
          }
        }
      };

      const param = `?townname=${this.HNtown}&StreetNameFilter=${this.HNroadFilter}`;

      httpRequest.open('GET', `http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx${param}`);
      httpRequest.send();
    },
    HNSearch() {

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
