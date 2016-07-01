/**
    * function for testing algorithms
    * @author Ophelie Guenoux
*/

/**
    * Rosenbrock 
    *
    * @param {Array} xx : input array
    * @return {int} sum
*/
function Rosenbrock(xx) {
    let d = xx.length; 
    sum = 0; 
    let x_i = null; 
    let x_next = null; 
    new_sum = null;
    for (let i = 1; i< (d-1); i++){
        x_i = xx[i]; 
        x_next = xx[i+1]; 
        new_sum = 100 * Math.pow((x_next - Math.pow(x_i,2),2)) + Math.pow((x_i-1),2) ; 
        sum = sum + new_sum; 
    }
    return sum; 
}

/**
    * Griewangk function 
    *
    * @param {Array}xx : input array
    * @return {array} y : output
*/

function Griewangk(xx){
    let d = xx.length; 
    let prod = 1; 
    let x_i = null; 
    sum = 0; 
    for (let i=1 ; i< d; i++) {
        x_i = xx[i] ; 
        sum = sum + Math.pow(x_i,2)/4000; 
        prod = prod * Math.cos(x_i/Math.sqrt(i)); 
    }
    return sum - prod + 1; 

}