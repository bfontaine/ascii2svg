/**
 * Parse an ASCII representation of a graph. This is not exported; one should
 * rather use require("ascii2svg/parser").parseAs("ascii", done) *after*
 * requiring this module.
 **/
function parseASCIIGraph(s, done) {
  if (!s) {
    return done({error: "empty string"});
  }

  var nodes = [],
      links = [],

      nodesIndex = {};

  s.split(/\n+/).forEach(function(line) {
    if (line.startsWith("#")) {
      return;
    }

    var prevNode;

    line.split(/\s*<?-+>?\s*/).forEach(function(node) {
      var i1, i2;

      if (!nodesIndex.hasOwnProperty(node)) {
        nodesIndex[node] = nodes.push({name: node})-1;
      }

      if (prevNode) {
        i1 = nodesIndex[prevNode];
        i2 = nodesIndex[node];

        links.push({source: i1, target: i2, weight: 1});
      }

      prevNode = node;
    });
  });

  done({
    nodes: nodes,
    links: links,
  });
}

var p = require("./parser")
.register("ascii", ["", "txt"], parseASCIIGraph);
