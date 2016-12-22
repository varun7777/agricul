  var margin = {top:20, right: 20, bottom: 630, left: 60},
  width = 2000 - margin.right - margin.left,
  height = 1000 - margin.top - margin.bottom;

  var svg=d3.select('body')
  .append('svg')
  .attr({
    "width" : width + margin.right + margin.left,
    "height": height + margin.top + margin.bottom
  })
  .append('g')
  .attr("transform", "translate(" + margin.left + ',' + margin.top + ')');

  

  var xScale = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.1 , 0.1);

  var yScale = d3.scale.linear()
  .range([height, 0]);


  var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");
  
  d3.json("JSON/foodgraining.json", function(error, data) {
    if(error) console.log("Error: data not loaded");

    data.forEach(function(d){
      d["3-2013"]= +d["3-2013"];
      d.Particulars=d.Particulars;
      console.log(d["3-2013"]);
    });
    
    data.sort(function(a,b) {
      return b["3-2013"] - a["3-2013"];

    });

    

    xScale.domain(data.map(function(d) { return d.Particulars; }));
    yScale.domain([0, d3.max(data, function(d) { return d["3-2013"]; })]);

    
    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')

    .attr({
      "x": function(d) { return xScale(d.Particulars); },
      "y": function(d) { return yScale(d["3-2013"]); },
      "width": xScale.rangeBand(),
      "height": function(d) { return height - yScale(d["3-2013"]);}
    })
    .style("fill",function(d,i){return 'green' });

    svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d){return d["3-2013"]; })
    .attr('x',function(d) {return xScale(d.Particulars)+xScale.rangeBand()/2;})
    .attr('y',function(d) {return yScale(d["3-2013"])+15; })
    .style("fill","gainsboro")
    .style("font-size","12px")
    .style("text-anchor","middle")
    .style("text-align","top")

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll('text')
    .attr("transform", "rotate(-60)")
    .attr("dx","-.8em")
    .attr("dy", ".25em")
    .style("text-anchor","end")
    .style("font-size","14px");
    

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .style("font-size","14px");


  });


