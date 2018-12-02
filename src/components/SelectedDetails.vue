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
        <header @mouseover="$emit('highlight-nodes', [node])"
          @mouseleave="$emit('clear-highlights')">
          {{node.name}}
        </header>
        <ul>
          <li @mouseover="$emit('highlight-nodes', node.parents)" 
            @mouseleave="$emit('clear-highlights')"
            :title="parentsHelpText">
            <b>Parents:</b>
            {{ nodeNameDisplay(node.parents) }}
          </li>
          <li @mouseover="if (node.isCollider) $emit('highlight-nodes', node.parents)" 
            @mouseleave="$emit('clear-highlights')"
            :title="colliderHelpText">
            <b>Collider:</b>
            {{node.isCollider}}
          </li>
          <li @mouseover="$emit('highlight-nodes', node.children)" 
            @mouseleave="$emit('clear-highlights')"
            :title="childrenHelpText">
            <b>Children:</b>
            {{ nodeNameDisplay(node.children) }}
          </li>
          <li @mouseover="$emit('highlight-nodes', node.descendants)"
            @mouseleave="$emit('clear-highlights')"
            :title="descendantsHelpText">
            <b>Descendants:</b>
            {{ nodeNameDisplay(node.descendants) }}
          </li>
          <li @mouseover="$emit('highlight-nodes', node.nonDescendants)"
            @mouseleave="$emit('clear-highlights')"
            :title="nonDescendantsHelpText">
            <b>Non-Descendants:</b>
            {{ nodeNameDisplay(node.nonDescendants) }}
          </li>
          <li @mouseover="$emit('highlight-nodes', node.ancestors)"
            @mouseleave="$emit('clear-highlights')"
            :title="ancestorsHelpText">
            <b>Ancestors:</b>
            {{ nodeNameDisplay(node.ancestors) }}
          </li>
          <li @mouseover="$emit('highlight-nodes', node.markovBlanket)" 
            @mouseleave="$emit('clear-highlights')"
            :title="markovBlanketHelpText">
            <b>Markov blanket:</b>
            {{ nodeNameDisplay(node.markovBlanket) }}
          </li>
        </ul>
      </div>
      <div class="col-md-8 col-sm-12">
        <CondProbTable :network="network" :nodeId="this.node.id" />
        <button class="btn btn-primary" @click="doOnNode" :title="doBtnTitle">
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
    },
    doBtnTitle () {
      return this.node.inDoMode
        ? `Reverse the do() and restore the original values`
        : `Set the node state to true, breaking the parent bonds `
    },
    parentsHelpText () {
      return `The nodes that have a direct effect on ${this.node.name}`
    },
    colliderHelpText () {
      return `If ${this.node.name} has two or more edges going to it`
    },
    childrenHelpText () {
      return `The nodes on which ${this.node.name} has a direct effect`
    },
    descendantsHelpText () {
      return `The nodes that are in some way affected by ${this.node.name}, directly or indirectly`
    },
    nonDescendantsHelpText () {
      return `The nodes that are not descendants. ${this.node.name} is independent of these nodes when conditioned on the parents, which is the Causal Markov Condition.`
    },
    markovBlanketHelpText () {
      return `The parents, children, and children's parents. ${this.node.name} is independent of all other nodes when conditioned on these.`
    },
    ancestorsHelpText () {
      return `The nodes that are in some way causal for ${this.node.name}, directly or indirectly`
    }
  }
}
</script>

<style scoped>
header {
  font-size: 1.5em;
}
</style>
