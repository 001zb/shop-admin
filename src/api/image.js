import axios from "~/axios";

//获取图片列表
export function getImageList(id,page){
    return axios.get(`/admin/image_class/${id}/image/${page}`)
}
//修改图片列表
export function updateImage(id,name){
    return axios.post(`/admin/image/`+id,{name})
}
//修改图片列表
export function deleteImage(ids){
    return axios.post('/admin/image/delete_all',ids)
}

// export const uploadImageAction = '/api/admin/image/upload'
export const uploadImageAction =import.meta.env.VITE_APP_BASE_API+ '/admin/image/upload'