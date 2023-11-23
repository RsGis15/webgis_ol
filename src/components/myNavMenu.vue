<template>
    <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">绘制几何图形</span>
                </template>
                <el-submenu index="1-4">
                <span slot="title">绘制点</span>
                <el-menu-item index="1-4-1">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-4-1">交互式绘制</el-menu-item>
                </el-submenu>
                <el-submenu index="1-4">
                <span slot="title">绘制线</span>
                <el-menu-item index="1-4-1">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-4-1">交互式绘制</el-menu-item>
                </el-submenu>
                <el-submenu index="1-4">
                <span slot="title">绘制面</span>
                <el-menu-item index="1-4-1">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-4-1">交互式绘制</el-menu-item>
                </el-submenu>
                <!-- <el-menu-item-group title="点" >
                <el-menu-item index="1-1">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-2">交互式绘制</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="线">
                <el-menu-item index="1-3">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-3">交互式绘制</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="面">
                <el-menu-item index="1-3">根据坐标绘制</el-menu-item>
                <el-menu-item index="1-3">交互式绘制</el-menu-item>
                </el-menu-item-group> -->
             
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </div>    
</template>   
   
<script>
    export default {
        data(){
            return { isCollapse: true}
        },
      methods: {
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