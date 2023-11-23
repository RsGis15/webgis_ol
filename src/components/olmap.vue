<template>
    <div>
        <!-- <el-switch 
            v-for="item in layers"
            lable=""
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="2"
            @change='changelayer($event,item)'>
        </el-switch> -->
        <el-checkbox v-model="checked" true-label="1" false-label='2' @change="changelayer($event)">备选项</el-checkbox>
        <button @click="zoomIn">放大</button>
        <button @click="zoomOut">缩小</button>
        <button @click="moveTo">平移</button>
        <!-- <button @click="reset">复位</button> -->
        <button @click="resetDraw">清除画布</button>
        <button @click="activeDraw">激活</button>
        <button @click="colseDraw">关闭</button>
        <button @click="delf">删除</button>
        <button @click="editf">编辑</button>
        <button @click="dquery">查询</button>
        <button @click="chafx">查凤翔县</button>
        <button @click="unselect">取消选择</button>
        <button @click="bufferf">缓冲区分析</button>


        <!-- <button @click="bufferf">缓冲区分析</button> -->

        <button @click="xiangjiao">相交</button>




        <input type="text" v-model="zoomNum" @blur="zoomnub" placeholder="请输入缩放等级" >
        <div><input  v-model='mycenterCopy' @blur="flyTocenter" @input="$forceUpdate()"></div>
        <!-- <div><input type="text" v-model="POintX"></div>
        <div><input type="text" v-model="POintY"></div>
        <button @click="addPoint"></button> -->


        <div id="map">
            <div id="mouseposition">
                <div id="popup" class="ol-popup" ref="popup" style="background-color: aliceblue;opacity: 0.4;">
                    <span>经度：{{jingdu}}，纬度：{{weidu}}</span>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import {Map,View} from 'ol';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css'
