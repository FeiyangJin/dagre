"use strict";

var {json} = require("@dagrejs/graphlib");

module.exports = topoSort;
function topoSort(g){
    var copyg = json.read(json.write(g))
    const ranks = new Map();

    var currentRank = 0;
    var limit = copyg.nodeCount()

    while (ranks.size < limit){
        var ss = copyg.sources()
        ss.forEach(node => {
            ranks.set(node, currentRank)
            copyg.removeNode(node)
        });
        currentRank += 1
    }

    for (let [key, value] of ranks) {
        g.node(key).rank = value
    }
}