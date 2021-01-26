
function readData(){
    // select dropdown menu
    let dropdown = d3.select('#selDataset');
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
  
    // ******PIE************************************
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




      // *************BAR**************************
      d3.csv('../RawData/filtered-bar-plot-data.csv').then(data => {
        let ratingArray = []
        let nameArray = []
            // console.log(index.Rating)
            // if (index.Rating >= 0 && index.Rating <= 5.0) {
            //     rating.push(index.Rating)

        let array = data.filter(row => row.year === id);
        array.forEach(index => {
            ratingArray.push(index.rating)
        });
        // console.log(ratingArray)

        array.forEach(index => {
            nameArray.push(index.name)
        });
        // console.log(nameArray)

        array.forEach(index => {
            if (data.price > 20) {
                return above20Trace
            }
        });

        array.forEach(index => {
            if (data.price > 10 && data.price < 20) {
                return above10Trace
            }
        });

        array.forEach(index => {
            if (data.price < 10) {
                return below10Trace
            }
        });

        let bookRating = ratingArray
        let bookName = nameArray

        // slice first 10 values for bar chart
        let above20Trace = {
            x: bookRating.slice(0, 10).reverse(),
            y: bookName.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h',
            marker: {
<<<<<<< HEAD
                color: 'rgb(85,107,47)'
=======
                color: 'rgb(191, 63, 63)'
>>>>>>> refs/remotes/origin/main
            }
        };
        
        let above10Trace = {
            x: bookRating.slice(0, 10).reverse(),
            y: bookName.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h',
            marker: {
                color: 'rgb(191, 63, 127)'
            }
        };

        let below10Trace = {
            x: bookRating.slice(0, 10).reverse(),
            y: bookName.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h',
            marker: {
                color: 'rgb(63, 63, 191)'
            }
        };

        //create the data array for the bar plot
        let barData = [above20Trace, above10Trace, below10Trace];

        // create the plot layout
        let barLayout = {
            title: 'Top 10 Amazon Bestsellers',
            font: {
                family: "Raleway",
            },
            showlegend: true
        };

        Plotly.newPlot("bar", barData, barLayout);
})

};

