/**
 * Helper for parseASCIIGraph
 **/
function _parseASCIIGraph(s, resolve, reject) {
  if (!s) {
    return reject("empty string");
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

      if (node == "") {
        return;
      }

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

  resolve({
    nodes: nodes,
    links: links,
  });
}

/**
 * Parse an ASCII representation of a graph. This is not exported; one should
 * rather use require("ascii2svg/ascii").activate() and
 * require("ascii2svg/parser").parseAs("ascii", done).
 **/
function parseASCIIGraph(s) {
  return new Promise(function(resolve, reject) {
    return _parseASCIIGraph(s, resolve, reject);
  });
}

exports.activate = function() {
  require("./parser").register("ascii", ["", "txt"], parseASCIIGraph);
};
