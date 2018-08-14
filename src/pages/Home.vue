<template>
  <div>
    <div ref="map" class="map">
      <div class="toolbar">
        <div ref="button"></div>
        <div class="btn btn-sm" @click="slidePaneVisible = true; panelShowWho = 'MapControl';"
          :title="panelDragHead.MapControl">
          <vue-material-icon name="pan_tool" :size="vueMaterialIconSize"></vue-material-icon>
        </div>
        <div class="btn btn-sm" @click="slidePaneVisible = true; panelShowWho = 'Measurement';"
          :title="panelDragHead.Measurement">
          <vue-material-icon name="straighten" :size="vueMaterialIconSize"></vue-material-icon>
        </div>
        <div class="btn btn-sm" @click="slidePaneVisible = true; panelShowWho = 'LayerControl';"
          :title="panelDragHead.LayerControl">
          <vue-material-icon name="layers" :size="vueMaterialIconSize"></vue-material-icon>
        </div>
        <div class="btn btn-sm" @click="slidePaneVisible = true; panelShowWho = 'SearchControl';"
          :title="panelDragHead.SearchControl">
          <vue-material-icon name="search" :size="vueMaterialIconSize"></vue-material-icon>
        </div>
      </div>

      <div id="CoordinatesDiv" class="CoordinatesDesign">
        <div class="pull-left">{{ CoordinatesDivWGS84 }}</div>
        <div class="pull-left">{{ CoordinatesDivTWD97 }}</div>
        <div class="pull-left">{{ CoordinatesDivScale }}</div>
      </div>

      <div ref="panelDrag" class="panel panel-default"
        style="position: absolute; left: 200px; top: 200px; z-index: 999;"
        v-show="slidePaneVisible">
        <div ref="panelDragHead" class="panel-heading">
          {{ panelDragHead[panelShowWho] }}
          <button type="button" class="close" aria-label="Close" @click="slidePaneVisible = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="panel-body">
          <MapControl v-show="'MapControl' === panelShowWho" :extent="extent"></MapControl>
          <Measurement v-show="'Measurement' === panelShowWho"></Measurement>
          <LayerControl v-show="'LayerControl' === panelShowWho" :baseLayer="baseLayer"></LayerControl>
          <SearchControl v-show="'SearchControl' === panelShowWho"></SearchControl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadScript, loadModules } from 'esri-loader';

import MapControl from '../components/mapTool/MapControl';
import Measurement from '../components/mapTool/Measurement';
import LayerControl from '../components/mapTool/LayerControl';
import SearchControl from '../components/mapTool/SearchControl';

import { ArcGISServiceUrl, proxyUrl } from '../assets/js/setUrl';
import { TransCoordTWD97ToWGS84 } from '../assets/js/mapTool/mapTool';
import Drag from '../../static/lib/dom-drag/dom-drag';


// preload the ArcGIS API
const options = {
  url: 'https://js.arcgis.com/3.23',
};

loadScript(options);

