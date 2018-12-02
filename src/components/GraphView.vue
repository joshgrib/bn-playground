<!--
This component displays the network using vis.js 
-->
<template>
<section id="graph-view">
  <section  class="row">
    <div ref="network" id="network" class="col-md-6 col-sm-12"></div>
    <article class="col-md-6 col-sm-12">
      <SelectedDetails 
        :network="network" :nodeId="selectedNodeId"
        v-on:highlight-nodes="highlightNodes" v-on:clear-highlights="clearHighlights"
        v-on:node-changed="redrawGraph"/>
      <hr/>
      <SimulatorView :network="network"/>
    </article>
  </section>
</section>
</template>

<script>
import BayesianNetwork from '../classes/BayesianNetwork'
import SelectedDetails from './SelectedDetails.vue'
import SimulatorView from './SimulatorView.vue'

let bn = new BayesianNetwork()
let a = bn.addNode('Alice')
let b = bn.addNode('Bob') 
let c = bn.addNode('Cathy')
let d = bn.addNode('Dennis')
let e = bn.addNode('Edith')
let f = bn.addNode('Frank')
let g = bn.addNode('Georgia')
let h = bn.addNode('Harold')
bn.addEdges([
  [a.id, b.id], [b.id, c.id], [b.id, h.id], [c.id, e.id],
  [c.id, f.id], [d.id, c.id], [e.id, f.id], [h.id, e.id],
  [h.id, g.id], [g.id, f.id]
])
window.bn = bn

export default {
  name: 'GraphView',
  components: {
    SelectedDetails,
    SimulatorView
  },
  data: function () {
    return {
      network: bn,
      selectedNodeId: undefined,
      vis: { //references for VisJs options needed to use their methods
        network: undefined,
        nodes: undefined,
        edges: undefined,
        options: {
          layout: {
            hierarchical: {
              sortMethod: 'directed',
              treeSpacing: 100,
              nodeSpacing: 150,
              levelSeparation: 125
            }
          },
          interaction: {
            selectConnectedEdges: false
          },
          manipulation: {
            addNode: this.addNode,
            deleteNode: this.deleteNode,
            addEdge: this.addEdge,
            deleteEdge: this.deleteEdge,
            editEdge: false
          }
        }
      }
    }
  },
  created: function () {
    // delay needed for `vis` to load
    setTimeout(this.redrawGraph, 250)
  },
  methods: {
    redrawGraph: function () {
      let visFormatNetwork = this.network.visJs
      /* eslint-disable no-undef */ //needed to use `vis`
      this.vis.nodes = new vis.DataSet(visFormatNetwork.nodes)
      this.vis.edges = new vis.DataSet(visFormatNetwork.edges)

      let container = this.$refs.network
      this.vis.network = new vis.Network(container, {
        nodes: this.vis.nodes,
        edges: this.vis.edges
      }, this.vis.options)
      /* eslint-enable no-undef */
      this.vis.network.on('click', this.networkClick)
    },
    addNode: function (nodeData, callback) {
      let nodeName = prompt('Enter node name')
      if(!nodeName) return
      let node = this.network.addNode(nodeName)
      this.vis.nodes.add(node.visJs)
      callback(nodeData)
    },
    deleteNode: function (nodeData, callback) {
      this.network.removeNode(nodeData.nodes[0])
      this.vis.nodes.remove({ id: nodeData.id })
      this.selectedNodeId = undefined
      callback(nodeData)
    },
    addEdge: function (edgeData, callback) {
      this.network.addEdge(edgeData.from, edgeData.to)
      //FIXME: the hard redraw is needed to avoid resetting the display options
      this.redrawGraph()
      callback(edgeData)
    },
    deleteEdge: function (edgeData, callback) {
      this.network.removeEdges(edgeData.edges)
      //FIXME: the hard redraw is needed to avoid resetting the display options
      this.redrawGraph()
      callback(edgeData)
    },
    networkClick: function (properties) {
      // options.interactions.selectConnectedEdges is false, so we can detect
      // node clicks from edge clicks by seeing if there are any nodes
      if (properties.nodes.length > 0) {
        this.selectedNodeId = properties.nodes[0]
      } else {
        this.selectedNodeId = undefined
      }
    },
    highlightNodes: function (nodeList) {
      nodeList.map(node => node.highlighted = true)
      this.redrawGraph()
    },
    clearHighlights: function () {
      this.network.nodes.map(node => node.highlighted = false)
      this.redrawGraph()
    }
  }
}
</script>

<style scoped>
#network {
  height: 80vh;
  border: 1px solid lightgray;
}
</style>
