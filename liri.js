require("dotenv").config();
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
const axios = require("axios")
const moment = require("moment")

let type = process.argv[2]
let argument = process.argv[3]
function apiSwitch(type, argument) {

    switch (type) {
        case "concert-this":
            return concertThis(argument);
        case "spotify":
            return spotifyThisSong(argument);
        case "movie-this":
            return movieThis(argument);
        case "doIt":
            return doWhatItSays(argument);
    }
}

//concert-this

function concertThis(artist) {
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(function (response) {
        let data = response.data;
        data.forEach(element => {
            let venueName = element.venue.name
            let venueLocation = element.venue.country + ", " + element.venue.region + ", " + element.venue.city
            console.log(`\n${artist}`);
            console.log(venueName);
            console.log(venueLocation);
            console.log(moment(element.datetime).format('MMMM Do[,] YYYY'));
        });
    })

        .catch(err => console.log(err))
}

//spotify-this-song
function spotifyThisSong(song) {
    if (song) {
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                console.log(err)
            }
            else {
                const resp = data.tracks.items[0]
                let artist = resp.artists[0].name
                let songName = resp.name
                let link = resp.external_urls.spotify
                let sAlbum = resp.album.name
                console.log(`\n${artist}`);
                console.log(songName);
                console.log(link);
                console.log(sAlbum);

            }
        });
    }
    else {
        spotify.search({ type: 'track', query: `The Sign` }, function (err, data) {
            if (err) {
                console.log(err)
            }
            else {
                const resp = data.tracks.items[0]
                let artist = resp.artists[0].name
                let songName = resp.name
                let link = resp.external_urls.spotify
                let sAlbum = resp.album.name
                console.log(`\n${artist}`);
                console.log(songName);
                console.log(link);
                console.log(sAlbum);

            }
        });
    }
}

//movie-this
function movieThis(movie) {

}
//do-what-it-says
function doWhatItSays(thing) {
}
apiSwitch(type, argument)