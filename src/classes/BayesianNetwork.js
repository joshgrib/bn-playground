import { getPossibilityTable } from './Utilities'

const borderColor = 'black'
const defaultColor = 'lightblue'
const highlightColor = 'orange'

/**
 * @summary A node in the network
 */
class BNode {
    /**
     * @param {number} id - An identifier for the node
     * @param {string} name - The name for the node
     * @param {BayesianNetwork} network - The BayesianNetwork that the node is a part of
     */
    constructor(id, name, network){
        this.id = id
        this.name = name
        this.network = network
        this.highlighted = false
        this.pTable = {}
        this.inDoMode = false
        this.backupPTable = {}

        for(let k of [...[1, 2, 3].map(v=>getPossibilityTable(v))]) {
            for(let combo of k){
                let comboKey = combo.join('')
                this.pTable[comboKey] = 0.5
            }
        }
    }

    /**
     * @summary Get the list of parent nodes for this node
     */
    get parents () {
        let incomingEdges = this.network.edges.filter(edge => {
            return edge.to.id === this.id
        })
        return incomingEdges.map(edge => edge.from)
    }
    /**
     * @summary Get the list of child nodes for this node
     */
    get children () {
        let outgoingEdges = this.network.edges.filter(edge => {
            return edge.from.id === this.id
        })
        return outgoingEdges.map(edge => edge.to)
    }
    /**
     * @summary Check if the node is a collider
     */
    get isCollider () {
        return this.parents.length >= 2
    }
    /**
     * @summary Get the nodes that constitute the Markov Blanket for this node
     */
    get markovBlanket () {
        let parentNodes = this.parents
        let childNodes = this.children
        let spouseNodes = []
        childNodes.map(node => {
            let childParents = node.parents.filter(parent => { return parent.id !== this.id })
            spouseNodes = [...spouseNodes, ...childParents]
        })
        return [...parentNodes, ...childNodes, ...spouseNodes]
    }

    /**
     * @summary Update the probability table values after adding new parent nodes
     */
    updatePTable () {
        let newPTable = {}
        for(let c of getPossibilityTable(this.parents.length)){
            newPTable[c.join('')] = 0.5
        }
        this.pTable = newPTable
        for(let key in this.pTable){
            this.pTable[key] = 0.5
        }
    }

    /**
     * @summary Get the Conditional Probability Table for the node
     */
    get cpTable () {
        let parentNames = this.parents.map(p => p.name)
        // headers are the parents and P(node | parents) or P(node)
        let givenClause = (parentNames.length==0) ? `` : ` | ${parentNames.join(', ')}`
        return {
            headers: [...parentNames, `P(${this.name}${givenClause})`],
            combos: getPossibilityTable(this.parents.length)
        }
    }

    get visJs () {
        return {
            id: this.id,
            label: this.name,
            color: {
                background: this.highlighted ? highlightColor : defaultColor,
                border: borderColor
            }
        }
    }
}

/**
 * @summary An edge in the network
 */
class BEdge {
    /**
     * @param {number} id - An identifier for the edge
     * @param {BNode} fromNode - The source node
     * @param {BNode} toNode - The target node
     * @param {BayesianNetwork} network - The BayesianNetwork that the node is a part of
     */
    constructor(id, fromNode, toNode, network) {
        this.id = id
        this.from = fromNode
        this.to = toNode
        this.network = network
    }

    get name () {
        return `${this.from.name}->${this.to.name}`
    }

    get visJs () {
        return {
            id: this.id,
            from: this.from.id,
            to: this.to.id,
            arrows: 'to',
            width: 1,
            color: {
                color: borderColor,
                inherit: false
            },
            dashes: this.to.inDoMode
            
        }
    }
}

/**
 * @summary A Bayesian Network with nodes and edges
 */
export default class BayesianNetwork {
    /**
     * @summary Create a new Bayesian Network
     */
    constructor () {
        this.nodes = []
        this.edges = []
    }

    /**
     * @summary Get the count of nodes in the network
     */
    get nodeCount () { return this.nodes.length }
    /**
     * @summary Get the count of edges in the network
     */
    get edgeCount () { return this.edges.length }
    /**
     * @summary Get the maximum ID of the nodes in the network
     */
    get maxNodeId () {
        let max = 0
        for(let node of this.nodes){
            if(node.id > max) max = node.id
        }
        return max
    }
    /**
     * @summary Get the maximum ID of the edges in the network
     */
    get maxEdgeId () {
        let max = 0
        for(let edge of this.edges){
            if(edge.id > max) max = edge.id
        }
        return max
    }

    /**
     * @summary Add a node to the network
     * @param {string} name - The name for the node
     * @throws Will throw an error if the parameter is not a string
     */
    addNode (name) {
        if(typeof name !== 'string') throw `First parameter must be a string`

        let id = this.maxNodeId + 1
        let node = new BNode(id, name, this)
        this.nodes.push(node)
        return node
    }
    /**
     * @summary Add multiple nodes to the network
     * @param {string[]} nameList - An array of node names
     */
    addNodes (nameList) {
        nameList.forEach(name => this.addNode(name))
        return this
    }
    /**
     * @summary Check for an existing node
     * @param {string} name  - A node name
     */
    hasNode (name) {
        return this.nodes.map(node => node.name).includes(name)
    }
    /**
     * @summary Get a node by id
     * @param {number} id - The id of a node
     */
    getNode (id) {
        return this.nodes.filter(node => node.id==id)[0]
    }
    /**
     * @summary Remove a node from the network by ID
     * @param {number} id - The ID of a node in the network
     */
    removeNode (id) {
        let newNodes = this.nodes.filter(node => { return node.id !== id })
        if (newNodes.length !== this.nodes.length-1) throw `Unable to find node with id ${id}`
        this.nodes = newNodes
        this.edges = this.edges.filter(edge => { 
            if (edge.to.id === id) {
                edge.from.updatePTable()
                return false
            }
            if (edge.from.id === id) {
                edge.to.updatePTable()
                return false
            }
            return true
        })
    }
    /**
     * @summary Remove multiple nodes from the network by ID
     * @param {number[]} idList - A list of IDs of nodes in the network
     */
    removeNodes (idList) {
        idList.forEach(id => this.removeNode(id))
    }
    
