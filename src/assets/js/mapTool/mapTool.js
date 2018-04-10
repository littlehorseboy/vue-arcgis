import proj4 from 'proj4';
// import Wkt from '../../../../node_modules/wicket/wicket';
import 'wicket/wicket-arcgis';

const wkt = new Wkt.Wkt();


// proj4 定義 TWD97 的轉換標準
proj4.defs([
  [
    'EPSG:3826',
    '+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs',
  ],
]);

const EPSG4326 = new proj4.Proj('WGS84');
const EPSG3826 = new proj4.Proj('EPSG:3826');

// WGS84 轉 TWD97
export const TransCoord = (x, y) => {
  let result;
  if (proj4) {
    const p = new proj4.toPoint([parseFloat(x), parseFloat(y)]);
    const TWD97 = proj4.transform(EPSG4326, EPSG3826, [p.x, p.y]);
    result = { x: TWD97.x, y: TWD97.y };
  }
  return result;
};

// TWD97 轉 WGS84
export const TransCoordTWD97ToWGS84 = (x, y) => {
  let result;
  if (proj4) {
    const p = new proj4.toPoint([parseFloat(x), parseFloat(y)]);
    const WGS84 = proj4.transform(EPSG3826, EPSG4326, [p.x, p.y]);
    result = { Lon: WGS84.x, Lat: WGS84.y };
  }
  return result;
};

// 經緯度 轉換為 度分秒
export const formatDegree = (val) => {
  const value = Math.abs(val);
  const v1 = Math.floor(value); // 度
  const v2 = Math.floor((value - v1) * 60); // 分
  const v3 = Math.round((value - v1) * 3600 % 60); // 秒
  return `${v1}°${v2}'${v3}"`;
};

// WKT轉ArcGISJS obj
export const WKTtoArcGISOBJ = (wktString) => {
  try { // Catch any malformed WKT strings
    wkt.read(wktString);
  } catch (e1) {
    try {
      debugger;
      wkt.read(e1.value.replace('\n', '').replace('\r', '').replace('\t', ''));
    } catch (e2) {
      if (e2.name === 'WKTError') {
        alert('Wicket could not understand the WKT string you entered. Check that you have parentheses balanced, and try removing tabs and newline characters.');
        return false;
      }
    }
  }

  const config = {
    spatialReference: {
      // wkid: 4326 // WGS84 unprojected
      wkid: 3826,
      // latestWkid: 3826
    },
  };

  const obj = wkt.toObject(config); // Make an object
  return obj;
};
