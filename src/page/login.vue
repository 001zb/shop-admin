<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>欢迎光临</div>
            <div>代码用户提供自动完成、语法高亮显示、代码折叠和构建等高级功能，增强了Windi开发体验 </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right"> 
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="userName">
                    <el-input v-model="form.userName" placeholder="请输入用户名">
                        <!-- 在后面引入 -->
                        <!-- <template #suffix>
                            <el-icon class="el-input__icon"><User /></el-icon>
                        </template> -->
                        <template #prefix>
                            <el-icon class="el-input__icon"><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" show-password v-model="form.password" placeholder="请输入密码">
                        <template #prefix>
                                <el-icon class="el-input_icon"><Lock /></el-icon> 
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                     <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">登录</el-button>
                </el-form-item>
           </el-form>
        </el-col>
    </el-row>
</template>
<!-- setup由vue3提供的语法糖 -->
<script  setup>//onMounted,onBeforeUnmount
import { reactive,ref,onMounted,onBeforeUnmount} from 'vue'
import { useRouter } from 'vue-router'
// import { User ,Lock} from '@element-plus/icons-vue'
// util文件 toast方法
import {toast} from '~/composables/util'
//调用vuex
import {useStore} from 'vuex'

const store = useStore();

const loading = ref(false);

const router = useRouter();

const form = reactive({
  userName: '',
  password: ''
})

const rules ={
    userName:[
        {
            required: true, //必填项
            message: '用户名不能为空',
            trigger: 'blur',//触发时机 失去焦点的时候
        },
        
    ],
    password:[
        {
            required: true, //必填项
            message: '密码不能为空',
            trigger: 'blur',//触发时机 失去焦点的时候
        },

    ]
};

const formRef = ref(null)
const onSubmit = () => {
    formRef.value.validate((vaild)=>{
        if(!vaild){
            return false
        }
        loading.value = true;
        
        store.dispatch("login",form).then(res=>{
            router.push("/")
            toast("登录成功");
        })
        .finally(()=>{
            loading.value = false;
        })
    })
  
}
//回车事件
function onKeyUp(e) {
    if(e.key=='Enter') onSubmit();
    
}

// // 页面加载完成之后添加键盘监听
onMounted(() => {
    document.addEventListener('keyup',onKeyUp)
})
//页面销毁之后移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener('keyUp',onKeyUp)
})
</script>
<style scoped>
.login-container{
    @apply bg-indigo-500 min-h-screen;
}
.login-container .left{
    @apply flex items-center justify-center flex-col;
}
.left>div:first-child{
    @apply font-bold text-5xl text-light-50 mb-4;
}
.login-container>div:last-child{
    @apply text-gray-400 text-sm;
}

.login-container .right{
    @apply bg-light-50 flex items-center justify-center flex-col ;
}
.right .title{
    @apply font-bold text-3xl text-gray-800;
}
.right>div{
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>