
d3.json("/author_count").then(data=> {
console.log(data)   
  // set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
width = 950 - margin.left - margin.right,
height = 950 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

// title
svg.append('text')
    .attr("x", width/2)
    .attr("y", 20 )
    .style("text-anchor","middle")
    .style("font-size", "30px")
    .text("Number of Bestsellers Per Author")
 
 
  let list = []
  let size= []
    data.forEach(index => {

      list.push(index)
      size.push(index.Count)
    });
    console.log(list)
    console.log(size.toString(2))

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
    var layout = d3.layout.cloud()
      .size([width, height])
      .words(list.map(d=> { return {text: d.Author, size:d.Count}; }))
      .padding(5)        //space between words
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      // .fontSize(10)
      .fontSize(function(d) { return d.size*4; })
      // .fontSize(size.map(d=>{ return {size:d.Count}; }))      // font size of words
      .on("end", draw);
    layout.start();

    function draw(words) {
      svg
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", function(d) { return d.size; })
            .style("fill", "#69b3a2")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
})