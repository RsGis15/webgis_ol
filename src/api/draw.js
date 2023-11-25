import {Point,LineString,Circle,Polygon} from 'ol/geom'
import store from '../store'
import Feature from 'ol/Feature'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style'
import Draw from 'ol/interaction/Draw'
import {createBox} from 'ol/interaction/Draw';
import {specialQuery} from './requests'
/**
    *根据坐标点绘制点、线、多边形、圆  
    * @type
 */
export function drawByPostion(type,position){
    let pointFeature= new Feature({})
    switch(type){
        case 'point':
            console.log(position)
            let point = new Point(position)
            pointFeature.setGeometry(point)
            store.state.drawlayer.source.addFeature(pointFeature)
            store.state.drawlayer.drawLayer.setSource(store.state.drawlayer.source)
            store.state.openlayer.map.addLayer(store.state.drawlayer.drawLayer)
            break;  
        case 'line':
            const line =new LineString([position])
            break;
        case 'circle':
            const circle =new Circle([position])
            break;
        case 'polgon':
            const polgon =new Polygon([position])
            break;
    }
}

/**
    *交互式绘制点、线、多边形、圆  
    * @type
 */
export function drawInteractive(type){
    store.state.drawlayer.drawLayer.setSource(store.state.drawlayer.source)
    switch(type){
        case 'Point':
            const pointDraw = new Draw({type:'Point',source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(pointDraw)
            break;  
        case 'LineString':
            const lineDraw = new Draw({type:'LineString',source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(lineDraw)
            break;
        case 'Circle':
            const circleDraw = new Draw({type:'Circle',source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(circleDraw)
            break;
        case 'Square':
            const squareDraw = new Draw({type:'Circle',geometryFunction:createBox(),source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(squareDraw)
            break;
        case 'Polygon':
            const polygonDraw = new Draw({type:'Polygon',source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(polygonDraw)
            break;
}
}

    const queryBydraw=async function (type){
    store.state.drawlayer.drawLayer.setSource(store.state.drawlayer.source)
    let selectData=null
    switch(type){
        case 'Point':
            const pointDraw = new Draw({type:'Point',source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(pointDraw)
            break;  
        case 'LineString':
            const lineDraw = new Draw({type:'LineString',source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(lineDraw)
            break;
        case 'Circle':
            const circleDraw = new Draw({type:'Circle',source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(circleDraw)
            break;
        case 'Square':
            const squareDraw = new Draw({type:'Circle',geometryFunction:createBox(),source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(squareDraw)
            break;
        case 'Polygon':
            const polygonDraw = new Draw({type:'Polygon',source:store.state.drawlayer.source})
            store.state.openlayer.map.addInteraction(polygonDraw)
            await new Promise((resolve)=>{
                polygonDraw.on("drawend", async function (evt) {
                    store.state.drawlayer.source.clear();
                    var feature = evt.feature;
                    var inputGeometry = feature.getGeometry();
                    const data= await specialQuery(inputGeometry);
                    console.log(data,111)
                    selectData=data
                    resolve();
            })
            });
            break;
        }
        return selectData;

            

}
export { queryBydraw}