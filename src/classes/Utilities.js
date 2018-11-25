/**
 * @summary Get a table of all possible boolean combinations for `nodeCount` elements
 * @param {number} nodeCount - How many nodes to get the possible options for
 * @example
 * getPossibilityTable(1) = [[1], [0]]
 * getPossibilityTable(2) = [[1, 1], [1, 0], [0, 1], [0, 0]]
 */
export const getPossibilityTable = nodeCount => {
    if (nodeCount === 0) return [[]]
  
    let subTable = getPossibilityTable(nodeCount-1)
    return [
      ...subTable.map(l => [1, ...l]),
      ...subTable.map(l => [0, ...l])
    ]
  }