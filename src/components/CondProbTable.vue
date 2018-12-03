<!--
This represents the conditional probability table for a node,
and allows editing of the conditional probabilities
-->
<template>
  <section>
    <header>Conditional Probability Table:</header>
    <table>
      <tr>
        <th v-for="(header, idx) in tableHeaders" :key="header">
          <span :title="headerHelpText[idx]">{{header}}</span>
        </th>
      </tr>
      <tr v-for="row in tableData" :key="row.join('')">
        <td v-for="(item, idx) in row" :key="idx">
          <p>{{item}}</p>
        </td>
        <td>
          <div class="input-container">
            <input v-model="node.pTable[row.join('')]"
              type="number" class="form-control" max="1" min="0" step="0.1"/>
          </div>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import BayesianNetwork from '../classes/BayesianNetwork'

export default {
  name: 'CondProbTable',
  props: {
    network: BayesianNetwork,
    nodeId: Number
  },
  computed: {
    node: function () {
      return this.network.getNode(this.nodeId)
    },
    tableHeaders: function () {
      return this.node.cpTable.headers
    },
    headerHelpText () {
      let headers = this.tableHeaders
      let helpText = headers.map((text, idx, totalArray) => {
        let help = undefined
        if (idx !== totalArray.length-1) {
          help = `The possible states for ${text}`
        } else {
          let parentList = this.node.parents.map(p => p.name).join(', ')
          help = `The probability of ${this.node.name} being true`
          if (parentList.length !== 0) {
            help = `${help} given the states of ${parentList}`
          }
        }
        return help
      })
      return helpText
    },
    tableData: function () {
      return this.node.cpTable.combos
    }
  }
}
</script>

<style scoped>
header { font-size: 1.2em; }
table {
  width: 100%;
  overflow-x: scroll;
}
td + td,
th + th { border-left: 2px solid black; }
th { border-bottom: 2px solid black; }
tr + tr { border-top: 1px solid grey; }
th, td { text-align: center; }
input-container {
  align-content: center;
}
input {
  height: 1.2em;
  width: 6em;
  margin: auto;
}
</style>
