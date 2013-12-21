jQuery(function (){
    "use strict";
    var solutionsContainer = jQuery("#solutions");
    jQuery("#word").on("keyup", function(evt) {
        var input = jQuery(this),
            inputVal = input.val();
        jQuery.getJSON("/convert/"+inputVal,function(data){
            var solutions = data.results;

            solutionsContainer.empty();
            jQuery.each(solutions, function(__, solution) {
                var solutionElem = jQuery(document.createElement("div"));
                solutionElem.addClass("solution");
                solutionsContainer.append(solutionElem);
                jQuery.each(solution, function(___, symbol){
                    jQuery(solutionElem).append("<div class='symbol'>"+symbol+"</div>");
                });
            });
        }).fail(function(jqXHR) {
                if(jqXHR.status === 404) {
                    reportNoMatchingChemicalStates();
                }
            });
    });

    function reportNoMatchingChemicalStates() {
        solutionsContainer.empty();
        var errorElem = jQuery(document.createElement("div"));
        errorElem.addClass("error");
        errorElem.text("No Chemical States exist for that phrase");
        solutionsContainer.append(errorElem);

    }
});