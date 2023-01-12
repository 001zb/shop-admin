<template>
    <div v-if="modelValue && preview">
        <el-image v-if="(typeof modelValue == 'string')" :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2 flex items-center"></el-image>
        <div v-else class="flex flex-wrap">
            <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url,index) in modelValue" :key="index">
                <el-icon @click="removeImage(url)" class="absolute top-[5px] right-[5px] cursor-pointer bg-white rounded-full" style="z-index:10;"><CircleClose/></el-icon>
                <el-image :src="url" fit="cover" class="w-[100px] h-[100px] rounded border mr-2 flex items-center"></el-image>
            </div>
        </div>
    </div>
    <div class="choose-image-btn" @click="open" v-if="preview">
        <el-icon :size="25" class="text-gray-500"><Plus/></el-icon>
    </div>
    <el-dialog
        title="选择图片"
        v-model="dialogVisble"
        width="80%"
        top="5vh">
        <el-container class="bg-white rounded " style="height:70vh;">
            <el-header class="image-header">
                <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
                <el-button type="warning" size="small" @click="hideOpenUploadFile">上传图片</el-button>
            </el-header>
            <el-container>
                <!--  -->
                <ImageAside ref="ImageAsideRef" @change="handleAsideChange"/>
                <ImageMain :limit="limit" openChoose ref="ImageMainRef" @choose="handleChoose"/>
            </el-container>
        </el-container>
        <span></span>
        <template #footer>
            <span>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>
    
</template>
<script setup>
import {ref} from 'vue'
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import {toast} from '~/composables/util'

const dialogVisble = ref(false)

const callbackFuntion = ref(null)
const open = (callback = null)=> {
    callbackFuntion.value = callback
    dialogVisble.value = true
};

const close = () => dialogVisble.value = false;




const ImageAsideRef = ref(null)
const ImageMainRef = ref(null)



const handleAsideChange = (image_class_id)=>{
    ImageMainRef.value.loadData(image_class_id);
}
const handleOpenCreate = ()=>ImageAsideRef.value.handleCreate();
const hideOpenUploadFile = ()=> ImageMainRef.value.openUploadFile()

const props = defineProps({
    modelValue:[String,Array],
    limit:{
        type:Number,
        default:1
    },
    preview:{
        type:Boolean,
        default:true
    }
})

const emit = defineEmits(["update:modelValue"])
let urls = []
const handleChoose=(e)=>{
    urls = e.map(o=>o.url)
    
}
const submit=()=>{
    let value = []
    if(props.limit == 1){
        value = urls[0]
    }else{
        value=props.preview?[...props.modelValue,...urls ]:[...urls]
        if(value.length > props.limit){
            let limit = props.preview?(props.limit - props.modelValue.length):props.limit
            return toast('最多还能选择'+limit+'张')
        }
    }
    if(value && props.preview){
        emit('update:modelValue',value)
    }
    if(!props.preview && typeof callbackFuntion.value == 'function'){
        callbackFuntion.value(value)
    }
    close()
}
const removeImage =(url)=>emit('update:modelValue',props.modelValue.filter(u=>u!=url))

defineExpose({
    open
})
</script>

<style scoped>
.choose-image-btn{
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-50);
}
</style>