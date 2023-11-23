 import Point from 'ol/geom/Point'
 import Feature from 'ol/Feature'
 import {Style,Fill,Stroke} from 'ol/style'
 import VectorLayer from 'ol/layer/Vector';
 import VectorSource from 'ol/source/Vector';
 import LineString from 'ol/geom/LineString';
 import Polygon from 'ol/geom/Polygon';
 import {fromCircle ,fromExtent} from 'ol/geom/Polygon';
 import CircleStyle from 'ol/style/Circle';
 import Circle from 'ol/geom/Circle';
 import Draw from 'ol/interaction/Draw';
 import {createBox} from 'ol/interaction/Draw';
 import Select from 'ol/interaction/Select'
 import Icon from 'ol/style/Icon';
 import Text from 'ol/style/Text';
 import Overlay from 'ol/Overlay';
 import GeoJSON from 'ol/format/GeoJSON';
 import {transact} from './requests'
 import Modify from 'ol/interaction/Modify'
 import {specialQuery} from './requests'
 import {shuxingQuery} from './requests'
// 一、创建几何形状
const point =new Point([114.4,30.6])
const pointStyle=new Style({
    // fill: new Fill({
    //     color:'ragb(255,255,255,0.2)'
    // }),    //填充色
    // stroke: new Stroke({
    //     color:'#ffcc33',
    //     width:2
    // }),  //边线颜色
    // image: new CircleStyle({
    //     radius:17,
    //     fill: new Fill({
    //         color:'#ffcc33'
    //     })
    // })
    image: new Icon({
        anchor:[0.5,60],//锚点，默认为中心[0.5,0.5]
        anchorOrigin:'top-right',
        anchorXUnits:'fraction',
        anchorYUnits:'pixels',
        offsetOrigin:'top-right',
        opacity:0.75,//透明度
        src:require('../../public/static/mapIcon.png')//用require引入
    }),

    text: new Text({
        font:'normal 14px 微软雅黑',
        text:'标注点',
    })







})

// 二、创建要素对象，将几何形状添加到要素对象
const pointFeature =new Feature({
    geometry:point
})
pointFeature.setStyle(pointStyle)
const pointSource = new VectorSource ({
    features:[pointFeature]
})
const PointLayer= new VectorLayer({
    source:pointSource,
})








const line =new LineString([[114.4,30.6],[100,20]])
const lineStyle=new Style({
    fill: new Fill({
        color:'ragb(255,255,255,0.2)'
    }),    //填充色
    stroke: new Stroke({
        color:'#ffcc33',
        width:2
    }),  //边线颜色
})

// 二、创建要素对象，将几何形状添加到要素对象
const lineFeature =new Feature({
    geometry:line
})
lineFeature.setStyle(lineStyle)
const lineSource = new VectorSource ({
    features:[lineFeature]
})
const LineLayer= new VectorLayer({
    source:lineSource,
})
function xuanranbuffer(bufferqu){
    const aaa=new GeoJSON().readFeatures(bufferqu)[0]
    aaa.setStyle(xuanranStyle)
    lineSource.addFeature(aaa)
}







const polygon =new Polygon([[[80,20],[85,25],[90,25],[90,20],[80,20]]])

const polygon2 =new Polygon([[[90,20],[85,25],[80,25],[80,20],[90,20]]])
const polygonStyle=new Style({
    fill: new Fill({
        color:'rgb(10,10,255,0.2)'
    }),    //填充色
    stroke: new Stroke({
        color:'#ffcc33',
        width:2
    }),  //边线颜色
})
const xuanranStyle =new Style({
    stroke: new Stroke({
        color: [0, 255, 255, 0.3],
        // color: [0, 255, 255, 1 / (steps - i)],
    }),
    //填充样式
    fill: new Fill({
        color: 'rgb(255, 0, 0, 0.5)',
    }),


})

// 二、创建要素对象，将几何形状添加到要素对象
const polygonFeature =new Feature({
    geometry:polygon
})
const polygonFeature2 =new Feature({
    geometry:polygon2
})
polygonFeature.setStyle(polygonStyle)

polygonFeature2.setStyle(polygonStyle)
const polygonSource = new VectorSource ({
    features:[polygonFeature,polygonFeature2]
})
const PolygonLayer= new VectorLayer({
    source:polygonSource,
})

function xuanran(xiangjiaoqu){
    const aa=new GeoJSON().readFeatures(xiangjiaoqu)[0]
    aa.setStyle(xuanranStyle)
    // console.log(polygonFeature)
    // console.log(aa)
    polygonSource.addFeature(aa)
}














const circle =new Circle([114.4,30.6],0.1)
const circleStyle=new Style({
    fill: new Fill({
        color:'ragb(255,45,23,0.2)'
    }),    //填充色
    stroke: new Stroke({
        color:'#ffcc33',
        width:2
    }),  //边线颜色
})

// 二、创建要素对象，将几何形状添加到要素对象
const circleFeature =new Feature({
    geometry:circle
})
circleFeature.setStyle(circleStyle)
const circleSource = new VectorSource ({
    features:[circleFeature]
})
const CircleLayer= new VectorLayer({
    source:circleSource,
})



















