function readData(){
    // select dropdown menu
    let dropdown = d3.select('#selDataset');
    // read in the booksellers.csv file
<<<<<<< HEAD
    // let filepath = "../RawData/bestsellers.csv"
    // d3.csv(filepath).then(data => {
    //     data.forEach(function(year) {
    //         dropdown.append("option").text(year.Year).property('value');
    //     })
    // })
}
=======
    let filepath = "../RawData/bestsellers.csv"

    d3.csv(filepath).then(data => {

        data.forEach(function(year) {
            dropdown.append("option").text(year.Year).property('value');
        })
    })
}


function optionChanged(val) {
    console.log(val)
    buildPlots(val)
  };

>>>>>>> d410fe82f3e38cd133bd4e80b604ebf336bf6fb1
function optionChanged(val) {
    console.log(val)
  };

<<<<<<< HEAD
  function buildPlots(val) {
=======

  function buildPlots(val) {

>>>>>>> d410fe82f3e38cd133bd4e80b604ebf336bf6fb1
    // select dropdown menu
    dropdown = d3.select('#selDataset')
    
    // assign value of change id to variable
    let id = dropdown.property("value")
    d3.csv('../RawData/filtered-bar-plot-data.csv').then(data => {
<<<<<<< HEAD
        let ratingArray = []
        let nameArray = []
=======
        // let level = data.books;
        // console.log(array)
        
>>>>>>> d410fe82f3e38cd133bd4e80b604ebf336bf6fb1
            // console.log(index.Rating)
            // if (index.Rating >= 0 && index.Rating <= 5.0) {
            //     rating.push(index.Rating)

<<<<<<< HEAD
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
                color: 'rgb(191, 63, 63)'
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

=======
        let array = data.filter(row => row.year === id);
            
            array.forEach(index => {

                let rating = []
            
                    rating.push(index.rating)

                    console.log(rating)
        });
        
        let bookRating = array[0].rating;
        let bookName = array[0].name;

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
})
>>>>>>> d410fe82f3e38cd133bd4e80b604ebf336bf6fb1
}

function start() {
    readData()
    d3.select('#selDataset').on('change', buildPlots)
}
start()