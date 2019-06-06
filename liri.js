require("dotenv").config();
require("node-spotify-api");
const keys = require("./keys.js");

// const spotify = new Spotify(keys.spotify);
const axios = require("axios")
const moment = require("moment")

//concert-this

function concertThis() {
    axios.get(`"https://rest.bandsintown.com/artists/ + ${process.argv[2]} + /events?app_id=codingbootcamp"`).then(function (response) {
        let data = response.data;
        let band = "Slayer"
        data.forEach(element => {
            let venueName = element.venue.name
            let venueLocation = element.venue.country + ", " + element.venue.region + ", " + element.venue.city
            console.log(`\n${band}`);
            console.log(venueName)
            console.log(venueLocation)
            console.log(moment(element.datetime).format('MMMM Do[,] YYYY'))
        });
    })

        .catch(err => console.log(err))
}
concertThis()
//spotify-this-song

//movie-this

//do-what-it-says
