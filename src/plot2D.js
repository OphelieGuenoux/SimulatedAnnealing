/**
    * 
    * @author Ophelie Guenoux
    * plotting test file
*/
var fs = require ('fs');
var vm = require ('vm'); 

var Individual = require('./individual');
var plotly = require('plotly')('oguenoux', 'ojm4pt9h1h');

vm.runInThisContext(fs.readFileSync(__dirname + "/annealing.js"))


// ---------------------------------------------------------------------------------------------------------------------//

/**
    * test plot 3D with plotly
*/

function test_plot(z){
    var data = [
      {
        z: z ,
        type: "surface"
      }
    ];
    var layout = {
      title: " Simulated annealing",
      autosize: false,
      width: 500,
      height: 500,
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90
      }
    };
    var graphOptions = {layout: layout, filename: "elevations-3d-surface", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
    });
}

/**
    * test plot 2D
*/

function test_plot2D(solution) {

    var x = [];

    for (var i = 0; i < solution.R.length; i ++) {
        x[i] = i;
    }
    var data = [
        {
            x: x,
            y: solution.R,
            type: 'scatter'
        }
    ];

    var graphOptions = {filename: "Rosenbrock", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
    });
}

function test_plotFonctions2D(solution1, solution3){
    var x1 = [];

    for (var i = 0; i < solution1.R.length; i ++) {
        x1[i] = i;
    }
    var trace1 = {
      x: x1,
      y: solution1.R,
      type: 'scatter'
    };

    /*var trace2 = {
      x: x1,
      y: solution2.R,
      type: 'scatter'
    };*/

    var trace3 = {
      x: x1,
      y: solution3.R,
      type: 'scatter'
    };

    var data = [trace1, trace3];

    var layout = {
      xaxis: {
        type: 'log',
        autorange: true
      },
      yaxis: {
        type: 'log',
        autorange: true
      }
    };

    var graphOptions = {filename: "Simulated_Annealing", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
    });
}

// ------------------------------------------------------------------------------------------------- //

//sol_Rosenbrock = run('Rosenbrock'); 
sol_Paraboloid = run('Paraboloid'); 
//sol_Griewangk = run('Griewangk'); 

/*Z = create_Z(sol);
test_plot(Z); */
//test_plotFonctions2D(/*sol_Rosenbrock, */sol_Paraboloid ,sol_Griewangk); 
test_plot2D(sol_Paraboloid); 