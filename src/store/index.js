import Vue from 'vue'
import Vuex from 'vuex' 
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        openlayer:{
            map:null,
            layers:[new TileLayer({
                source:new OSM()
            }),],
            view:null,
        }
    },
    mutations:{},
    actions:{},
    getters:{}
})