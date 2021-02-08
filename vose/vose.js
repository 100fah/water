inlets = 1;
outlets = 2;

// check if array is not empty
function notEmpty(array){
	return (array && array.length);
}

function list(r) {
	var length = arguments.length;
	var alias = new Array(length);
	var prob = new Array(length);
	var small = new Array();
	var large = new Array();
	var weights = arrayfromargs(arguments);
// normalize list
	var sum = 0.;
	for (i=0; i < length; i++){
		sum = sum + weights[i];
		}
// populate small and large stacks
	for (i = 0; i < length; i++){
		weights[i] = (weights[i]/sum) * length;
		if (weights[i] < 1){
			small.push(i);
		} else {large.push(i)}
	}
// populate prob and alias tables
	while (notEmpty(small) && notEmpty(large)){
		l = small.pop();
		g = large.pop();
		prob[l] = weights[l];
		alias[l] = g;
		var replaceg = (weights[g] + weights[l]) - 1;
		weights[g] = replaceg;
		if (weights[g] < 1){
			small.push(g);
		} else {large.push(g)}
	} 
	while (notEmpty(large) == true){
		g = large.pop();
		prob[g] = 1;
	}
	while (notEmpty(small) == true){
		l = small.pop();
		prob[l]=1;
	}
// output prob and alias tables
	outlet(0, prob);
	outlet(1, alias);
}