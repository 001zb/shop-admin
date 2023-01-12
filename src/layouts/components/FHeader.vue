<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1"><eleme-filled /></el-icon>
            vite编程
        </span>
        <el-tooltip class="box-item" effect="dark" content="展开" placement="bottom">
            <el-icon class="icon-btn" @click="$store.commit('handLeAsideWidth')">
                <Fold  v-if="$store.state.asideWidth == '250px'"/>
                <Expand v-else/>
            </el-icon>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>
        <div class="ml-auto flex items-center">
            <el-tooltip class="box-item" effect="dark" :content="FullTag" placement="bottom">
                <el-icon class="icon-btn" @click="IsToggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="HandleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <!-- 抽屉组件 -->
    <FormDrawer ref="formDrawerRef" title="修改密码" destroy-on-close @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input show-password type="password" v-model="form.oldpassword" placeholder="请输入原密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" show-password v-model="form.password" placeholder="请输入新密码">

                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" show-password v-model="form.repassword" placeholder="请确认新密码">

                </el-input>
            </el-form-item>
        </el-form>
    </FormDrawer>

</template>
<script setup>
import {useRepassword,useEdit} from '~/composables/useManager'
//   onMounted, onBeforeUnmount
import { ref} from 'vue'
//引入useVue核心包，实现全屏
import { useFullscreen } from '@vueuse/core'

import FormDrawer from '~/components/FormDrawer.vue'

//标签修改标识（全局）
let FullTag = ref('全屏');

//密码抽屉开关
// const IsDrawer = ref(false)

// toggle 切换全屏 isFullscreen 是否全屏
const { isFullscreen, toggle } = useFullscreen();

//修改密码return参数
const {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordEorm
} = useRepassword();

//退出参数
const {
    exit
} = useEdit();



//全屏切换
function IsToggle() {
    let IsOpen = isFullscreen.value;
    toggle();
    if (!IsOpen)
        FullTag.value = '退出全屏';
    else
        FullTag.value = '全屏';

}

//刷新
const handleRefresh = () => location.reload();
//监听交互操作
const HandleCommand = (h) => {
    switch (h) {
        case 'logout':
            exit()
            break;

        case 'rePassword':
            // IsDrawer.value = true
            openRePasswordEorm();
            break;
    }
}


//回车事件
// function onKeyUp(e) {
//     if (e.key == 'Enter') onSubmit();

// }

//  //页面加载完成之后添加键盘监听
// onMounted(() => {
//     document.addEventListener('keyup', onKeyUp)
// })
// //页面销毁之后移除键盘监听
// onBeforeUnmount(() => {
//     document.removeEventListener('keyUp', onKeyUp)
// })
</script>
<style>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 right-0 left-0;
    height: 64px;
    z-index: 1000;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex items-center justify-center;
}
</style>