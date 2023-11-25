import WFS from 'ol/format/WFS';
import GML from 'ol/format/GML';
import axios from 'axios'
import store from '../store'
import Intersects from 'ol/format/filter/Intersects'
import GeoJSON from 'ol/format/GeoJSON'

function transact(feature, layerName) {
    if (layerName == "") {
      return;
    }
    console.log(feature,layerName)
    // 将选中的要素序列化为字符串格式
    var formatWFS = new WFS();
    var formatGML = new GML({
      featureNS: "http://localhost/test",
      featurePrefix: "test",
      featureType: layerName,
      srsName: "EPSG:4326" 
    });
    var node = formatWFS.writeTransaction(null, null, [feature], formatGML);
    var s = new XMLSerializer();
    let str = s.serializeToString(node);
    //  执行接口进行删除操作
    console.log(str)
    axios.post("http://localhost:8088/geoserver/wfs?service=wfs",str, {  
        // contentType: ["text/xml","application/json"],
        headers: {
            'Content-Type': 'application/xml'
          },
        // data: str,
    }).then(response=>{
        console.log(response)
        console.log(response.data)
        // console.log(new XMLSerializer().serializeToString(response.data));
    }).catch(error=>{
        console.log(error)
    });
    // jQuery.ajax("http://localhost:8088/geoserver/wfs", {
    //       type: "POST",
    //       contentType: "text/xml",
    //       data: str,
    //       success: function(res) {
    //         console.log(res)
    //         console.log(new XMLSerializer().serializeToString(res));
    //       }
    //     });

  }
const specialQuery=async function(geometry) {
    // 拼接查询参数
    let data=[]
    var featureRequest = new WFS().writeGetFeature({
        srsName: 'EPSG:4326',
        featureNS: 'http://localhost/test', //命名空间
        featurePrefix: 'test', //工作区域
        featureTypes: ['point_test'], //图层名
        outputFormat: 'application/json',
        geometryName: "geom",
        filter: new Intersects('geom', geometry)
    });
    console.log(featureRequest)
     const response = await fetch('http://localhost:8088/geoserver/wfs', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest)
    }).then(response=> {
        const jsonn=response.json()
        return jsonn
    }
    ).then(jsonn=> {
        console.log(jsonn)
        var features = new GeoJSON().readFeatures(jsonn);
        store.state.drawlayer.source.addFeatures(features);
        data=features
        let dddd=[]
        data.forEach(item=>{
            dddd.push(item.getProperties())
            // console.log(item.getProperties())
        })
        store.state.queryproper=dddd
        return data
    });
}
    function queryByAtt(value){
        var url=`http://localhost:8088/geoserver/test/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3Apoint_test&cql_filter=name='${value}'&outputFormat=application%2Fjson`
        console.log(url)
        fetch(url, {
            method: 'GET',
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            var features = new GeoJSON().readFeatures(json);
            store.state.querylayer.getSource().addFeatures(features);
            store.state.openlayer.map.getView().fit(store.state.querylayer.getSource().getExtent(),{maxZoom:9})
            // map.getView().fit(source1.getExtent());
        });
    




}







export {transact,specialQuery,queryByAtt}