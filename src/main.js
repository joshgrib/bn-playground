import Vue from 'vue'
import App from './App.vue'
import VueCytoscape from 'vue-cytoscape'
import 'vue-cytoscape/dist/vue-cytoscape.css'

Vue.use(VueCytoscape)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