export default {
  name: 'Home',
  data() {
    return {
      vueMaterialIconSize: 20,
      slidePaneVisible: false,
      panelShowWho: '',
      panelDragHead: { // 手動標題切換, 配合 Drag 事件
        MapControl: '地圖操作',
        Measurement: '測量工具',
        LayerControl: '圖層控制',
        SearchControl: '屬性查詢',
      },
      CoordinatesDivWGS84: '', // WGS84 座標文字
      CoordinatesDivTWD97: '', // TWD97 座標文字
      CoordinatesDivScale: '', // Scale 座標文字
      baseLayer: null,
      extent: null,
    };
  },
  components: {
    MapControl,
    Measurement,
    LayerControl,
    SearchControl,
  },
  mounted() {
    const vm = this;

    loadModules([
      'esri/map', 'esri/urlUtils',
      'esri/layers/DynamicMapServiceLayer',
      'esri/dijit/HomeButton',
    ])
      .then(([
        Map, urlUtils,
        DynamicMapServiceLayer,
        HomeButton,
      ]) => {
        let mp; // mapPoint

        const extent = new esri.geometry.Extent({
          xmin: 111499.494,
          ymin: 2579174.848,
          xmax: 238433.602,
          ymax: 2643005.705,
          spatialReference: { wkid: 3826 },
        });

        vm.extent = extent;

        const map = new Map(this.$refs.map, {
          // basemap: 'gray',
          extent,
          zoom: 12,
          minScale: 500000,
          logo: false,
          showLabels: true,
        });

        this.$bus.$emit('map', map);

        // Proxy
        urlUtils.addProxyRule({
          urlPrefix: `http://${ArcGISServiceUrl}/arcgis`,
          proxyUrl: `http://${proxyUrl}/AuthToken/proxy.ashx`,
        });
        // end Proxy

        // WebMapLayer function
        const addWebMapLayer = (url, layers, srs, format, version) => {
          // const outWkid = srs.substring(srs.indexOf(':') + 1);
          dojo.declare('WebWMSLayer', DynamicMapServiceLayer, {
            constructor() {
              this.initialExtent = this.fullExtent = extent;
              this.spatialReference = { wkid: 3826 };
              this.loaded = true;
              this.onLoad(this);
            },
            getImageUrl(extent, width, height, callback) {
              const pointMin = new esri.geometry.Point(
                extent.xmin,
                extent.ymin,
                map.spatialReference,
              );
              const pointMax = new esri.geometry.Point(
                extent.xmax,
                extent.ymax,
                map.spatialReference,
              );

              // const ll = TransCoord(
              //   'EPSG:3826',
              //   'EPSG:4326',
              //   new proj4.toPoint([formatFloat(mp.x, 8), formatFloat(mp.y, 8)])
              // );

              // const outSR = new esri.SpatialReference({
              //   wkid: outWkid
              // });

              // gsvc.project([pointMin, pointMax], outSR, function (projectedPoints) {
              //   pointMin = projectedPoints[0];
              //   pointMax = projectedPoints[1];

              const params = {
                REQUEST: 'GetMap',
                SERVICE: 'WMS',
                TRANSPARENT: true,
                FORMAT: format,
                VERSION: version,
                LAYERS: layers,
                STYLES: '',
                // exceptions: 'application/vnd.ogc.se_xml',
                // changing values
                BBOX: `${pointMin.x},${pointMin.y},${pointMax.x},${pointMax.y}`,
                // srs: 'EPSG:' + extent.spatialReference.wkid,
                SRS: srs,
                // CRS: srs,
                WIDTH: width,
                HEIGHT: height,
              };

              callback(`${url}?${dojo.objectToQuery(params)}`);
            },
          });
        };
        // end WebMapLayer function

        // WebMapLayer
        const baseLayer = [];
        baseLayer.push(
          {
            url: 'http://192.168.0.97/qgis/mapsvr',
            layerSetting: {
              name: 'TEST',
              ref: 'EPSG:3826',
              img: 'image/png',
              version: '1.3.1',
              id: 'county',
              opacity: 1,
              visible: true,
              title: 'QGIS圖層',
            },
            layerType: 'WMSLayer',
          },
          {
            url: 'http://wms.nlsc.gov.tw/wms',
            layerSetting: {
              name: 'B5000',
              ref: 'EPSG:3826',
              img: 'image/png',
              version: '1.1.1',
              id: 'EMAP',
              opacity: 1,
              visible: false,
              title: '1/5000基本地形圖',
            },
            layerType: 'WMSLayer',
          },
          {
            url: 'http://wms.nlsc.gov.tw/wms',
            layerSetting: {
              name: 'PHOTO2',
              ref: 'EPSG:3826',
              img: 'image/png',
              version: '1.1.1',
              id: 'EMAP_PHOTO2',
              opacity: 1,
              visible: false,
              title: '衛星影像',
            },
            layerType: 'WMSLayer',
          },
          {
            url: 'http://wms.nlsc.gov.tw/wms',
            layerSetting: {
              name: 'EMAP',
              ref: 'EPSG:3826',
              img: 'image/png',
              version: '1.1.1',
              id: 'EMAP_Vector',
              opacity: 1,
              visible: true,
              title: '通用版電子地圖',
            },
            layerType: 'WMSLayer',
          },
        );

        dojo.connect(map, 'onLayersAddResult', () => {
          for (let l = 0; l < baseLayer.length; l += 1) {
            map.getLayer(baseLayer[l].layerSetting.id)
              .setOpacity(baseLayer[l].layerSetting.opacity);
            map.getLayer(baseLayer[l].layerSetting.id)
              .setVisibility(baseLayer[l].layerSetting.visible);
            map.reorderLayer(map.getLayer(baseLayer[l].layerSetting.id), 0);

            vm.baseLayer = baseLayer;
          }
        });

        const toAddLayerArray = [];

        for (let l = 0; l < baseLayer.length; l += 1) {
          addWebMapLayer(
            baseLayer[l].url,
            baseLayer[l].layerSetting.name,
            baseLayer[l].layerSetting.ref,
            baseLayer[l].layerSetting.img,
            baseLayer[l].layerSetting.version,
          );
          const webMapLayer = new WebWMSLayer();
          webMapLayer.id = baseLayer[l].layerSetting.id; // 1/5000基本地形圖
          // console.log(webMapLayer);
          toAddLayerArray.push(webMapLayer);
        }

        map.addLayers(toAddLayerArray);
        // end WebMapLayer

        // HomeButton
        const homeButton = new HomeButton({
          map,
        }, this.$refs.button);

        homeButton.startup();
        // end HomeButton

        // CoordinatesText
        const showCoordinates = (evt) => {
          mp = evt.mapPoint;

          if (!mp.x) {
            return false;
          }

          vm.CoordinatesDivTWD97 = `TWD97： ${mp.x.toFixed(1)}, ${mp.y.toFixed(1)}`;

          const w84 = TransCoordTWD97ToWGS84(mp.x, mp.y);

          const minuteX = Math.floor((w84.Lon - Math.floor(w84.Lon)) * 60);
          const secondX = (Math.floor(((w84.Lon - Math.floor(w84.Lon)) * 60)
            - Math.floor((w84.Lon - Math.floor(w84.Lon)) * 60)) * 60 * 10) / 10;
          const minuteY = Math.floor((w84.Lat - Math.floor(w84.Lat)) * 60);
          const secondY = (Math.floor(((w84.Lat - Math.floor(w84.Lat)) * 60)
            - Math.floor((w84.Lat - Math.floor(w84.Lat)) * 60)) * 60 * 10) / 10;

          vm.CoordinatesDivWGS84 = `DMS：${Math.floor(w84.Lon)}°${minuteX}'${secondX}" ,${Math.floor(w84.Lat)}°${minuteY}'${secondY}"`;

          vm.CoordinatesDivScale = `比例尺： 1:${map.getScale().toFixed(0)}`;
        };

        map.on('mouse-move', showCoordinates);
        map.on('mouse-drag', showCoordinates);
        // end CoordinatesText
      })
      .catch((err) => {
        console.error(err);
      });

    Drag.init(vm.$refs.panelDragHead, vm.$refs.panelDrag);
  },
};
</script>

