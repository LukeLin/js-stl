Graph = require('../source').Graph

# Shorthand for logging.
l = (x) -> console.log require('util').inspect x, true, 10

addNodesTo = (graph, addEdges = no) ->
  initNodeSize = graph.nodeSize
  graph.addNode "1"
  graph.addNode "2"
  graph.addNode "3"
  graph.addNode "4"
  graph.addNode "5"
  graph.addNode "6"
  expect(graph.nodeSize).toBe initNodeSize + 6
  if addEdges
    ###
    1 <- 2 <-> 3
    |^   ^     ^
    v \  |     |
    4   \5     6 <->
    ###
    initEdgeSize = graph.edgeSize
    expect(initEdgeSize).toBe 0
    graph.addEdge "1", "4", 9
    graph.addEdge "2", "1", 9
    graph.addEdge "2", "3", 9
    graph.addEdge "3", "2", 9
    graph.addEdge "5", "1", 9
    graph.addEdge "5", "2", 9
    graph.addEdge "6", "3", 9
    graph.addEdge "6", "6", 9
    expect(graph.edgeSize).toBe initEdgeSize + 8

describe "Add node", ->
  graph = new Graph()
  it "should have 0 edge and 0 node initially", ->
    expect(graph.nodeSize).toBe 0
    expect(graph.edgeSize).toBe 0
  it "should return the node object added, or undefined if the id exists", ->
    expect((graph.addNode "item") instanceof Object).toBeTruthy()
    expect((graph.addNode "1") instanceof Object).toBeTruthy()
    expect((graph.addNode null) instanceof Object).toBeTruthy()
  it "should return undefined if the node id already exists", ->
    expect(graph.addNode "item").toBeUndefined()
    expect(graph.addNode "1").toBeUndefined()
    expect(graph.addNode null).toBeUndefined()
  it "should have kept the node size constant with non-insertions", ->
    expect(graph.nodeSize).toBe 3

describe "Get node", ->
  graph = new Graph()
  it "should return undefined if the node's not found", ->
    expect(graph.getNode null).toBeUndefined()
    expect(graph.getNode undefined).toBeUndefined()
    expect(graph.getNode 2).toBeUndefined()
  it "should return the added node", ->
    addNodesTo graph
    expect((graph.getNode "1") instanceof Object).toBeTruthy()
    expect((graph.getNode "2") instanceof Object).toBeTruthy()
    expect((graph.getNode "6") instanceof Object).toBeTruthy()
  it "should return a defined object if null and undefined are found", ->
    graph.addNode null
    graph.addNode undefined
    expect((graph.getNode null) instanceof Object).toBeTruthy()
    expect((graph.getNode undefined) instanceof Object).toBeTruthy()

describe "Remove node", ->
  graph = new Graph()
  it "should return undefined if the node doesn't exist in the first place", ->
    expect(graph.removeNode null).toBeUndefined()
    expect(graph.removeNode 2).toBeUndefined()
  it "should have kept the node size constant", ->
    expect(graph.nodeSize).toBe 0
  it "should return the value of node removed", ->
    addNodesTo graph
    expect((graph.removeNode "1") instanceof Object).toBeTruthy()
    expect((graph.removeNode "3") instanceof Object).toBeTruthy()
    expect((graph.removeNode "6") instanceof Object).toBeTruthy()
  it "should have updated the node size", ->
    expect(graph.nodeSize).toBe 3
  it "should have removed the node", ->
    expect(graph.getNode "1").toBeUndefined()
    expect(graph.getNode "3").toBeUndefined()
    expect(graph.getNode "6").toBeUndefined()

