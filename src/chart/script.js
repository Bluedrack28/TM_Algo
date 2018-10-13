
let datasJSON = []
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
    
    let div = document.getElementById('chart')
    let canvas = document.createElement('canvas')
    div.appendChild(canvas)
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let chart = null
    if(chart){
        chart = null
    }
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


        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: chartData,
        
            // Configuration options go here
            options: {}
        })
    }
}