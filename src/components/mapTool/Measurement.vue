<template>
  <div id="measurementDiv">

  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import { ArcGISServiceUrl } from '../../assets/js/setUrl';
import { TransCoord } from '../../assets/js/mapTool';

export default {
  name: 'Measurement',
  data() {
    return {
      map: null,
    };
  },
  created() {
    const vm = this;
    this.$bus.$on('map', (event) => {
      vm.map = event;

      loadModules([
        'esri/units',
        'esri/tasks/GeometryService',
        'esri/dijit/Measurement',
      ])
        .then(([
          Units,
          GeometryService,
          Measurement,
        ]) => {
          // 量測工具須用到
          esriConfig.defaults.geometryService = new GeometryService(
            `http://${ArcGISServiceUrl}/arcgis/rest/services/Utilities/Geometry/GeometryServer`,
          );

          // 量測
          const measurement = new Measurement({
            map: vm.map,
            defaultAreaUnit: Units.SQUARE_METERS,
            defaultLengthUnit: Units.METERS,
          }, document.getElementById('measurementDiv'));
          measurement.startup();
          measurement._unitStrings.esriDecimalDegrees = 'TWD97';
          measurement._locationUnitStrings = ['TWD97'];
          const MeasurementTableHeader = document.querySelectorAll('table.esriMeasurementResultTable td.esriMeasurementTableHeader')[0];
          MeasurementTableHeader.textContent = 'X座標';
          const MeasurementTableHeader2 = document.querySelectorAll('table.esriMeasurementResultTable td.esriMeasurementTableHeader')[1];
          MeasurementTableHeader2.textContent = 'Y座標';
          measurement.mouseLatitude = '';
          measurement.mouseLongitude = '';
          measurement.on('measure-end', (meevt) => {
            const point = TransCoord(meevt.geometry.x, meevt.geometry.y);
            document.querySelector('span[dojoattachpoint="markerLatitude"]').textContent = point.x.toFixed(3);
            document.querySelector('span[dojoattachpoint="markerLongitude"]').textContent = point.y.toFixed(3);
            // this.setTool(evt.activeTool, false);
            // console.log(measurement.getTool());
          });

          // measurement.on('tool-change', function (evt) {
          //     if (evt.target.activeTool != null)
          //         isMeasure = true;
          //     else
          //         isMeasure = false;
          // });
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

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
