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
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//initial parameters
let chosenYAxis = "Price"


//function to update y-scale var when clicked on
function yScale(data, chosenYAxis) {
  
  // create scales

  let yLinearScale = d3.scaleLinear()
  .domain([0,d3.max(data, d=>d[chosenYAxis])])
  .range([height,0])
    
  return yLinearScale;

}


// function used for updating yAxis var upon click on axis label
function renderAxes(newYScale, yAxis) {
  let leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}


// function used for updating circles group with new tooltip
function updateToolTip(chosenYAxis, circlesGroup) {

  var label;

  if (chosenYAxis === "Price") {
    label = "Price:";
  }
  else {
    label = "Reviews";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.Price}<br>${label} ${d[chosenYAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}


// ***************************************

let parseTime = d3.timeParse('%Y')

// Import data
d3.csv("../bestsellers.csv").then(function(data){
  // console.log(data)

  // parse out data
  data.forEach(item =>{
    item.Year = parseTime(item.Year);
    item.Price = +item.Price;
    item.Reviews = +item.Reviews;
  })

  // Create scale function
  let xScale = d3.scaleTime()
  .domain(d3.extent(data, d=>d.Year))
  .range([0,width])

  let yLinearScale = yScale(data, chosenYAxis)

  //create initial axis functions
  let bottomAxis = d3.axisBottom(xScale)
  let leftAxis = d3.axisLeft(yLinearScale)


  //add axes to chart
  chartGroup.append('g').attr('transform',`translate(0,${height})`).call(bottomAxis)
  let yAxis = chartGroup.append('g').classed("y-axis", true).call(leftAxis)


//create circles
let circleGroup = chartGroup.selectAll('circle')
.data(data)
.enter()
.append('circle')
.attr('cx',d=>xScale(d.Year))
.attr('cy',d=>yLinearScale(d[chosenYAxis]))
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

// group for 2 y-axis labels
let labelGroup = chartGroup.append('g')
.attr("transform", `translate(${width / 2}, ${height + 20})`);


// Create axes labels
let priceLabel = chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 1.5))
  .attr("dy", "1em")
  .attr("class", "axisText")  
  .attr("value","Price")
  .classed("active",true)
  .text("Book Prices");

let reviewLabel = chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 20)
  .attr("x", 0 - (height / 1.5))
  .attr("dy", "1em")
  .attr("class", "axisText")  
  .attr("value","Reviews")
  .classed("inactive",true)
  .text("Reviews");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Years");



//y axis labels event listener


  labelGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenYAxis with value
        chosenYAxis = value;

        console.log(chosenYAxis)

        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = yScale(data, chosenYAxis);

        // updates x axis with transition
        yAxis = renderAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "Reviews") {
          reviewLabel
            .classed("active", true)
            .classed("inactive", false);
          priceLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          reviewLabel
            .classed("active", false)
            .classed("inactive", true);
          priceLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    })
})