$( document ).ready(function() {
    console.log("Ready to go!");

    $( document ).click(function() {
        $("#events").append("<li>You clicked somewhere</li>");
    });

    $(".foo").click(function() {
        $("#events").append("<li>You clicked the foo div</li>");
    })

    $(".bar").click(function() {
        $("#events").append("<li>You clicked the bar div</li>");
    })

    $(".reddio").click(function(e) {
        console.log(e);
        if(e.button === 0) {
            $(".flibgibbet").text("You left clicked the pink part!");
        }

        $('<p>', {
            text: 'You have probably not clicked ' + Math.floor(Math.random() * 100) + ' times!'
        }).appendTo(this);

    });
});