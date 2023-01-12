import axios from '~/axios'

//后台统计首页1
export function getStatisticsl(){
    return axios.get("/admin/statistics1")
}

//后台统计首页2
export function getStatistics2(){
    return axios.get("/admin/statistics2")
}

//后台统计首页3
export function getStatistics3(type){
    return axios.get("/admin/statistics3?type='"+type)
}