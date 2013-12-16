(function (){
    "use strict";

    var express         = require("express"),
        lessMiddleware  = require("less-middleware"),
        chemicalStates  = require("./lib/chemical-states"),
        _               = require("lodash"),
        app             = express(),
        port            = process.env.PORT || 5000,
        DOC_ROOT        = __dirname + "/public";

    app.use(express.logger("dev"));


    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");

    app.use(lessMiddleware({
        src: __dirname + "/src/less",
        dest: DOC_ROOT + "/style",
        prefix: "/style",
        compress: true,
        force: true
    }));
    app.use(express.static(DOC_ROOT));

    app.get("/", function (req, res){
        res.render("index", {
            title: "Home"
        });
    });

    app.get("/convert/:str", function(req, res) {
        var str = req.params.str,
            results = chemicalStates.convert(str);

        if(results.length === 0) {
            res.json(404, {error: "No Chemical States found for '"+str+"'"});
        }
        else {
            res.json({ source: str, results: _.map(results, chemicalStates.expandSolution) });
        }

    });

    app.listen(port, function() {
        console.log("Listening on " + port);
    });

}());