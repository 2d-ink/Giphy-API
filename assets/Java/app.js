var gifList = ["Cat", "Dog", "Cow", "Chicken"];

function displayGifInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=TqVEiQTPKFTPDd29SKqaC5xRyXVS21cS&limit=10"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (i = 0; i < results.length; i++) {


            var gifDiv = $("<div class='giphyitem'>");

            var rating = results[i].rating;

            var pOne = $("<p>").text("Rating: " + rating);

            var giphyImage = $('<img class="gifimage">');

            giphyImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(pOne);
            gifDiv.append(giphyImage);


            $("#gifs-appear-here").prepend(gifDiv);
        }
    });

}

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < gifList.length; i++) {

        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", gifList[i]);
        a.text(gifList[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif2 = $("#gif-input").val().trim();

    gifList.push(gif2);
    renderButtons();
});

$(document).on("click", ".gif-btn", displayGifInfo);


renderButtons();

$('body').on("click", '.gifimage', function () {
    var src = $(this).attr("src");

    if ($(this).hasClass("playing")) {

        $(this).attr("src", src.replace(/\.gif/i, '_s.gif'))
        $(this).removeClass("playing");

    } else {
        $(this).addClass("playing");
        $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
    }
})