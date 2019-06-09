require("dotenv").config();
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
const axios = require("axios")
const moment = require("moment")
const fs = require("fs")
let type = process.argv[2]
let argument = process.argv[3]
//takes two inputs and depending on type it spits out one of the below functions
function apiSwitch(type, argument) {

    switch (type) {
        case "concert-this":
            return concertThis(argument);
        case "spotify":
            return spotifyThisSong(argument);
        case "movie-this":
            return movieThis(argument);
        case "doIt":
            return doWhatItSays();
    }
}

//concert-this, checks bandsintown for upcoming venues for specified artist

function concertThis(artist) {
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(function (response) {
        console.log(response)
        let data = response.data;
        //Displays fields for each concert venue
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

//spotify-this-song - searches spotify. outputs data. doesn't use axios here. 
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

//movie-this - searches movies. outputs data. simple. 
function movieThis(movie) {
    axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movie}`).then(function (response) {
        let res = response.data
        let title = res.Title;
        let year = res.Year;
        let rating = res.imbdRating;
        let RTRating = res.Ratings[1].Value;
        let country = res.Country;
        let lang = res.Language;
        let plot = res.Plot;
        let actors = res.Actors;
        console.log(`\nTitle: ${title}\nRelease Year: ${year}\nIMDB Rating: ${rating}\nRotten Tomatoes Rating: ${RTRating}\nProduced in: ${country}\nLanguage: ${lang}\nPlot: ${plot}\nActors: ${actors}`)
        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.

    }).catch(err => console.log(err));
}
//do-what-it-says
function doWhatItSays() {
    fs.readFile("./random.txt", "UTF8", function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            //changes into array on a comma
            data = data.split(",")
            apiSwitch(data[0], data[1])
        }
    })
}

apiSwitch(type, argument)