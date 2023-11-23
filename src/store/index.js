import Vue from 'vue'
import Vuex from 'vuex' 
import TileLayer from 'ol/layer/Tile'
import {OSM,XYZ} from 'ol/source'
import Map from 'ol/Map'
import View from 'ol/View'

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
        }
} ,
    mutations:{},
    actions:{},
    getters:{}

})



