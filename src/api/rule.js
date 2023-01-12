import axios from '~/axios'

//查询菜单列表
export function getRuleList(page) {
    return axios.get('/admin/rule/1')
    
}
//增加菜单
export function createRule(data) {
    return axios.post('/admin/rule',data)
    
}
//修改菜单
export function updateRule(id,data) {
    return axios.post('/admin/rule/'+id,data)
    
}
//修改菜单状态
export function updateRuleStatus(id,status){
    return axios.post(`/admin/rule/${id}/update_status`,{status})
}
//删除菜单
export function deleteRule(id) {
    return axios.post(`/admin/rule/${id}/delete`)
    
}