var animals = ["Cat", "Dog", "Cow", "Chicken"];

// function for capturing the animal  name 
function alertAnimalName() {
  var animalName = $(this).attr("data-name");

  alert(animalName);
}

// Function for displaying animal data
function renderButtons() {

  // Deleting the animals prior to adding new 
 
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons 
    
    var a = $("<button>");
    // Adding a class of animal to our button
    a.addClass("animal");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding the animal from the textbox to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

// Calling the renderButtons function to display the intial buttons
renderButtons();

$("button").on("click", function(){

  //grabbing and storing the data-animal property value from button. 
  var animal = $(this).attr("animal");

  //constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=TqVEiQTPKFTPDd29SKqaC5xRyXVS21cS&limit=10";

  //performing AJAX
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    //After data comes back from request
  .then(function(response){
    console.log(queryURL);

    console.log(response);
    //storing data from AJAX request
    var results = response.data

    // looping throught results
    for (var i=0; i<results.length; i++){

      //creating and storing a Div tag
      var animalDiv = $("<div>");

      //creating a paragraph tag with results item rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      //creating and storing an image tag
      var animalImage = $("<img>");
      //setting the src attribute for image
      animalImage.attr("src", results[i].image.fixed_height.url)

      animalImage.attr("data-state", "still");
      animalImage.attr("data-still", "staticSrc");
      animalImage.attr("data-animate", "defaultAanimatedSrc")
      //appending the paragraph tag and image tag
      animalDiv.append(p);
      animalDiv.append(animalImage);

      //prepending the animalDiv to the HTML page
      $("#gifs-go-here").prepend(animalDiv)
    }
  });

    //function acesses "data-state", change image to "data-animate" or "data-still"
    function pauseGifs(){
      var state = $(this).attr("data-state"); 
      if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }
});





