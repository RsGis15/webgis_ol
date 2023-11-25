import Vue from 'vue'
import Vuex from 'vuex' 
import TileLayer from 'ol/layer/Tile'
import {OSM,XYZ} from 'ol/source'
import Map from 'ol/Map'
import View from 'ol/View'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import {Style,Fill,Stroke} from 'ol/style'
import CircleStyle from 'ol/style/Circle';
import { Circle } from 'ol/geom'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        openlayer:{
            map: new Map({
                layers:   [new TileLayer({
                    source: new OSM(),
                    })],
                view: new View({
                    center: [114.4,30.6],
                    zoom: 4,
                    projection: 'EPSG:4326'
                }),
            })
    },
        layers:{
            tdt_img:new TileLayer({
                title: '天地图卫星影像',
                source: new XYZ({
                visible: false,
                wrapX: false,
                url: 'http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=ffa0ce442ce38f519a99c93b3349bd91'
                })
            })
        ,
            tdt_img_mark:new TileLayer({
                title: '天地图影像注记图层',
                source: new XYZ({
                visible:false,
                wrapX: false,
                url: 'http://t4.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=ffa0ce442ce38f519a99c93b3349bd91'
                })
            })

        ,
            tdt_vec:new TileLayer({
                title: '天地图矢量图层',
                source: new XYZ({
                visible: false,
                wrapX: false,
                url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=ffa0ce442ce38f519a99c93b3349bd91'
            })
            })

        ,
            tdt_vec_mark:new TileLayer({
                title: '天地图矢量注记图层',
                source: new XYZ({
                visible: false,
                wrapX: false,
                url: 'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=ffa0ce442ce38f519a99c93b3349bd91'
                })
            })

        ,
            wfs_point:new VectorLayer({
               source: new VectorSource({
                    title:'全国县级驻地矢量点',
                    format: new GeoJSON({
                        geometryName:'gemo'
                    }),
                    url :function(){
                        return (
                            'http://localhost:8088/geoserver/test/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3Apoint_test&outputFormat=application%2Fjson'       
                        )
                    }
               }) 
            })
        ,        
        },
        drawlayer:{
            source:new VectorSource({}),
            drawLayer:new VectorLayer({
                zIndex:2
            }),
        },
        style:{
            pointstyle:new Style({
                image: new CircleStyle({
                    radius:4,
                    fill: new Fill({
                        color:'#ffcc33'
                    })

                })
            }),
            linestyle:null,
            polgonstyle:null,
            ciclestyle:null
        },
        querylayer:new VectorLayer({
            source:new VectorSource({
                wrapX:false
            }),
            // style:new CircleStyle({
            //     radius:17,
            //     fill: new Fill({
            //         color:'red'
            //     })
            // })
        })
        
} ,
    mutations:{},
    actions:{},
    getters:{}

})



