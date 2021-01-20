// D3 animated scatter plot placeholder
// consider using averages per year 

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("fill", 'white')

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

let parseTime = d3.timeParse('%Y')

// Import data
d3.csv("../bestsellers.csv").then(function(data){
  console.log(data)
  // parse out data
  data.forEach(item =>{
    item.Year = parseTime(item.Year);
    item.Price = +item.Price;
  })

  // Create scale function
  let xScale = d3.scaleTime()
  .domain(d3.extent(data, d=>d.Year))
  .range([0,width])

  let yLinearScale = d3.scaleLinear()
  .domain([0,d3.max(data, d=>d.Price)])
  .range([height,0])

  //create axis functions
  let bottomAxis = d3.axisBottom(xScale)
  let leftAxis = d3.axisLeft(yLinearScale)

  //add axes to chart
  chartGroup.append('g').attr('transform',`translate(0,${height})`).call(bottomAxis)
  chartGroup.append('g').call(leftAxis)


//create circles
let circleGroup = chartGroup.selectAll('circle')
.data(data)
.enter()
.append('circle')
.attr('cx',d=>xScale(d.Year))
.attr('cy',d=>yLinearScale(d.Price))
.attr('r','15')
.attr('opacity','.8')
.attr('fill', 'steelblue')

// //create labels of state abbr within circle 
// chartGroup.append("g")
//   .selectAll("text")
//   .data(data)
//   .enter()
//   .append("text")
//   .text(d=>d.abbr)
//   .attr("x",d=>xLinearScale(d.poverty))
//   .attr("y",d=>yLinearScale(d.healthcare))
//   .attr('font-size','10')
//   .attr('fill','white')
//   .attr("text-anchor", "middle")
//   .attr('font-weight',1000)


// Create axes labels
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 1.5))
  .attr("dy", "1em")
  .attr("class", "axisText")  
  .text("Book Prices");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Years");
})



