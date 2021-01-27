    // select dropdown menu
    let dropdown = d3.select('#selDataset');

    // read in the booksellers.csv file
    // replace with Pankaj's sql qry authors
    let filepath = "/authors"
 
    d3.json(filepath).then(data => {
        // console.log(data)
        data.forEach(item => {
            dropdown.append("option").text(item.Author).property('value');
        })

        //select dropdown menu 
        d3.select('#selDataset').on('change', buildBar)

        // assigns value of change id to variable 

    })
    
function buildBar(name){
    //select dropdown menu 
    dropDown = d3.select('#selDataset')
    // assigns value of change id to variable 
    let id = dropDown.property("value")
    // console.log(id)


    var svg = d3.select("body").append("svg")
	.attr("height", 960)
	.attr("width", 1000);

    

    var table = d3.select("#table-location")
        .append("table")
        .attr("class", "table table-condensed table-striped"),
        thead = table.append("thead"),
        tbody = table.append("tbody");


    //read file. then grab relevant data and create visualizations accordingly 
    d3.json('/author_books').then(item=>{
        // console.log(item)
 
        let data = item.filter(row => row.Author === id);
        // console.log(data)

        var columns = Object.keys(data[0])
		.filter(function(d){
			return ((d != "Author" ));
        });
        // console.log(columns)
        
        var header = thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
			.text(function(d){ return d;})
        // header.exit().remove()

        var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .on("mouseover", function(d){
            d3.select(this)
                .style("background-color", "orange");
        })
        .on("mouseout", function(d){
            d3.select(this)
                .style("background-color","transparent");
        });
        // rows.exit().remove()

    	var cells = rows.selectAll("td")
		.data(function(row){
			return columns.map(function(d, i){
				return {i: d, value: row[d]};
			});
		})
		.enter()
		.append("td")
		.html(function(d){ return d.value;});		
        
        // cells.exit().remove()
        // d3.select('#table-location').remove() 
    })

//rating gauge chart 
let filepath = "/avg_rating_by_author"
d3.json(filepath).then(index => {
    // console.log(index)

    let new_data = index.filter((row) => row.Author === id);
    // console.log(new_data.length)
    // console.log(new_data)
    // console.log(new_data[0].AverageRating)

    let bonus = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        type: "indicator",
        value: new_data[0].AverageRating,
        title: { text: "<b>Rating</b>" },
        gauge: {
          axis: { range: [null, 5] },
          steps: [
            { range: [0, 1] },
            { range: [1, 2] },
            { range: [2, 3] },
            { range: [3, 4] },
            { range: [4, 5] },
          ],
        },
        mode: "gauge+number",
      },
    ];

    // let layout = {
    //   autosize: true,
    //   width: 500,
    //   height: 500,
    //   margin:{
    //     l:50,
    //     r:50,
    //     b:100,
    //     t:100,
    //     pad:4
    //   }
    // }

    Plotly.newPlot("gauge", bonus);
  });
}
