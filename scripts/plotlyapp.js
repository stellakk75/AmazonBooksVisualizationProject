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
};

  function buildPlots(val) {
    // select dropdown menu
    dropdown = d3.select('#selDataset')
    
    // assign value of change id to variable
    let id = dropdown.property("value")
    d3.csv('../RawData/filtered-bar-plot-data.csv').then(data => {
        // d3.json(http://127.0.0.1:5000/authors).then(data => {
    
        let ratingArray = []
        let nameArray = []
        let above20Array = []
        let above10Array = []
        let below10Array = []
        let array = data.filter(row => row.year === id);
            // console.log(index.Rating)
            // if (index.Rating >= 0 && index.Rating <= 5.0) {
            //     rating.push(index.Rating)

        array.forEach(index => {
            ratingArray.push(index.rating)
        });
        // console.log(ratingArray)

        array.forEach(index => {
            nameArray.push(index.name)
        });
        // console.log(nameArray)

        let bookRating = ratingArray
        let bookName = nameArray
        let barColor = ['red', 'red', 'red', 'red', 'purple', 'purple', 'purple', 'purple', 'blue', 'blue', 'blue']


        // slice first 10 values for bar chart
        let barTrace = {
            // x: bookRating.slice(0, 10).reverse(),
            x: [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0],
            y: bookName.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h',
            marker: {
                color: barColor
            }
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
                automargin: true
            }
        };

        Plotly.newPlot("bar", barData, barLayout);
})

}

function start() {
    readData()
    d3.select('#selDataset').on('change', buildPlots)
}
start()