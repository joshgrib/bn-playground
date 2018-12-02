<template>
<section>
  <header>Simulation</header>
  <article>
    <p v-if="results===undefined">Run a simulation to view results</p>
    <div v-else>
      <p>Results:</p>
    </div>
    <canvas ref="histogram" height="0"></canvas>
  </article>
  <div class="input-group">
    <div class="input-group-append">
      <span class="input-group-text" id="basic-addon1">Iterations:</span>
    </div>
    <input v-model="simulationCount"
      type="number" class="form-control" max="10000" min="1" step="20"/>
  </div>
  <button class="btn btn-success" 
    @click="runSimulation()" :title="runHelpText">
    {{ (results===undefined) ? 'Run' : 'Re-run'}}
  </button>
  <button class="btn btn-danger" v-if="results!==undefined"
    @click="clearResults">
    Clear results
  </button>
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
      histogram: undefined,
      canvasHeight: 0
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
      this.$refs.histogram.height = 150
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
    },
    clearResults () {
      this.results = undefined
      this.histogram.destroy()
      this.histogram = undefined
      this.$refs.histogram.height = 0
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
    },
    runHelpText () {
      return `Run ${this.simulationCount} simulations with the network and see the results`
    }
  }
}
</script>

<style scoped>
header { font-size: 1.5em; }
</style>
