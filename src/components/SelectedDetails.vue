<!--
This will contain the logic for viewing the editing the details of a selected
node of edge, including the CPT, if it's a collider, showing the Markov blanket,
and doing a do() on the node to see the effects
-->
<template>
  <section>
    <article v-if="nodeId === undefined">
      <p>Select a node to view the details</p>
    </article>
    <article v-else class="row">
      <div class="col-md-4 col-sm-12">
        <header>{{node.name}}</header>
        <ul>
          <li @mouseover="if (node.isCollider) $emit('highlight-nodes', node.parents)" 
            @mouseleave="if (node.isCollider) $emit('clear-highlights')">
            <b>Collider:</b>
            {{node.isCollider}}
          </li>
          <li @mouseover="$emit('highlight-nodes', node.parents)" 
            @mouseleave="$emit('clear-highlights')">
            <b>Parents:</b>
            {{ nodeNameDisplay(node.parents) }}
          </li>
          <li @mouseover="$emit('highlight-nodes', node.children)" 
            @mouseleave="$emit('clear-highlights')">
            <b>Children:</b>
            {{ nodeNameDisplay(node.children) }}
          </li>
          <li @mouseover="$emit('highlight-nodes', node.markovBlanket)" 
            @mouseleave="$emit('clear-highlights')">
            <b>Markov blanket:</b>
            {{ nodeNameDisplay(node.markovBlanket) }}
          </li>
        </ul>
      </div>
      <div class="col-md-8 col-sm-12">
        <CondProbTable :network="network" :nodeId="this.node.id" />
        <button class="btn btn-primary" @click="doOnNode">
          {{node.inDoMode ? 'un-do()' : 'do()'}}
        </button>
      </div>
    </article>
  </section>
</template>

<script>
import BayesianNetwork from '../classes/BayesianNetwork'
import CondProbTable from './CondProbTable.vue'

export default {
  name: 'SelectedDetails',
  props: {
    network: BayesianNetwork,
    nodeId: Number
  },
  components: {
    CondProbTable
  },
  data: function () {
    return {
      editingNodeName: false,
      parentList: '',
      childList: '',
      markovBlanketList: ''
    }
  },
  methods: {
    doOnNode: function () {
      if (this.node.inDoMode) {
        Object.assign(this.node.pTable, this.node.backupPTable)
      } else {
        Object.assign(this.node.backupPTable, this.node.pTable)
        for(let key in this.node.pTable){
          this.node.pTable[key] = 1
        }
      }
      this.node.inDoMode = !this.node.inDoMode
      this.$emit('node-changed')
    },
    nodeNameDisplay: function (nodeList) {
      if (nodeList.length !== 0) {
        return nodeList.map(n => n.name).join(', ')
      } else {
        return 'None'
      }
    }
  },
  computed: {
    node: function () {
      return this.network.getNode(this.nodeId)
    }
  }
}
</script>

<style scoped>
header {
  font-size: 1.5em;
}
</style>
