// Create a function to create a pie chart 
function buildPie() {

    d3.csv('../RawData/new_books.csv').then(data => {
    
    // Define genre 
    let genre = data.Genre;

    // Count the number of finction and nonfiction 
      function countGenre(genre) {
       
        let nonfiction = 0;
        let fiction = 0;

        for (let i = 0; i < genre.length; i++) {

            if (genre[i] == "Fiction") {
                fiction++;
            } else { nonfiction++; }

        }
    
        return genre;
      } 

//     // Create a pie chart
//     let pieData = [{
//     type: "pie",
//     values: [nonfinction, fiction],
//     lables: ["Non Fiction", "Fiction"],
//     textinfo: "lable+percent",
//     insidetextorientation: "radial"}]

//     // Create a layout for the pie chart
//     let pielayout = [{
//     height: 700,
//     width: 700,
//     title: "Fiction vs Non Fiction"}];


// Plotly.newPlot("pie", pieData, pielayout);

});

};





buildPie()
