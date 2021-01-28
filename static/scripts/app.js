var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 60,
  right: 40,
  bottom: 80,
  left: 100,
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)



// Append an SVG group
var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)


//initial parameters
// let chosenYAxis = "AvgRating"
let chosenYAxis = "AvgPrice";

//function to update y-scale when chosen y axis changes
function yScale(data, chosenYAxis) {
  // create scales
  let yLinearScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[chosenYAxis]))
    .range([height, 0]);

  return yLinearScale;
}

// function used for updating yAxis var upon click on axis label
function renderAxes(newYScale, yAxis) {
  let leftAxis = d3.axisLeft(newYScale);

  yAxis.transition().duration(1000).call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
function renderCircles(circlesGroup, newYScale, chosenYAxis) {
  circlesGroup
    .transition()
    .duration(1000)
    .attr("cy", (d) => newYScale(d[chosenYAxis]));

  return circlesGroup;
}

// function to update line with transition
function renderLine(lineGroup, xScale, newYScale, chosenYAxis) {
  console.log("working");

  lineGroup
    .transition()
    .duration(1000)
    .attr(
      "d",
      d3
        .line()
        .curve(d3.curveBasis)
        .x((d) => xScale(d.Year))
        .y((d) => newYScale(d[chosenYAxis]))
    );

  return lineGroup;
}

// function updateToolTip(chosenYAxis, circlesGroup) {
//   let toolTip = d3.select("body").append("div").attr("class", "tooltip");
//   let formatTime = d3.timeFormat("%Y");
//   var label;
//   if (chosenYAxis === "AvgPrice") {
//     label = "Average Prices: $";
//   } else {
//     label = "Average Ratings: ";
//   }
//   console.log(chosenYAxis)
//   circlesGroup
//     .on("mouseover", function (event, d) {
//       toolTip.style("display", "block");
//       toolTip
//         .html('hello')
//         // .html(`<h6>${formatTime(d.Year)}</h6>${label}${d[chosenYAxis]}`)
//         .style("left", event.pageX + "px")
//         .style("top", event.pageY + "px");
//     })

//     // Step 3: Add an onmouseout event to make the tooltip invisible
//     .on("mouseout", function () {
//       toolTip.style("display", "none");
//     });

//   return circlesGroup;
// }

// ***************************************

let parseTime = d3.timeParse("%Y");

// Import data
const url = "/avg_rating_price";

d3.json(url).then((data) => {
  console.log(data);

  // parse out data
  data.forEach((item) => {
    item.Year = parseTime(item.Year);
    // item.Price = +item.Price;
    // item.Rating = +item.Rating;
  });

  // Create scale function
  let xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.Year))
    .range([0, width]);

  let yLinearScale = yScale(data, chosenYAxis);

  //create initial axis functions
  let bottomAxis = d3.axisBottom(xScale);
  let leftAxis = d3.axisLeft(yLinearScale);

  //title 
  svg.append('text')
  .attr("x", width/1.5)
  .attr("y", 25 )
  .style("text-anchor","middle")
  .style("font-size", "30px")
  .text("Interactive Trendline Analysis from 2009-2019")

  //add axes to chart
  chartGroup
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(bottomAxis);
  let yAxis = chartGroup.append("g").classed("y-axis", true).call(leftAxis);

  //create circles
  let circlesGroup = chartGroup
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yLinearScale(d[chosenYAxis]))
    .attr("r", "5")
    .attr("opacity", ".8")
    .attr("fill", "steelblue");

  let lineGroup = chartGroup
    .append("path")
    .data([data])
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr(
      "d",
      d3
        .line()
        .curve(d3.curveBasis)
        .x((d) => xScale(d.Year))
        .y((d) => yLinearScale(d[chosenYAxis]))
    );

  // Create axes labels
  let priceLabel = chartGroup
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("value", "AvgPrice")
    .classed("active", true)
    .text("Book Prices ($)");

  let ratingLabel = chartGroup
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("value", "AvgRating")
    .classed("inactive", true)
    .text("Rating");

  chartGroup
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top -10})`)
    .attr("class", "axisText")
    .text("Years");

  // let toolTip = d3.select("body").append("div").attr("class", "tooltip");
  let formatTime = d3.timeFormat("%Y");

  var label;
  if (chosenYAxis === "AvgPrice") {
    label = "Average Prices: $";
  } else {
    label = "Average Ratings: ";
  }
  
  // console.log(data)
  // console.log(data[0].AvgRating)
 

  // function listloop(list){
  //   let value_array = []
  //   for (var i=0; i<list.length; i++){
  //     let value = list[i].AvgPrice
  //     value_array.push(value)
  //     console.log(value_array)
  //   }
  // }
  // function listloop2(list){
  //   let value_array = []
  //   for (var i=0; i<list.length; i++){
  //     let value = list[i].AvgRating
  //     value_array.push(value)
  //     console.log(value_array)
  //   }
  // }

  // listloop(data) //chooses this function if YAxis is avg price
  // listloop2(data) //chooses this function if YAxis is avg rating

  // console.log(formatTime(data[0].Year))

  // circlesGroup
  //   .on("mouseover", function (event, d) {
  //     toolTip.style("display", "block");
  //     toolTip
  //       .html(`<h6>${formatTime(d.Year)}</h6>${label}${d[chosenYAxis]}`)
  //       // .html(`<h6>${formatTime(d.Year)}</h6>${label}${d[chosenYAxis]}`)
  //       .style("left", event.pageX + "px")
  //       .style("top", event.pageY + "px");
  //   })
  //   // Step 3: Add an onmouseout event to make the tooltip invisible
  //   .on("mouseout", function () {
  //     toolTip.style("display", "none");
  //   });

  //y axis labels event listener
  chartGroup.selectAll("text").on("click", function () {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {
      // replaces chosenYAxis with value
      chosenYAxis = value;

      console.log(chosenYAxis);

      // functions here found above csv import
      // updates x scale for new data
      yLinearScale = yScale(data, chosenYAxis);

      // updates x axis with transition
      yAxis = renderAxes(yLinearScale, yAxis);

      // updates circles with new x values
      circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

      //update lines
      lineGroup = renderLine(lineGroup, xScale, yLinearScale, chosenYAxis);

      // updates tooltips with new info
      // circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenYAxis === "AvgRating") {
        ratingLabel.classed("active", true).classed("inactive", false);
        priceLabel.classed("active", false).classed("inactive", true);
      } else {
        ratingLabel.classed("active", false).classed("inactive", true);
        priceLabel.classed("active", true).classed("inactive", false);
      }
    }
  });
});