describe "Add edge", ->
  graph = new Graph()
  it "should return undefined if either/both nodes don't exist in the graph", ->
    expect(graph.addEdge "7", "8").toBeUndefined()
    expect(graph.addEdge "1", "8").toBeUndefined()
    expect(graph.addEdge "99", "1").toBeUndefined()
    addNodesTo graph
    expect(graph.addEdge "7", "8").toBeUndefined()
    expect(graph.addEdge "1", "8").toBeUndefined()
    expect(graph.addEdge "99", "1").toBeUndefined()
  it "should add the edge and return the edge object", ->
    expect((graph.addEdge "1", "2") instanceof Object).toBeTruthy()
    expect((graph.addEdge "2", "1") instanceof Object).toBeTruthy()
    expect((graph.addEdge "3", "2") instanceof Object).toBeTruthy()
  it "should have updated the edge size", ->
    expect(graph.edgeSize).toBe 3
  it "should have initiated the edge weight to 1", ->
    expect(graph.addEdge("5", "2").weight).toBe 1
    expect(graph.addEdge("5", "6").weight).toBe 1
    expect(graph.addEdge("3", "6").weight).toBe 1
  it "should allow the node to add an edge to itself", ->
    expect((graph.addEdge "2", "2") instanceof Object).toBeTruthy()
    expect((graph.addEdge "6", "6") instanceof Object).toBeTruthy()
  it "should count a self-directing edge as a single one", ->
    expect(graph.edgeSize).toBe 8
  it "should return undefined if the edge already exists", ->
    expect(graph.addEdge "1", "2").toBeUndefined()
    expect(graph.addEdge "2", "2").toBeUndefined()
    expect(graph.addEdge "2", "1").toBeUndefined()

describe "Get edge", ->
  graph = new Graph()
  it "should return undefined if the nodes aren't found", ->
    expect(graph.getEdge "1", "2").toBeUndefined()
  it "should return undefined if the edge isn't found", ->
    addNodesTo graph, yes
    expect(graph.getEdge "3", "5").toBeUndefined()
    expect(graph.getEdge "1", "2").toBeUndefined()
  it "should return the edge found", ->
    expect((graph.getEdge "1", "4") instanceof Object).toBeTruthy()
    expect((graph.getEdge "2", "1") instanceof Object).toBeTruthy()
    expect((graph.getEdge "2", "3") instanceof Object).toBeTruthy()
    expect((graph.getEdge "3", "2") instanceof Object).toBeTruthy()
    expect((graph.getEdge "5", "1") instanceof Object).toBeTruthy()
    expect((graph.getEdge "5", "2") instanceof Object).toBeTruthy()
    expect((graph.getEdge "6", "3") instanceof Object).toBeTruthy()
    expect((graph.getEdge "6", "6") instanceof Object).toBeTruthy()

describe "Remove edge", ->
  graph = new Graph()
  it "should return undefined if either node's not found", ->
    expect(graph.removeEdge 1, 2).toBeUndefined()
    expect(graph.removeEdge undefined, undefined).toBeUndefined()
  it "should have kept the edge count at 0", ->
    expect(graph.edgeSize).toBe 0
  it "should return undefined if the edge doesn't exist", ->
    addNodesTo graph, yes
    ###
    1 <- 2 <-> 3
    |^   ^     ^
    v \  |     |
    4   \5     6 <->
    ###
    expect(graph.removeEdge("1", "4").weight).toBe 9
    expect(graph.removeEdge("2", "1").weight).toBe 9
    expect(graph.removeEdge("2", "3").weight).toBe 9
    expect(graph.removeEdge("3", "2").weight).toBe 9
    expect(graph.removeEdge("5", "1").weight).toBe 9
    expect(graph.removeEdge("5", "2").weight).toBe 9
    expect(graph.removeEdge("6", "3").weight).toBe 9
  it "should have kept track of the edge count", ->
    expect(graph.edgeSize).toBe 1
  it "should remove a self-directing correctly", ->
    expect(graph.removeEdge("6", "6").weight).toBe 9
    expect(graph.edgeSize).toBe 0
  it "should leave an empty graph after removing all the edges", ->
    expect(graph.removeEdge "1", "4").toBeUndefined()
    expect(graph.removeEdge "2", "1").toBeUndefined()
    expect(graph.removeEdge "2", "3").toBeUndefined()
    expect(graph.removeEdge "3", "2").toBeUndefined()
    expect(graph.removeEdge "5", "1").toBeUndefined()
    expect(graph.removeEdge "5", "2").toBeUndefined()
    expect(graph.removeEdge "6", "3").toBeUndefined()
    expect(graph.removeEdge "6", "6").toBeUndefined()

