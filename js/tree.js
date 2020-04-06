var treeData =
  {
  "name": "SHF",
  "value": 75,
  "type": "black",
  "level": "red",
  "male": 51,
  "female": 24,
  "img": "https://lh3.googleusercontent.com/proxy/wqOI2BaoZ-Gis_2L5mMjVU7omp3uvGMzkdpu-Dfoh1MphFvdIt7gkoTxzHEsnacer2MIsjEy80YZWhHj3rX9QKQAbvnGdgco23x1NabL2DzH_DVQrmxN4xj_cYyO1qvm9qJ-OskycII",
  "children":[
  {
    "name": "Hotel School",
    "value": 40,
    "type": "black",
    "level": "green",
    "male": 23,
    "female": 17,
    "img": "http://www.sumbahospitalityfoundation.org/wp-content/uploads/2016/10/Classroom.jpg",
    "children": [
      {
        "name": "Info About Self Sufficient Hotel School",
        "value": 23,
        "type": "grey",
        "level": "red",
        "male": 10,
        "female": 13,
      },
      {
        "name": "",
        "value": 23,
        "type": "grey",
        "level": "green",
        "male": 10,
        "female": 13,
        "link": "http://www.sumbahospitalityfoundation.org/"
      },
    ]
  },
  {
    "name": "Harvest Crops",
    "value": 40,
    "type": "black",
    "level": "green",
    "male": 23,
    "female": 17,
    "img":  "http://www.sumbahospitalityfoundation.org/wp-content/uploads/2016/10/Farm.jpg",
    "children": [
      {
        "name": "Info About Sustainable and Organic Farm",
        "value": 23,
        "type": "grey",
        "level": "red",
        "male": 10,
        "female": 13,
      },
      {
        "name": "",
        "value": 23,
        "type": "grey",
        "level": "green",
        "male": 10,
        "female": 13,
        "link": "http://www.sumbahospitalityfoundation.org/"
      },
    ]
  },
  {
    "name": "Solar Panel",
    "value": 40,
    "type": "black",
    "level": "green",
    "male": 23,
    "female": 17,
    "img":  "http://www.sumbahospitalityfoundation.org/wp-content/uploads/2017/03/The-environment.jpg",
    "children": [
      {
        "name": "Info about Solar Energy Running SHF",
        "value": 23,
        "type": "grey",
        "level": "green",
        "male": 10,
        "female": 13,
      },
      {
        "name": "",
        "value": 23,
        "type": "grey",
        "level": "green",
        "male": 10,
        "female": 13,
        "link": "http://www.sumbahospitalityfoundation.org/"
      },
    ]
  }
]  
};

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 150, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var colorScale = d3.scaleLinear()
    .domain([0, 1])
		.range(['red', 'green']);
var widthScale = d3.scaleLinear()
		.domain([1,80])
		.range([1, 10]);

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#tree-container").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })

    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr("fill", "#fff")
      .attr("stroke-width", "3px")
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      })
  		.style("stroke", function(d){return colorScale(d.data.female/(d.data.female + d.data.male))});

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("font", "20px")
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { 
          if (d.data.name != null) {
            return d.data.name; 
          } 
        })
          .style("fill", function(d){return colorScale(d.data.female/(d.data.value))});
    
    nodeEnter.append("a")
    .attr("xlink:href", function(d) {
        if (d.data.link != null) {
            return d.data.link; 
          } 
    })
    .append("text")
    .attr("x", 15)
    .attr("y", 5)
    .style("fill", "black")
    .style("font-size", "18px")
    .text(function(d) { 
        if (d.data.link != null) {
          return "link"; 
        }
    })
          
    var images = nodeEnter.append("svg:image")
          .attr("class", "shf-image")
          .attr("xlink:href",  function(d) { 
            console.log(d.img);  
              return d.data.img;        
            })
          .attr("x", -50)
          .attr("y", -5)
          .attr("height", 100)
          .attr("width", 100)
          .attr("display", "block");

// var setEvents = images
//     .on( 'mouseenter', function() {
//         // select element in current context
//         d3.select( this )
//           .transition()
//           .attr("x", -125)
//           .attr("y", -125)
//           .attr("height", 250)
//           .attr("width", 250);
//       })
//       // set back
//       .on( 'mouseleave', function() {
//         d3.select( this )
//           .transition()
//           .attr("x", -50)
//           .attr("y", -5)
//           .attr("height", 100)
//           .attr("width", 100);
//       });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; })
  		.style('stroke-width', function(d){
        return widthScale(d.data.value)
      });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      })
  		.style('stroke-width', function(d){
        return widthScale(d.data.value)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
  		.style('stroke-width', function(d){
        return widthScale(d.data.value)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}