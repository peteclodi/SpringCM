$().ready(function(){
    var gridData = null;
    $.getJSON("data/grid-data.json", function(gridData){
        var gridListing = $(".folder-listing");
        gridData.forEach(function(datum){
            var folderListingRow = $("<div></div>").addClass("folder-listing-row");
            folderListingRow.append($("<span></span>")
                .addClass("folder-listing-text folder-listing-name")
                .html(datum['Name'])
                .prepend($("<img>")
                    .addClass("folder-listing-image")
                    .attr("src", "images/" + datum['Type'].toLowerCase() + ".png")
                )
            );
            folderListingRow.append(
                $("<span></span>")
                    .addClass("folder-listing-text folder-listing-description")
                    .html(datum['Description'])
            );
            folderListingRow.append(
                $("<span></span>")
                    .addClass("folder-listing-text folder-listing-modified-date")
                    .html(datum['ModifiedDate'])
            );

            gridListing.append(folderListingRow);
        });
    });

    var actionButtons = [];
    var buttonsExpanded = false;
    $.getJSON("data/action-buttons.json", function(results){
        actionButtons = results;
        displayButtons();
    });

    function displayButtons(){
        var buttonsContainer = $(".buttons-container");
        buttonsContainer.empty();
        var numberOfColumns = buttonsExpanded ? Math.ceil(actionButtons.length / 4) : 1;
        for(var columnIndex = 0; columnIndex < numberOfColumns; ++columnIndex){
            var startIndex = columnIndex * 4;
            var buttonsToDisplay = actionButtons.slice(startIndex, startIndex + 4);
            var buttonColumnDiv = $("<div></div>").addClass("action-button-column");
            buttonsToDisplay.forEach(function(button){
                buttonColumnDiv.append(
                    $("<img>")
                        .addClass("action-button")
                        .attr("src", "images/" + button['ImageName'] + ".png")
                        .attr("title", button['Name'])
                );
            });
            for(var unusedBlocksIndex = 0; unusedBlocksIndex < (4 - buttonsToDisplay.length); ++unusedBlocksIndex){
                buttonColumnDiv.append(
                    $("<img>")
                        .addClass("action-button")
                        .attr("src", "images/placeholder.png")
                );
            }
            buttonsContainer.append(buttonColumnDiv);
        }

        buttonsContainer.addClass(buttonsExpanded ? "action-button-expanded" : "action-button-collapsed");
        buttonsContainer.removeClass(buttonsExpanded ? "action-button-collapsed" : "action-button-expanded");

        buttonsContainer.append(
            $("<div></div>").append(
                $("<img>")
                    .addClass(buttonsExpanded ? "action-button-collapse" : "action-button-expand")
                    .attr("src", "images/" + (buttonsExpanded ? "collapse" : "expand") + ".png")
                    .attr("title", buttonsExpanded ? "Collapse" : "Expand")
                    .click(function() {toggleButtonExpansion();})
            ));
    }

    function toggleButtonExpansion(){
        buttonsExpanded = !buttonsExpanded;
        displayButtons();
    }
});