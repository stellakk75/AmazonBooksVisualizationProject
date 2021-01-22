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

// Append an SVG group with margins 
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//initial parameters
let chosenYAxis = "Price";


// Updates y-scale var based on y-axis label 
function yScale(data, chosenYAxis) {
  
  // create scales
  let yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d=> d[chosenYAxis]),d3.max(data, d=>d[chosenYAxis])
            ])
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

// function used for updating circles group 
function renderCircles(circleGroup, newYScale, chosenYAxis) {

  circleGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circleGroup;
}


// function used for updating circles group with new tooltip
function updateToolTip(chosenYAxis, circleGroup) {

  let label;

  if (chosenYAxis === "Price") {
    label = "Price";
  }
  else {
    label = "Rating";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.Name}<br>${label} ${d[chosenYAxis]}`);
    });

  circleGroup.call(toolTip);

  circleGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circleGroup;
}


// ***************************************

let parseTime = d3.timeParse('%Y')

// Import data
d3.csv("../new_books.csv").then(function(data, err){
  // console.log(data)
  if (err) throw err;

  // parse out data
  data.forEach(item =>{
    item.Year = +parseTime(item.Year);
    item.Price = +item.Price;
    item.Rating = +item.Rating;
  })

  // Create x scale function for time 
  let xScale = d3.scaleTime()
  .domain(d3.extent(data, d=>d.Year))
  .range([0,width])

  // Create y scale function calling yScale function
  let yLinearScale = yScale(data, chosenYAxis)


  // Create initial axis functions
  let bottomAxis = d3.axisBottom(xScale)
  let leftAxis = d3.axisLeft(yLinearScale)


  //add axes to chart
  chartGroup.append('g').attr('transform',`translate(0,${height})`).call(bottomAxis)
  let yAxis = chartGroup.append('g').classed("y-axis", true).call(leftAxis)


  //create intial circles
  let circleGroup = chartGroup.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx',d=>xScale(d.Year))
  .attr('cy',d=>yLinearScale(d[chosenYAxis]))
  .attr('r','5')
  .attr('opacity','.8')
  .attr('fill', 'steelblue')


// group for two y-axis labels
let labelGroup = chartGroup.append('g')


// Create axes labels
let priceLabel = chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 1.5))
  .attr("dy", "1em")
  .attr("class", "axisText")  
  .attr("value","Price")
  .classed("active",true)
  .text("Price");

let ratingLabel = chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 20)
  .attr("x", 0 - (height / 1.5))
  .attr("dy", "1em")
  .attr("class", "axisText")  
  .attr("value","Rating")
  .classed("inactive",true)
  .text("Rating");

  //append x axis 
chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .classed("axis-text", true)
  .text("Years");


// giving error since circleGroup is already defined 
  // var circleGroup = updateToolTip(chosenYAxis, circleGroup);


// y axis labels event listener
  labelGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      console.log(value)


      if (value !== chosenYAxis) {

        // replaces chosenYAxis with value
        chosenYAxis = value;

        console.log(chosenYAxis)

        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = yScale(data, chosenYAxis);

        // updates y axis with transition
        yAxis = renderAxes(yLinearScale, yAxis);

        // updates circles with new y values
        circleGroup = renderCircles(circleGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circleGroup = updateToolTip(chosenYAxis, circleGroup);

        // changes classes to change bold text
        if (chosenYAxis === "Rating") {
          ratingLabel
            .classed("active", true)
            .classed("inactive", false);
          priceLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          ratingLabel
            .classed("active", false)
            .classed("inactive", true);
          priceLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
}).catch(function(error) {
  console.log(error);
});
