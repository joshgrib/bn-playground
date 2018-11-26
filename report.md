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

## Abstract
`bn-play` is a tool for learning about Bayesian Networks through visualization and interface. The main focus of the project is an intuitive and explanatory interface. Modern web app tools are used to create an interface that is linked to the underlying structures, simplifying the design, helping ensure that the user is seeing data in the right context across components, aiding in layout, and assisting with browser compatability. The simulation component is designed to be simple, robust, and expandable.

## Introduction

## Interface Design

Reactive for web/mobile, offline after initial download, SPA so no need to reload page, simple distribution through static files, easy to wrap in electron as a desktop app in the future, modern web design for simple future development.


### Component Overview

#### Network Viewer

![Basic network](./public/network-view-01.png)

#### Selected Node Details

#### Conditional Probability Table

#### Simulator

### Technologies Used

#### Reactive data system and data binding

#### Visualization

vis.js and chart.js

#### Deployment

Firebase - simple to use, free for 10GB/month
* 717 KB total = 0.000717GB = 13947 initial downloads
* ~900B after caching = ~12M redownloads
> write out the equation for how many users it can support

## Important Data Structures and Algorithms

> Not sure about this section, maybe check with her and have two versions ready

### `BayesianNetwork`

#### `BNode`

#### `BEdge`

#### `runSimulation()`

> Fill in psuedo-code

## Desired Use and Impact

### Learning

### Simple simulations

### Additional functionality

## Future Work

> Fill in from the todo in the readme

## References
