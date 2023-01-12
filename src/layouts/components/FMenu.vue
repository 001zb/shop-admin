<template>
    <div class="f-menu" :style="{width:$store.state.asideWidth}">
        <el-menu :default-active="defaultActive" :unique-opened="true" :collapse-transition="false" :collapse="isCollapse" default-active="2" class="el-menu-vertical-demo"  @select="HandleSelect">
            <template v-for="(item, index) in asideMenus" :key="index">
                <el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item1, index1) in item.child" :key="index1" :index="item1.frontpath">
                        <template #title>
                            <el-icon>
                                <component :is="item1.icon"></component>
                            </el-icon>
                            <span>{{ item1.name }}</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<style>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x:hidden;
    @apply shadow-md fixed bg-light-50;
}
.f-menu::-webkit-scrollbar{
    width:0px;
}
</style>
<script setup>
import {computed,ref} from 'vue'
import {useRouter,useRoute,onBeforeRouteUpdate} from 'vue-router'
import {useStore} from 'vuex';


const store = useStore();

const route = useRoute();

const asideMenus = computed(()=>store.state.menus)

const router = useRouter();
const HandleSelect = (e)=>{
    router.push(e);
}
//默认选中
const defaultActive = ref(route.path);

//监听路由变化
onBeforeRouteUpdate((to,form)=>{
    defaultActive.value = to.path;
    
})
//是否折叠
const isCollapse = computed(()=>!(store.state.asideWidth == '250px'))
</script>
