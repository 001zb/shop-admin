// 路由守卫文件
import {router,addRoutes} from "~/router"
import {getToken} from "~/composables/auth"
import {toast,showFullLoading,HideFullLoading} from "~/composables/util"
import store from "./store"

//全局前置守卫 to:即将到达路径 from：从哪个路径来
let hasGetInfo = false;
router.beforeEach(async (to, form,next) => {
    // 显示loading
    showFullLoading();
    const token = getToken();
    //没有登录强制跳转回登录页
    if(!token && to.path != "/login"){
        toast("请先登录","error")
        return next({path:"/login"})
        
    }
    //防止重复登录  
    if(token && to.path=="/login"){
        toast("请勿重新登陆","error")
        return next({path:form.path?form.path: '/'})
    }
    //如果用户登录了，自动获取用户信息，并存储在vuex中。
    let hasNewRoutes = false;
    if(token && !hasGetInfo){
      let {menus} =  await store.dispatch('getInfo')
      hasGetInfo = true;
        //动态添加路由
        hasNewRoutes = addRoutes(menus)
        // console.log(hasNewRoutes)
    }
    //设置页面标题
    let title = (to.meta.title ? to.meta.title:'')+"--系统后台"
    document.title= title;

    //放行
    hasNewRoutes ? next(to.fullPath):next()
    // console.log(hasNewRoutes)
    // next();
  })
  
//全局后置守卫
router.afterEach((to, from) => {
    HideFullLoading();
})