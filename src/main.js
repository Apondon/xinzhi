import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Bread from './components/Bread.vue'

const app = createApp(App)
app.use(store)
    .use(router)
    .use(ElementPlus, { locale })
    .mount('#app')
app.component('Bread', Bread)
app.component('QuillEditor', QuillEditor)
