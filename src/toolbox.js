/* toolbox file */


function dec2bin(dec,length){
	/* translate a binary number into a bitcode */
	var out = "";
	while(length--)
		out += (dec >> length ) & 1;
	return out;  
}

function bin2dec(b){
	i= 0;
	n= length(b);
	puissance=0;
	index=-1;
	while (index >= -n) {
		if (b[index] === 1)
			i= i + Math.pow(2,puissance)
		puissance= puissance +1;
		index=index-1;
	}
	return i;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function get_random_bit(){
    // return a random bit
    return getRandomInt(0,1);
}

function get_random_individual(LENGTH_OF_EXPECTED_STR){
	// create random individual
	individual = [];
	for (i = 0; i < LENGTH_OF_EXPECTED_STR; i++) {
		individual.push(get_random_bit());
	}
	return individual;
}

function cut_c(tab,n){
    // cut the bitcode c into n differents bitcode , warning n must be pair
    tab_Len = tab.length;
    taille = tab_Len/n;
    pos = taille;
    cut = [];
    i = 0;
    while (i <= tab_Len) {
    	for (j = 0; j < pos ; j++)
    		cut.push(tab[j]);
    	i = i + taille;
    	pos += taille;
    }
    return cut;

}     