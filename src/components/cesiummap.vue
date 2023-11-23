<template>
    <div id="cesiumContainer"></div>
</template>

<script>
import * as Cesium from 'cesium/Cesium';
import "cesium/Widgets/widgets.css";
export default{
data(){
    return {
        map:null,
    }
},
components:{

},
created(){
    setTimeout(() => {   
 this.initMap()
}, 100); 
},

methods:{
    initMap(){
         // 地图底图源使用OSM,当然也可以用其他风格的源
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNDdmZjA3Yi03ZDY0LTRkMWQtOWRjMy00MDFkOTM5NDYyYzgiLCJpZCI6MTAzMTAyLCJpYXQiOjE2NjM4MjIwNDV9.nyCyedtaQM9_UnFcNNp6aTPCZmfG2r3GsnMyuq4XOvg';

        // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.

        // 加载地形数据
        const viewer = new Cesium.Viewer("cesiumContainer", {
            infoBox: false,
    
        // 地形服务
            terrainProvider: Cesium.createWorldTerrain({
            requestVertexNormals: true, //开启地形光照
            requestWaterMask: true, // 开启水面波纹
            }),

  });


    
        var tileset= viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset (
                {
                url:'../assets/3dtiles_dyt/tileset.json'
            }
            )
        )
        viewer.scene.globe.enableLighting=true;

        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        // viewer.camera.flyTo({
        // destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        // orientation: {
        //     heading: CesiumMath.toRadians(0.0),
        //     pitch: CesiumMath.toRadians(-15.0),
        // }
        // });

        // Add Cesium OSM Buildings, a global 3D buildings layer.
}

    }
}


</script>
<style scoped>
#map{
position: fixed;
margin-top: 60px;
        left: 0;
        width: 100%;
        height: 100%;
}
</style>

