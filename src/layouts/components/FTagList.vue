<template>
    <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
        <!-- editable 显示添加标签   按钮 -->
        <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" style="min-width:100px"
            @tab-change="changeTab">
            <el-tab-pane v-for="item in tabList" :closable="item.path != '/'" :key="item.path" :label="item.title"
                :name="item.path">

            </el-tab-pane>
        </el-tabs>
        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link ">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部闭关</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height:10px">

    </div>
</template>
<script setup>
// activeTab,tabList,removeTab,handleClose,changeTab
import { useTabList } from '~/composables/useTabList.js'

const {activeTab,tabList,removeTab,handleClose,changeTab} = useTabList()



</script>
<style scoped>
/* justify-center px-2 */
.f-tag-list {
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 100;
}


.tag-btn {
    @apply bg-white rounded ml-auto flex items-center justify-center;
    height: 32px;
    width: 32px;
}




:deep(.el-tabs__header) {
    border: 0 !important;
    @apply mb-0;
    margin-top: 3px;
}

:deep(.el-tabs__nav) {
    border: 0px !important;

}

:deep(.el-tabs__item) {
    border: 0px !important;
    @apply bg-white mx-1 rounded;
    height: 32px;
    line-height: 32px;
}


:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height: 32px;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>