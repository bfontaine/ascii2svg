var jsdom = require("jsdom"),
    d3    = require("d3");

/**
 * Helper for drawGraph.
 **/
function _drawGraph(opts, resolve, reject) {
  // TODO add nodes labels

  opts = opts || {};

  var nodes = opts.nodes || [],
      links = opts.links || [],

      width = opts.width || 800,
      height = opts.height || 600,

      done  = opts.done || function() {};

  function env(errors, window) {
    if (errors && errors.length > 0) {
      return reject(errors);
    }

    var document = window.document,
        parent = document.querySelector("div"),
        svg = d3.select(parent).append("svg:svg"),

        force = d3.layout.force()
          .charge(opts.charge || -40)
          .linkDistance(opts.linkDistance || 20)
          .gravity(opts.gravity || 0.3)
          .size([width, height]);

        svg.attr("width", width)
           .attr("height", height);

        force.nodes(nodes)
             .links(links);

        force.start();

        for (var ticks=opts.ticks || 100; ticks>0; --ticks) {
          force.tick();
        }

        force.stop()

        svg.selectAll(".link")
           .data(links)
           .enter().append("line")
              .attr("class", "link")
              .attr("x1", function(d) { return d.source.x; })
               .attr("y1", function(d) { return d.source.y; })
               .attr("x2", function(d) { return d.target.x; })
               .attr("y2", function(d) { return d.target.y; });

        svg.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", opts.r || 5)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        resolve(parent.innerHTML);
  }

  jsdom.env({
    features: { QuerySelector: true },
    html: "<div></div>",
    done: env
  });
}

/**
 * Draw a graph as specified by the given object and return a promises that
 * resolves to the resulting string.
 * Required keys:
 * - nodes: a list of nodes that'll be passed untouched to D3
 * - links: a list of links that'll be passed untouched to D3
 * Optional keys:
 * - width: 800 by default
 * - height: 600 by default
 * - r: 5 by default
 * - charge, linkDistance, gravity: will be passed to D3
 * - ticks: the number of ticks to run. 100 by default.
 **/
function drawGraph(opts) {
  return new Promise(function(resolve, reject) {
    return _drawGraph(opts, resolve, reject);
  });
}

exports.drawGraph = drawGraph;
