/**
 * @class Individual
 * class for Simulated annealing
 * @author Ophelie Guenoux
 */

class Individual {
	/**
		* construct an individual
		* 
		* @param {Array} bitcode : bitcode -> genoma
	*/
	constructor(bitcode, choice) {
		this.bitcode = bitcode; 
		this.x = this.obtainX(); 
		this.y = this.obtainY(); 
		this.rate = this.evaluate_energy(choice); 
	}

	/**
		* get_id() : return the id, so the bitcode for the individual
		*
		* @return {Array} id: bitcode for the individual
	*/
	get_bitcode(){
		return this.bitcode; 
	}

	/**
		* get_rate() : give the engagement rate for the individual (genoma)
		* @return {int} rate : number between 0 and 0.99
	*/
	get_rate(){
		return this.rate; 
	}

	obtainX(){
		let {x,y} = this.cut_c(this.bitcode, 2); 
		return this.bin2dec(x); 
	}

	obtainY(){
		let {x,y} = this.cut_c(this.bitcode, 2); 
		return this.bin2dec(y); 
	}

	cut_c(tab,n){
    // cut the bitcode c into n differents bitcode , warning n must be pair
	    let middle = tab.length/n; 
	    let x = []; 
	    let y = []; 
	    for (let i = 0; i< middle; i++ ){
	    	x.push(tab[i]); 
	    }
	    for (let j = middle; j < tab.length; j++){
	    	y.push(tab[j]); 
	    }
	    return {x,y}; 
	}

	/*x = tab[0:len(tab)/n]
    y = tab[len(tab)/n: len(tab)]
    return x,y*/ 

	bin2dec(b){
		let i= 0;
		let n = b.length;
		let puissance=0;
		let index = n -1;
		while (index >= -n) {
			if (b[index] === 1)
				i= i + Math.pow(2,puissance)
			puissance= puissance +1;
			index=index-1;
		}
		return i;
	}

	/**
	    * evaluate the energy for each genoma. 
	    * in our case give us the engagement rate
	    * @return {float} rate : engagement rate between 0 and 1; 
	*/

	evaluate_energy(choice){
		switch (choice) {
			case 'Easam':
		        return this.Easam(); 
		        break;
		    case 'Griewangk':
		        return this.Griewangk(); 
		        break;
		    case 'Paraboloid':
				return this.Paraboloid(); 
		}
	}	


	/**
	    * Easam :suppose to give us the FoM
	*/
	Easam() {
		return -( Math.cos(this.x) * Math.cos(this.y) * Math.exp(- (Math.pow((this.x - 3.14),2) + Math.pow((this.y - 3.14),2)))); 
	}

	/**
	    * Griewangk function 
	*/

	Griewangk(){
		let grie_1 = Math.pow(this.x,2)/4000 + Math.pow(this.y,2)/4000; 
		let grie_2 = Math.cos(this.x/Math.sqrt(1)) * Math.cos(this.y/Math.sqrt(2)); 
	   	return grie_1 - grie_2 + 1; 
	}

	/**
		* Paraboloid function
		* simple parabololoide function (sum (x_i)^2)
	*/

	Paraboloid(){
		let parab = Math.pow(this.x,2) + Math.pow(this.y, 2); 
		return parab; 
	}
}

module.exports = Individual;