
function readData(){
  // select dropdown menu
  let dropdown = d3.select('#selDataset');

  // read in the booksellers.csv file
  let filepath = "../RawData/genre.csv"

  d3.csv(filepath).then(data => {
      data.forEach(function(year) {
          dropdown.append("option").text(year.Year).property('value');

      })
  })
}

function optionChanged(val) {
  // console.log(val)
  buildPlots(val)
}

function buildPlots() {

  // select dropdown menu
  dropdown = d3.select('#selDataset')

  // assign value of change id to variable
  let id = dropdown.property("value")

  // grabing the genre count from the csv file 
  d3.csv('../RawData/genre.csv').then(data => {
   
    // Grabing the data for selected year
    let array = data.filter(row => row.year === id);
    counts = [];
      array.forEach(index => {
        
       // Define genre variable and grab the count of each genre
       index.count = parseInt(index.count)
       counts.push(index.count);

      //  counts = parseInt(counts);

          // if (genre == "Fiction") {
          
          //   let countfinction = parseInt(index.count);
          //   console.log(countfinction);
          // }
          // else {countNonfiction = index.count;}

      })
      
      // let values = counts;
      console.log(counts);

      let labels = [ "Fiction", "Non Fiction"];

      let pieTrace = [{
        type: "pie",
        values: counts,
        lables: labels,
        textinfo: "label+percent",
        // hoverinfo: 'label+percent'
        
      }]

      let pielayout = [{
        title: `Non fiction vs Fiction`
      }];
      
      Plotly.newPlot("pie", pieTrace, pielayout);
    }); 
  };




// // set the dimensions and margins of the graph
// var width = 450
//     height = 450
//     margin = 40

// // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
// var radius = Math.min(width, height) / 2 - margin

// // append the svg object to the div called 'my_dataviz'
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//   .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// // create 2 data_set
// var data1 = {a: 9, b: 20, c:30, d:8, e:12}
// var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}

// // set the color scale
// var color = d3.scaleOrdinal()
//   .domain(["a", "b", "c", "d", "e", "f"])
//   .range(d3.schemeDark2);

// // A function that create / update the plot for a given variable:
// function update(data) {

//   // Compute the position of each group on the pie:
//   var pie = d3.pie()
//     .value(function(d) {return d.value; })
//     .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
//   var data_ready = pie(d3.entries(data))

//   // map to data
//   var u = svg.selectAll("path")
//     .data(data_ready)

//   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
//   u
//     .enter()
//     .append('path')
//     .merge(u)
//     .transition()
//     .duration(1000)
//     .attr('d', d3.arc()
//       .innerRadius(0)
//       .outerRadius(radius)
//     )
//     .attr('fill', function(d){ return(color(d.data.key)) })
//     .attr("stroke", "white")
//     .style("stroke-width", "2px")
//     .style("opacity", 1)

//   // remove the group that is not present anymore
//   u
//     .exit()
//     .remove()

// }


