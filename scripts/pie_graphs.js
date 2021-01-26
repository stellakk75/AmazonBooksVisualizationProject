
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

      // let labels = [ "Fiction", "Non Fiction" ];

      let pieTrace = [{
        type: "pie",
        values: counts,
        labels: [ "Fiction", "Non-Fiction" ],
        textinfo: "label+percent",
        // hoverinfo: 'label+percent'
        
      }]

      let pielayout = {
        title: `Fiction vs Non-fiction in ${id}`
      };
      
      Plotly.newPlot("pie", pieTrace, pielayout);
    }); 
  };



