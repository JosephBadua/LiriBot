require("dotenv").config();
const axios = require('axios');
const moment = require('moment');
moment().format();
var keys = require("./keys.js");
console.log(keys);
var spotify = (keys.spotify);
console.log(spotify);

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
