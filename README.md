# bn-playground

[bn-play.firebaseapp.com](https://bn-play.firebaseapp.com/)

A tool for building Bayesian Networks(BNs), visualizing the probabilities, running simulations with interventions, and seeing the results to understand what's going on. This is being built by a student of causality so this is ideally an educational tool to learn about BNs.

## Commands
* `vue ui` - Start the UI and use it to run tasks
* `yarn` - Project setup, install dependencies
* `yarn serve` - Compiles and hot-reloads for development
* `yarn build` - Compiles and minifies for production, generating static site files in `./dist`
* `firebase deploy` - Deploy production files to Firebase
* `yarn present` - Use [cleaver](https://github.com/jdan/cleaver) to work on the presentation and watch for changes

## Reference
* [BN Slides](http://skleinberg.org/teaching/CI18/lecture4.pdf)
* [Vue](https://vuejs.org)
* [Vis.js](http://visjs.org/docs/network/)
* [Chart.js](https://www.chartjs.org/)

* [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) - to make a public repo for this project

## Todo
* [/] Write paper
* [_] Make presentation

* [_] Add title tooltips to explain things, expecially the CPT

* [_] Move to new repo
* [_] Host on Github pages

* [_] Show realtime simulation with dashed/colored edges
* [_] Add automated testing
* [_] Wrap in electron
* [_] Detect cycle in graph
* [_] Show conditional independencies
* [_] Toggle hierarchical layout
* [_] Import/Export graph (add method in BN class)
* [_] Export probability table CSV
* [_] Edit node name - click pencil icon to change title to input, bind to data so it changes as you type
* [_] Change the color of a node?

## Done
* [x] Show BN visually
* [x] Add and remove nodes
* [x] Add and remove edges
* [x] View node parents and children
* [x] See Markov blanket for a node
* [x] Highlight node relations (parents, children, Markov blanket)
* [x] Firebase deploy
* [x] Show if node is a collider
* [x] Interface to show conditional probability tables for nodes and edit like http://www.cs.man.ac.uk/~gbrown/bayes_nets/
    * [x] Save changes to CPT values
* [x] Run simulation
    * [x] Show results in a histogram
* [x] do() on a node
* [x] Fix bug where adding node gets the wrong name at first
    * Don't think this used to happen, maybe it happened when I moved the interaction funcions into the BN class
    * Maybe just go back to the old menu for adding nodes
    * Happening for edges too - new edges don't get arrows until you click on a node
* [x] Fix bug with adding edges messing up simulation
* [x] Made node color a different blue when in do() mode