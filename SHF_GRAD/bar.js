var width = 400;
var height = 300;

var svg = d3
    .select("#bar-container")
    .append("svg")
    .attr("width", width + 200)
    .attr("height", height + 200);

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Average Income of SHF Graduates")

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 0)
       .attr("y", 440)
       .attr("font-size", "12px")
       .text("*RP is currency of Indonesia");

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

       d3.csv("bar-data.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
     //   g.transition().duration(1000).call(d3.axisLeft(yScale));

     g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 270)
         .attr("x", width + 40)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Graduation Year");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
            return d3.format(',')(d) + "RP";
         })
         .ticks(10))
         .append("text")
         .attr("transform", "translate(0," + height + ")")
         .attr("y", height - 610)
         .attr("x", width - 400)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Average Income(RP*)");

      g.append('g')
         .attr('class', 'grid')
         .call(d3.axisLeft()
         .scale(yScale)
         .tickSize(-width, 0, 0)
         .tickFormat(''))
         .attr('opacity', 0.2)

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.year); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.value); })
         .attr('opacity', 0.6)
         .attr("fill", 'orange')
         .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.year) - 5)
          .attr('width', xScale.bandwidth() + 10)
      //  text.style("display", null)

        })
        .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)
     //   text.style("display", "none")

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.year))
          .attr('width', xScale.bandwidth())
        });

    //     var text = g.selectAll(".text")  		
	//   .data(data)
	//   .enter()
	//   .append("text")
	//   .attr("class","label")
	//   .attr("x", (function(d) { return xScale(d.year); }  ))
	//   .attr("y", function(d) { return 150; })
    //   .attr("dy", ".75em")
    //   .attr("text-anchor", "left")
    //   .style("display", "none")
    //   .text(function(d) { return d3.format(',')(d.value) + "RP"; })



    });
