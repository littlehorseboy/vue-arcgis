webpackJsonp([1],{C9st:function(e,t){},DAqk:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("7+uW"),o={render:function(e,t){var a=t._c;return t.props.name?a("span",{staticClass:"material-icon",style:{fontSize:(t.props.size||24)+"px"}},[t._v("\n  "+t._s(t.props.name)+"\n")]):t._e()},staticRenderFns:[]};var r=a("VU/8")({name:"VueMaterialIcon"},o,!0,function(e){a("DAqk")},"data-v-80f1af94",null).exports,i=a("hKoQ"),s=a.n(i);a("C9st"),a("jf49");window.Promise||(window.Promise=s.a);var l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var c=a("VU/8")({name:"App"},l,!1,function(e){a("ie++")},null,null).exports,u=a("/ocq"),p=a("d7EF"),d=a.n(p),m=a("Meid"),v={name:"MapControl",data:function(){return{map:null,navToolbar:null}},props:{extent:{type:Object}},created:function(){var e=this;this.$bus.$on("map",function(t){e.map=t,Object(m.loadModules)(["esri/toolbars/navigation"]).then(function(t){var a=d()(t,1)[0];e.navToolbar=new a(e.map)}).catch(function(e){console.error(e)})})},methods:{mapControl:function(e){var t=this;switch(e){case"pan":t.navToolbar.activate(Navigation.PAN);break;case"zoomIn":t.navToolbar.activate(Navigation.ZOOM_IN);break;case"zoomOut":t.navToolbar.activate(Navigation.ZOOM_OUT);break;case"full":t.map.setExtent(t.extent,!0);break;case"prev":t.navToolbar.zoomToPrevExtent();break;case"next":t.navToolbar.zoomToNextExtent()}}},beforeDestroy:function(){this.$bus.$off("map")}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("button",{staticClass:"btn btn-sm btn-default btn-block",on:{click:function(t){e.mapControl("pan")}}},[a("vue-material-icon",{attrs:{name:"pan_tool",size:12}}),e._v("\n    平移\n  ")],1),e._v(" "),a("button",{staticClass:"btn btn-sm btn-default btn-block",on:{click:function(t){e.mapControl("zoomIn")}}},[a("span",{staticClass:"glyphicon glyphicon-zoom-in",attrs:{"aria-hidden":"true"}}),e._v("\n    框選放大\n  ")]),e._v(" "),a("button",{staticClass:"btn btn-sm btn-default btn-block",on:{click:function(t){e.mapControl("zoomOut")}}},[a("span",{staticClass:"glyphicon glyphicon-zoom-out",attrs:{"aria-hidden":"true"}}),e._v("\n    框選縮小\n  ")]),e._v(" "),a("button",{staticClass:"btn btn-sm btn-default btn-block",on:{click:function(t){e.mapControl("full")}}},[a("span",{staticClass:"glyphicon glyphicon-globe",attrs:{"aria-hidden":"true"}}),e._v("\n    全圖\n  ")]),e._v(" "),a("button",{staticClass:"btn btn-sm btn-default btn-block",on:{click:function(t){e.mapControl("prev")}}},[a("vue-material-icon",{attrs:{name:"undo",size:14}}),e._v("\n    上一步\n  ")],1),e._v(" "),a("button",{staticClass:"btn btn-sm btn-default btn-block",on:{click:function(t){e.mapControl("next")}}},[a("vue-material-icon",{attrs:{name:"redo",size:14}}),e._v("\n    下一步\n  ")],1)])},staticRenderFns:[]},f=a("VU/8")(v,h,!1,null,null,null).exports,y=a("qIkI"),b={name:"Measurement",data:function(){return{map:null}},created:function(){var e=this;this.$bus.$on("map",function(t){e.map=t,Object(m.loadModules)(["esri/units","esri/tasks/GeometryService","esri/dijit/Measurement"]).then(function(t){var a=d()(t,3),n=a[0],o=a[1],r=a[2];esriConfig.defaults.geometryService=new o("http://59.125.203.147/arcgis/rest/services/Utilities/Geometry/GeometryServer");var i=new r({map:e.map,defaultAreaUnit:n.SQUARE_METERS,defaultLengthUnit:n.METERS},document.getElementById("measurementDiv"));i.startup(),i._unitStrings.esriDecimalDegrees="TWD97",i._locationUnitStrings=["TWD97"],document.querySelectorAll("table.esriMeasurementResultTable td.esriMeasurementTableHeader")[0].textContent="X座標",document.querySelectorAll("table.esriMeasurementResultTable td.esriMeasurementTableHeader")[1].textContent="Y座標",i.mouseLatitude="",i.mouseLongitude="",i.on("measure-end",function(e){if("point"===e.geometry.type){var t=Object(y.a)(e.geometry.x,e.geometry.y);document.querySelector('span[dojoattachpoint="markerLatitude"]').textContent=t.x.toFixed(3),document.querySelector('span[dojoattachpoint="markerLongitude"]').textContent=t.y.toFixed(3)}})}).catch(function(e){console.error(e)})})},beforeDestroy:function(){this.$bus.$off("map")}},g={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("div",{attrs:{id:"measurementDiv"}})])}]};var _=a("VU/8")(b,g,!1,function(e){a("tsgZ")},null,null).exports,x={name:"LayerControl",data:function(){return{map:null}},props:{baseLayer:{type:Array}},methods:{toggleLayerV:function(e,t){t?this.map.getLayer(e).hide():this.map.getLayer(e).show()}},created:function(){var e=this;this.$bus.$on("map",function(t){e.map=t,Object(m.loadModules)([]).then(function(){}).catch(function(e){console.error(e)})})},beforeDestroy:function(){this.$bus.$off("map")}},w={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",e._l(e.baseLayer,function(t,n){return a("div",{key:n},[a("input",{attrs:{type:"checkbox"},domProps:{checked:t.layerSetting.visible},on:{click:function(a){e.toggleLayerV(t.layerSetting.id,t.layerSetting.visible),t.layerSetting.visible=!t.layerSetting.visible}}}),e._v("\n    "+e._s(t)+"\n  ")])}))},staticRenderFns:[]},S=a("VU/8")(x,w,!1,null,null,null).exports,N=void 0,H=void 0,L=void 0,M=void 0,T={name:"SearchControl",data:function(){return{map:null,town:"信義區",townOptions:[{text:"信義區",value:"信義區"}],road:null,roadOptions:[],roadSect:null,roadSectOptions:[],HNtown:"信義區",HNtownOptions:[{text:"信義區",value:"信義區"}],HNroadFilter:"",HNroad:"NULL",HNroadOptions:[],HNroadSect:"NULL",HNroadSectOptions:[],HNlane:"NULL",HNlaneOptions:[],HNalley:"NULL",HNalleyOptions:[],HN:"NULL",HNOptions:[],TWD97XTxt:"308407.630",TWD97YTxt:"2770908.023",LatTxt:"23.2",LonTxt:"120.25"}},props:{},created:function(){var e=this;this.$bus.$on("map",function(t){e.map=t})},mounted:function(){var e=this;Object(m.loadModules)(["esri/graphic","esri/Color","esri/layers/GraphicsLayer","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/geometry/Point"]).then(function(t){var a=d()(t,7),n=a[0],o=a[1],r=a[2],i=a[3],s=a[4],l=a[5],c=a[6];N=function(t){e.map.centerAt(new c(t.x,t.y,t.spatialReference))},H=function(t){var a=Object(y.c)(t);if("point"===a.type)e.map.centerAt(new c(a.x,a.y,3826)),e.map.setScale(1e3);else{var n=a.getExtent();e.map.setExtent(n)}},L=function(t){var a=Object(y.c)(t),c=void 0;switch(a.type){case"point":c=new i(i.STYLE_SQUARE,10,new s(s.STYLE_SOLID,o([255,0,0]),1),o([0,255,0,.25]));break;case"polyline":c=new s(s.STYLE_SOLID,o([0,255,0,.5]),5);break;case"polygon":case"extent":c=new l(l.STYLE_SOLID,new s(s.STYLE_DASHDOT,o([255,0,0]),2),o([255,255,0,.25]));break;case"multipoint":c=new i(i.STYLE_DIAMOND,20,new s(s.STYLE_SOLID,o([0,0,0]),1),o([255,255,0,.5]))}var u=new n(a,c),p=void 0;void 0===e.map.getLayer("generalGraphicsLayer")?((p=new r({id:"generalGraphicsLayer"})).spatialReference.wkid=3826,e.map.addLayer(p)):p=e.map.getLayer("generalGraphicsLayer"),p.add(u)},M=function(t){var a=new c(t.x,t.y,t.spatialReference);e.map.graphics.clear();var r=void 0,s=new i;s.setPath("M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"),s.setSize("18"),s.setColor(new o("#ed362e")),s.type.indexOf("markersymbol")>-1&&(r=a),e.map.graphics.add(new n(r,s))}}).catch(function(e){console.error(e)});var t=new XMLHttpRequest;if(!t)return alert("Giving up :( Cannot create an XMLHTTP instance"),!1;t.onreadystatechange=function(){if(t.readyState===XMLHttpRequest.DONE)if(200===t.status){var a=!0;JSON.parse(t.responseText).forEach(function(t){e.roadOptions.push({text:t.roadname,value:t.roadname}),a&&(e.road=t.roadname,a=!1)})}else console.log("There was a problem with the request.")};t.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQuery1.ashx?ListRoadname=1"),t.send(),this.HNroadBuildFunc()},watch:{road:function(e){var t=this,a=new XMLHttpRequest;if(!a)return alert("Giving up :( Cannot create an XMLHTTP instance"),!1;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)if(200===a.status){var e=JSON.parse(a.responseText),n=!0;t.roadSectOptions=[],e.forEach(function(e){var a=e.address2.replace(e.roadname,"");t.roadSectOptions.push({text:a,value:a}),n&&(t.roadSect=a,n=!1)})}else console.log("There was a problem with the request.")};var n="?roadname="+e;a.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQuery1.ashx"+n),a.send()},HNroadFilter:function(){this.HNroadBuildFunc()}},methods:{roadSearch:function(){var e=this,t=new XMLHttpRequest;if(!t)return alert("Giving up :( Cannot create an XMLHTTP instance"),!1;t.onreadystatechange=function(){if(t.readyState===XMLHttpRequest.DONE)if(200===t.status)for(var a=JSON.parse(t.responseText),n=0;n<a.length;n+=1){if(0===n)try{e.map.getLayer("generalGraphicsLayer").clear()}catch(e){}a[n].address2===(e.road?e.road:"")+(e.roadSect?e.roadSect:"")&&(H(a[n].GEOMETRY),L(a[n].GEOMETRY))}else console.log("There was a problem with the request.")};var a="?address="+((e.road?e.road:"")+(e.roadSect?e.roadSect:""));t.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQuery1.ashx"+a),t.send()},HNroadBuildFunc:function(){var e=this,t=this,a=new XMLHttpRequest;if(!a)return alert("Giving up :( Cannot create an XMLHTTP instance"),!1;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)if(200===a.status){var n=JSON.parse(a.responseText),o=!0;t.HNroadOptions=[],t.HNroadSectOptions=[],t.HNlaneOptions=[],t.HNalleyOptions=[],t.HNOptions=[],n.forEach(function(e){t.HNroadOptions.push({text:e.street,value:e.street}),o&&(t.HNroad=e.street,o=!1)}),e.HNroadSectBuildFunc()}else console.log("There was a problem with the request.")};var n="?townname="+this.HNtown+"&StreetNameFilter="+this.HNroadFilter;a.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx"+n),a.send()},HNroadSectBuildFunc:function(){var e=this,t=this,a=new XMLHttpRequest;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)if(200===a.status){var n=JSON.parse(a.responseText),o=!0;t.HNroadSectOptions=[],t.HNlaneOptions=[],t.HNalleyOptions=[],t.HNOptions=[],n.forEach(function(e){t.HNroadSectOptions.push({text:e.sect,value:e.sect?e.sect:"NULL"}),o&&(t.HNroadSect=e.sect?e.sect:"NULL",o=!1)}),e.HNlaneBuildFunc()}else console.log("There was a problem with the request.")};var n="?townname="+this.HNtown+"&street="+this.HNroad;a.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx"+n),a.send()},HNlaneBuildFunc:function(){var e=this,t=this,a=new XMLHttpRequest;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)if(200===a.status){var n=JSON.parse(a.responseText),o=!0;t.HNlaneOptions=[],t.HNalleyOptions=[],t.HNOptions=[],n.forEach(function(e){t.HNlaneOptions.push({text:e.lane,value:e.lane?e.lane:"NULL"}),o&&(t.HNlane=e.lane?e.lane:"NULL",o=!1)}),e.HNalleyBuildFunc()}else console.log("There was a problem with the request.")};var n="?townname="+this.HNtown+"&street="+this.HNroad+"&sect="+this.HNroadSect;a.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx"+n),a.send()},HNalleyBuildFunc:function(){var e=this,t=this,a=new XMLHttpRequest;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)if(200===a.status){var n=JSON.parse(a.responseText),o=!0;t.HNalleyOptions=[],t.HNOptions=[],n.forEach(function(e){t.HNalleyOptions.push({text:e.alley,value:e.alley?e.alley:"NULL"}),o&&(t.HNalley=e.alley?e.alley:"NULL",o=!1)}),e.HNBuildFunc()}else console.log("There was a problem with the request.")};var n="?townname="+this.HNtown+"&street="+this.HNroad+"&sect="+this.HNroadSect+"&lane="+this.HNlane;a.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx"+n),a.send()},HNBuildFunc:function(){var e=this,t=new XMLHttpRequest;t.onreadystatechange=function(){if(t.readyState===XMLHttpRequest.DONE)if(200===t.status){var a=JSON.parse(t.responseText),n=!0;e.HNOptions=[],a.forEach(function(t){e.HNOptions.push({text:t.house_no,value:t.house_no}),n&&(e.HN=t.house_no,n=!1)})}else console.log("There was a problem with the request.")};var a="?townname="+this.HNtown+"&street="+this.HNroad+"&sect="+this.HNroadSect+"&lane="+this.HNlane+"&alley="+this.HNalley;t.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx"+a),t.send()},HNSearch:function(){var e=this,t=new XMLHttpRequest;t.onreadystatechange=function(){if(t.readyState===XMLHttpRequest.DONE)if(200===t.status)for(var a=JSON.parse(t.responseText),n=0;n<a.length;n+=1){if(0===n)try{e.map.getLayer("generalGraphicsLayer").clear()}catch(e){}H(a[n].POINT);var o=Object(y.c)(a[n].POINT);M(o)}else console.log("There was a problem with the request.")};var a="?townname="+this.HNtown+"&street="+this.HNroad+"&sect="+this.HNroadSect+"\n&lane="+this.HNlane+"&alley="+this.HNalley+"&house_no="+this.HN;t.open("GET","http://webapplication120170215025150.azurewebsites.net/XinyiQueryHouseNo.ashx"+a),t.send()},TWD97Search:function(){N({x:this.TWD97XTxt,y:this.TWD97YTxt,spatialReference:3826}),M({x:this.TWD97XTxt,y:this.TWD97YTxt,spatialReference:3826})},LatLonSearch:function(){var e=Object(y.a)(this.LonTxt,this.LatTxt);N({x:e.x,y:e.y,spatialReference:3826}),M({x:e.x,y:e.y,spatialReference:3826})}},beforeDestroy:function(){this.$bus.$off("map")}},C={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),e._v(" "),a("div",{staticClass:"tab-content"},[a("div",{staticClass:"tab-pane active",attrs:{role:"tabpanel",id:"Road"}},[a("div",{staticClass:"form-group"},[a("label",[e._v("行政區")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.town,expression:"town"}],staticClass:"form-control",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.town=t.target.multiple?a:a[0]}}},e._l(e.townOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])}))]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("道路")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.road,expression:"road"}],staticClass:"form-control",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.road=t.target.multiple?a:a[0]}}},e._l(e.roadOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])}))]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("段名")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.roadSect,expression:"roadSect"}],staticClass:"form-control",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.roadSect=t.target.multiple?a:a[0]}}},e._l(e.roadSectOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])})),e._v(" "),a("p",{staticClass:"help-block"},[e._v("非必填")])]),e._v(" "),a("button",{staticClass:"btn btn-default",on:{click:e.roadSearch}},[e._v("查詢")])]),e._v(" "),a("div",{staticClass:"tab-pane",attrs:{role:"tabpanel",id:"HN"}},[a("div",{staticClass:"form-group"},[a("label",[e._v("行政區")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.HNtown,expression:"HNtown"}],staticClass:"form-control",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.HNtown=t.target.multiple?a:a[0]}}},e._l(e.HNtownOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])}))]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("道路名篩選")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.HNroadFilter,expression:"HNroadFilter"}],staticClass:"form-control",domProps:{value:e.HNroadFilter},on:{input:function(t){t.target.composing||(e.HNroadFilter=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("道路")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.HNroad,expression:"HNroad"}],staticClass:"form-control",on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.HNroad=t.target.multiple?a:a[0]},e.HNroadSectBuildFunc]}},e._l(e.HNroadOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])}))]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("段名")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.HNroadSect,expression:"HNroadSect"}],staticClass:"form-control",on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.HNroadSect=t.target.multiple?a:a[0]},e.HNlaneBuildFunc]}},e._l(e.HNroadSectOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])})),e._v(" "),a("p",{staticClass:"help-block"},[e._v("非必填")])]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("巷")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.HNlane,expression:"HNlane"}],staticClass:"form-control",on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.HNlane=t.target.multiple?a:a[0]},e.HNalleyBuildFunc]}},e._l(e.HNlaneOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])}))]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("弄")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.HNalley,expression:"HNalley"}],staticClass:"form-control",on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.HNalley=t.target.multiple?a:a[0]},e.HNBuildFunc]}},e._l(e.HNalleyOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])}))]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("號")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.HN,expression:"HN"}],staticClass:"form-control",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.HN=t.target.multiple?a:a[0]}}},e._l(e.HNOptions,function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v("\n            "+e._s(t.text)+"\n          ")])}))]),e._v(" "),a("button",{staticClass:"btn btn-default",on:{click:e.HNSearch}},[e._v("查詢")])]),e._v(" "),a("div",{staticClass:"tab-pane",attrs:{role:"tabpanel",id:"Coordinate"}},[a("div",{staticClass:"panel panel-default"},[a("div",{staticClass:"panel-heading"},[e._v("TWD97")]),e._v(" "),a("div",{staticClass:"panel-body"},[a("div",{staticClass:"form-group"},[a("label",[e._v("TWD97 X")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.TWD97XTxt,expression:"TWD97XTxt"}],staticClass:"form-control",attrs:{placeholder:"X"},domProps:{value:e.TWD97XTxt},on:{input:function(t){t.target.composing||(e.TWD97XTxt=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("TWD97 Y")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.TWD97YTxt,expression:"TWD97YTxt"}],staticClass:"form-control",attrs:{placeholder:"Y"},domProps:{value:e.TWD97YTxt},on:{input:function(t){t.target.composing||(e.TWD97YTxt=t.target.value)}}})]),e._v(" "),a("button",{staticClass:"btn btn-default",on:{click:e.TWD97Search}},[e._v("查詢")])])]),e._v(" "),a("div",{staticClass:"panel panel-default"},[a("div",{staticClass:"panel-heading"},[e._v("Lat/Lon")]),e._v(" "),a("div",{staticClass:"panel-body"},[a("div",{staticClass:"form-group"},[a("label",[e._v("Lat")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.LatTxt,expression:"LatTxt"}],staticClass:"form-control",attrs:{placeholder:"Lat"},domProps:{value:e.LatTxt},on:{input:function(t){t.target.composing||(e.LatTxt=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v("Lon")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.LonTxt,expression:"LonTxt"}],staticClass:"form-control",attrs:{placeholder:"Lon"},domProps:{value:e.LonTxt},on:{input:function(t){t.target.composing||(e.LonTxt=t.target.value)}}})]),e._v(" "),a("button",{staticClass:"btn btn-default",on:{click:e.LatLonSearch}},[e._v("查詢")])])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("ul",{staticClass:"nav nav-tabs",attrs:{role:"tablist"}},[t("li",{staticClass:"active",attrs:{role:"presentation"}},[t("a",{attrs:{href:"#Road","aria-controls":"home",role:"tab","data-toggle":"tab"}},[this._v("道路")])]),this._v(" "),t("li",{attrs:{role:"presentation"}},[t("a",{attrs:{href:"#HN","aria-controls":"profile",role:"tab","data-toggle":"tab"}},[this._v("門牌")])]),this._v(" "),t("li",{attrs:{role:"presentation"}},[t("a",{attrs:{href:"#Coordinate","aria-controls":"messages",role:"tab","data-toggle":"tab"}},[this._v("座標")])])])}]};var O=a("VU/8")(T,C,!1,function(e){a("PSEL")},null,null).exports,E={obj:null,init:function(e,t,a,n,o,r,i,s,l,c){e.onmousedown=E.start,e.hmode=!i,e.vmode=!s,e.root=t&&null!=t?t:e,e.hmode&&isNaN(parseInt(e.root.style.left))&&(e.root.style.left="0px"),e.vmode&&isNaN(parseInt(e.root.style.top))&&(e.root.style.top="0px"),!e.hmode&&isNaN(parseInt(e.root.style.right))&&(e.root.style.right="0px"),!e.vmode&&isNaN(parseInt(e.root.style.bottom))&&(e.root.style.bottom="0px"),e.minX=void 0!==a?a:null,e.minY=void 0!==o?o:null,e.maxX=void 0!==n?n:null,e.maxY=void 0!==r?r:null,e.xMapper=l||null,e.yMapper=c||null,e.root.onDragStart=new Function,e.root.onDragEnd=new Function,e.root.onDrag=new Function},start:function(e){var t=E.obj=this;e=E.fixE(e);var a=parseInt(t.vmode?t.root.style.top:t.root.style.bottom),n=parseInt(t.hmode?t.root.style.left:t.root.style.right);return t.root.onDragStart(n,a),t.lastMouseX=e.clientX,t.lastMouseY=e.clientY,t.hmode?(null!=t.minX&&(t.minMouseX=e.clientX-n+t.minX),null!=t.maxX&&(t.maxMouseX=t.minMouseX+t.maxX-t.minX)):(null!=t.minX&&(t.maxMouseX=-t.minX+e.clientX+n),null!=t.maxX&&(t.minMouseX=-t.maxX+e.clientX+n)),t.vmode?(null!=t.minY&&(t.minMouseY=e.clientY-a+t.minY),null!=t.maxY&&(t.maxMouseY=t.minMouseY+t.maxY-t.minY)):(null!=t.minY&&(t.maxMouseY=-t.minY+e.clientY+a),null!=t.maxY&&(t.minMouseY=-t.maxY+e.clientY+a)),document.onmousemove=E.drag,document.onmouseup=E.end,!1},drag:function(e){e=E.fixE(e);var t,a,n=E.obj,o=e.clientY,r=e.clientX,i=parseInt(n.vmode?n.root.style.top:n.root.style.bottom),s=parseInt(n.hmode?n.root.style.left:n.root.style.right);return null!=n.minX&&(r=n.hmode?Math.max(r,n.minMouseX):Math.min(r,n.maxMouseX)),null!=n.maxX&&(r=n.hmode?Math.min(r,n.maxMouseX):Math.max(r,n.minMouseX)),null!=n.minY&&(o=n.vmode?Math.max(o,n.minMouseY):Math.min(o,n.maxMouseY)),null!=n.maxY&&(o=n.vmode?Math.min(o,n.maxMouseY):Math.max(o,n.minMouseY)),t=s+(r-n.lastMouseX)*(n.hmode?1:-1),a=i+(o-n.lastMouseY)*(n.vmode?1:-1),n.xMapper?t=n.xMapper(i):n.yMapper&&(a=n.yMapper(s)),E.obj.root.style[n.hmode?"left":"right"]=t+"px",E.obj.root.style[n.vmode?"top":"bottom"]=a+"px",E.obj.lastMouseX=r,E.obj.lastMouseY=o,E.obj.root.onDrag(t,a),!1},end:function(){document.onmousemove=null,document.onmouseup=null,E.obj.root.onDragEnd(parseInt(E.obj.root.style[E.obj.hmode?"left":"right"]),parseInt(E.obj.root.style[E.obj.vmode?"top":"bottom"])),E.obj=null},fixE:function(e){return void 0===e&&(e=window.event),void 0===e.layerX&&(e.layerX=e.offsetX),void 0===e.layerY&&(e.layerY=e.offsetY),e}},D=E;Object(m.loadScript)({url:"https://js.arcgis.com/3.23"});var j={name:"Home",data:function(){return{vueMaterialIconSize:20,slidePaneVisible:!1,panelShowWho:"",panelDragHead:{MapControl:"地圖操作",Measurement:"測量工具",LayerControl:"圖層控制",SearchControl:"屬性查詢"},CoordinatesDivWGS84:"",CoordinatesDivTWD97:"",CoordinatesDivScale:"",baseLayer:null,extent:null}},components:{MapControl:f,Measurement:_,LayerControl:S,SearchControl:O},mounted:function(){var e=this,t=this;Object(m.loadModules)(["esri/map","esri/urlUtils","esri/layers/DynamicMapServiceLayer","esri/dijit/HomeButton"]).then(function(a){var n=d()(a,4),o=n[0],r=n[1],i=n[2],s=n[3],l=void 0,c=new esri.geometry.Extent({xmin:111499.494,ymin:2579174.848,xmax:238433.602,ymax:2643005.705,spatialReference:{wkid:3826}});t.extent=c;var u=new o(e.$refs.map,{extent:c,zoom:12,minScale:5e5,logo:!1,showLabels:!0});e.$bus.$emit("map",u),r.addProxyRule({urlPrefix:"http://59.125.203.147/arcgis",proxyUrl:"http://192.168.15.134/AuthToken/proxy.ashx"});var p=function(e,t,a,n,o){dojo.declare("WebWMSLayer",i,{constructor:function(){this.initialExtent=this.fullExtent=c,this.spatialReference={wkid:3826},this.loaded=!0,this.onLoad(this)},getImageUrl:function(r,i,s,l){var c=new esri.geometry.Point(r.xmin,r.ymin,u.spatialReference),p=new esri.geometry.Point(r.xmax,r.ymax,u.spatialReference),d={REQUEST:"GetMap",SERVICE:"WMS",TRANSPARENT:!0,FORMAT:n,VERSION:o,LAYERS:t,STYLES:"",BBOX:c.x+","+c.y+","+p.x+","+p.y,SRS:a,WIDTH:i,HEIGHT:s};l(e+"?"+dojo.objectToQuery(d))}})},m=[];m.push({url:"http://192.168.0.97/qgis/mapsvr",layerSetting:{name:"TEST",ref:"EPSG:3826",img:"image/png",version:"1.3.1",id:"county",opacity:1,visible:!0,title:"QGIS圖層"},layerType:"WMSLayer"},{url:"http://wms.nlsc.gov.tw/wms",layerSetting:{name:"B5000",ref:"EPSG:3826",img:"image/png",version:"1.1.1",id:"EMAP",opacity:1,visible:!1,title:"1/5000基本地形圖"},layerType:"WMSLayer"},{url:"http://wms.nlsc.gov.tw/wms",layerSetting:{name:"PHOTO2",ref:"EPSG:3826",img:"image/png",version:"1.1.1",id:"EMAP_PHOTO2",opacity:1,visible:!1,title:"衛星影像"},layerType:"WMSLayer"},{url:"http://wms.nlsc.gov.tw/wms",layerSetting:{name:"EMAP",ref:"EPSG:3826",img:"image/png",version:"1.1.1",id:"EMAP_Vector",opacity:1,visible:!0,title:"通用版電子地圖"},layerType:"WMSLayer"}),dojo.connect(u,"onLayersAddResult",function(){for(var e=0;e<m.length;e+=1)u.getLayer(m[e].layerSetting.id).setOpacity(m[e].layerSetting.opacity),u.getLayer(m[e].layerSetting.id).setVisibility(m[e].layerSetting.visible),u.reorderLayer(u.getLayer(m[e].layerSetting.id),0),t.baseLayer=m});for(var v=[],h=0;h<m.length;h+=1){p(m[h].url,m[h].layerSetting.name,m[h].layerSetting.ref,m[h].layerSetting.img,m[h].layerSetting.version);var f=new WebWMSLayer;f.id=m[h].layerSetting.id,v.push(f)}u.addLayers(v),new s({map:u},e.$refs.button).startup();var b=function(e){if(!(l=e.mapPoint).x)return!1;t.CoordinatesDivTWD97="TWD97： "+l.x.toFixed(1)+", "+l.y.toFixed(1);var a=Object(y.b)(l.x,l.y),n=Math.floor(60*(a.Lon-Math.floor(a.Lon))),o=60*Math.floor(60*(a.Lon-Math.floor(a.Lon))-Math.floor(60*(a.Lon-Math.floor(a.Lon))))*10/10,r=Math.floor(60*(a.Lat-Math.floor(a.Lat))),i=60*Math.floor(60*(a.Lat-Math.floor(a.Lat))-Math.floor(60*(a.Lat-Math.floor(a.Lat))))*10/10;t.CoordinatesDivWGS84="DMS："+Math.floor(a.Lon)+"°"+n+"'"+o+'" ,'+Math.floor(a.Lat)+"°"+r+"'"+i+'"',t.CoordinatesDivScale="比例尺： 1:"+u.getScale().toFixed(0)};u.on("mouse-move",b),u.on("mouse-drag",b)}).catch(function(e){console.error(e)}),D.init(t.$refs.panelDragHead,t.$refs.panelDrag)}},X={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{ref:"map",staticClass:"map"},[a("div",{staticClass:"toolbar"},[a("div",{ref:"button"}),e._v(" "),a("div",{staticClass:"btn btn-sm",attrs:{title:e.panelDragHead.MapControl},on:{click:function(t){e.slidePaneVisible=!0,e.panelShowWho="MapControl"}}},[a("vue-material-icon",{attrs:{name:"pan_tool",size:e.vueMaterialIconSize}})],1),e._v(" "),a("div",{staticClass:"btn btn-sm",attrs:{title:e.panelDragHead.Measurement},on:{click:function(t){e.slidePaneVisible=!0,e.panelShowWho="Measurement"}}},[a("vue-material-icon",{attrs:{name:"straighten",size:e.vueMaterialIconSize}})],1),e._v(" "),a("div",{staticClass:"btn btn-sm",attrs:{title:e.panelDragHead.LayerControl},on:{click:function(t){e.slidePaneVisible=!0,e.panelShowWho="LayerControl"}}},[a("vue-material-icon",{attrs:{name:"layers",size:e.vueMaterialIconSize}})],1),e._v(" "),a("div",{staticClass:"btn btn-sm",attrs:{title:e.panelDragHead.SearchControl},on:{click:function(t){e.slidePaneVisible=!0,e.panelShowWho="SearchControl"}}},[a("vue-material-icon",{attrs:{name:"search",size:e.vueMaterialIconSize}})],1)]),e._v(" "),a("div",{staticClass:"CoordinatesDesign",attrs:{id:"CoordinatesDiv"}},[a("div",{staticClass:"pull-left"},[e._v(e._s(e.CoordinatesDivWGS84))]),e._v(" "),a("div",{staticClass:"pull-left"},[e._v(e._s(e.CoordinatesDivTWD97))]),e._v(" "),a("div",{staticClass:"pull-left"},[e._v(e._s(e.CoordinatesDivScale))])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.slidePaneVisible,expression:"slidePaneVisible"}],ref:"panelDrag",staticClass:"panel panel-default",staticStyle:{position:"absolute",left:"200px",top:"200px","z-index":"999"}},[a("div",{ref:"panelDragHead",staticClass:"panel-heading"},[e._v("\n        "+e._s(e.panelDragHead[e.panelShowWho])+"\n        "),a("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(t){e.slidePaneVisible=!1}}},[a("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])]),e._v(" "),a("div",{staticClass:"panel-body"},[a("MapControl",{directives:[{name:"show",rawName:"v-show",value:"MapControl"===e.panelShowWho,expression:"'MapControl' === panelShowWho"}],attrs:{extent:e.extent}}),e._v(" "),a("Measurement",{directives:[{name:"show",rawName:"v-show",value:"Measurement"===e.panelShowWho,expression:"'Measurement' === panelShowWho"}]}),e._v(" "),a("LayerControl",{directives:[{name:"show",rawName:"v-show",value:"LayerControl"===e.panelShowWho,expression:"'LayerControl' === panelShowWho"}],attrs:{baseLayer:e.baseLayer}}),e._v(" "),a("SearchControl",{directives:[{name:"show",rawName:"v-show",value:"SearchControl"===e.panelShowWho,expression:"'SearchControl' === panelShowWho"}]})],1)])])])},staticRenderFns:[]};var k=a("VU/8")(j,X,!1,function(e){a("xJBi")},"data-v-77685606",null).exports;n.a.use(u.a);var P=new u.a({routes:[{path:"/",name:"Home",component:k}]}),R=new n.a;Object.defineProperty(n.a.prototype,"$bus",{get:function(){return this.$root.bus}});var W=R;n.a.component(r.name,r),n.a.config.productionTip=!1,new n.a({el:"#app",data:function(){return{bus:W}},router:P,components:{App:c},template:"<App/>"})},PSEL:function(e,t){},"ie++":function(e,t){},lQeg:function(e,t){e.exports={_from:"proj4",_id:"proj4@2.4.4",_inBundle:!1,_integrity:"sha512-yo6qTpBQXnxhcPopKJeVwwOBRzUpEa3vzSFlr38f5mF4Jnfb6NOL/ePIomefWiZmPgkUblHpcwnWVMB8FS3GKw==",_location:"/proj4",_phantomChildren:{},_requested:{type:"tag",registry:!0,raw:"proj4",name:"proj4",escapedName:"proj4",rawSpec:"",saveSpec:null,fetchSpec:"latest"},_requiredBy:["#USER","/"],_resolved:"https://registry.npmjs.org/proj4/-/proj4-2.4.4.tgz",_shasum:"c03d825e380f6850a4a7af5d20d365f6b72c4042",_spec:"proj4",_where:"D:\\horse\\Vue-cli\\vue-arcgis",author:"",bugs:{url:"https://github.com/proj4js/proj4js/issues"},bundleDependencies:!1,contributors:[{name:"Mike Adair",email:"madair@dmsolutions.ca"},{name:"Richard Greenwood",email:"rich@greenwoodmap.com"},{name:"Calvin Metcalf",email:"calvin.metcalf@gmail.com"},{name:"Richard Marsden",url:"http://www.winwaed.com"},{name:"T. Mittan"},{name:"D. Steinwand"},{name:"S. Nelson"}],dependencies:{mgrs:"1.0.0","wkt-parser":"^1.2.0"},deprecated:!1,description:"Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",devDependencies:{chai:"~1.8.1",curl:"git://github.com/cujojs/curl.git",grunt:"^1.0.1","grunt-cli":"~0.1.13","grunt-contrib-connect":"~0.6.0","grunt-contrib-jshint":"~1.1.0","grunt-contrib-uglify":"~0.11.1","grunt-mocha-phantomjs":"~0.4.0","grunt-rollup":"^1.0.1",istanbul:"~0.2.4",mocha:"~1.17.1",rollup:"^0.41.4","rollup-plugin-json":"^2.0.1","rollup-plugin-node-resolve":"^2.0.0",tin:"~0.4.0"},directories:{test:"test",doc:"docs"},homepage:"https://github.com/proj4js/proj4js#readme",license:"MIT",main:"dist/proj4-src.js",module:"lib/index.js",name:"proj4",repository:{type:"git",url:"git://github.com/proj4js/proj4js.git"},scripts:{build:"grunt","build:tmerc":"grunt build:tmerc",test:"npm run build && istanbul test _mocha test/test.js"},version:"2.4.4"}},qIkI:function(e,t,a){"use strict";(function(e){a.d(t,"a",function(){return l}),a.d(t,"b",function(){return c}),a.d(t,"c",function(){return u});var n=a("nvAS"),o=a("EwsJ"),r=(a.n(o),new e.Wkt);n.a.defs([["EPSG:3826","+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs"]]);var i=new n.a.Proj("WGS84"),s=new n.a.Proj("EPSG:3826"),l=function(e,t){var a=void 0;if(n.a){var o=new n.a.toPoint([parseFloat(e),parseFloat(t)]),r=n.a.transform(i,s,[o.x,o.y]);a={x:r.x,y:r.y}}return a},c=function(e,t){var a=void 0;if(n.a){var o=new n.a.toPoint([parseFloat(e),parseFloat(t)]),r=n.a.transform(s,i,[o.x,o.y]);a={Lon:r.x,Lat:r.y}}return a},u=function(e){try{r.read(e)}catch(e){try{r.read(e.value.replace("\n","").replace("\r","").replace("\t",""))}catch(e){if("WKTError"===e.name)return alert("Wicket could not understand the WKT string you entered. Check that you have parentheses balanced, and try removing tabs and newline characters."),!1}}return r.toObject({spatialReference:{wkid:3826}})}}).call(t,a("6Iza"))},tsgZ:function(e,t){},xJBi:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.c7126647140a590fae67.js.map