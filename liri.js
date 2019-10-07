require("dotenv").config();
const axios = require('axios');
const moment = require('moment');
moment().format();
var keys = require("./keys.js");
console.log(keys);
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "5023d2790b7d478781ef16dde0a90a3a",
  secret: "356f2557be5f4f5ea5bc182dc5dbeca3"
});


let method = process.argv[2];
let artist = process.argv[3];

if (method == "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(queryUrl);
    axios.get(queryUrl)
    .then(function (response) {
        let miliseconds = moment(response.data[0].datetime);
        let currentTime = moment.unix(miliseconds/1000).format("DD MMM YYYY hh:mm a")
        console.log(artist + " will be performing in " + response.data[0].venue.name)
        console.log("at " + response.data[0].venue.city)
        console.log("on " + currentTime);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}
if (method == "spotify-this-song") {
    if (!artist) {
        artist = "The Sign";
      }
    console.log(artist);
    spotify
    .request("https://api.spotify.com/v1/search?query=" + artist + "&type=track&market=US&offset=5&limit=10")
    .then(function(data) {
      var songs = data.tracks.items
      for (var i = 0; i < songs.length; i++) {
          console.log("----------------------------------")
          console.log("Artist(s): " + songs[i].artists[0].name)
          console.log("Name of the song: " + songs[i].name)
          console.log("Preview Link: " + songs[i].preview_url)
          console.log("This song came from the album: " + songs[i].album.name)
          console.log("----------------------------------")
      }
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });

}
