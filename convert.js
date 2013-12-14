(function (){
    var _       = require("lodash"),
        pendingSolutions = [],
        validSolutions   = [],
        TEST    = "ABCDE";
        
    function isValidGram(gram) {
        return gram.length > 0;
    }
    
    function isCompleteSolution(solution) {
        return solution[0].length <= 2 && isValidGram(solution[0]);
    }
    
    function breakOffGram(gram, length) {
        var gramLength = gram.length;
        if(length < 0) {
            length = 0;
        }
        if (length > gramLength) {
            length = gramLength;
        }
        return [gram.substr(0, gramLength - length), gram.substr(gramLength-length, length)];
    }
    
    pendingSolutions = [[TEST]];
    // While there are pending solutions
    var pass = 0;
    while(pendingSolutions.length && pass < 60) {
        console.log("Pass: ", pass++);
        console.log("Pending: ", pendingSolutions);
        // For each pending solution
            var solution = pendingSolutions.shift(),
                initialGram = solution[0];
                console.log("Solution: %s", solution);
            if(initialGram.length >= 2) {
            // If the first gram is >2 in length
                // Clone the solution and create a unigram off the first gram and insert it 
                // before the second.
                var unigram = breakOffGram(initialGram,1),
                    bigram = breakOffGram(initialGram,2),
                    newSolution;
                    
                    console.log("Unigram", unigram);
                    console.log("Bigram", bigram);
                
                // If the new gram is valid, add it to new pending solution list
                if(isValidGram(unigram[1])) {
                    newSolution = _.clone(solution);
                    Array.prototype.splice.apply(newSolution, [0,1].concat(unigram));
                    console.log("New Solution: ",newSolution);
                    pendingSolutions.push(newSolution);
                }
                // Repeat the above, but create a bigram
                if(isValidGram(bigram[1])) {
                    newSolution = _.clone(solution);
                    Array.prototype.splice.apply(newSolution, [0,1].concat(bigram));
                    console.log("New Solution: ",newSolution);
                    pendingSolutions.push(newSolution);
                }
            }
            if(initialGram.length <= 2) {
            // Else
                // Check the validity of the first gram. If it is valid, add this
                // solution to the valid solutions list. IF not, dispose of it
                if(isValidGram(initialGram)) {
                    validSolutions.push(solution);
                }
            }
            

    }
                
    // Show the valid solutions
    console.log(validSolutions);
}());