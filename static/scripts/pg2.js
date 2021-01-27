
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
    d3.json('/genre_count').then(data => {

      let array = data.filter((item) => item.Year == id);
      // console.log(array)
      // console.log(array[0].Count)
      // console.log(array[1].Count)   
      let first = array[0].Count
      let second = array[1].Count

      let count = []
        count.push(first)
        count.push(second)

        // console.log(count)

        let pieTrace = [{
          type: "pie",
          values: count,
          labels: [ "Fiction", "Non-Fiction" ],
          textinfo: "label+percent",
          // hoverinfo: 'label+percent'   
        }]
  
        let pielayout = {
          title: `Fiction vs Non-fiction in ${id}`
        };
        
        Plotly.newPlot("pie", pieTrace, pielayout);
      }); 
// BAR CHART***********************************************
      d3.json('/year_bar').then(data => {
 
        let array = data.filter((item) => item.Year == id);
        console.log(array)
            
        let ratingArray = []
        let nameArray = []
        let priceArray = []
        array.forEach(index => {
            ratingArray.push(index.Rating)
        });
        console.log(ratingArray)
        array.forEach(index => {
            nameArray.push(index.Name)
        });
        // console.log(nameArray)
        array.forEach(index => {
            priceArray.push(index.Price)
        });
        console.log(priceArray)
        let bookRating = ratingArray
        let bookName = nameArray
        let bookPrice = priceArray
        // slice first 10 values for bar chart
        let barTrace = {
            x: bookRating.slice(0, 10).reverse(),
            y: bookName.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h',
            marker: {
                color: 'blue'
            },
            text: bookPrice.slice(0, 10).reverse()
        };
        //create the data array for the bar plot
        let barData = [barTrace];
        // create the plot layout
        let barLayout = {
            title: 'Top 10 Amazon Bestsellers',
            font: {
                family: "Raleway",
            },
            showlegend: false,
            yaxis: {
                automargin: true,
                title: 'Book Titles'
            },
            xaxis: {
                title: 'Book Ratings'
            }
        };
        Plotly.newPlot("bar", barData, barLayout);
      })

};