<style scoped>
  @import url('https://js.arcgis.com/3.23/esri/css/esri.css');
  @import url('https://js.arcgis.com/3.23/esri/themes/calcite/dijit/calcite.css');

  .map {
    width: 100vw;
    height: 100vh;
  }

  .toolbar {
    position: absolute;
    top: 90px;
    left: 21px;
    z-index: 50;
    display: block;
  }

  .toolbar > div.btn {
    width: 30px;
    height: 30px;
    background-color: #666;
    background-color: rgba(102,102,102,0.80);
    border-radius: 5px;
    color: white;
    font-size: 15px;
    padding: 4px 4px;
    display: block;
    margin-top: 0.5rem;
  }

  .toolbar > div.btn:active {
    background-color: #79939d;
    border: 1px solid #71b3f7;
  }

  .toolbar > div.btn:hover {
    background-color: #333;
    background-color: rgba(102,102,102,0.90);
  }

  .pull-left {
    margin-right: 1rem;
  }

  /*座標字樣*/
  .CoordinatesDesign {
      /*background: linear-gradient(270deg, rgb(112, 112, 112), rgb(255, 255, 255));*/
      /*background: -webkit-linear-gradient(270deg, rgb(112, 112, 112), rgb(255, 255, 255));*/
      /*border: 1px solid #a1a1a1;*/
      text-shadow: 0 1px 0 #000, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
        0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1),
        0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25),
        0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);
      font-size: 13px;
      text-align: left;
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 30
  }

  .CoordinatesDesign .floatLeft {
      margin-right: .7rem;
  }
</style>
