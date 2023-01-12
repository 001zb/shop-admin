<template>
    <div class="aside-list" :class="{ 'active': active }">
        <span class="truncate">
            <slot />
        </span>
        <div>
            <!--:size="12" type="primary"-->
            <!-- <el-button text @click.stop="$emit('edit')" class="btn">
                <el-icon>
                    <Edit />
                </el-icon>
            </el-button> -->
            <!--  :size="12"  type="primary"  -->
            <!-- <span @click.stop="">
                <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" @confirm="$emit('delete')"
                    :icon="InfoFilled" icon-color="#626AEF" title="是否要删除该分类">
                    <template #reference>
                        <el-button text class="btn">
                            <el-icon><Close /> </el-icon>
                        </el-button>  
                    </template>
                </el-popconfirm>
            </span> -->
        </div>
    </div>
</template>
<script setup>
import { InfoFilled } from '@element-plus/icons-vue'
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})


//暴露出去
defineEmits(['edit', 'delete'])
</script>
<style scoped>
.aside-list {
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    @apply flex justify-between items-center p-3 text-sm text-gray-500;
}

.aside-list:hover,
.active {
    @apply bg-blue-50;
}

.btn {
    @apply px-1;
    cursor: pointer;
}
</style>