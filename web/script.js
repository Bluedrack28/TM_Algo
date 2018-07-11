var ctx = document.getElementById('myChart').getContext('2d');
let datasJSON = []
/*
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});
*/
function update(files){
    datasJSON = []
    var reader = new FileReader();
    function setup_reader(file) {
        var name = file.name;
        var reader = new FileReader();
        reader.onload = function(e) {
            var bin = e.target.result; //get file content

            // do sth with text
            datasJSON.push(JSON.parse(bin))
        }
        reader.readAsText(file);

    }
    for (var i = 0; i < files.length; i++) { setup_reader(files[i]); }
    
    console.log(datasJSON)
    
}

function makeChart(){
    if(datasJSON.length > 0){
        let chartData = {}
        chartData.labels = []
        chartData.datasets = []

        datasJSON.forEach((run, index) => {
            run.history.forEach((element,i) => {
                if(i > chartData.labels.length) chartData.labels.push(i)
            });
            console.log(run.label)
            chartData.datasets.push({
                label: run.label || index,
                data: run.history,
                borderColor: `#${(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}`,
                fill: false
            })
        });


        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: chartData,
        
            // Configuration options go here
            options: {}
        })
    }
}