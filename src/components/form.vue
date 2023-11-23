<template>
    <div class="loginbox">
        <el-form :rules="userRule" :model="user">
            <el-form-item label="账号" prop="username">
                <el-input v-model="user.username"></el-input>
            </el-form-item>                                                                                                     
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="submitUser">提交</el-button>
                <el-button @click.native="resetUser">重置</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>
<script>
export default{
    data(){
        return {
            user: {
                username:'wanghaoran',
                password:'123456',
            },
            userRule:{
                username:[{required:true,message:'不能为空',trigger:'blur'}],
                password:[{required:true,message:'不能为空',trigger:'blur'}]
            }
        }
    },
    methods:{
        submitUser(){
            if(this.user.username == 'wanghaoran' && this.user.password=='123456'){
                this.$router.push({path:'/amap'})
            }else{
                this.$message('用户名密码不正确')
            }
            
        },
        resetUser(){
            this.user.username='',
            this.user.password=''
        }
    }
}
</script>
<style>
    .loginbox{
   
    }

</style>


