<template>
    <el-container class="fullscreen">
        <el-aside>
            <myNavMenu></myNavMenu>
        </el-aside>
        <el-main class="map">
            <olmap v-if="true" ></olmap>
            <mytable v-if="mytableOk"></mytable> 
        </el-main>
    </el-container>

</template>

<script>
import myNavMenu from './myNavMenu.vue'
import daohang from './daohang.vue'
import olmap from './olmap.vue'
import mytable from './mytable.vue'
// import cesiummap from './cesiummap.vue'
export default{
    data(){
        return {

        }
    },
    computed:{
        mytableOk(){
        return   this.$store.state.mytableOk
        }
    },
    components:{
        daohang , olmap, myNavMenu , mytable 
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

