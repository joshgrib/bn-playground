<template>
  <div id="app">
    <nav id="nav-header" class="navbar navbar-dark bg-dark">
      <a class="navbar-brand text-light">BN Playground</a>
    </nav>
    <div id="app-container" class="container-fluid">
      <section class="row">
        <GraphView class="col-12" v-bind:network="network"/>
      </section>
    </div>
  </div>
</template>

<script>
import GraphView from './components/GraphView.vue'
import BayesianNetwork from './classes/BayesianNetwork'

let bn = new BayesianNetwork()

let a = bn.addNode('Alice')
let b = bn.addNode('Bob') 
let c = bn.addNode('Catherine')
let d = bn.addNode('Dennis')
let e = bn.addNode('Elise')
let f = bn.addNode('Franklin')
let g = bn.addNode('Gregory')
let h = bn.addNode('Hannah')
bn.addEdges([
  [a.id, b.id], [b.id, c.id], [b.id, h.id], [c.id, e.id],
  [c.id, f.id], [d.id, c.id], [e.id, f.id], [h.id, e.id],
  [h.id, g.id], [g.id, f.id]
])
window.bn = bn

export default {
  name: 'app',
  components: {
    GraphView
  },
  data: () => {
    return {
      network: bn
    }
  }
}
</script>

<style>
#nav-header {
  margin-bottom: 15px;
}
</style>