    /**
     * @summary Add an edge in the network
     * @param {number} fromNodeName - The origin node ID
     * @param {number} toNodeName - The destination node ID
     * @throws Will throw an error if either parameter is not a number
     * @throws Will throw an error if either node cannot be found
     */
    addEdge (fromNodeId, toNodeId) {
        if (typeof fromNodeId !== 'number') throw `First parameter: expected 'number', got '${typeof fromNodeId}'.`
        if (typeof toNodeId !== 'number') throw `Second parameter: expected 'number', got '${typeof toNodeId}'.`

        let fromNode = this.nodes.filter(node => node.id == fromNodeId)[0];
        let toNode = this.nodes.filter(node => node.id == toNodeId)[0];

        if (!fromNode ) throw `Unable to find node with id '${fromNodeId}'`
        if (!toNode) throw `Unable to find node with id '${toNodeId}'`

        let id = this.maxEdgeId+1
        let edge = new BEdge(id, fromNode, toNode, this)
        this.edges.push(edge)
        toNode.updatePTable()
        return edge
    }
    /**
     * @summary Add multiple edges to the network
     * @param {number[][]} idList - An array of edges, where each edge is a  list of two node IDs
     */
    addEdges (idList) {
        idList.forEach(edge => this.addEdge(...edge))
        return this
    }
    /**
     * @summary Check for an existing edge
     * @param {string} fromNodeName - The name for the origin node
     * @param {string} toNodeName - The name for the destination node
     */
    hasEdge (fromNodeName, toNodeName) {
        for(let edge of this.edges){
            if(edge.from.name==fromNodeName && edge.to.name==toNodeName){
                return true;
            }
        }
        return false;
    }
    /**
     * @summary Get an edge in the network by ID
     * @param {number} id - The ID of an edge in the network
     */
    getEdge (id) {
        return this.edges.filter(edge => edge.id==id)[0]
    }
    /**
     * @summary Remove an edge from the network
     * @param {number} id - The ID of an edge in the network
     */
    removeEdge (id) {
        this.edges = this.edges.filter(edge => { return edge.id != id })
    }
    /**
     * @summary Remove multiple edges from the network
     * @param {number[]} idList - A list of IDs of edges in the network
     */
    removeEdges (idList) {
        idList.forEach(id => this.removeEdge(id))
    }

    /**
     * @summary Get the list of nodes that have children but no parents
     */
    get entryNodes () {
        let nodesWithChildren = this.edges.map(e => e.from)
        let nodesWithParents = this.edges.map(e => e.to)
        let entryNodes = nodesWithChildren.filter(n => !nodesWithParents.includes(n))
        let uniqueEntryNodes = new Set(entryNodes)
        //return it as an Array instead of a Set
        return [...uniqueEntryNodes]
    }

    /**
     * @summary Check for a cycle in the graph
     * @returns True if there is a cycle, False if there is not
     */
    get hasCycle () {
        //FIXME: this gets any cycles regardless of direction
        const checkDescendents = (node, visitedIds=[]) => {
            if(visitedIds.includes(node.id)){
                return true
            }

            visitedIds.push(node.id)
            let children = this.edges.filter(e => e.from.id==node.id).map(e => e.to)

            let found = false
            for(let child of children){
                found = found || checkDescendents(child, visitedIds)
            }
            return found
        };

        let foundCycle = false
        for(let node of this.entryNodes){
            foundCycle = foundCycle || checkDescendents(node)
        }
        return foundCycle
    }

    /**
     * @summary Run a simulation on the network
     */
    runSimulation () {
        // clear out all values
        this.nodes.map(n => n.value = undefined)
        const setNodeValue = node => {
            let table = node.pTable
            let parentValues = node.parents.map(p => p.value).join('')
            let pTrue = table[parentValues]
            if(pTrue===undefined) {
                throw `Unable to find probability for node '${node.name}' with key ${parentValues}`
            }
            let testVal = Math.random()
            node.value = (pTrue > testVal) ? 1 : 0
        }
        // set node values for nodes that have no parents
        for(let node of this.entryNodes) {
            setNodeValue(node)
        }
        let nextAvailableNodes = () => {
            const nodeHasAllParentValues = node => {
                //skip entry nodes
                if (node.parents.length===0) return false
                // skip nodes without all parent values
                for(let parent of node.parents){
                    if (parent.value===undefined) return false
                }
                return true
            }
            const nodeHasNoValue = node => node.value === undefined
            return this.nodes.filter(n => nodeHasAllParentValues(n))
                .filter(n => nodeHasNoValue(n))
        }
        // add values for nodes that have all parents values until the all nodes have values
        let availableNodes = new Set(nextAvailableNodes())
        for (let node of availableNodes) {
            setNodeValue(node)
            nextAvailableNodes().map(n => availableNodes.add(n))
        }
        return this.nodes.map(n => { 
            return {
                id: n.id,
                name: n.name,
                value: n.value
            }
        })
    }

    /**
     * @summary Get the network as a visJs graph definition
     */
    get visJs () {
        return {
            nodes: this.nodes.map(node => node.visJs),
            edges: this.edges.map(edge => edge.visJs)
        }
    }
}