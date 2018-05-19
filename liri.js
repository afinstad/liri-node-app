//tutor assisted code
//initates node.js require function to use module packages
require("dotenv").config();

var fs = require('fs')
var keys = require("./keys.js");
var request = require("request");
var twitter = require('twitter');
var spotify = require('node-spotify-api');

//"new" creates instance of object types with constructor function
var client = new twitter(keys.twitterKeys);
var client = new twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//process.argv to retrun array containing command line arugements when passed with node.js
var command = process.argv[2];
var title = process.argv[3];

//uses the "switch" and "case" statements to execute this block of code. 
onSwitch(command);

function onSwtich(command) {
    switch (command) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyTrack();
            break;
        case "movie-this":
            movie();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Command didn't work! Try again!");
    }
}
//twitter
function myTweets() {
    var tweets =
        {
            //twitter user object
            screen_name: "Amanda99881151",
            //up to 20 tweets. Don't have that many
            count: 20
        };
    //twitter embedded tweets timeline
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text + "=====" + tweets[i].created_at);
            }
        }
    });
}

    //spotify
    var getSpotify = function (songInfo) {
        if (songInfo === undefined) {
            songInfo = "Alone";
        }
        //uses spotify API to search for the song "track". Displays error message if not found. 
        search.song({ type: "track", query: title }, function (error, data) {
            if (!error && response.statusCode === 20) {
                var songData = JSON.parse(body);

                console.log("Artist Name: " + songData.Artist);
                console.log("Song Name: " + songData.songName);
                console.log("Album: " + songData.Album);
                console.log("Year: " + songData.Year);
            }
        });
    }


        //OMDB
        var getMeMovie = function (movieTitle) {
            if (movieTitle === undefined) {
                movieTitle = "Crash";
            }

            var omdbUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=full&tomatoes=true&apikey=trilogy";

            request(omdbUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var jsonData = JSON.parse(body);

                    console.log("Title: " + jsonData.Title);
                    console.log("Year: " + jsonData.Year);
                    console.log("Rated: " + jsonData.Rated);
                    console.log("IMDB Rating: " + jsonData.imdbRating);
                    console.log("Country: " + jsonData.Country);
                    console.log("Language: " + jsonData.Language);
                    console.log("Plot: " + jsonData.Plot);
                    console.log("Actors: " + jsonData.Actors);
                    console.log("Rotten Tomatoes Rating: " + jsonData.Rating[1].Value);
                }
            });
        };

        function doWhatitSays() {
            //gets data from txt file
            fs.readFile("random.txt", "UTF-8", function (error, data) {
                if (error) {
                    return console.log(error);
                }
                //"split" method to split strings into array to return new array
                title = data.split(",")[1];
                command = data.split(",")[0];
                onSwtich(command);
            });
        }