const circel_square =new Circle([114.4,30.6],0.1)
const square = fromCircle(circel_square,4,0.785)
const squareStyle=new Style({
    fill: new Fill({
        color:'ragb(255,255,255,0.2)'
    }),    //填充色
    stroke: new Stroke({
        color:'#ffcc33',
        width:2
    }),  //边线颜色
})

// 二、创建要素对象，将几何形状添加到要素对象
const squareFeature =new Feature({
    geometry:square
})
squareFeature.setStyle(squareStyle)
const squareSource = new VectorSource ({
    features:[squareFeature]
})
const SquareLayer= new VectorLayer({
    source:squareSource,
})



const rectangle = fromExtent([80,30,100,40])
const rectangleStyle=new Style({
    fill: new Fill({
        color:'ragb(25,23,25,0.2)'
    }),    //填充色
    stroke: new Stroke({
        color:'#ffcc33',
        width:2
    }),  //边线颜色
})

// 二、创建要素对象，将几何形状添加到要素对象
const rectangleFeature =new Feature({
    geometry:rectangle
})
rectangleFeature.setStyle(rectangleStyle)
const rectangleSource = new VectorSource ({
    features:[rectangleFeature]
})
const RectangleLayer= new VectorLayer({
    source:rectangleSource,
})




//创建一个画布
const point_draw_source=new VectorSource({ wrapX:false})

const point_draw_layer=new VectorLayer({
    source:point_draw_source,
    style:pointStyle
})


// point_draw_source.setStyle(pointStyle)
//创建一个画笔

const point_draw=new Draw({
    source:point_draw_source,
    type:'Point'
    // type:'Circle',
    // geometryFunction:createBox()
})



function popup(element){
    return new Overlay({
        element:element,
        positioning:'bottom-center',
        autoPan:true
    })

}






const wfsSource = new VectorSource({
    format: new GeoJSON({
        geometryName:'gemo'
    }),
    url: function () {
      return (
        'http://localhost:8088/geoserver/test/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3Apoint_test&outputFormat=application%2Fjson'


        // 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
        // 'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
        // 'outputFormat=application/json&srsname=EPSG:4326'
      )
    }
})
const wfsLayer= new VectorLayer({
    source:wfsSource,
})


var select = new Select();
// 选中要素后执行删除操作
select.on("select", function(e) {
    if (select.getFeatures().getLength() == 0) {
    console.log("null");
    } else {
    let featureId = e.target
        .getFeatures()
        .getArray()[0]
        .getId();
    var feature;
    feature = wfsSource.getFeatureById(featureId);
    // 从地图删除
    wfsSource.removeFeature(feature);
    e.target.getFeatures().clear();
    console.log(feature)
    transact(feature, "point_test");
    // 从数据库删除
    }
});



var s_modify= new Select()
var modify = new Modify({
    features: s_modify.getFeatures()
  });


modify.on("modifyend", function(e) {
    // var layerName = "";
    console.log(e)
    var feature = e.features.item(0).clone();
    // console.log(e.features.item(0).getId())
    // console.log(feature)
    feature.setId(e.features.item(0).getId());
    // var geomType = feature.getGeometry().getType().toLowerCase(); //openlayers绘制类型
    //   debugger;
    // if (geomType == "multilinestring") {
    //   layerName = "crud_railway";
    // } else if (geomType == "polygon") {
    //   layerName = "sishui";
    // } else if (geomType == "point") {
    //   layerName = "crud_zhen";
    // }
    // 调换经纬度坐标，以符合wfs协议中经纬度的位置
    // feature
    //   .getGeometry()
    //   .applyTransform(function(flatCoordinates, flatCoordinates2, stride) {
    //     for (var j = 0; j < flatCoordinates.length; j += stride) {
    //       var y = flatCoordinates[j];
    //       var x = flatCoordinates[j + 1];
    //       flatCoordinates[j] = x;
    //       flatCoordinates[j + 1] = y;
    //     }
    //   });
    // transact("update", feature, layerName);
  });  



//   空间查询

var source1 = new VectorSource({
    wrapX: false
});
var vector1 = new VectorLayer({
    source: source1,
    style: new Style({
        fill: new Fill({
        color:'ragb(255,255,255,0.2)'
    }),    //填充色
    stroke: new Stroke({
        color:'red',
        width:2
    }),  //边线颜色
    image: new CircleStyle({
        radius:17,
        fill: new Fill({
            color:'red'
        })
    })
        
    })
});


var drawquery = new Draw({
    source: source1,
    type: 'Polygon',
    /*用于交互绘制图形时所设置的样式*/
});

drawquery.on("drawend", function (evt) {
    source1.clear();
    var feature = evt.feature;
    var inputGeometry = feature.getGeometry();
    specialQuery(source1,inputGeometry);
    console.log(source1)
});







//属性查询

















export {polygonSource,PointLayer,LineLayer ,PolygonLayer,CircleLayer,SquareLayer, RectangleLayer ,point_draw_layer,point_draw,wfsSource,wfsLayer,select,modify,s_modify,vector1,drawquery,source1,popup,xuanran,xuanranbuffer}