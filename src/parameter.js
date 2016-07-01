/**
 * @class Parameter
 * class for Simulated annealing
 * @author Ophelie Guenoux
 */

class Parameter {
	/**
		* construct Parameter
		* 
		* @param {int}temp : initial temperature
		* @param {int} t_min : minimum temperature to reach
		* @param {int} coeff : coeff for changing the temperature
	*/
	constructor(temp, t_min, coeff, iter_palier) {
		this.T = temp; 
		this.T_min = t_min; 
		this.coeff = coeff; 
		this.iter_palier = iter_palier; 
		
	}
}

module.exports = Parameter;