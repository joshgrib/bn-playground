<template>
<section>
  <header>Simulation</header>
  <div class="input-group">
    <div class="input-group-append">
      <span class="input-group-text" id="basic-addon1">Iterations:</span>
    </div>
    <input v-model="simulationCount"
      type="number" class="form-control" max="1000" min="1" step="25"/>
  </div>
  <button class="btn btn-primary" @click="runSimulation()">Run</button>
  <article>
    <p v-if="results===undefined">Run a simulation to view results</p>
    <div v-else>
      <p>Results:</p>
    </div>
    <canvas ref="histogram"></canvas>
  </article>
</section>
</template>

<script>
import BayesianNetwork from '../classes/BayesianNetwork'
import Chart from 'chart.js'

const chartJsOptions = {
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero:true
        }
    }]
  }
}

export default {
  name: 'SimulatorView',
  props: {
    network: BayesianNetwork
  },
  data: function () {
    return {
      simulationCount: 100,
      results: undefined,
      histogram: undefined
    }
  },
  methods: {
    runSimulation: function () {
      this.results = {} // clear previous results
      for (let i=0; i<this.simulationCount; i++) {
        let singleResult = this.network.runSimulation()
        for (let item of singleResult) {
          if (this.results[item.id]===undefined) { // first result for the item
            this.results[item.id] = {
              name: item.name,
              value: item.value
            }
          } else { // add to the previous value
            this.results[item.id].value += item.value
          }
        }
      }
      this.redrawGraph()
    },
    redrawGraph: function () {
      if(this.histogram !== undefined) {
        // clear out previous chart
        this.histogram.destroy()
        this.histogram = undefined
      }
      let container = this.$refs.histogram
      this.histogram = new Chart(container, {
        type: 'bar',
        data: {
          labels: this.graphData.map(d => d.name),
          datasets: [{
            label: 'Count of times activated',
            data: this.graphData.map(d => d.value),
            backgroundColor: 'lightblue'
          }]
        },
        options: chartJsOptions
      })
    }
  },
  computed: {
    graphData: function () {
      if (this.results===undefined) return undefined
      let formatted = []
      for(let key in this.results) {
        let result = this.results[key]
        formatted.push({
          id: key,
          name: result.name,
          value: result.value
        })
      }
      return formatted
    }
  }
}
</script>

<style scoped>
header { font-size: 1.5em; }
canvas { height: 400px; }
</style>
