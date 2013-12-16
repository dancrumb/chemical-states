(function (){
    "use strict";
    var _           = require("lodash"),
        chemicals   = require("./chemicals.json"),
        states      = require("./states.json");
        
    function isValidGram(gram) {
        return chemicals[gram.toUpperCase()] || states[gram.toUpperCase()];
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

    /**
     * Converts a string into Chemical States
     * @param str
     * @returns {Array}
     */
    function convert(str) {
        var pendingSolutions = [[str]],
            validSolutions   = [];
        
        // While there are pending solutions
        while(pendingSolutions.length) {
            // For each pending solution
            var solution = pendingSolutions.shift(),
                initialGram = solution[0];

            if(initialGram.length >= 2) {
            // If the first gram is >=2 in length
                // Clone the solution and create a unigram off the first gram and insert it 
                // before the second.
                var unigram = breakOffGram(initialGram,1),
                    bigram = breakOffGram(initialGram,2),
                    newSolution;
                
                // If the new gram is valid, add it to new pending solution list
                if(isValidGram(unigram[1])) {
                    newSolution = _.clone(solution);
                    Array.prototype.splice.apply(newSolution, [0,1].concat(unigram));
                    pendingSolutions.push(newSolution);
                }
                // Repeat the above, but create a bigram
                if(isValidGram(bigram[1])) {
                    newSolution = _.clone(solution);
                    Array.prototype.splice.apply(newSolution, [0,1].concat(bigram));
                    pendingSolutions.push(newSolution);
                }
            }
            if(isCompleteSolution(solution)) {
                validSolutions.push(solution);
            }
        }
        return validSolutions;
    }

    function expandSolution(solution) {
        return _.map(solution, function (symbol) {
            return chemicals[symbol.toUpperCase()] || states[symbol.toUpperCase()];
        });
    }

    exports.convert         = convert;
    exports.expandSolution  = expandSolution;
}());