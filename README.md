插件：
1、WindiCSS IntelliSense   Windicss提示、关联插件
2、Chinese (Simplified) (简体中文)     转中文插件
3、Vue 3 Snippets   高亮插件
4、Vue Language Features    代码用户提供自动完成、语法高亮显示、代码折叠和构建等高级功能，增强了Windi开发体验   
5、es/es6验证语法
6.element plus 快捷语法提示

使用vite创建Vue项目：
# npm 7+, extra double-dash is needed: --创建项目
npm create vite@latest my-vue-app  -- --template vue  link || https://vitejs.cn/vite3-cn/guide/  ->开始
# NPM --安装elementpuls
npm install element-plus --save   link || https://element-plus.org/zh-CN/guide/installation.html
# NPM   --挂载Windi css样式
npm i -D vite-plugin-windicss windicss  link || https://cn.windicss.org/integrations/vite.html
# NPM  --路由配置 
npm install vue-router@4 link || https://router.vuejs.org/zh/installation.html
# 别名配置  vite.config.js文件中
export default defineConfig({
  resolve:{
    alias:{
     "~":path.resolve(__dirname,"src") 
    }
  },
  plugins: [vue(),WindiCSS(),],
})
# 配置404 Not-Found-路由和404页面
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
   { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, 
   link || https://router.vuejs.org/zh/guide/essentials/dynamic-matching
# icon图标的包依赖加载
npm install @element-plus/icons-vue
link ||  https://element-plus.org/zh-CN/component/icon.html#%E4%BD%BF%E7%94%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8
# npm install axios  安装请求
# 配置proxy
# 使用Vueuse 来完成Cookies操作
 npm i @vueuse/integrations
  npm i universal-cookie
  link || https://vueuse.org/integrations/usecookies/#usecookies
# vuex 的状态管理  基于vue3 选择 vuex 4.0
  npm install vuex@next --save
  link || https://vuex.vuejs.org/zh/installation.html#%E7%9B%B4%E6%8E%A5%E4%B8%8B%E8%BD%BD-cdn-%E5%BC%95%E7%94%A8
# Npm 全局loading  
link || https://www.npmjs.com/ 搜索：nprogress  安装命令：npm i nprogress
# npm useVUe core模块 ：实现全屏
npm i @vueuse/core
# 使用animate.css样式进行动画展示
# gsap加载滚动动画 动画库加载  npm install gsap ==>npmjs.com
# 安装echarts插件 npm install echarts
link || https://echarts.apache.org/zh/
# npm i default-passive-events -S 因Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners；
main.js中加入：import ‘default-passive-events’
# 富文本编辑器  tinymce编辑器
npm i tinymce
npm i @tinymce/tinymce-vue
从node_modules/tinymce复制样式文件到public目录下
|public
|-- tinymce
|---- langs 语言目录
|------zh-Hans.js
|---skins 皮肤目录
|-----content
|-----ui
|----tinymce.min.js
:::tip中文语言包 zh-Hans.js下载地址
https://www.tiny.cloud/get-tiny/language-packages =>Chinese Simplified
新增Editor组件
/src/components/Editor.vue


图片代替图
https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png





#  =======部署准备
  服务器购买  allyun.com  香港域名不需要备案（其他需要备案）
  安全组配置  端口开启 HTTP80 HTTPS443 SSH22 
  安装环境    bt.cn命令行
    切换root账号：su root
    密码输入=》
    22端口安装:yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
    www.directory new?(y/n): y
    自定义端口 8888 && 888
    查看bt信息 bt default || 可以查看到路径、用户名和密码
    登录路径网页=》可视化面板  PHP7.2版本环境 ，其他默认
    面板配置=》修改用户名和密码
    修改账号密码
  域名购买\域名解析
    域名注册=》加入清单=》立即购买=》填写实名认证=》进入域名控制台(是否显示正常)=》域名解析=》添加记录=》主机记录:test(开头)=》记录值:ip地址=》ICP备案（国内）=》国外（不需要备案）
# 项目配置  vitejs.cn/guide/env-and-mode.html  环境变量与模式

在项目根目录创建.env.development && .env.production

.env.development
VITE_APP_BASE_API = '/api'

.env.production
VITE_APP_BASE_API = 'http://ceshi13.dishait.cn'

查看是否生效
# App.vue 文件

<script steup>
  console.log(import.meta.env)

  ====console.log ====
  有VITE_APP_BASE_API环境变量
</script>
# axios文件
const service = axios.create({
    baseURL:"/api"
})

||替换
const service = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API
})

# api文件image.js文件
export const uploadImageAction = '/api/admin/image/upload'
|| 替换
export const uploadImageAction =import.meta.env.VITE_APP_BASE_API+ '/admin/image/upload'
# api/sysconfig.js
export const uploadImageAction = '/api/admin/sysconfig/upload'
|| 替换
export const uploadImageAction =import.meta.env.VITE_APP_BASE_API+ '/admin/sysconfig/upload'
尝试登录=>打包项目 npm run build 生成在dist这个目录下
  创建网站 添加站点test.dishawang.com访问站点成功点击进入项目根目录
  =》压缩dist目录 =》在项目根目录上传压缩包=》解压=》删除压缩包
  网站=》设置=》网站目录》选择目录.../../../dist下就可以了
# 部署后端
# 部署前端









