<template>
    <el-container class="fullscreen">
        <el-aside>
            <myNavMenu></myNavMenu>
        </el-aside>
        <el-main class="map">
            <olmap v-if="true" ></olmap>
        </el-main>
    </el-container>

</template>

<script>
import myNavMenu from './myNavMenu.vue'
import daohang from './daohang.vue'
import olmap from './olmap.vue'
// import cesiummap from './cesiummap.vue'
export default{
    data(){
        return {
            // ol:
        }
    },
    components:{
        daohang , olmap, myNavMenu
    },

}

</script>
<style scoped>
  body .map{
  margin: 0;
  padding: 0;
}

.fullscreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

</style>

