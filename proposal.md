### CS 582 A Final Project Proposal - Josh Gribbon

**Overview**
I would like to build a simple web interface for visualizing and simulating Bayesian Networks (or something else if you know something would be useful). Of the lists of software online, there were few that had a web interface or seemed particularly accessible to play with, and this seems like it would be a useful tool to interface with BNs, teach them, or show how one would play out when simulated. This stood out to me as an issue that I may be able to contribute to in the field of causality in the short time we have remaining this semester, in a way that could help in the future.

**Project Plan**
My plan is to build a single page app(SPA) hosted on Firebase(https://firebase.google.com/), which will be free to host unless it gets a huge amount of traffic. This design will also make it simpler to finish in the remaining time by removing backend concerns, and additionally would be hosted just as well on the linux lab servers. I was thinking a simple interface to add nodes and probabilities, then some controls to change the simulation, ultimately displaying some statistics and distributions. This could also include a `do()` operation to intervene on a node and see how it affects the rest of the network. If there is some sort of standard output that I could use to generate the network that seems like it would also be useful and would allow for an export/sharing feature.

I will also use some libraries like vis.js(http://visjs.org/network_examples.html) to help with the visualization, and likely Vue.js(https://vuejs.org/) for building the frontend. This will make it easier to create the networks and show how the different weights affect the simulation, also helping to make this project acheivable in the next month or so.

Ultimately, if this can't be used for any real causality work, I'm hoping it will at least be an easy way to create the visuals for export or to play with as a teaching aid. This could also be expanded on as an open source project to add further functionality in the future, perhaps if someone wanted to continue with in it future semesters.

**Success Criteria**
The success criteria is to get a site set up that allows a user to build a BN, simulate events going through the network, and the resulting distributions.

Critical features: add nodes, link with probabilities, run simulation, see results, `do()` on a node
Possible features: see Markov blanket, import from file, export to file, detect how close a set of data is to matching the network, identify independence relationships, saving of networks on the client-side

**Similar current projects**
* http://www.cs.man.ac.uk/~gbrown/bayes_nets/
    * Has buttons to "learn structure" and "learn parameters", but they don't seem to function. This is the closest I could find to what I want to make, but has no simulation functionality.