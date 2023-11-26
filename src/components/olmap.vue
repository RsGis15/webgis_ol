<template>
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
        <!-- <el-checkbox v-model="checked" true-label="1" false-label='2' @change="changelayer($event)">备选项</el-checkbox>
        <button @click="zoomIn">放大</button>
        <button @click="zoomOut">缩小</button>
        <button @click="moveTo">平移</button> -->
        <!-- <button @click="reset">复位</button> -->
        <!-- <button @click="resetDraw">清除画布</button>
        <button @click="activeDraw">激活</button>
        <button @click="colseDraw">关闭</button>
        <button @click="delf">删除</button>
        <button @click="editf">编辑</button>
        <button @click="dquery">查询</button>
        <button @click="chafx">查凤翔县</button>
        <button @click="unselect">取消选择</button>
        <button @click="bufferf">缓冲区分析</button> -->


        <!-- <button @click="bufferf">缓冲区分析</button> -->

        <!-- <button @click="xiangjiao">相交</button> -->




        <!-- <input type="text" v-model="zoomNum" @blur="zoomnub" placeholder="请输入缩放等级" >
        <div><input  v-model='mycenterCopy' @blur="flyTocenter" @input="$forceUpdate()"></div> -->
        <!-- <div><input type="text" v-model="POintX"></div>
        <div><input type="text" v-model="POintY"></div>
        <button @click="addPoint"></button> -->
        <div id="map" class="parent">
            <div id="mouseposition">
                <div id="popup" class="ol-popup" ref="popup" style="background-color: aliceblue;opacity: 0.4;">
                    <span>经度：{{jingdu}}，纬度：{{weidu}}</span>
                </div>
            </div>
            <div class="block">
                <span class="demonstration">切换图层</span>
                <el-cascader 
                    v-model="valuee"
                    :options="options"
                    @change="handleChange">
                </el-cascader>
            </div>
            <el-button @click="cleardraw" class="btn">清空绘制图层</el-button>
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
import {queryByAtt} from '../api/requests'
import turf from 'turf'
import GeoJSON from 'ol/format/GeoJSON'
import VectorSource from 'ol/source/Vector';

export default{
    data(){
        return {
            valuee:[],
            options: [{
                value: 'tianditu',
                label: '天地图地图服务',
                children:[
                    {
                        value:'tdt_img',
                        label:'天地图卫星影像'
                    },{
                        value:'tdt_img_mark',
                        label:'天地图影像注记图层'
                    },{
                        value:'tdt_vec',
                        label:'天地图矢量图层'
                    },{
                        value:'tdt_vec_mark',
                        label:'天地图矢量注记图层'
                    }
                ]
            },{
                value:'geoserver',
                label:'geoserver地图服务',
                children:[
                    {
                        value:'wfs_point',
                        label:'全国县级驻地矢量点'
                    },
                ]
            },{
                value:'openlayer',
                label:'openlayer地图服务',
                children:[
                    {
                        value:'osm',
                        label:'OSM底图'
                    }],
            }],
            value:false,
            checked:true,
            map:this.$store.state.openlayer.map,
            layers:this.$store.state.layers,
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

            this.map.addLayer(vector1)
            this.map.addLayer(point_draw_layer)
            const popupp=popup(this.$refs.popup)
            this.map.addOverlay(popupp)
            // this.map.addLayer(wfsLayer)
            this.map.addLayer(this.$store.state.querylayer)
            this.map.addLayer(this.$store.state.drawlayer.drawLayer)
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

    },

    methods:{
        initMap(){
            this.map.setTarget('map')
        },
        handleChange(value) {
            console.log(this.layers.tdt_img)
            switch (value[1]){
                case 'tdt_img' : 
                    this.map.getLayers().clear();
                    this.map.addLayer(this.layers.tdt_img)
                    break;
                case 'tdt_img_mark' :
                    this.layers.tdt_img_mark.setZIndex(1)
                    this.map.addLayer(this.layers.tdt_img_mark)
                    break;

                case 'tdt_vec' :
                    this.map.getLayers().clear();
                    this.map.addLayer(this.layers.tdt_vec)
                    break;
                case 'tdt_vec_mark':
                    this.layers.tdt_vec_mark.setZIndex(1)
                    this.map.addLayer(this.layers.tdt_vec_mark)
                    break;
                case 'wfs_point' :
                    this.layers.wfs_point.setZIndex(1)
                    this.layers.wfs_point.setStyle(this.$store.state.style.pointstyle)
                    this.map.addLayer(this.layers.wfs_point)
                    break;
            }
      },
      cleardraw(){
        this.$store.state.drawlayer.drawLayer.getSource().clear()
      },
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
     

        }
    }


</script>
<style scoped>
#map{
    position: relative;
    width: 100%;
    height: 100vh;      
}
.block{
    position: absolute;
    top: 4%; /* 也可以使用其他值，如 0, 10px, etc. */
    right: 2%;
    z-index: 999;
}
.btn{
    position: absolute;
    top: 4%; /* 也可以使用其他值，如 0, 10px, etc. */
    right: 18%;
    z-index: 999;
}
div.ol-scale-line{
    bottom:100px 
}
</style>

