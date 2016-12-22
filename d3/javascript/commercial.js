  var margin = {top: 20, right: 20, bottom: 630, left: 60},
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
  
  d3.json("JSON/Commercial.json", function(error, data) {
    if(error) console.log("Error: data not loaded");

    data.forEach(function(d){
      d["Aggregated value of all Commercial crops (Ton mn)"]= +d["Aggregated value of all Commercial crops (Ton mn)"];
      d.Year=d.Year;
      console.log(d["Aggregated value of all Commercial crops (Ton mn)"]);
    });
    
    data.sort(function(a,b) {
      return b["Aggregated value of all Commercial crops (Ton mn)"] - a["Aggregated value of all Commercial crops (Ton mn)"];

    });

    

    xScale.domain(data.map(function(d) { return d.Year; }));
    yScale.domain([0, d3.max(data, function(d) { return d["Aggregated value of all Commercial crops (Ton mn)"]; })]);

    
    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr({
      "x": function(d) { return xScale(d.Year); },
      "y": function(d) { return yScale(d["Aggregated value of all Commercial crops (Ton mn)"]); },
      "width": xScale.rangeBand(),
      "height": function(d) { return height - yScale(d["Aggregated value of all Commercial crops (Ton mn)"]);}
    })
    .style("fill",function(d,i){return 'red' });

    svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d){return d["Aggregated value of all Commercial crops (Ton mn)"]; })
    .attr('x',function(d) {return xScale(d.Year)+xScale.rangeBand()/2;})
    .attr('y',function(d) {return yScale(d["Aggregated value of all Commercial crops (Ton mn)"])+15; })
    .style("fill","black")
    .style("font-size","12px")
    .style("text-anchor","top")
    .style("text-anchor","middle");




    
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll('text')
    .attr("transform", "rotate(-60)")
    .attr("dx","-1.7em")
    .attr("dy", "1.2em")
    .style("text-anchor","end")
    .style("font-size","20px");
    

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .style("font-size","20px");


  });