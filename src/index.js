import Vue from 'vue'
import App from './components/App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {APIService} from './APIService'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootswatch/dist/darkly/bootstrap.min.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
    el: '#app',
    render: h => h(App)
})