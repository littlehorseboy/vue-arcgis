<template>
  <div>
    <div ref="map" class="map">
      <div ref="button"></div>
      <div id="CoordinatesDiv" class="CoordinatesDesign">
        <div class="pull-left">{{ CoordinatesDivWGS84 }}</div>
        <div class="pull-left">{{ CoordinatesDivTWD97 }}</div>
        <div class="pull-left">{{ CoordinatesDivScale }}</div>
      </div>

      <div ref="panelDrag" class="panel panel-default" style="position: absolute; left: 200px; top: 200px; z-index: 999;">
        <div ref="panelDragHead" class="panel-heading">地圖操作</div>
        <div class="panel-body">
          <MapControl></MapControl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import MapControl from '../components/mapTool/MapControl';
import Drag from '../../static/lib/dom-drag/dom-drag';

export default {
  name: 'Home',
  data() {
    return {
      slidePaneVisible: false,
      CoordinatesDivWGS84: '', // WGS84 座標文字
      CoordinatesDivTWD97: '', // TWD97 座標文字
      CoordinatesDivScale: '', // Scale 座標文字
    };
  },
  components: {
    MapControl,
  },
  mounted() {
    const vm = this;
    const ArcGISServiceUrl = '59.125.203.147';
    const proxyUrl = '192.168.15.134';

    // TWD97轉經緯度
    function twd97_to_latlng(_x, _y) {
      const pow = Math.pow, M_PI = Math.PI;
      const sin = Math.sin, cos = Math.cos, tan = Math.tan;
      const _a = 6378137.0, _b = 6356752.314245;
      const _lng0 = 121 * M_PI / 180, _k0 = 0.9999, _dx = 250000, _dy = 0;
      const _e = pow((1 - pow(_b, 2) / pow(_a, 2)), 0.5);

      _x -= _dx;
      _y -= _dy;

      const _M = _y / _k0;

      const _mu = _M / (_a * (1.0 - pow(_e, 2) / 4.0 - 3 * pow(_e, 4) / 64.0 - 5 * pow(_e, 6) / 256.0));
      const _e1 = (1.0 - pow((1.0 - pow(_e, 2)), 0.5)) / (1.0 + pow((1.0 - pow(_e, 2)), 0.5));

      const _J1 = (3 * _e1 / 2 - 27 * pow(_e1, 3) / 32.0);
      const _J2 = (21 * pow(_e1, 2) / 16 - 55 * pow(_e1, 4) / 32.0);
      const _J3 = (151 * pow(_e1, 3) / 96.0);
      const _J4 = (1097 * pow(_e1, 4) / 512.0);

      const _fp = _mu + _J1 * sin(2 * _mu) + _J2 * sin(4 * _mu) + _J3 * sin(6 * _mu) + _J4 * sin(8 * _mu);

      const _e2 = pow((_e * _a / _b), 2);
      const _C1 = pow(_e2 * cos(_fp), 2);
      const _T1 = pow(tan(_fp), 2);
      const _R1 = _a * (1 - pow(_e, 2)) / pow((1 - pow(_e, 2) * pow(sin(_fp), 2)), (3.0 / 2.0));
      const _N1 = _a / pow((1 - pow(_e, 2) * pow(sin(_fp), 2)), 0.5);

      const _D = _x / (_N1 * _k0);

      const _Q1 = _N1 * tan(_fp) / _R1;
      const _Q2 = (pow(_D, 2) / 2.0);
      const _Q3 = (5 + 3 * _T1 + 10 * _C1 - 4 * pow(_C1, 2) - 9 * _e2) * pow(_D, 4) / 24.0;
      const _Q4 = (61 + 90 * _T1 + 298 * _C1 + 45 * pow(_T1, 2) - 3 * pow(_C1, 2) - 252 * _e2) * pow(_D, 6) / 720.0;
      let _lat = _fp - (_Q1 * (_Q2 - _Q3 + _Q4));

      const _Q5 = _D;
      const _Q6 = (1 + 2 * _T1 + _C1) * pow(_D, 3) / 6;
      const _Q7 = (5 - 2 * _C1 + 28 * _T1 - 3 * pow(_C1, 2) + 8 * _e2 + 24 * pow(_T1, 2)) * pow(_D, 5) / 120.0;
      let _lng = _lng0 + ((_Q5 - _Q6 + _Q7) / cos(_fp));

      _lat = (_lat * 180) / M_PI;
      _lng = (_lng * 180) / M_PI;

      return {
        lat: _lat,
        lng: _lng,
      };
    }

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

        const map = new Map(this.$refs.map, {
          // basemap: 'gray',
          extent,
          zoom: 12,
          minScale: 500000,
          logo: false,
          showLabels: true,
        });

        // event bus
        vm.$bus.$emit('map', map);

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

        homeButton.domNode.style.position = 'absolute';
        homeButton.domNode.style.top = '90px';
        homeButton.domNode.style.left = '21px';
        homeButton.domNode.style.zIndex = 50;

        homeButton.startup();
        // end HomeButton

        // CoordinatesText
        const showCoordinates = (evt) => {
          mp = evt.mapPoint;

          if (!mp.x) {
            return false;
          }

          vm.CoordinatesDivTWD97 = `TWD97： ${mp.x.toFixed(1)}, ${mp.y.toFixed(1)}`;

          const w84 = twd97_to_latlng(mp.x, mp.y);

          const minuteX = Math.floor((w84.lng - Math.floor(w84.lng)) * 60);
          const secondX = (Math.floor(((w84.lng - Math.floor(w84.lng)) * 60)
            - Math.floor((w84.lng - Math.floor(w84.lng)) * 60)) * 60 * 10) / 10;
          const minuteY = Math.floor((w84.lat - Math.floor(w84.lat)) * 60);
          const secondY = (Math.floor(((w84.lat - Math.floor(w84.lat)) * 60)
            - Math.floor((w84.lat - Math.floor(w84.lat)) * 60)) * 60 * 10) / 10;

          vm.CoordinatesDivWGS84 = `DMS：${Math.floor(w84.lng)}°${minuteX}'${secondX}" ,${Math.floor(w84.lat)}°${minuteY}'${secondY}"`;

          vm.CoordinatesDivScale = `比例尺： 1:${map.getScale().toFixed(0)}`;
        };

        map.on('mouse-move', showCoordinates);
        map.on('mouse-drag', showCoordinates);
        // end CoordinatesText
      })
      .catch((err) => {
        console.log(err);
      });

      Drag.init(vm.$refs.panelDragHead, vm.$refs.panelDrag);
  },
};
</script>

<style scoped>
  @import url('https://js.arcgis.com/3.23/esri/css/esri.css');

  .map {
    width: 100vw;
    height: 100vh;
  }

  .pull-left {
    margin-right: 1rem;
  }

  /*座標字樣*/
.CoordinatesDesign {
    /*background: linear-gradient(270deg, rgb(112, 112, 112), rgb(255, 255, 255));*/
    /*background: -webkit-linear-gradient(270deg, rgb(112, 112, 112), rgb(255, 255, 255));*/
    /*border: 1px solid #a1a1a1;*/
    text-shadow: 0 1px 0 #000, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);
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
