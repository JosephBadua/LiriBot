const fs = require("fs");

require("dotenv").config();

const axios = require("axios");
const moment = require("moment");
moment().format();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

let method = process.argv[2];
let second = process.argv.slice(3).join(" ");
let artist = second.toUpperCase();

if (method == "concert-this") {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios
    .get(queryUrl)
    .then(function(response) {
      let miliseconds = moment(response.data[0].datetime);
      let currentTime = moment
        .unix(miliseconds / 1000)
        .format("DD MMM YYYY hh:mm a");
      console.log("----------------------------------");
      console.log(
        artist + " will be performing in " + response.data[0].venue.name
      );
      console.log("at " + response.data[0].venue.city);
      console.log("on " + currentTime);
      console.log("----------------------------------");
      fs.appendFile(
        "log.txt",
        JSON.stringify(
          "\n------------ " +
          artist +
            " will be performing in " +
            response.data[0].venue.name +
            "at " +
            response.data[0].venue.city +
            "on " +
            currentTime +
            "\n------------ ",
        ),
        "utf8",
        function(err) {
          if (err) throw err;
          console.log("Data is appended to file successfully.");
        }
      );
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

if (method == "spotify-this-song") {
  if (!artist) {
    artist = "The Sign";
  }
  spotify
    .request(
      "https://api.spotify.com/v1/search?query=" +
        artist +
        "&type=track&market=US&offset=5&limit=10"
    )
    .then(function(data) {
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log("----------------------------------");
        console.log("Artist(s): " + songs[i].artists[0].name);
        console.log("Name of the song: " + songs[i].name);
        console.log("Preview Link: " + songs[i].preview_url);
        console.log("This song came from the album: " + songs[i].album.name);
        console.log("----------------------------------");
        fs.appendFile(
          "log.txt",
          "\n------------" +
            "\nArtist(s): " +
              songs[i].artists[0].name +
              "\nName of the song: " +
              songs[i].name +
              "\nPreview Link: " +
              songs[i].preview_url +
              "\nThis song came from the album: " +
              songs[i].album.name +
              "\n------------",
          "utf8",
          function(err) {
            if (err) throw err;
            console.log("Data is appended to file successfully.");
          }
        );
      }
    })
    .catch(function(err) {
      console.error("Error occurred: " + err);
    });
}

if (method == "movie-this") {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(function(response) {
    console.log("----------------------------------");
    console.log("Title: " + response.data.Title);
    console.log("It came out on: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors and Actresses " + response.data.Actors);
    console.log("----------------------------------");
    fs.appendFile(
      "log.txt",
      "\n------------" +
        "\nTitle: " +
          response.data.Title +
          "\nIt came out on: " +
          response.data.Year +
          "\nIMDB Rating: " +
          response.data.imdbRating +
          "\nCountry: " +
          response.data.Country +
          "\nLanguage: " +
          response.data.Language +
          "\nPlot: " +
          response.data.Plot +
          "\nActors and Actresses " +
          response.data.Actors +
        "\n------------",
      "utf8",
      function(err) {
        if (err) throw err;
        console.log("Data is appended to file successfully.");
      }
    );
  });
}

if (method == "do-what-it-says") {
  fs.readFile("random.txt", "utf-8", function(err, data) {
    if (err) throw err;
    console.log(data);
    var text = data.split(",");
    console.log(text[0]);
    if (text[0] == "concert-this") {
      var queryUrl =
        "https://rest.bandsintown.com/artists/" +
        text[1] +
        "/events?app_id=codingbootcamp";
      axios
        .get(queryUrl)
        .then(function(response) {
          let miliseconds = moment(response.data[0].datetime);
          let currentTime = moment
            .unix(miliseconds / 1000)
            .format("DD MMM YYYY hh:mm a");
          console.log("----------------------------------");
          console.log(
            artist + " will be performing in " + response.data[0].venue.name
          );
          console.log("at " + response.data[0].venue.city);
          console.log("on " + currentTime);
          console.log("----------------------------------");
          fs.appendFile(
            "log.txt",
            "\n------------" +
              artist +
                "will be performing in " +
                response.data[0].venue.name +
                "at " +
                response.data[0].venue.city +
                "on " +
                currentTime +
            "\n------------",
            "utf8",
            function(err) {
              if (err) throw err;
              console.log("Data is appended to file successfully.");
            }
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (text[0] == "spotify-this-song") {
      spotify
        .request(
          "https://api.spotify.com/v1/search?query=" +
            text[1] +
            "&type=track&market=US&offset=5&limit=10"
        )
        .then(function(data) {
          var songs = data.tracks.items;
          for (var i = 0; i < songs.length; i++) {
            console.log("----------------------------------");
            console.log("Artist(s): " + songs[i].artists[0].name);
            console.log("Name of the song: " + songs[i].name);
            console.log("Preview Link: " + songs[i].preview_url);
            console.log(
              "This song came from the album: " + songs[i].album.name
            );
            console.log("----------------------------------");
            fs.appendFile(
              "log.txt",
              "\n------------" +
                "Artist(s): " +
                  songs[i].artists[0].name +
                  "Name of the song: " +
                  songs[i].name +
                  "Preview Link: " +
                  songs[i].preview_url +
                  "This song came from the album: " +
                  songs[i].album.name +
                  "\n------------",
              "utf8",
              function(err) {
                if (err) throw err;
                console.log("Data is appended to file successfully.");
              }
            );
          }
        })
        .catch(function(err) {
          console.error("Error occurred: " + err);
        });
    } else if (text[0] == "movie-this") {
      var queryUrl =
        "http://www.omdbapi.com/?t=" +
        text[1] +
        "&y=&plot=short&apikey=trilogy";
      axios.get(queryUrl).then(function(response) {
        console.log("----------------------------------");
        console.log("Title: " + response.data.Title);
        console.log("It came out on: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors and Actresses " + response.data.Actors);
        console.log("----------------------------------");
        fs.appendFile(
          "log.txt",
          "\n------------" +
            "Title: " +
              response.data.Title +
              "It came out on: " +
              response.data.Year +
              "IMDB Rating: " +
              response.data.imdbRating +
              "Country: " +
              response.data.Country +
              "Language: " +
              response.data.Language +
              "Plot: " +
              response.data.Plot +
              "Actors and Actresses " +
              response.data.Actors +
              "\n------------",
          "utf8",
          function(err) {
            if (err) throw err;
            console.log("Data is appended to file successfully.");
          }
        );
      });
    }
  });
}
