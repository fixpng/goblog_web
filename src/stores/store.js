// import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {message} from "ant-design-vue";

export const useStore = defineStore('gvb', {
    state: () => {
        return {
            theme: true,
            userInfo: {
                token:"",
                nick_name: '',
                role: 0,
                user_id: 0,
                avatar: '',
                exp: 1681486573.287638
            }
        }
    },
    actions: {
        // 切换主题
        setTheme() {
            console.log(this.theme)
            this.theme = !this.theme
            if (this.theme) {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("theme", "light")
            } else {
                document.documentElement.classList.add("dark")
                localStorage.setItem("theme", "dark")
            }
        },

        // 加载主题
        loadTheme() {
            const theme = localStorage.getItem("theme")
            if (theme === "dark") {
                this.theme = false
                document.documentElement.classList.add("dark")
                return
            }
            this.theme = true
        },

        // 修改userInfo
        serUserInfo(info){
            this.$patch({
                userInfo: info
            })
            // 登录信息持久化
            localStorage.setItem("userInfo",JSON.stringify(info))
        },
        // 初始化
        loadUserInfo(){
            let info = localStorage.getItem("userInfo")
            if (info === null){
                return
            }
            // JSON解析
            let userInfo = JSON.parse(info)

            // 判断时间是否失效
            let exp = userInfo.exp
            let nowTime = new Date().getTime()
            if (((exp * 1000)-nowTime)<0 ){
                // 过期了
                message.warn("当前登录已失效")
                return;
            }
            this.serUserInfo(userInfo)
        }
    }
})
