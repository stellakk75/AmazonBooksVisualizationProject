function readData(){
    // select dropdown menu
    let dropdown = d3.select('#selDataset');

    // read in the booksellers.csv file
    // let filepath = "../RawData/bestsellers.csv"

<<<<<<< HEAD
    // d3.csv(filepath).then(data => {

    //     data.forEach(function(year) {
    //         dropdown.append("option").text(year.Year).property('value');
    //     })
    // })
}
=======
        // years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
        // years.forEach(function(year) {
        //     dropdown.append("option").text(year).property('value');
        }
>>>>>>> 1301241721791d01197d80e0082bff8e9bdec2fa


function optionChanged(val) {
    console.log(val)
    buildPlots(val)
  };

function optionChanged(val) {
    console.log(val)
    buildPlots(val)
  }


<<<<<<< HEAD
  function buildPlots(val) {
=======
// Create bar chart 
function buildPlots(val) {
>>>>>>> 1301241721791d01197d80e0082bff8e9bdec2fa
    // select dropdown menu
    dropdown = d3.select('#selDataset')
    // assign value of change id to variable
    let id = dropdown.property("value")
<<<<<<< HEAD
    d3.csv('../RawData/filtered-bar-plot-data.csv').then(data => {
=======
    
    d3.csv('../RawData/filtered-bar-plot-data.csv').then(data => {
        
>>>>>>> 1301241721791d01197d80e0082bff8e9bdec2fa
        // let level = data.books;
        // console.log(array)
        let bookRating = []
            // console.log(index.Rating)
            // if (index.Rating >= 0 && index.Rating <= 5.0) {
            //     rating.push(index.Rating)
            let array = data.filter(row => row.year === id);
<<<<<<< HEAD
        array.forEach(index => {
            rating.push(array[index].rating)
        });
        // console.log(rating)
        // let bookRating = array[1].rating;
        // let bookName = array[1].name;
=======

        array.forEach(index => {
            // rating.push(array[index].rating)
            if (index.Rating >= 0 && index.Rating <= 5.0) {
                rating.push(index.Rating)
        }
        console.log(rating)
    }
        // let bookRating = array[1].rating;
        let bookName = array[1].name;

        
>>>>>>> 1301241721791d01197d80e0082bff8e9bdec2fa
        // // slice first 10 values for bar chart
        // let barTrace = {
        //     x: bookRating.slice(0, 10).reverse(),
        //     y: bookName.slice(0, 10).reverse(),
        //     type: "bar",
        //     orientation: 'h'
        // };
<<<<<<< HEAD
        // // Create the data array for the bar plot
        // let barData = [barTrace];
        // Plotly.newPlot("bar", barData);
})
}

function start() {
    readData()
    d3.select('#selDataset').on('change', buildPlots)
}
=======

        // // Create the data array for the bar plot
        // let barData = [barTrace];

        // Plotly.newPlot("bar", barData);
    });

function start() {
    readData()

    d3.select('#selDataset').on('change', buildPlots)
}

>>>>>>> 1301241721791d01197d80e0082bff8e9bdec2fa
start()