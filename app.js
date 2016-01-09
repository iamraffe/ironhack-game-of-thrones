var fs = require('fs');
function fileActions(err, file){
    if (err) {
        throw err;
    }
    var episodes = JSON.parse(file);
    var filteredEpisodes = filterEpisodes(episodes);
    var orderedEpisodes = orderEpisodes(filteredEpisodes);
    printEpisodes(orderedEpisodes);
}
fs.readFile("./GoTEpisodes.json", 'utf8', fileActions);

function printEpisodes(episodes){
  for (var i = 0; i < episodes.length; i++) {
        console.log("Title: " + episodes[i].title + "  Episode: " + episodes[i].episode_number);
        console.log(episodes[i].description);
        console.log("Rating: " + episodes[i].rating + " " + printStars(episodes[i].rating));
  }
}

function printStars(rating) {
  var stars = "";
  for ( var i = 0; i < rating; i++) {
      stars = stars + "*";
  }
  return stars;
}


function orderEpisodes(episodes) {
  return episodes.sort(function(a, b){
          return a.episode_number-b.episode_number
    });
}

function isGoodEnough(episode) {
  return episode.rating >= 8.5 && jonSnow(episode.description);
}

function filterEpisodes(episodes) {
  return episodes.filter(isGoodEnough);
}

function jonSnow(description) {
  return description.indexOf("Jon") == -1 ?
  false : true
}
