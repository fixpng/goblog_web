import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/css/iconfont.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/css/theme.css';
import './assets/css/antdv.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