describe "Get all in edges", ->
  graph = new Graph()
  it "should return empty array for a non-existant node", ->
    expect(graph.getOutEdgesOf "6").toEqual []
    expect(graph.getOutEdgesOf undefined).toEqual []
  it "should return empty array for no edges", ->
    addNodesTo graph
    expect(graph.getInEdgesOf "1").toEqual []
    expect(graph.getInEdgesOf "2").toEqual []
    expect(graph.getInEdgesOf "6").toEqual []
  graph2 = new Graph()
  it "should return the in edges", ->
    addNodesTo graph2, yes
    ###
    1 <- 2 <-> 3
    |^   ^     ^
    v \  |     |
    4   \5     6 <->
    ###
    expect(graph2.getInEdgesOf("1").length).toBe 2
    expect(graph2.getInEdgesOf "1").toContain graph2.getEdge "2", "1"
    expect(graph2.getInEdgesOf "1").toContain graph2.getEdge "5", "1"

    expect(graph2.getInEdgesOf("2").length).toBe 2
    expect(graph2.getInEdgesOf "2").toContain graph2.getEdge "3", "2"
    expect(graph2.getInEdgesOf "2").toContain graph2.getEdge "5", "2"

    expect(graph2.getInEdgesOf("3").length).toBe 2
    expect(graph2.getInEdgesOf "3").toContain graph2.getEdge "2", "3"
    expect(graph2.getInEdgesOf "3").toContain graph2.getEdge "6", "3"

    expect(graph2.getInEdgesOf("4").length).toBe 1
    expect(graph2.getInEdgesOf "4").toContain graph2.getEdge "1", "4"

    expect(graph2.getInEdgesOf "5").toEqual []
    expect(graph2.getInEdgesOf("6").length).toBe 1
    expect(graph2.getInEdgesOf "6").toContain graph2.getEdge "6", "6"

describe "Get all out edges", ->
  graph = new Graph()
  it "should return empty array for a non-existant node", ->
    expect(graph.getOutEdgesOf "6").toEqual []
    expect(graph.getOutEdgesOf undefined).toEqual []
  it "should return empty array for no edges", ->
    addNodesTo graph
    expect(graph.getOutEdgesOf "1").toEqual []
    expect(graph.getOutEdgesOf "2").toEqual []
  graph2 = new Graph()
  it "should return the in edges", ->
    addNodesTo graph2, yes
    ###
    1 <- 2 <-> 3
    |^   ^     ^
    v \  |     |
    4   \5     6 <->
    ###
    expect(graph2.getOutEdgesOf("1").length).toBe 1
    expect(graph2.getOutEdgesOf "1").toContain graph2.getEdge "1", "4"

    expect(graph2.getOutEdgesOf("2").length).toBe 2
    expect(graph2.getOutEdgesOf "2").toContain graph2.getEdge "2", "1"
    expect(graph2.getOutEdgesOf "2").toContain graph2.getEdge "2", "3"

    expect(graph2.getOutEdgesOf("3").length).toBe 1
    expect(graph2.getOutEdgesOf "3").toContain graph2.getEdge "3", "2"

    expect(graph2.getOutEdgesOf "4").toEqual []

    expect(graph2.getOutEdgesOf("5").length).toBe 2
    expect(graph2.getOutEdgesOf "5").toContain graph2.getEdge "5", "1"
    expect(graph2.getOutEdgesOf "5").toContain graph2.getEdge "5", "2"

    expect(graph2.getOutEdgesOf("6").length).toBe 2
    expect(graph2.getOutEdgesOf "6").toContain graph2.getEdge "6", "3"
    expect(graph2.getOutEdgesOf "6").toContain graph2.getEdge "6", "6"

