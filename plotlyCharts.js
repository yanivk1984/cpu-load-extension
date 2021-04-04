function createBar(x, y) {
    console.log(`createBar => x: ${x}, y: ${y}`)

    var data = [
        {
        x: x,
        y: y,
        type: 'bar',
        }
      ];

    let layout = {
        yaxis: {title: 'CPU Usage', range: [0, 100]},
    }
    Plotly.newPlot('chart', data, layout);

}


function createScatter(data) {
    var layout = {
      yaxis: {
        range: [0, 100]
      },
      title:'CPVIEW History data'
    };

    Plotly.newPlot('chart', data, layout);
}