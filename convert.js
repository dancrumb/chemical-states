(function (cliArgs){
    "use strict";

    var word            = cliArgs[0],
        chemicalStates  = require("./lib/chemical-states"),
        _               = require("lodash");

    if(word) {
        var solutions = chemicalStates.convert(word);
        console.log("Solutions:");
        _.forEach(solutions, function(solution) {
            console.log("\t", chemicalStates.expandSolution(solution));
        });
    }


}(process.argv.slice(2)));