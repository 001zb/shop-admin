<template>
    <el-result
        icon="warning"
        title="404"
        sub-title="访问路径错误"
      >
      <!-- $router只能在<template #extra>中使用 -->
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
        </template>
      </el-result>
</template>