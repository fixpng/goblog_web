import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useStore = defineStore('gvb', {
    state: () => {
        return {
            theme: true
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
        }
    }
})
