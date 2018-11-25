<!--
This wrapper files adds the GraphView, which has all the 
application code, this file is used to set up the initial
demo network, and in the future could perhaps contain
components for importing and exporting networks
-->
<template>
  <div id="app">
    <nav id="nav-header" class="navbar navbar-dark bg-dark">
      <a class="navbar-brand text-light">BN Playground</a>
    </nav>
    <div id="app-container" class="container-fluid">
      <section class="row">
        <GraphView class="col-12"/>
      </section>
    </div>
  </div>
</template>

<script>
import GraphView from './components/GraphView.vue'

export default {
  name: 'app',
  components: {
    GraphView
  }
}
</script>

<style>
#nav-header {
  margin-bottom: 15px;
}
</style>
