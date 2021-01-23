function readData(){
    // select dropdown menu
    let dropdown = d3.select('#selDataset');

    // read in the booksellers.csv file
    let filepath = "../RawData/bestsellers.csv"

    d3.csv(filepath).then(data => {

        data.forEach(function(year) {
            dropdown.append("option").text(year.Year).property('value');
        })
    })
}


readData()






// Create bar chart 
function buildPlots(value) {
    // select dropdown menu
    dropdown = d3.select('#selDataset')
    // assign value of change id to variable
    let id = dropdown.property("value")
    
    d3.json('/RawData/new_books.json').then(data => {

        // console.log(data)
        
        let level = data.books;
        // console.log(level)
        // let array = filter(bestsellersObj => bestsellersObj.Year == value);
        // console.log(array)
        let price = []
        // for (var i = 0; i < books.Price.length; i++) {
        //     let price = books[i];
        // }
        level.forEach(index => {
            // console.log(index.Price)
            if (index.Year == 2009) {
                price.push(index.Price)
            }
            
            
        });
        console.log(price)
//         let names = books.otu_ids;
//         let otu_labels = result.otu_labels;
//         // slice first 10 values for bar chart
//         let barTrace = {
//             x: Price.slice(0, 10).reverse(),
//             y: Name.slice(0, 10).reverse(),
//             type: "bar",
//             orientation: 'h',
//             text: Author.slice(0, 10).reverse()
        // };
//         // Create the data array for the bar plot
//         let barData = [barTrace];
//         Plotly.newPlot("bar", barData);

//         // Create bubble chart
//         let bubbleTrace = {
//             x: result.otu_ids,
//             y: result.sample_values,
//             mode: 'markers',
//             marker: {
//                 size: sample_values,
//                 color: result.otu_ids,
//             },
//             text: result.otu_labels,
//             type: "bubble"
//         };
//         let bubbleData = [bubbleTrace];
//         let bubbleLayout = {
//             xaxis: {title: 'OTU ID'}
//         }
//         Plotly.newPlot("bubble", bubbleData, bubbleLayout);
//     // Display sample metadata
//     let level2 = data.metadata;
//     let array2 = level2.filter(sampleObj => sampleObj.id == id);
//     let result2 = array2[0];
//     let demographic = d3.select('#sample-metadata');
//     demographic.html("");
//     returnKeyValue = Object.entries(result2);
//     console.log(returnKeyValue);
//     // for each keyvalue in result2 array, append to demographic info
//     returnKeyValue.forEach(d => {
//         demographic.append('tr').text(d[0] + ': ' + d[1])
//     });
    });
};
// function start(){
//     readData()
//     d3.select('#selDataset').on('change', buildPlots)
// }
// start()

buildPlots("2016");