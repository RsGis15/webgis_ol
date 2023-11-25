<template>
    <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :unique-opened="true">
        <el-submenu index="draw">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">绘制几何图形</span>
            </template>
            <el-menu-item @click="closeInter">关闭绘制</el-menu-item>
            <el-submenu index="drawpoint">
                <span slot="title">绘制点</span>
                <el-menu-item index="drawpointpostion" @click="drawPosition('point')">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-1-2" @click="drawinter('Point')">交互式绘制</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
                <span slot="title">绘制线</span>
                <el-menu-item index="1-2-1">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-2-2" @click="drawinter('LineString')">交互式绘制</el-menu-item>
            </el-submenu>
            <el-submenu index="1-3">
                <span slot="title">绘制圆形</span>
                <el-menu-item index="1-3-1">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-3-1" @click="drawinter('Circle')">交互式绘制</el-menu-item>
            </el-submenu>
            <el-submenu index="1-4">
                <span slot="title">绘制矩形</span>
                <el-menu-item index="1-4-1">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-4-2" @click="drawinter('Square')">交互式绘制</el-menu-item>
            </el-submenu>
            <el-submenu index="1-5">
                <span slot="title">绘制多边形</span>
                <el-menu-item index="1-5-1">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-5-2" @click="drawinter('Polygon')">交互式绘制</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">空间查询</span>
            </template>
            <!-- <el-submenu index="1-4">
                <span slot="title">绘制点</span> -->
                <el-menu-item index="2-1" @click="tipsQuery" >按属性查询</el-menu-item>
                <!-- <el-menu-item index="1-4-1">查询所选区域</el-menu-item> -->
            <!-- </el-submenu> -->
            <el-submenu index="2-2"> 
                <span slot="title">查询所选区域</span>
                <el-menu-item index="2-2-1">圆查询</el-menu-item>
                <el-menu-item index="2-2-2">矩形查询</el-menu-item>
                <el-menu-item index="2-2-3">多边形查询</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">空间分析</span>
            </template>
            <!-- <el-submenu index="1-4">
                <span slot="title">绘制点</span> -->
                <el-menu-item index="3-1">按属性查询</el-menu-item>
                <!-- <el-menu-item index="1-4-1">查询所选区域</el-menu-item> -->
            <!-- </el-submenu> -->
            <el-submenu index="3-2"> 
                <span slot="title">查询所选区域</span>
                <el-menu-item index="3-2-1" @click="queryByZoon('Circle')">圆查询</el-menu-item>
                <!-- <el-menu-item index="3-2-2" @click="queryByZoon('Circle')">矩形查询</el-menu-item> -->
                <el-menu-item index="3-2-3" @click="queryByZoon('Polygon')">多边形查询</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>
    </div>    
</template>   
   
<script>
import {drawByPostion ,drawInteractive,queryBydraw} from '../api/draw'
import Draw from 'ol/interaction/Draw'
import {queryByAtt} from '../api/requests'
    export default {
        data(){
            return { isCollapse: true}
        },
      methods: {
        drawPosition(type) {
            this.$prompt('请输入邮箱', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern:  /^[-+]?\d+(\.\d+)?,\s*[-+]?\d+(\.\d+)?$/,
            inputErrorMessage: '请输入正确的坐标'
            }).then(({ value }) => {
                if(type='point'){
                    let position = [...value.split(',')].map(Number)
                    drawByPostion(type,position)  
                    }
                })
            },
      tipsQuery(){
        this.$prompt('请输入需要查询的县级市名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
                }).then(({value})=>{
                    queryByAtt(value)
                })
            },
        queryByZoon(type){
            queryBydraw(type)
        },
      drawinter(type){
        // this.$store.state.openlayer.map.addLayer(this.$store.state.drawlayer.drawLayer)
        drawInteractive(type)
      },
      closeInter(){
       const drawInter= this.$store.state.openlayer.map.getInteractions().getArray().filter((item)=>{
            return item instanceof Draw
        })
        drawInter.forEach(item=>{
            this.$store.state.openlayer.map.removeInteraction(item)   
        })
      },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
      }
    }
</script>




<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 300px;
    min-height: 400px;
  }
.el-menu-vertical-demo{
    background-color:aliceblue
}

</style>