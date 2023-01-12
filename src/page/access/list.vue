<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增|刷新 @create=""-->
        <ListHeader @create="handleCreate"  @refresh="getData"/>
        <el-tree :data="tableData" :props="{label:'name',children:'child'}" v-loading="loading" node-key="id" :default-expanded-keys="defaultExpandedKeys">
            <template #default="{node,data}"> 
                <div class="custom-tree-node">
                    <el-tag  size="small" :type="data.menu ? '':'info'">
                        {{ data.menu ?'菜单':'权限' }}
                    </el-tag>
                    <el-icon v-if="data.icon" size="16" class="ml-2">
                        <component :is="data.icon"/>
                    </el-icon>
                    <span>{{ data.name }}</span> 
                    <div class="ml-auto">
                        <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"  @change="hanleStatusChange($event,data)">
                        </el-switch>
                        <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>
                        <el-button text type="primary" size="small" @click.stop="addChild(data.id)">增加</el-button>
                        <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(data.id)" :icon="InfoFilled" icon-color="#626AEF" title="是否要删除该记录">
                            <template #reference>
                                <el-button type="primary" size="small" text >删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
            </template>
        </el-tree> 
        <formDrawer ref="formDrawerRef" :title="drawerTitle" @submit="hanleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader :options="options" v-model="form.rule_id"   
                        :props="{ label: 'name', children: 'child',checkStrictly:true, emitPath:false,value:'id'}" placeholder="请选择上级菜单" />
                </el-form-item>
                <el-form-item label="菜单/规则" prop="menu">
                    <el-radio-group v-model="form.menu" >
                        <el-radio :label="1" border>菜单</el-radio>
                        <el-radio :label="0" border>规则</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"  style="width:30%;" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
                    <IconSelect v-model="form.icon"/>
                </el-form-item>
                <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 1 && form.rule_id>0">
                    <el-input v-model="form.frontpath" placeholder="前端路由"></el-input>
                </el-form-item>
                <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
                    <el-input v-model="form.condition"  placeholder="后端规则"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method">
                    <el-select v-model="form.method" class="m-2"  placeholder="请选择请求方式">
                        <el-option v-for="item in ['GET','POST','PUT','DELETE']"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="1000"/>
                </el-form-item>
            </el-form>
        </formDrawer>
    </el-card> 
</template>
<script setup>
import {ref} from 'vue'
import {getRuleList,createRule,updateRule,deleteRule,updateRuleStatus} from '~/api/rule.js';
import {InfoFilled} from '@element-plus/icons-vue'
import ListHeader from '~/components/ListHeader.vue';
import formDrawer from '~/components/formDrawer.vue';
import IconSelect from '~/components/IconSelect.vue';
import{useInitTable,useInitForm} from '~/composables/useCommon.js'
const defaultExpandedKeys =ref([])
const options = ref([]);
const {
    loading,
    tableData,
    getData,
    handleDelete,
    handleStatusChange
}
=useInitTable({
    getList:getRuleList,
    onGetListSuccess:(res)=>{
        tableData.value = res.list;
        options.value = res.rules
        defaultExpandedKeys.value = res.list.map(o=>o.id)
    },
    delete:deleteRule,
    updateStatus:updateRuleStatus

})

const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    hanleSubmit,
    handleCreate,
    handleEdit
} = useInitForm({
    form: {
        rule_id: 0,
        menu: 0,
        name: '',
        condition: '',
        method: 'GET',
        status: 1,
        order: 50,
        icon: '',
        frontpath:"",
    },
    rules: {},
    getData,
    update: updateRule,
    create: createRule
});
//添加子分类
const addChild =(id)=>{
    handleCreate()
    form.rule_id = id
    form.status = 1
}
</script>
<style scoped>
/* flex:1沾满整个盒子 */
.custom-tree-node{
    flex:1;
    display:flex;
    align-items: center;
    font-size:14px;
    padding-right: 8px;
}
:deep(.el-tree-node__content){
    padding: 20px 0;
}
</style>