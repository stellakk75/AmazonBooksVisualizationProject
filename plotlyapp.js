function readData(){
    // select dropdown menu
    let dropdown = d3.select('#selDataset');

    // read in the booksellers.csv file
    d3.json("booksellers.csv").then(data => {
        data.Year.forEach(function(year) {
            dropdown.append("option").text(Year).property('value');
        });
    })
}

// Create bar chart
function buildPlots(value) {
    // select dropdown menu
    dropdown = d3.select('#selDataset')
    // assign value of change id to variable
    let id = dropdown.property("value")

    d3.json('booksellers.csv').then(data => {
        let level = data.booksellers;
        let array = level.filter(booksellersObj => booksellersObj.Reviews == Reviews);
        let result = array[0];
        let sample_values = result.sample_values;
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;

        //slice first 10 values for bar chart
        let barTrace = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(item => "OTU " + item).reverse(),
            type: "bar",
            orientation: 'h',
            text: otu_labels.slice(0, 10).reverse()
        };

        // Create the data array for the bar plot
        let barData = [barTrace];

        Plotly.newPlot("bar", barData);

        // Create bubble chart
        let bubbleTrace = {
            x: result.otu_ids,
            y: result.sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: result.otu_ids,
            },
            text: result.otu_labels,
            type: "bubble"
        };

        let bubbleData = [bubbleTrace];

        let bubbleLayout = {
            xaxis: {title: 'OTU ID'}
        }

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Display sample metadata
    let level2 = data.metadata;
    let array2 = level2.filter(sampleObj => sampleObj.id == id);
    let result2 = array2[0];

    let demographic = d3.select('#sample-metadata');

    demographic.html("");
    returnKeyValue = Object.entries(result2);
    console.log(returnKeyValue);
    // for each keyvalue in result2 array, append to demographic info
    returnKeyValue.forEach(d => {
        demographic.append('tr').text(d[0] + ': ' + d[1])
    });
    });
};

function start(){
    readData()

    d3.select('#selDataset').on('change', buildPlots)
}

start()