describe "Get all edges", ->
  graph = new Graph()
  it "should return an empty array if node doesn't exist", ->
    expect(graph.getAllEdgesOf 1).toEqual []
    expect(graph.getAllEdgesOf undefined).toEqual []
  it "should return an empty array if the node doesn't have edges", ->
    addNodesTo graph
    expect(graph.getAllEdgesOf "1").toEqual []
    expect(graph.getAllEdgesOf "2").toEqual []
    expect(graph.getAllEdgesOf "6").toEqual []
  graph2 = new Graph()
  it "should return an array of edges", ->
    addNodesTo graph2, yes
    ###
    1 <- 2 <-> 3
    |^   ^     ^
    v \  |     |
    4   \5     6 <->
    ###
    expect(graph2.getAllEdgesOf("1").length).toBe 3
    expect(graph2.getAllEdgesOf "1").toContain graph2.getEdge "1", "4"
    expect(graph2.getAllEdgesOf "1").toContain graph2.getEdge "2", "1"
    expect(graph2.getAllEdgesOf "1").toContain graph2.getEdge "5", "1"

    expect(graph2.getAllEdgesOf("2").length).toBe 4
    expect(graph2.getAllEdgesOf "2").toContain graph2.getEdge "2", "1"
    expect(graph2.getAllEdgesOf "2").toContain graph2.getEdge "2", "3"
    expect(graph2.getAllEdgesOf "2").toContain graph2.getEdge "3", "2"
    expect(graph2.getAllEdgesOf "2").toContain graph2.getEdge "5", "2"

    expect(graph2.getAllEdgesOf("3").length).toBe 3
    expect(graph2.getAllEdgesOf "3").toContain graph2.getEdge "3", "2"
    expect(graph2.getAllEdgesOf "3").toContain graph2.getEdge "2", "3"
    expect(graph2.getAllEdgesOf "3").toContain graph2.getEdge "6", "3"

    expect(graph2.getAllEdgesOf("4").length).toBe 1
    expect(graph2.getAllEdgesOf "4").toContain graph2.getEdge "1", "4"

    expect(graph2.getAllEdgesOf("5").length).toBe 2
    expect(graph2.getAllEdgesOf "5").toContain graph2.getEdge "5", "1"
    expect(graph2.getAllEdgesOf "5").toContain graph2.getEdge "5", "2"
  it "should not duplicate a self-pointing edge", ->
    expect(graph2.getAllEdgesOf("6").length).toBe 2
    expect(graph2.getAllEdgesOf "6").toContain graph2.getEdge "6", "3"
    expect(graph2.getAllEdgesOf "6").toContain graph2.getEdge "6", "6"

describe "Traverse through each node", ->
  graph = new Graph()
  it "shouldn't call the callback for an empty graph", ->
    callback = jasmine.createSpy()
    graph.forEachNode callback
    expect(callback).not.toHaveBeenCalled()
  it "should reach each node once", ->
    addNodesTo graph
    callback = jasmine.createSpy()
    graph.forEachNode callback
    expect(callback.callCount).toBe 6
  it "should pass nodeObject and nodeId to the callback", ->
    callback = jasmine.createSpy()
    graph.forEachNode callback
    expect(callback.mostRecentCall.args.length).toBe 2
    expect(callback.mostRecentCall.args[0] instanceof Object).toBeTruthy
    expect(callback.mostRecentCall.args[1]).toBe "6"

describe "Traverse through each edge", ->
  graph = new Graph()
  it "shouldn't call the callback for an empty graph", ->
    callback = jasmine.createSpy()
    graph.forEachEdge callback
    expect(callback).not.toHaveBeenCalled()
  it "should reach each edge once", ->
    addNodesTo graph, yes
    callback = jasmine.createSpy()
    graph.forEachEdge callback
    expect(callback.callCount).toBe 8
  it "should reach the isolated node with an edge toward itself", ->
    graph.addNode "99"
    graph.addEdge "99", "99", 999
    callback = jasmine.createSpy()
    graph.forEachEdge callback
    expect(callback.callCount).toBe 9
