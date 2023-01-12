import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

export function useTabList() {

    const route = useRoute()
    const router = useRouter()
    const cookie = useCookies()

    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: "/"
        }
    ])

    //动态监听tab变化
    const changeTab = (t) => {
        activeTab.value = t
        router.push(t)
    }
    //添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        cookie.set("tabList", tabList.value)
    }

    
    //关闭
    const handleClose = (c) => {
        if (c == "clearAll") {
            activeTab.value = '/'
            tabList.value = [
                {
                    title: '后台首页',
                    path: "/"
                }
            ]
        } else if (c == "clearOther") {
            tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value);
            
        }
        cookie.set("tabList", tabList.value)
        
    }
    
    //初始化标签导航列表
    function initTabList() {
        let initTag = cookie.get("tabList")
        if (initTag) {
            tabList.value = initTag;
        }
    }
    //删除标签
    const removeTab = (t) => {
        let a = activeTab.value
        let tabs = tabList.value
        tabs.forEach((tab, index) => {
            if (tab.path == t) {
                
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    a = nextTab.path
                }
                //第一种方式
                //  tabs = tabList.value.splice(index,1)
            }
        })
        activeTab.value = a
        //第二种关闭方式
        tabList.value = tabList.value.filter(tab => tab.path != t)
        cookie.set('tabList', tabList.value)
        
    }
    
    onBeforeRouteUpdate((to, form) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })
    initTabList();
    
    return {
        activeTab,
        tabList,
        changeTab,
        handleClose,
        removeTab
    }
}