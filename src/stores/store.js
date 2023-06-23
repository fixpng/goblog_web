// import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {message} from "ant-design-vue";

export const useStore = defineStore('gvb', {
    state: () => {
        return {
            theme: true, // true 白天 false 黑夜
            userInfo: {
                token: "",
                nick_name: '',
                role: 0,
                user_id: 0,
                avatar: '',
                exp: 1681486573.287638
            },
            tabList: [],
            bread_crumb_list: []
        }
    },
    actions: {
        // 切换主题
        setTheme() {
            // console.log(this.theme)
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
        serUserInfo(info) {
            this.$patch({
                userInfo: info
            })
            // 登录信息持久化
            localStorage.setItem("userInfo", JSON.stringify(info))
        },
        // 初始化
        loadUserInfo() {
            let info = localStorage.getItem("userInfo")
            if (info === null) {
                return
            }
            // JSON解析
            let userInfo = JSON.parse(info)

            // 判断时间是否失效
            let exp = userInfo.exp
            let nowTime = new Date().getTime()
            if (((exp * 1000) - nowTime) < 0) {
                // 过期了
                message.warn("当前登录已失效")
                return;
            }
            this.serUserInfo(userInfo)
        },


        addTab(tab) {
            // 判断是否要删除第二个
            // 总长度
            let allLen = document.querySelector(".gvb_tabs").offsetWidth
            // 使用的长度
            let useLen = 0
            let gvbItems = document.querySelectorAll(".gvb_tab_item")
            for (const gvbItem of gvbItems) {
                useLen += gvbItem.offsetWidth + 10
            }
            if (allLen - useLen < 130) {
                this.removeIndexTab(1)
            }
            // 已经存在，就不添加
            // 不存在的时候进行添加
            if (this.tabList.findIndex((item) => item.name === tab.name) === -1) {
                this.tabList.push({name: tab.name, title: tab.title, params: tab.params, query: tab.query,parentTitle:tab.parentTitle})
            }
        },
        // tabs持久化保存数据到本地
        saveTabs() {
            localStorage.setItem("tabs", JSON.stringify(this.tabList))
        },
        // 加载组件
        loadTabs() {
            let tabs = localStorage.getItem("tabs")
            if (tabs === null) {
                this.tabList = [{title: "首页", name: "home"}]
                return
            }
            this.tabList = JSON.parse(tabs)
        },
        // 移除tab
        removeTab(tab) {
            let index = this.tabList.findIndex((item) => item.name === tab.name)
            this.tabList.splice(index, 1)
            return index
        },
        removeIndexTab(index) {
            this.tabList.splice(index, 1)
        },
        // 移除全部tab
        removeTabAll() {
            this.tabList = [{title: "首页", name: "home"}]
        },

        setCrumb(list) {
            this.bread_crumb_list = list
        }
    }
})
