function readData(){
    // select dropdown menu
    let dropdown = d3.select('#selDataset');

    // read in the booksellers.csv file
    let filepath = "../RawData/bestsellers.csv"

        // years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
        // years.forEach(function(year) {
        //     dropdown.append("option").text(year).property('value');
        }


readData()

function optionChanged(val) {
    console.log(val)
    buildPlots(val)
  }


// Create bar chart 
function buildPlots(val) {
    // select dropdown menu
    dropdown = d3.select('#selDataset')
    // assign value of change id to variable
    let id = dropdown.property("value")
    // console.log(id)
    
    d3.json('../RawData/new_books.json').then(data => {

        // console.log(data)
        
        let level = data.books;
        // console.log(level)
        let array = level.filter(bestsellersObj => bestsellersObj.id == id);
        // console.log(array)
        let rating = []
        level.forEach(index => {
            // console.log(index.Rating)
            if (index.Rating >= 0 && index.Rating <= 5.0) {
                rating.push(index.Rating)
            }
        });

        let bookRating = array.rating;
        let bookName = array.Name;
        console.log(array);

        
        // slice first 10 values for bar chart
        let barTrace = {
            x: bookRating.slice(0, 10).reverse(),
            y: bookName.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h'
        };

        // Create the data array for the bar plot
        let barData = [barTrace];

        Plotly.newPlot("bar", barData);
})};

function start() {
    readData()

    d3.select('#selDataset').on('change', buildPlots)
}

start()