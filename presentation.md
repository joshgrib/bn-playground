title: bn-play Presentation
output: ./dist/presentation.html
controls: true

--
# bn-play
## A tool for learning and interfacing with Bayesian Networks
> Josh Gribbon

--
### TODO
* [_] Practice timing

--
### Motivation
* Value of statistical and causal knowledge
* Ease of access of the web
* Simple and fast interface

--
### Why should I care?
* Philosophical basis - causality is important to know how to intervene
* People not understanding statistics seems to lead to a lot of drama and confusion
* Can affect regular daily decisions, legislature, etc

--
### Bayesian Networks review
* Graphical model for conditional dependence
* Directed Acyclic Graph (DAG)

--
### Interface
* Super important!

--
#### Initial attempt
<img src="https://i.gyazo.com/88b2636ffd1f33d2140762ce5676b758.png" width="50%"/>
* Seemed simple
* Looked useful for DBN in the future
* Intermediate language got complicated

--
#### Trying a new option
<img src="https://i.gyazo.com/0fadd9e3bb04ea9f14eb8b1d39e7f1b1.png" width="50%"/>
* More flexible API
* Better options for expansion
* Just the right amount of generality

--
#### Basic outline
<img src="https://i.gyazo.com/2f4a60dc0b07af5c24f7dce0f1a211a0.png" width="20%">
<img src="https://i.gyazo.com/a2ae8e6bfaaf353d2d1c5ed890f00637.png" width="50%">

--
##### Result
<img src="https://i.gyazo.com/02c6647e576354a3464fa2724742b74c.png" width="20%">
<img src="https://i.gyazo.com/a0c4dce82ee5bb778d8e56869868162e.png" width="75%">
<img src="https://i.gyazo.com/a8a3d0eeb3b8d56a2685bb9a506e7fa1.png" width="20%">

--
#### Tooltip content
<img src="https://i.gyazo.com/c1ad8adefbc6b9b8d5a98c44f658ff2a.png" height="500px">

--
### Technology Used
* Vue - frontend components, templating, data binding
* Bootstrap, Webpack, Browserify
* Vis.js - visualization for the network
* Chart.js - histogram visualization
* Firebase - hosting, free until ~14k initial downloads per month

--
### Demo
<iframe src="https://bn-play.firebaseapp.com/" width="100%" height="100%"></iframe>

--
### Limitations
* Teaches aspects of causality, doesn't identify it
    * Con: Isolated from the data
    * Pro: Avoids many concerns
* Doesn't identify 

--
### Possible future work
* Get feedback for new functionality
* Import/export
* d-seperation, d-connection
* More

--
#### Possible future work (cont)


<style>
.slide-content {
    margin: 40px auto 0 auto;
}
</style>