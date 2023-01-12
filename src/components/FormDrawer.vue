<!-- 抽屉组件 :destroy-on-close="destroyOnClose"-->
<template>
    <el-drawer v-model="showDrawer" :title="title" :size="size" :close-on-click-modal="false"  :destroy-on-close="destroyOnClose" >
        <div class="formDrawer">
           <div class="body">
            <!-- 插槽 -->
            <slot></slot> 
           </div>   
           <div class="actions">
            <el-button type="primary" @click="submit" :loading="loading">{{confirmText}}</el-button>
            <el-button type="default" @click="close">关闭</el-button>
           </div>
        </div>
    </el-drawer>
</template>
<script setup>
import {ref} from 'vue'

const showDrawer = ref(false);

//定义loading 加载
const loading = ref(false)
const showLoading = ()=>loading.value=true;
const hideLoading = ()=>loading.value=false;


//提交
const emit = defineEmits(["submit"])


const props = defineProps({
    title:String,
    destroyOnClose:{
        type:Boolean,
        default:false
    },
    size:{
        type:String,
        default:'45%'
    },
    confirmText:{
        type:String,
        default:'提交'
    },
    loading:{
        type:Boolean,
        default:false
    }
})

//打开
const open =()=>showDrawer.value = true

//关闭
const close =()=>showDrawer.value= false

const submit = () => emit('submit')
//向父组件暴露一下方法 setup方法内置，不需要引入
defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})

</script>
<style>
.formDrawer{
    width:100%;
    height:100%;
    position: relative;
    @apply flex;
}
.formDrawer .body{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:70px;
    overflow: auto;
}

.formDrawer .actions{
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>