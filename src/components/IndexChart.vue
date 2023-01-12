<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, index) in []" :key="index" :checked="current == item.value"
                        style="margin-right:8px;" @click="headleChoose(item.value)">{{ item.text }}</el-check-tag>
                </div>
            </div>
        </template>
        <div id="chart" ref="el" style="width:100%;height:300px;"></div>
    </el-card>

</template>

<script setup>

import * as echarts from 'echarts';
import { ref, onMounted ,onBeforeUnmount} from 'vue'
// 在el监听的元素尺寸改变时触发该方法useResizeObserver
import {useResizeObserver} from '@vueuse/core'

import { getStatistics3 } from '~/api/index.js'
const current = ref("week")
var myChart = null;
const options = [{
    text: "近一个月",
    value: "month"
}, {
    text: "近一周",
    value: "week"
}, {
    text: "近24小时",
    value: "hour"
},]


const headleChoose = (type) => {
    current.value = type;
    getData()
}

//页面渲染完之后
onMounted(() => {
    let chartDom = document.getElementById('chart');
    if(chartDom){
        myChart = echarts.init(chartDom);
        getData();
    }
})

function getData() {

    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    myChart.showLoading();
    getStatistics3(current.value).then((res) => {
        option.xAxis.data = res.x;
        option.series[0].data = res.y;
    })
    .finally(()=>{
        myChart.hideLoading();
    })
    
    option && myChart.setOption(option);
}
//页面销毁前执行
onBeforeUnmount(()=>{
    //销毁实例
    if(myChart) echarts.dispose(myChart);
})

const el = ref(null)
//在el监听的元素尺寸改变时触发
useResizeObserver(el,(entries) =>{
    myChart.resize();
})
</script>