// src/router/index.js
import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Admin from '~/layouts/admin.vue'

import Index from '~/page/index.vue'
import Login from '~/page/login.vue'
import NotFound from '~/page/404.vue'
import Category from '~/page/category/list.vue'
import GoodsList from '~/page/goods/list.vue'
import UserList from '~/page/user/list.vue'
import ImageList from '~/page/image/list.vue'
import OrderList from '~/page/order/list.vue'
import CommentList from '~/page/comment/list.vue'
import CouponList from '~/page/coupon/list.vue'
import NoticeList from '~/page/notice/list.vue'
import SettingBase from '~/page/setting/base.vue'
import SettingBuy from '~/page/setting/buy.vue'
import SettingShip from '~/page/setting/ship.vue'
import ManagerList from '~/page/manager/list.vue'
import AccessList from '~/page/access/list.vue'
import RoleList from '~/page/role/list.vue'
import SkusList from '~/page/skus/list.vue'
import LevelList from '~/page/level/list.vue'
import DistributionSetting from '~/page/distribution/setting.vue'
import DistributionIndex from '~/page/distribution/index.vue'
// children:[
//     {path : "/",component:Index,meta:{title:"后台首页"}},
//     {path : "/goods/list",component:GoodsList,meta:{title:"商品管理"}},
//     {path : "/category/list",component:Category,meta:{title:"商品管理"}},

// ]

//默认路由，所有用户共享
const routes = [
    {path : "/",component:Admin,name:'admin'},
    {path : "/login",component:Login,meta:{title:"登录页面"}},
     // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
   { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, 

];
//动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
    {path : "/",name:"/",component:Index,meta:{title:"后台首页"}},
    {path : "/goods/list",name:"/goods/list",component:GoodsList,meta:{title:"商品列表"}},
    {path : "/category/list",name:"/category/list",component:Category,meta:{title:"分类列表"}},
    {path : "/user/list",name:"/user/list",component:UserList,meta:{title:"用户列表"}},
    {path : "/order/list",name:"/order/list",component:OrderList,meta:{title:"订单列表"}},
    {path : "/comment/list",name:"/comment/list",component:CommentList,meta:{title:"评价列表"}},
    {path : "/coupon/list",name:"/coupon/list",component:CouponList,meta:{title:"优惠券列表"}},
    {path : "/notice/list",name:"/notice/list",component:NoticeList,meta:{title:"公告列表"}},
    {path : "/image/list",name:"/image/list",component:ImageList,meta:{title:"图库列表"}},
    {path : "/setting/base",name:"/setting/base",component:SettingBase,meta:{title:"基础配置"}},
    {path : "/setting/buy",name:"/setting/but",component:SettingBuy,meta:{title:"交易配置"}},
    {path : "/setting/ship",name:"/setting/ship",component:SettingShip,meta:{title:"物流配置"}},
    {path : "/manager/list",name:"/manager/list",component:ManagerList,meta:{title:"管理员管理"}},
    {path : "/access/list",name:"/access/list",component:AccessList,meta:{title:"菜单权限管理"}},
    {path : "/role/list",name:"/role/list",component:RoleList,meta:{title:"角色管理"}},
    {path : "/skus/list",name:"/skus/list",component:SkusList,meta:{title:"规格管理"}},
    {path : "/level/list",name:"/level/list",component:LevelList,meta:{title:"会员管理"}},
    {path : "/distribution/index",name:"/distribution/index",component:DistributionIndex,meta:{title:"分销员管理"}},
    {path : "/distribution/setting",name:"/distribution/setting",component:DistributionSetting,meta:{title:"分销员配置"}},
]
// 创建路由实例
export const router = createRouter({
    history:createWebHashHistory(), // Hash模式：createWebHashHistory， history模式：createWebHistory
    routes
})

//动态添加路由方法
export function addRoutes(menus) {
    //是否有新的路由
    let hasNewRoutes = false;
    const fundAndAddRoutesByMenus = (arr)=>{
        arr.forEach(e => {
            let item = asyncRoutes.find(o=>o.path == e.frontpath)
            //检查路由是否存在
            if(item && !(router.hasRoute(item.path))){
                // console.log(!(router.hasRoute(item.path)) + '路径'+item.path)
                // console.log('/category/list====='+router.hasRoute('/category/list'))
                router.addRoute('admin',item)
                // console.log(router.getRoutes())
                hasNewRoutes = true;
            }

            if(e.child && e.child.length > 0 ){
                fundAndAddRoutesByMenus(e.child)
            }
        });
    }

    fundAndAddRoutesByMenus(menus)
    // console.log(hasNewRoutes+"最后")
    return hasNewRoutes
}
