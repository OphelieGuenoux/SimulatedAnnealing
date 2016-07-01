/**
    * 
    * @author Ophelie Guenoux
*/

var fs = require ('fs');
var Individual = require('./individual');
var Parameter = require('./parameter'); 
var plotly = require('plotly')('oguenoux', 'ojm4pt9h1h');



// -------------------------------------------Dependencies----------------------------------------------------------//
/*EXPECTED_STR = [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0,0,1,0]; 

N = 2
EXPECTED_BIT = toolbox.cut_c(EXPECTED_STR, N)
EXPECTED_NUMBER = toolbox.bin2dec_tab(EXPECTED_BIT)
*/
LENGTH_OF_GENOMA = 10; 

//----------------------------------------------------------------------------------------------------------------- //
/**
    * randomInt : help for using random
    *
    * @param {int} low
    * @param {int} high
    * @return {int} number
*/
function randomInt (low, high) {
    return Math.floor(Math.random() * (high- low + 1)) + low;
}

/**
    * get_random_bit : under function used to obtain a random individual
    * @return {int} bit : a bit (so 0 or 1)
*/
function get_random_bit(){
    // return a random bit
    return randomInt(0,1);
}

/**
    * get_random_individual : obtain a random individual, ie random genoma
    * @param {int} LENGTH_OF_GENOMA : length for the genoma
    * @return {Array} individual_id : an array of bits
*/

function get_random_individual(LENGTH_OF_GENOMA){
    // create random individual
    let individual_id = [];
    for (i = 0; i < LENGTH_OF_GENOMA; i++) {
        individual_id.push(get_random_bit());
    }
    return individual_id;
}

/**
    * compute the Metropolis criteria
    *
    * @param {int} delta : difference between the two energy
    * @param {int} temp : current temperature
*/

function critMetropolis(delta, temp){
    if (delta <= 0) 
        return true; 
    else if (Math.random() < Math.exp(-delta/temp)) 
        return true; 
    else 
        return false; 
}

/**
    * initialize the first temperature
*/
function init_config(){
    T = 100; 
    return T; 
}

/**
    * cooling schedule function
*/
function get_neighbor(choice){
    
    return new Individual(get_random_individual(LENGTH_OF_GENOMA), choice); 
}

/**
    * cooling linear schedule
    * @param {Array} solution
    * @param {int} n
*/
function neighbor_linear(solution, n){
    return solution + n*Math.random(); 
}

function annealing(solution, choice, params){

    let T = params.T; 
    let T_min = params.T_min; 
    let coeff = params.coeff;
    let iter_palier = params.iter_palier;
    let X = []; 
    let Y = []; 
    let R = [];  
    //log_avg = [];
    let nb_moves = 0; 
    while (T > T_min){
        for (let i = 0; i<iter_palier; i++){
            new_solution = get_neighbor(choice); 
            X.push(solution.x); 
            Y.push(solution.y); 
            R.push(solution.get_rate(choice));
            delta = solution.get_rate(choice) - new_solution.get_rate(choice); 
          
            if (critMetropolis(delta, T)){
                solution = new_solution; 
                nb_moves = nb_moves + 1; 
            }
        }
        
        T = T*coeff; 
        //log_avg.append(T); 
    }
    return {solution, X, Y, R}; // log_avg; 
}
// ------------------------------------------------ testing ---------------------------------------------------- //

function create_Z(solution){
    let Z=[];
    for (let i = 0 ; i< 32; i++){
        Z[i] = [];
        for (let s = 0; s<32; s++){
            Z[i][s] =0; 
        }
    
    }
    for (let j = 0; j < solution.X.length; j++){ 
        //Z[solution.X[i]][solution.Y[i]] = solution.R[i]; 
        Z[solution.X[j]][solution.Y[j]] = solution.R[j]; 
    }
 
    return Z; 
}

function mean(b){
    sum = 0; 
    for (let i=0; i< b.length; i++){
        sum = sum + b[i]; 
    }
    return sum/b.length; 
}

function createZ_playParameters(){
    let Z = [];
    let params = []; 
    let sol = [];  
    let coef = [0.9,0.8,0.75,0.70,0.65,0.6,0.55,0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.15,0.1]; 
    let t_init = [250,220,200,180,170,150,120,100,90,80,85,70,60,50,40,30]; 
    for (let i = 0; i< coef.length; i++){
        Z[i] = []; 
        for (let j = 0; j< t_init.length; j++) {
            params[i] = new Parameter(t_init[i], 0.01, coef[i], 10); 
            sol[i] = run('Paraboloid', params[i]); 
            Z[i][j] = mean(sol[i].R); 
        }
    }
    /*console.log('params', params); 
    console.log('sol', sol); 
    console.log('Z', Z);*/
    return Z;  

}

// --------------------------------------------- main --------------------------------------------------------//
/**
    * function run() : give us the best solution to solve the problem
    *
    *@param {String} choice : Griewangk function, Paraboloid functon or Rosenbrock function 
*/

function run(choice, params){
    solution = new Individual(get_random_individual(LENGTH_OF_GENOMA), choice); 
    console.log('-----------------solution init------------------------- :'); 
    console.log(solution);
    console.log('------------------ current solution -------------------- : '); 
    let sol = annealing(solution, choice, params); 
    console.log(sol.solution); 
    /* plot 1
    line_chart = pygal.Line(show_dots=False, show_legend=False); 
    line_chart.title = 'Temperature evolution'; 
    line_chart.x_title = 'iteration'; 
    line_chart.y_title = 'Temperature'; 
    line_chart.add('Temperature', log_avg); 
    line_chart.render_to_file('temp_evolve.svg'); 
    */
    return sol; 
}

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
    var graphOptions = {layout: layout, filename: "Easam", fileopt: "overwrite"};
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

function test_plotFonctions2D(solution1, solution2, solution3, solution4, solution5){
    var x1 = [];

    for (var i = 0; i < solution1.R.length; i ++) {
        x1[i] = i;
    }
    var trace1 = {
      x: x1,
      y: solution1.R,
      type: 'scatter'
    };

    var trace2 = {
      x: x1,
      y: solution2.R,
      type: 'scatter'
    };

    var trace3 = {
      x: x1,
      y: solution3.R,
      type: 'scatter'
    };

    var trace4 = {
      x: x1,
      y: solution4.R,
      type: 'scatter'
    };

    var trace5 = {
      x: x1,
      y: solution5.R,
      type: 'scatter'
    };

    var data = [trace1, trace2, trace3, trace4, trace5];

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

    var graphOptions = {filename: "Simulated_Annealing-influence_iter_palier", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
    });
}

/*
let params1 = new Parameter(80, 0.01, 0.6, 40); 
let params2 = new Parameter(80, 0.01, 0.6, 40); 
let params3 = new Parameter(80, 0.01, 0.6, 20); 
let params4 = new Parameter(80, 0.01, 0.6, 10); 
let params5 = new Parameter(80, 0.01, 0.6, 5); 
sol_1 = run('Paraboloid', params1); 
sol_2 = run('Paraboloid', params2); 
sol_3 = run('Paraboloid', params3); 
sol_4 = run('Paraboloid', params4); 
sol_5 = run('Paraboloid', params5);

//sol_Griewangk = run('Griewangk'); 

Z = create_Z(sol_2);
test_plot(Z); 
*/

//test_plotFonctions2D(sol_1 ,sol_2, sol_3, sol_4, sol_5); 
//test_plot2D(sol_1); 

Z = createZ_playParameters(); 
test_plot(Z); 