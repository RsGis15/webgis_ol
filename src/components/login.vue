<template>
    <div class="overlay">
        <div class="login"> 
            <Form></Form>
        </div>   
    </div>

</template>

<script>
import Form from './form.vue'
export default{
    data(){
        return {

        }
    },
    components:{
        Form
    },
    methods:{

    }
}

</script>
<style>
    .overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
            background-image: url(../assets/login_bg.jpg) ;
            background-repeat: no-repeat;
            background-size:100% 100%;
			z-index: 9999;
            
            /* background-repeat: no-repeat; */
		}
    .login {
        height: 400px;
        width: 400px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%)
    }

</style>

