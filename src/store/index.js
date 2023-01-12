//状态管理
import {createStore} from 'vuex'
import {login,getInfo} from '~/api/manager'
import {setToken,RemoveToken} from '~/composables/auth'
const store = createStore({
    state () {
      return {
        //用户信息
        user:[],

        //侧边宽度
        asideWidth:"250px",


        menus:[],
        ruleNames:[]
      }
    },
    mutations: {
        SET_USERINFO(state,user){
            //记录用户信息
            state.user = user;
        },
        // 展开/缩起侧边
        handLeAsideWidth(state){
          state.asideWidth = state.asideWidth == "250px" ? "64px":"250px"
        },
        SET_MENUS(state,menus){
          state.menus = menus
        },
        SET_RULENAMES(state,ruleNames){
          state.ruleNames = ruleNames
        },
    },
    actions:{
      // 登录
      login({commit},{userName,password}){
        return new Promise((resolve,reject)=>{
          login(userName,password)
          .then(res=>{
            setToken(res.token);
            resolve(res);
          })
          .catch(err=>reject(err))
        })
      },
      //获取当先登录用户信息
      getInfo({commit}){
        return new Promise((resolve,reject)=>{
          getInfo().then((res)=>{
          commit("SET_USERINFO",res)
          commit("SET_MENUS",res.menus)
          commit("SET_RULENAMES",res.ruleNames)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
      },
      //退出登录
      logout({commit}){
        // 移除cookie里的token
        RemoveToken()
        //清楚当前用户的状态管理 vuex
        commit("SET_USERINFO",[])
      }
      
    }
})
export default store;