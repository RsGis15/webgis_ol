import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ'
var tianditu_img_w=new TileLayer({
    title: '天地图卫星影像',
    source: new XYZ({
    visible: false,
    wrapX: false,
    url: 'http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=ffa0ce442ce38f519a99c93b3349bd91'
    })
})
var tianditu_cia_w=new TileLayer({
    title: '天地图影像注记图层',
    source: new XYZ({
    visible:false,
    wrapX: false,
    url: 'http://t4.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=ffa0ce442ce38f519a99c93b3349bd91'
    })
})
var tianditu_vec_w=new TileLayer({
    title: '天地图矢量图层',
    source: new XYZ({
    visible: false,
    wrapX: false,
    url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=ffa0ce442ce38f519a99c93b3349bd91'
})
})
var tianditu_cva_w=new TileLayer({
    title: '天地图矢量注记图层',
    source: new XYZ({
    visible: false,
    wrapX: false,
    url: 'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=ffa0ce442ce38f519a99c93b3349bd91'
    })
})
export { tianditu_img_w,  tianditu_cia_w, tianditu_vec_w, tianditu_cva_w }