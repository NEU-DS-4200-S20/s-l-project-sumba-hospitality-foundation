
/**
 * scrollVis
 */
var scrollVis = function () {
  // constants to define the size and margins of the vis area.
  var width = window.innerWidth * .85;
  var height = window.innerHeight * .85;
  var margin = { top: 0, left: 75, bottom: 40, right: 10 };

  // Keep track of which visualization we are on and which was the last
  // index activated. When user scrolls quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used for displaying visualizations
  var g = null;

  // functions
  let xScale = d3.scaleLinear();
  let yScale = d3.scaleLinear();

  var y = d3.scaleBand()
    .range([height, margin.bottom])
    .padding(0.1);
  var x = d3.scaleLinear()
    .range([0, width * .65]);


  

  // When scrolling to a new section the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function then it is called while scrolling
  // through the section with the current progress through the section.
  var updateFunctions = [];

  /**
   * chart
   *
   * @param selection - the current d3 selection to draw the visualization in
   */
  var chart = function (selection) {
    selection.each(function (countries) {
      console.log(countries)
      svg = d3.select(this).selectAll('svg').data([countries]);
      var svgE = svg.enter().append('svg');
      svg = svg.merge(svgE);

      svg.attr('width', width + margin.left + margin.right);
      svg.attr('height', height + margin.top + margin.bottom);
      svg.append('g')

      // this group element will be used to contain all other elements.
      g = svg.select('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      xScale
        .domain([
        d3.min(countries, function(d) { return d.gdp }),
        d3.max(countries, function(d) { return d.gdp })
        ])
        .range([margin.left, width - margin.right - 400]);
      
      yScale
        .domain([
          d3.min(countries, function(d) { return d.province }),
          d3.max(countries, function(d) { return d.province })
        ])
        .range([height - margin.bottom, margin.top]);

      setupVis(countries);
      setupSections();
      });
    };

  /**
   * setupVis - creates initial elements for all sections of the visualization.
   *
   * @param data - data object for vis
   */
  var setupVis = function (countries) {

    // Scale the range of the data in the domains
    y.domain(countries.map(function(d) { return d.province; }));
    x.domain([0, d3.max(countries, function(d) { return +d.gdp; })]);

    // flags
    g.append('g')
    g.selectAll('.image')
      .data(countries)
      .enter().append('image')
      .attr("xlink:href", function(d) { return '/s-l-project-sumba-hospitality-foundation/SHF_INDO' + d.flag; } )
      //.attr("x", function(d) { return margin.left + 7; })
      .attr("x", function(d) { return margin.left + x(d.gdp) + 7; })
      .attr("y", function(d) { return height - y(d.province); })
      .attr("width", 25)
      .attr("height", y.bandwidth())

    // // animate
    // g.selectAll('image')
    //   .transition()
    //   .duration(2500)
    //   .attr("x", function(d) { return margin.left + x(d.gdp) + 7; })
    //   .delay(function(d,i){ return(i*50)});

    // bars on chart
    
    //svg_chart.selectAll(".bar")
    g.selectAll('.bar')
      .data(countries)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return margin.left; })
      .attr("y", function(d) { 
        return height - y(d.province); })
      .attr("height", y.bandwidth())
      .attr("width", function(d) { 
        return x(d.gdp); })
      .attr("fill", "#58508d")
      .on('mouseover', function(d) {
        let province = d3.select(this);
        province.attr("fill", "#ffa600");
      })
      .on('mouseout', function(d) {
        let province = d3.select(this);
        province.attr("fill", "#58508d")
      });

    // animate
    //svg_chart.selectAll("rect")
    // g.selectAll("rect")
    //   .data(countries)
    //   .transition()
    //   .duration(2500)
    //   .attr("width", function(countries) { 
    //     return x(countries.gdp); })
    //   .delay(function(d,i){ return(i*50)});


    // country names
    //svg_chart.selectAll("g")
    g.selectAll('text')
      .data(countries)
      .enter().append("text")
      .attr("class", "country-names")
      .attr("x", margin.left - 5)
      .attr("y", function(d) { return height - y(d.province) + 12; })
      .attr("font-family", "sans-serif")
      .attr("font-size", y.bandwidth() - 3)
      .attr("fill", "black")
      .attr("text-anchor", "end")
      .text( function(d) { return d.province; })

  };

  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  var setupSections = function () {
    // activateFunctions are called each time the active section changes
    activateFunctions[0] = showGraph;
    activateFunctions[1] = showJakarta;
    activateFunctions[2] = showIndonesia;
    activateFunctions[3] = showSumba;
    activateFunctions[4] = showMap;

    // updateFunctions are called while in a particular section to update
    // the scroll progress in that section.
    // no-op functions.
    for (var i = 0; i < 5; i++) {
      updateFunctions[i] = function () {};
    }
  };
    /**
     * ACTIVATE FUNCTIONS
     *
     * These will be called their
     * section is scrolled to.
     *
     * General pattern is to ensure
     * all content for the current section
     * is transitioned in, while hiding
     * the content for the previous section
     * as well as the next section (as the
     * user may be scrolling up or down).
     *
    */
  let fillFunction = function(d, province) {
    console.log(province)
    if (d.province === province) {
      return "#ff6361"
    }
    else {
      return "#58508d"
    }
  }

  function showGraph() {
    g.selectAll('.bar')
      .transition()
      .duration(0)
      .attr('fill', "#58508d")
      .attr('opacity', 100);
  }
  function showJakarta() {
   // let fillFunction = 
    g.selectAll('.bar')
      .attr('fill', function(d) {
        if (d.province === "Jakarta") {
          return "#ff6361"
        }
        else {
          return "#58508d"
        }
      })
      .attr('opacity', function(d) {
        if (d.province === 'Jakarta') { 
          return 1; 
        }
        else { 
          return .5; 
        }
      });
  }
  function showIndonesia() {
    g.selectAll('.bar')
    .attr('fill', function(d) {
      if (d.province === "Indonesia") {
        return "#ff6361"
      }
      else {
        return "#58508d"
      }
    })
    .attr('opacity', function(d) {
      if (d.province === 'Indonesia') { 
        return 1; 
      }
      else { 
        return .5; 
      }
    });  
  }
  function showSumba() {
    g.selectAll('.bar')
    .attr('fill', function(d) {
      if (d.province === "West Nusa Tenggara") {
        return "#ff6361"
      }
      else {
        return "#58508d"
      }
    })
    .attr('opacity', function(d) {
      if (d.province === 'West Nusa Tenggara') { 
        return 1; 
      }
      else { 
        return .5; 
      }
    });
  }

  function showMap() {
    g.selectAll('.bar')
    .attr('fill',"#58508d")
    .attr('opacity', 1);
  }


  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };


  // return chart function
  return chart;
};


/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(data) {
  console.log(data)
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select('#vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}

// load data and display
d3.csv('data/indo-economy.csv', display);


   


