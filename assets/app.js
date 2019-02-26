var charactersArray = [
  "Jon Snow",
  "Daenerys Targaryen",
  "Cersei Lannister",
  "Tyrion Lannister",
  "The White Walkers"
];

$(document).ready(function() {
  gifs = " ";
  function displayButtons() {
    $("#characters-view").empty();
    for (var i = 0; i < charactersArray.length; i++) {
      var newBtn = $("<button>");
      newBtn.addClass("btn");
      newBtn.attr("data-name", charactersArray[i]);
      newBtn.text(charactersArray[i]);
      $("#characters-view").append(newBtn);
    }
    x = $("#character-input").focus();
  }

  displayButtons();

  $("#add-character").on("click", function() {
    event.preventDefault();
    var newCharacter = $("#character-input")
      .val()
      .trim();
    charactersArray.push(newCharacter);
    displayButtons();
  });

  $(document).on("click", "button", function() {
    $("#gifs").empty();
    var y = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      y +
      "&api_key=a6VErh2yKJEzvfF7gG0Oj5DSe8MXVRTb&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifsDiv = $('<div class="holder">');
        var rating = results[i].rating;
        var ratingView = $("<p>").text("Rating: " + rating);
        var gifImage = $("<img>");
        gifImage
          .attr("src", results[i].images.fixed_height_still.url)
          .attr("data-still", results[i].images.fixed_height_still.url)
          .attr("data-animate", results[i].images.fixed_height.url)
          .attr("data-state", "still")
          .addClass("newImage");
        gifsDiv.append(ratingView).append(gifImage);
        $("#gifs").prepend(gifsDiv);
      }
    });
  });

  $(document).on("click", ".newImage", function() {
    var state = $(this).data("state");
    if (state == "still") {
      $(this)
        .attr("src", $(this).data("animate"))
        .data("state", "animate");
    } else {
      $(this)
        .attr("src", $(this).data("still"))
        .data("state", "still");
    }
  });
});
