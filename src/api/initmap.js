import store from '../store'
import TileLayer from 'ol/layer/Tile';
import { zoomToExtent } from './controls';
import OSM from 'ol/source/OSM'

function initMap(){
    // 地图底图源使用OSM,当然也可以用其他风格的源
       store.state.openlayer.map = new Map({
       target: 'map',
       Control: new ZoomToExtent({
           extent:[110,20]
       }),
       layers:   [new TileLayer({
           source: new OSM(),
           })],
       view: new View({
           center: [114.4,30.6],
           zoom: this.zoomNum,
           projection: 'EPSG:4326'
       }),
       });
    }
