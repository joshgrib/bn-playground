title: bn-play Presentation
output: ./dist/presentation.html
controls: true

<!--TODO:
* [_] Practice timing
-->

--
# `bn-play`
## A tool for learning and interfacing with Bayesian Networks
> Josh Gribbon

-- <!-- 0 -->
### Overview
* Motivations
* Goals
* Outcomes
* Process
* Future work

-- <!-- 1 -->
### Motivation
* Value of statistical and causal knowledge
* Ease of access of the web
* Simple and fast interface

-- <!-- 2 -->
### Why should I care?
* Philosophical basis - causality is important to know how to intervene
* People not understanding statistics seems to lead to a lot of drama and confusion
* Can affect regular daily decisions, legislature, etc

-- <!-- 3 -->
### Bayesian Networks review
* Graphical model for conditional dependence
* Directed Acyclic Graph (DAG)

-- <!-- 4 -->
### Requirements
* Build and change the BN visually
* View properties of the nodes - CPT, relatives
* Edit CPT values
* Run simulations, with interventions
* View results

-- <!-- 5 -->
### Interface
* Super important!
* Clear information
* Coordinated data
* Adaptive layout
* Useful visualizations
* Prompting and guiding interaction

-- <!-- 6 -->
#### Network visualization - `mermaid.js`
<img src="https://i.gyazo.com/88b2636ffd1f33d2140762ce5676b758.png" width="50%"/>
* Seemed simple
* Looked useful for DBN in the future
* Intermediate language got complicated

-- <!-- 7 -->
#### Trying a new option - `vis.js`
<img src="https://i.gyazo.com/0fadd9e3bb04ea9f14eb8b1d39e7f1b1.png" width="50%"/>
* More flexible API
* Better options for expansion
* Just the right amount of generality

-- <!-- 8 -->
#### Basic outline
<img src="https://i.gyazo.com/2f4a60dc0b07af5c24f7dce0f1a211a0.png" width="20%">
<img src="https://i.gyazo.com/a2ae8e6bfaaf353d2d1c5ed890f00637.png" width="50%">

-- <!--9 -->
##### Result
<img src="https://i.gyazo.com/02c6647e576354a3464fa2724742b74c.png" width="20%">
<img src="https://i.gyazo.com/a0c4dce82ee5bb778d8e56869868162e.png" width="75%">
<img src="https://i.gyazo.com/a8a3d0eeb3b8d56a2685bb9a506e7fa1.png" width="20%">

-- <!-- 10 -->
<img src="https://i.gyazo.com/c1ad8adefbc6b9b8d5a98c44f658ff2a.png" height="550px">
Tooltip contents

-- <!-- 11 -->
### Technology Used
Powerful and worth mentioning
* `Vue.js` - frontend components, templating, data binding, build system
* `Bootstrap`, `Webpack`, `Browserify`
* `Vis.js`, `Chart.js` - visualizations
* `Firebase` - hosting, free until ~14k initial downloads per month

-- <!-- 12 -->
### Demo
<iframe src="https://bn-play.firebaseapp.com/" width="100%" height="85%"></iframe>

-- <!-- 13 -->
### Achievements
* Simple site to create BNs
* Change the structure
* Change the CPT for a node
* `do()` on a node
* Run simulations
* Visual and textual information and guidance

-- <!-- 14 -->
### Limitations
* Teaches aspects of causality, doesn't identify it
    * Con: Isolated from the data
    * Pro: Avoids many concerns
* Doesn't identify cycles or explain the issues with them
* Can't detect structure from data - useful but complicated to automate

-- <!-- 15 -->
### Possible future work
* Get feedback for new functionality - most useful thing
* "Realtime" simulation
* Import/export network or simulations
* Detect cycles in graph
* List some conditional independencies and the methods for identifying them

-- <!-- 16 -->
### Possible future work (cont)
* Showing d-seperation, d-connection
* Toggle hierarchical layout
* Edit node details - name, color, states
* Learn network structure
* Deploy as native app - connectivity benefits

-- <!-- 17 -->
# Questions
## Thanks!