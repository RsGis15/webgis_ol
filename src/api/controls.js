import ZoomSlider from 'ol/control/ZoomSlider';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate'
import {ScaleLine} from 'ol/control';
import {OverviewMap} from 'ol/control';
import {  tianditu_img_w } from '../api/tianditu';
const zoomToExtent = new ZoomToExtent({
    extent:[110,20,120,30]
})
const zoomSlider =new ZoomSlider()


const mousePosition =new MousePosition({
    coordinateFormat:createStringXY(3),
    projection:'EPSG:4326',
    // render:
    // target:'mouseposition'
    // placeholder:
    // wrapX:
})
const scaleline=new ScaleLine({
    units:'metric',
    // bar:true
}    
)
const overviewmap=new OverviewMap({
    layers:[tianditu_img_w],
    // callapsed:true
})
export {zoomToExtent  ,zoomSlider ,mousePosition ,scaleline,overviewmap }