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

/**
 * @summary Get the options object for VisJs
 * @param {BayesianNetwork} network - The network that the graph is showing
 * @param {function} redrawCb - A callback to redraw the graph
 */
const visOptions = (network, redrawCb) => {
  return {
    layout: {
      hierarchical: {
        sortMethod: 'directed'
      }
    },
    interaction: {
      selectConnectedEdges: false
    },
    manipulation: {
      addNode: (nodeData, callback) => {
        let nodeName = prompt('Enter node name')
        if(!nodeName) return
        network.addNode(nodeName)
        redrawCb()
        callback(nodeData)
      },
      deleteNode: (nodeData, callback) => {
        network.removeEdges(nodeData.edges)
        network.removeNodes(nodeData.nodes)
        redrawCb()
        callback(nodeData)
      },
      addEdge: (edgeData, callback) => {
        // eslint-disable-next-line
        let edgeId = network.addEdge(edgeData.from, edgeData.to)
        /*if(network.hasCycle) {
          alert('This edge creates a cycle!')
          network.removeEdge(edgeId)
        }*/
        redrawCb()
        callback(edgeData)
      },
      deleteEdge: (edgeData, callback) => {
        network.removeEdges(edgeData.edges)
        redrawCb()
        callback(edgeData)
      },
      editEdge: false
    }
  }
}

export default {
  name: 'GraphView',
  props: {
    network: BayesianNetwork
  },
  components: {
    SelectedDetails,
    SimulatorView
  },
  data: function () {
    return {
      selectedNodeId: undefined,
      vis: { //references for VisJs options needed to use their methods
        network: undefined,
        nodes: undefined
      }
    }
  },
  created: function () {
    // delay needed for `vis` to load
    setTimeout(this.redrawGraph, 250)
  },
  updated: function () {
    this.redrawGraph()
  },
  methods: {
    redrawGraph: function () {
      let visFormatNetwork = this.network.visJs

      let container = this.$refs.network
      /* eslint-disable no-undef */ //needed to use `vis`
      this.vis.nodes = new vis.DataSet(visFormatNetwork.nodes)
      let data = {
        nodes: this.vis.nodes,
        edges: new vis.DataSet(visFormatNetwork.edges)
      }
      // The options contain the methods to editing nodes an edges
      let options = visOptions(this.network, this.redrawGraph)

      this.vis.network = new vis.Network(container, data, options)
      /* eslint-enable no-undef */
      this.vis.network.on('click', this.networkClick)
    },
    networkClick: function (properties) {
      // options.interactions.selectConnectedEdges is false, so we can detect
      // node clicks from edge clicks by seeing if there are any nodes
      if (properties.nodes.length > 0) {
        this.selectedNodeId = properties.nodes[0]
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
