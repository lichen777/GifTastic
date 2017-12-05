const app = {
  tags : ["dogs", "cats", "birds", "goats", "lions", "pigs"],
  q : "animals",
  address : "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=" + 12 + "&q=",

  renderButtons : function () {
  	var input = $("#tagToAdd").val().trim();

  	if (input && this.tags.indexOf(input) === -1) {
  	  this.tags.push(input);
	  console.log(this.tags);
	  this.q = input;
	  this.searchGif();
  	}

  	$("#tagToAdd").val("");


  	$('#tags').empty();

  	for (var i = 0; i < this.tags.length; i++) {
      var button = $('<button>').attr("data-animal",this.tags[i]).addClass('mx-1 btn btn-secondary btn-sm').text(this.tags[i]);
      $("#tags").append(button);
    }

  	$(".btn-sm").click(function() {
      console.log(this);
	  app.q = $(this).attr("data-animal");
	  app.searchGif();
    });
  },

  searchGif : function () {

  	var queryURL = this.address + this.q;
  	console.log(queryURL);

  	$.ajax({
    url: queryURL,
    method: "GET"
    })
    .done(function(response) {
	  app.showImg(response);
	});
  },

  showImg : function (response) {
  	var results = response.data;

  	$("#display").empty();

  	for (var i = 0; i < results.length; i++) {
  	  var gifDiv = $('<div class="col-xs-18 col-sm-6 col-md-3">');
	  var rating = results[i].rating;
	  var p = $('<div class="caption">').text("Rating: " + rating);
	  var thumbnail = $('<div class="thumbnail">')
      var animalImg = $("<img>");
  	  animalImg.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url)
  	  .attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");
  	  
      thumbnail.append(animalImg);
      thumbnail.append(p);
      gifDiv.append(thumbnail);

  	  $("#display").append(gifDiv);
  	}

  	$(".gif").click(function () {
      var state = $(this).attr("data-state");
      //console.log(this);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
      	$(this).attr("data-state", "animate");
      } else { 
      	$(this).attr("src", $(this).attr("data-still"));
      	$(this).attr("data-state", "still");
      }
  	});

  }

}

$(document).ready(function() {

  app.renderButtons();
  app.searchGif();

  $("#submit").click(function (event) {
    event.preventDefault();	
	app.renderButtons();
  });

})
