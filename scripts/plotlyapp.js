function readData(){
    // select dropdown menu
    let dropdown = d3.select('#selDataset');

    // read in the booksellers.csv file
    // let filepath = "../RawData/bestsellers.csv"

    // d3.csv(filepath).then(data => {

    //     data.forEach(function(year) {
    //         dropdown.append("option").text(year.Year).property('value');
    //     })
    // })
}


function optionChanged(val) {
    console.log(val)
    buildPlots(val)
  };




  function buildPlots(val) {
    // select dropdown menu
    dropdown = d3.select('#selDataset')
    // assign value of change id to variable
    let id = dropdown.property("value")
    d3.csv('../RawData/filtered-bar-plot-data.csv').then(data => {
        // let level = data.books;
        // console.log(array)
        let bookRating = []
            // console.log(index.Rating)
            // if (index.Rating >= 0 && index.Rating <= 5.0) {
            //     rating.push(index.Rating)
            let array = data.filter(row => row.year === id);
        array.forEach(index => {
            rating.push(array[index].rating)
        });
        // console.log(rating)
        // let bookRating = array[1].rating;
        // let bookName = array[1].name;
        // // slice first 10 values for bar chart
        // let barTrace = {
        //     x: bookRating.slice(0, 10).reverse(),
        //     y: bookName.slice(0, 10).reverse(),
        //     type: "bar",
        //     orientation: 'h'
        // };
        // // Create the data array for the bar plot
        // let barData = [barTrace];
        // Plotly.newPlot("bar", barData);
})
}

function start() {
    readData()
    d3.select('#selDataset').on('change', buildPlots)
}
start()