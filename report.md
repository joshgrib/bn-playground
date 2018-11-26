---
title: "bn-play: A tool for learning Bayesian Networks through manipulation and simulation"
date: "November 2018"
author: "Josh Gribbon, Stevens Institute of Technology"
---

<h1>bn-play: A tool for learning Bayesian Networks through manipulation and simulation</h1>
<!-- Used h1 here so the line would be left out of the TOC -->

>Josh Gribbon

[TOC]

<!--
TODO:
* [_] Add some research for education and interface stuff
* [/] Finish outline
* [_] Put name somewhere
* [/] Fill in sections
* [_] Format references
* [_] Format document as two-column pdf
    * [_] Review and update formatting in general
* [_] Check on removing the data structures and algorithms part
* [_] Submit to canvas
-->

## 0. Abstract

`bn-play` is a tool for learning about Bayesian Networks through visualization and interface. The main focus of the project is an intuitive and explanatory interface. Modern web app tools are used to create an interface that is linked to the underlying structures, simplifying the design, helping ensure that the user is seeing data in the right context across components, aiding in layout, and assisting with browser compatability. The simulation component is designed to be simple, robust, and expandable. The resulting project achieved all the critical features listed in the proposal as well as some stretch goals, while also being poised for future development.

## 1. Introduction

The main goal of this project is to create an accessible tool for improving our knowledge and understanding of Bayesian Networks. This was the driving motivation behind the design decisions and implementation details. Deployment as a web app increases the potential reach to anyone with a phone, laptop, or tablet, and even with limited network connectivity. Further, it allows for simple and rapid interface development with modern tooling, resulting in flexible and optimized deployments.

## 2. Interface Design

As far as a user is concerned, the interface is the product. We often see products lose to a competitor that offers the same or less functionality, but with a better interface. A sizable amount of effort went into developing the interface to create a unified experience. This is accomplished using complex strategies like data binding across components to ensure that changes made in one location are reflected across the application, simple strategies like the presence of tooltips to explain the meaning behind different views, and stuff in between such as default values that prompt user interaction.

The section on *Technologies Used* discussing how various tools aid in these implementations.

### Component Overview
>![Full app initial view](./public/app-view-01.png)
>Fig 2.01

Figure 2.01 shows the desktop layout of the application, the mobile version will be used for all other images because the compact view will be better in this format. Essentially the two columns, one with the network and the other with the text, become a single column with the network on top.

#### Network Viewer

Figure 2.02 shows the Network Viewer, which displays the bayesian network to the user, and provides an interface to modify the structure. The inidividual nodes are displayed as names inside ovals, with arrows connecting each one, following the standard format for visualizing Bayesian Networks.

>![Basic network](./public/network-view-01.png)
>Fig 2.02 - The network view component

Show selected node

##### Modifying Nodes and Edges

The "Edit" button in figure 2.02 can be clicked to reveal the options in figure 2.03
If the user clicks "Add Node", they are prompted to choose a location for the new node, and enter a name for the node, as shown in figure 2.04.

This sidesteps the concern of how to build the BN from your data, leaving that problem to the user

>![Add node and edge menu](./public/add-node-and-edge-menu.png)
>Figure 2.03 - Buttons to add nodes and edges

>![Node name prompt](./public/node-name-prompt.png)
>Figure 2.04 - The prompt for a node name

>![New node added](./public/new-node-added.png)
> Figure 2.05 - The new node added to the network, initially with no edges

>![Adding new edge](./public/adding-edge.png)
> Figure 2.06 - The process to add a new edge, after clicking "New Node" the user drags the endpoint to the node they want the edge to end at

>![New edge added](./public/new-edge-added.png)
> Figure 2.07 - The network with the new edge added

#### Selected Node Details

>![No node selected](./public/no-node-selected.png)
> Figure 2.08 - Selected node details, initially showing a prompt to select a node, when no node is selected

>![Node selected](./public/node-selected.png)
> Figure 2.09 - Node relations list, showing if it is a collider as well as the nodes that make up the parents, children, and Markov Blanket

>![Markov Blanket hover](./public/markov-blanket-hover.png)
> Figure 2.10 - Hovering on one of the relation lists will highlight those nodes in the network view component, in this case the cursor is hovering on the Markov Blanket list item

#### Conditional Probability Table

>![Selected node details](./public/selected-node-details.png)
> Figure 2.11 - The conditional probability table(CPT), shown below the list of node relations

>![Edited CPT](./public/edited-cpt.png)
> Figure 2.12 - The CPT with edited values

>![CPT after do()](./public/post-do-cpt.png)
> Figure 2.13 - The CPT after pressing the `do()` button, with the `un-do()` button to revert the values

>![Multiple do() nodes](./public/multile-do-nodes.png)
> Figure 2.14 - The network with `do()` executed on Bob and Elise, with altered node colors, and dashed edges to show the lack of effect

#### Simulator

>![Initial simulation view](./public/initial-simulation-niew.png)
> Figure 2.15 - Simulation view before running prompting the initial run

>![Simulation with two do()s](./public/simulation-results-01.png)
> Figure 2.16 - Simulation results from the case above with `do()` on Bob and Elise

>![Edited child of do() node CPT](./public/edited-hannah-cpt.png)
> Figure 2.17 - Editing the CPT for Hannah to respond to Bob differently

>![New simulation with edited CPT](./public/simulation-results-02.png)
> Figure 2.18 - The resulting simulation, reflected the changes made above

>![Histogram hover](./public/histogram-hover.png)
> Figure 2.19 - Hovering on the histogram revealing more details

### Technologies Used

A key factor is the success of this project was utilizing frontend software libraries that aid in interface development, and they are worth mentioning. Vue.js is used for it's component design patterns, templating engine, deployment tools, and reactive data binding. Bootstrap is used to help create a responsive layout that is functional on desktop and mobile browsers. Vis.js and Chart.js are used for the network and histogram visualizations respectively. These tools all come together to create an interface that is consistent across many different screens, shows data accurately, is packaged effectively, and is defined simply for future expansion.

#### Reactive data system and data binding

#### Visualization

vis.js and chart.js

#### Deployment

Deployment and hosting are currently using Firebase and available at `https://bn-play.firebaseapp.com/`. On the free plan Firebase allows for 10GB downloaded per month, which with the current download size of about 700KB equates to just under 14,000 downloads, so this should be more than enough for the foreseeable future. It's also worth noting that after the initial download the majority of the files will be saved in the browser cache, and subsequent downloads are under 1KB. Additionally, after that initial download the application does not require any page reloads, storage is completely client-side, and no further network connectivity is needed.
 
## Desired Use and Impact

### Learning

### Simple simulations

### Additional functionality

## Future Work

Electron so you can be fully offline after the initial download
> Fill in from the todo in the readme

## Important Data Structures and Algorithms

> Not sure about this section, maybe check with her and have two versions ready

### `BayesianNetwork`

#### `BNode`
IDs used internally but names for display, allowing two nodes with the same name without issues

#### `BEdge`

#### `runSimulation()`

> Fill in psuedo-code

## References
* Firebase
* vis.js
* chart.js
* vue.js

## Closing Notes

Report format inspiration mainly taken from https://www.usenix.org/legacy/event/sec08/tech/full_papers/adida/adida.pdf, as it is a research paper discussing a project where both the interface and features of the implementation would be of concern