const app = {
  tags : ["dogs", "cats", "birds", "goats", "lions", "pigs"],
  q : "animals",
  limit : 12,
  address : "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=" + limit + "&q=",

  renderButtons : function () {
    
  }


}

function renderButtons () {
  $("#tags").empty();
  for (var i = 0; i < tags.length; i++) {
    var button = $('<button class="mx-1 btn btn-secondary btn-sm">').attr("data-animal",tags[i]).text(tags[i]);
    $("#tags").append(button);
  }

};

function showImg () {
  $("#display").empty();

  var queryURL = address + q;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    var results = response.data;  
	//console.log(results)

  	for (var i = 0; i < results.length; i++) {
  	  var gifDiv = $('<div class="col-xs-18 col-sm-6 col-md-3">');
  	  var rating = results[i].rating;
  	  var p = $("<div>").text("Rating: " + rating);
  	  var thumbnail = $('<div>')
        var animalImg = $("<img>");
  	  animalImg.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url)
  	  .attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");
  	  
      thumbnail.append(animalImg);
      thumbnail.append(p);
      gifDiv.append(thumbnail);

  	  $("#display").append(gifDiv);
	  }
  });
}

$(document).ready(function() {

	renderButtons();
  showImg();


	$(".btn-sm").click(function() {
	  console.log(this);
	  q = $(this).attr("data-animal");
	  showImg();

	});

	$("#submit").click(function (event) {
	  event.preventDefault();
	  var input = $("#tagToAdd").val().trim();
	  tags.push(input);
	  renderButtons();
	  $("#tagToAdd").val("");
	});

	$(".gif").click(function () {
    var state = $(this).attr("data-state");
    console.log(this);

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else { 
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      }
  });

})