import ImageWMS from 'ol/source/ImageWMS'
import ImageLayer from 'ol/layer/Image'
import XYZ from 'ol/source/XYZ'
import ZoomToExtent from 'ol/control/ZoomToExtent'
import { tianditu_img_w,  tianditu_cia_w, tianditu_vec_w, tianditu_cva_w } from '../api/tianditu'
import {zoomToExtent,zoomSlider,mousePosition,scaleline,overviewmap} from '../api/controls'
import { PointLayer,LineLayer,CircleLayer ,SquareLayer,RectangleLayer, PolygonLayer,point_draw_layer,point_draw,popup,wfsLayer,select,s_modify,modify,drawquery,vector1,wfsSource,source1,polygonSource,xuanran,xuanranbuffer} from '../api/pointLinePolgon'
import {shuxingQuery} from '../api/requests'
import turf from 'turf'
import GeoJSON from 'ol/format/GeoJSON'
export default{
    data(){
        return {
            value:false,
            checked:true,
            map:null,
            layers:[tianditu_img_w],
            zoomNum:4,
            mycenterCopy:"",
            mycenter:'0,0',
            center: [0, 30],
            jingdu:'',
            weidu:'',
            booleanDraw:false
            // pointX:'',
            // pointY:''
        }
    },
    computed:{
        lat(){
            return Array(...this.mycenter.split(','))
        }
    },
    components:{

    },
    created(){
        this.$nextTick(async()=>{
            await this.initMap()
            this.map.addControl(scaleline)
            this.map.addControl(zoomToExtent)
            this.map.addControl(zoomSlider)
            this.map.addControl(mousePosition)
            this.map.addControl(overviewmap)
            this.map.addLayer(PointLayer)
            this.map.addLayer(LineLayer)
            this.map.addLayer(CircleLayer)
            this.map.addLayer(SquareLayer)
            this.map.addLayer(RectangleLayer)
            this.map.addLayer(PolygonLayer)
            this.map.addLayer(vector1)
            this.map.addLayer(point_draw_layer)
            const popupp=popup(this.$refs.popup)
            this.map.addOverlay(popupp)
            this.map.addLayer(wfsLayer)

          

            // popupp.setPosition([116,40])
            // this.map.on()
            // this.map.addInteraction((point_draw))
            // point_draw.on('drawend',($event)=>{
            //     console.log($event)
            // })
            this.map.on('click',($event)=>{
                if(!this.booleanDraw){
                    if(this.map.hasFeatureAtPixel($event.pixel)){
                        console.log($event.coordinate)
                        popupp.setPosition($event.coordinate)
                        this.jingdu=$event.coordinate[0].toFixed(2)
                        this.weidu=$event.coordinate[1].toFixed(2)
                }
                else{
                    popupp.setPosition(undefined)
                }

                }
                // else{



                // }



            })




        })
        // setTimeout(() => {   
        //     this.initMap()
        //     this.map.addControl(scaleline)
        //     this.map.addControl(zoomToExtent)
        //     this.map.addControl(zoomSlider)
        //     this.map.addControl(mousePosition)
        //     this.map.addControl(overviewmap)
        // }, 100); 

    },

    methods:{
        bufferf(){
            const bufferqu=turf.buffer(new GeoJSON().writeFeatureObject(LineLayer.getSource().getFeatures()[0]),500)
            console.log(bufferqu)
            xuanranbuffer(bufferqu)
        },




        xiangjiao(){
         const xiangjiaoqu =   turf.intersect(new GeoJSON().writeFeatureObject(polygonSource.getFeatures()[0]),new GeoJSON().writeFeatureObject(polygonSource.getFeatures()[1]));
         console.log(xiangjiaoqu)
         xuanran(xiangjiaoqu)
        },
        unselect(){
            source1.clear() 
        },
        chafx(){
            shuxingQuery(source1)
        },
        dquery(){
            this.map.addInteraction((drawquery)) 
        },
        delf(){
            this.map.addInteraction(select);
        },
        editf(){
            this.map.addInteraction(s_modify);
            this.map.addInteraction(modify)
        } ,

    activeDraw(){
         this.map.addInteraction((point_draw))
         this.booleanDraw=true
        },
    colseDraw(){
        this.map.removeInteraction((point_draw))
        this.booleanDraw=false
    },
    resetDraw(){
        point_draw_layer.getSource().clear()
    },

    addPoint(){


    },
    flyTocenter(){
            this.mycenter= this.mycenterCopy
            console.log(Array(...this.mycenter.split(',')))
            console.log(this.mycenter)
            const view =  this.map.getView()
            // console.log(this.lat2)
            view.setCenter(Array(...this.mycenter.split(',')))
            console.log(Array(...this.mycenter.split(',')))
           
        },
        zoomnub(){
            const view = this.map.getView()
            view.setZoom(this.zoomNum)


        },


        zoomIn(){
            const view = this.map.getView()
            let zoom = view.getZoom()
            view.setZoom(zoom+1)
            console.log(view.getZoom())
            this.zoomNum = view.getZoom()
        },
        zoomOut(){
            const view = this.map.getView()
            let zoom = view.getZoom()
            zoom > 0 ? zoom -1 :0
            view.setZoom(zoom-1)
            console.log(view.getZoom())
            this.zoomNum = view.getZoom()
        },
        moveTo(){
            const view = this.map.getView()
            view.setCenter([114,30])
            view.setZoom(8)
            console.log(view.getZoom())
            this.zoomNum = view.getZoom()
        },

        changelayer($event){
            if($event=='1'){
                // item.setVisible(true)
                console.log($event)
                this.map.addLayer(tianditu_cia_w)
                // console.log($event)
            }
            if($event=='2'){
                console.log($event)
            //    item.setVisible(false)
                // console.log($event)
                this.map.removeLayer(tianditu_cia_w)
            }
        },
        tianjia(){
            this.map.removeLayer(tianditu_cia_w)

        },
        initMap(){
             // 地图底图源使用OSM,当然也可以用其他风格的源
             this.map = new Map({
                target: 'map',
                // layers: this.layers,
                Control: new ZoomToExtent({
                    extent:[110,20]
                }),
                layers:   [new TileLayer({
                    source: new OSM(),
                    })],
            //         new ImageLayer({
            //     source: new ImageWMS({
            //         url: "http://localhost:8088/geoserver/ne/wms",//地图服务的连接
            //         params: {//地图服务中具体的图层
            //             'LAYERS': "ne:world",//Geoserver中的Openlayers的左边名称
            //             'version':'1.1.0',
            //             'exceptions':'application/openlayers',
            //         },
            //         serverType: 'geoserver',//设置地图服务器类型
            //         crossOrigin: 'anonymous',//开启跨域
            //         ratio: 1,
                   
            //     }),
            // })





            // const featureRequest = new WFS().writeGetFeature({
            //     srcName: 'EPSG:4326',
            //     featureNS: 'http://8.130.73.89:8080/geoserver/tjl_webgis/wfs',
            //     featureTypes: ['tjl_webgis:point'],
            //     outputFormat: 'application/json',
            //     });

            //     // then post the request and add the received features to a layer
            //     fetch('http://8.130.73.89:8080/geoserver/tjl_webgis/wfs', {
            //     method: 'POST',
            //     body: new XMLSerializer().serializeToString(featureRequest),
            //     })
            //     .then(function (response) {
            //         return response.json();
            //     })
            //     .then(function (json) {
            //         const features = new GeoJSON().readFeatures(json);
            //         vectorSource.addFeatures(features);
            //         map.getView().fit(vectorSource.getExtent());
            //     });



































                view: new View({
                    center: [114.4,30.6],
                    zoom: this.zoomNum,
                    projection: 'EPSG:4326'
                }),
                });

                
                // const zoomToExtent = new zoomToExtent({
                //     extent:[110,20,120,30]
                // })
                // this.map.addControl(zoomToExtent)
      }

        }
    }


</script>
<style scoped>
    #map{
    position: fixed;
			left: 0;
			width: 100%;
			height: 850px;
            
            
}
div.ol-scale-line{
    bottom:100px 
}
</style>

