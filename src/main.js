import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './style.css'
// 引入router4
import {router} from './router' 
// 引入vuex状态管理
import store from './store'
// 引入icon图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

app.use(router)

app.use(store)

app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 调用windi样式
import 'virtual:windi.css'
//引入nprogress.css样式
import 'nprogress/nprogress.css'
//渲染之前引入前置守卫
import  './permission'
//自定义权限控制组件
import permission from '~/directives/permission.js'
//Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners
import 'default-passive-events'
app.use(permission)

app.mount('#app')
