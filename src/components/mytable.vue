<template>
    <div class="tablebox" v-el-draggable>
        <el-table
        class="table"
        :data="tableData"
        border
        max-height="500px"
        style="width: 100%">
            <el-table-column
            fixed
            prop="date"
            label="日期"
            width="150">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            prop="province"
            label="省份"
            width="120">
            </el-table-column>
            <el-table-column
            prop="city"
            label="市区"
            width="120">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址"
            width="300">
            </el-table-column>
            <el-table-column
            prop="zip"
            label="邮编"
            width="120">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-button @click="closetable">关闭</el-button>
    </div>
    
</template>
<script>
export default{
    data(){
        return {
            
    }
},
    computed:{
    tableData(){
        return this.$store.state.queryproper
    }
},
    methods:{   
        closetable(){
            this.$store.state.mytableOk=false
        }
    }
}
</script>
<style>
.tablebox{
    position: absolute;
    top:50%;
    left:50%;
    /* float:right; */
    transform:translate(-50%, -50%);
    /* height: 500px; */
    /* z-index: 1000; */
}

</style>


