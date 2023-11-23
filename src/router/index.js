import amap from '../components/amap.vue'
import login from '../components/login.vue'
export default[
    {
        path:'/',
        redirect:'/login',
        component:login
    },
    {
        path:'/login',
        component:login
    },
    {
    path: '/amap',
    component: amap,
    },
]
  

