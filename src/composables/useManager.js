import { toast, msgBox } from '~/composables/util'
import { ref, reactive } from 'vue'
import store from '~/store'
import {router} from '~/router'

//api
import { updatePassword, logout } from '~/api/manager'
//修改密码
export function useRepassword() {

    // const router = useRouter();

    // const store = useStore();
    //设置 默认值
    const formDrawerRef = ref(null);
    const formRef = ref(null)
    //定义form --start --
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })
    // 定义修改密码rules规则 --end--
    const rules = {
        oldpassword: [
            {
                required: true, //必填项
                message: '请输入原密码',
                trigger: 'blur',//触发时机 失去焦点的时候
            },

        ],
        password: [
            {
                required: true, //必填项
                message: '请输入新密码',
                trigger: 'blur',//触发时机 失去焦点的时候
            },

        ],
        repassword: [
            {
                required: true, //必填项
                message: '请确认新密码',
                trigger: 'blur',//触发时机 失去焦点的时候
            },

        ],
    };

    //提交form表单 --修改密码
    const onSubmit = () => {
        formRef.value.validate((vaild) => {
            console.log(vaild)
            if (!vaild) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatePassword(form).then(res => {
                //清除当前用户的状态管理 vuex
                store.dispatch("logout")
                console.log(res)
                //跳转登录页
                router.push("/login")
                //提示登录成功、
                toast("密码修改成功，请重新登陆")
            })
            .finally(() => {
                formDrawerRef.value.hideLoading();
                // formDrawerRef.value.close();

            })

        })

    }

    const openRePasswordEorm = () => formDrawerRef.value.open();

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordEorm
    }
}
//退出登录
export function useEdit() {
    function exit() {
        // const router1 = useRouter();
        //const store1 = useStore();
        msgBox('是否要退出登录', '退出系统', 'warning').then(res => {
            logout()
                .finally(() => {
                    //清楚当前用户的状态管理 vuex
                    store.dispatch("logout")
                    //跳转登录页
                    router.push("/login")

                    //提示登录成功
                    toast("退出成功")

                })
        })

    }
    return {
        exit
    }
}
