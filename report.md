<h1>bn-play: A tool for learning Bayesian Networks through manipulation and simulation</h1>
<!-- Used h1 here so the line would be left out of the TOC -->

[TOC]

<!--
TODO:
* [_] Add some research for education and interface stuff
* [/] Finish outline
* [_] Put name somewhere
* [/] Fill in sections
* [_] Format references
* [_] Format document as two-column pdf
* [_] Check on removing the data structures and algorithms part
* [_] Submit to canvas
-->

## Abstract

## Introduction

## Interface Design

Reactive for web/mobile, offline after initial download, SPA so no need to reload page, simple distribution through static files, easy to wrap in electron as a desktop app in the future, modern web design for simple future development.

### Component Overview

#### Network Viewer

#### Selected Node Details

#### Conditional Probability Table

#### Simulator

### Technologies Used

#### Reactive data system and data binding

#### Visualization

vis.js and chart.js

#### Deployment

Initially firebase, then github pages (10GB free per month vs 100GB), 
> calculate distribution size and how many downloads that would be, then adding a note about browser caching, maybe reference MDN of w3c for browser stuff

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

## Future Work

> Fill in from the todo in the readme

## References
